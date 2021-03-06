import { ServerOptions } from './interfaces';
import { build, createServer, InlineConfig } from 'vite';
import { getCustomConfig } from './getCustomConfig';
import * as path from 'path';
import * as fs from 'fs-extra';

export async function server(options: ServerOptions) {
    const { type } = options;

    const { docsPath = 'docs/src', title, logo, base, outDir = 'docs-dist' } = await getCustomConfig();

    const cwd = process.cwd();

    const packageJson = await fs.readJSON(`${cwd}/package.json`, 'utf-8');

    const appContext = {
        version: packageJson.version,
        title: title || packageJson.name,
        repository: packageJson.repository,
        logo,
    };

    const config: InlineConfig = {
        root: path.resolve(__dirname, '..'),
        base,
        build: {
            outDir: path.resolve(cwd, outDir),
        },
        define: {
            __FANDO_APP_CONTEXT__: JSON.stringify(appContext),
            __FANDO_APP_DOCS_PATH__: JSON.stringify(docsPath),
        },
        resolve: {
            alias: {
                '@FANDO_APP_DOCS_PATH': path.resolve(cwd, docsPath),
            },
        },
    };

    if (type === 'build') {
        await build(config);
        return;
    }

    const devServer = await (await createServer(config)).listen();

    console.log();
    console.log(`Dev server running at http://localhost:${devServer.config.server.port}`);
    console.log();
}
