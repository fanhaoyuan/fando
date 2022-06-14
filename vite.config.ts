import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

const scopedNameMap = new Map();

export default async () => {
    const mdx = (await import('@mdx-js/rollup')).default;

    return defineConfig({
        plugins: [react(), mdx()],
        define: {
            'process.env.__APP_CONTEXT__': JSON.stringify('{}'),
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        },
        css: {
            modules: {
                localsConvention: 'camelCaseOnly',
                generateScopedName(name, fileName) {
                    if (!scopedNameMap.has(fileName)) {
                        scopedNameMap.set(fileName, Math.random().toString(36).slice(-6));
                    }

                    if (/^r-ant.*/.test(name)) {
                        return name;
                    }

                    return `${name}__${scopedNameMap.get(fileName)}`;
                },
            },
        },
    });
};
