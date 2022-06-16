/* eslint-disable @typescript-eslint/no-var-requires */
import glob from 'fast-glob';
import * as path from 'path';
import { build } from 'esbuild';
import * as fs from 'fs-extra';
import { Config } from './interfaces';

export async function getCustomConfig(): Promise<Config> {
    const [configFilePath] = await glob(path.resolve(process.cwd(), 'fando.config.*'));

    if (configFilePath) {
        const ext = path.extname(configFilePath);

        const tempPath = path.resolve(__dirname);

        if (ext === '.ts') {
            const result = await build({
                entryPoints: [configFilePath],
                outdir: 'out.js',
                write: false,
                platform: 'node',
                format: 'cjs',
                bundle: true,
                plugins: [
                    {
                        name: 'externalize-deps',
                        setup(b) {
                            b.onResolve({ filter: /.*/ }, args => {
                                const id = args.path;
                                if (id[0] !== '.' && !path.isAbsolute(id)) {
                                    return {
                                        external: true,
                                    };
                                }
                            });
                        },
                    },
                ],
            });

            const [{ text }] = result.outputFiles;

            const tempFile = path.resolve(`${tempPath}`, 'fando.config.js');

            fs.writeFileSync(tempFile, text, 'utf-8');

            const config = require(tempFile).default;

            fs.removeSync(tempFile);

            return config;
        }

        if (ext === '.js') {
            return require(configFilePath);
        }

        throw new Error('Config file only supports .ts,.js');
    }

    return {};
}
