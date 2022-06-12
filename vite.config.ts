import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default async () => {
    const mdx = (await import('@mdx-js/rollup')).default;

    return defineConfig({
        plugins: [react(), mdx()],
    });
};
