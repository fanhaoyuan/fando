import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const scopedNameMap = new Map();

export default async () => {
    const mdx = (await import('@mdx-js/rollup')).default;

    return defineConfig({
        plugins: [react(), mdx()],
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
