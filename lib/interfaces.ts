export interface Config {
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
}

export interface ServerOptions {
    type: 'dev' | 'build';
}
