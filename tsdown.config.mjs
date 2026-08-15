const id = '@dsh-external/dsh-file-explorer-preview-sequence'
const platformModules = [
  '@deepseek-ai/dsh-client-runtime/client',
  'react',
  'react/jsx-runtime',
  'react-dom',
  'react-dom/client',
]

export default [{
  // Node half: a minimal no-op cordis plugin so the host Loader can import
  // this roster entry.
  entry: ['lib/types/index.js'],
  outDir: 'lib',
  format: ['esm'],
  platform: 'node',
  target: 'es2024',
  fixedExtension: false,
  dts: false,
  clean: false,
}, {
  // Browser half: the client bundle. seqviz + seqparse and all their deps are
  // inlined; react/react-dom/client-runtime stay external (platform-provided).
  entry: { client: 'src/client/index.ts' },
  outDir: 'lib',
  format: 'cjs',
  platform: 'browser',
  target: 'es2024',
  dts: false,
  sourcemap: true,
  clean: false,
  // seqparse's published UMD imports the `path` node builtin (`import { sep }
  // from "path"`); map it to the browser polyfill. Add more entries only if
  // the build reports an unresolved builtin (see the plan's fallback table).
  alias: {
    path: 'path-browserify',
  },
  deps: {
    neverBundle: platformModules,
    alwaysBundle: mod => platformModules.includes(mod) ? undefined : true,
    onlyBundle: false,
  },
  outputOptions: {
    entryFileNames: 'client.js',
    // seqviz/seqparse use dynamic import() in a few paths; a single client.js
    // must inline them (no separate chunks).
    codeSplitting: false,
    banner: `window.__ModuleLoader__.load({ id: ${JSON.stringify(id)}, factory: (require) => {`,
    footer: 'return module.exports; } });',
    // Minimal `process` shim scoped to this bundle (buffer and other deps read
    // process.env at module-evaluation time).
    intro: [
      'var module = { exports: {} };',
      'var exports = module.exports;',
      'var process = { env: { NODE_ENV: "production" }, versions: {}, argv: [], browser: true, nextTick: function (fn) { return setTimeout(fn, 0); } };',
    ].join('\n'),
  },
}]
