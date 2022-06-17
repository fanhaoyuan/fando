import { UserConfig } from 'vite';

export interface Config extends Pick<UserConfig, 'base'> {
    /**
     * Configure the name of the document on the header
     *
     * @default `require('package.json').name`
     */
    title?: string;

    /**
     * To set the LOGO of the document.
     */
    logo?: string;

    /**
     * The path for mdx files to search
     *
     * Relative to `process.cwd()`
     *
     * @default 'docs/src'
     */
    docsPath?: string;

    /**
     * Relative to `process.cwd()`
     * 
     * @default 'docs-dist'
     */
    outDir?: string;
}

export interface ServerOptions {
    type: 'dev' | 'build';
}
