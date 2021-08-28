/* eslint-disable @typescript-eslint/no-var-requires */
const { build } = require('esbuild');
const { markdownPlugin } = require('esbuild-plugin-markdown');
build({
    bundle: true,
    minify: true,
    platform: 'node',
    entryPoints: ['src/index.ts'],
    outfile: 'dist/index.js',
    plugins: [markdownPlugin()],
}).catch(() => process.exit(1));
