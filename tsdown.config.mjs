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
  // Browser-entry / node-builtin fixes. rolldown does not honor the `browser`
  // export condition (nor a legacy top-level `browser` field), so these
  // packages would otherwise resolve to their Node entries and drag in node
  // builtins (`http`/`https`/`stream`/`zlib`/`util`/`url`/`punycode`/`encoding`
  // for node-fetch, `react-dom/server` + `stream`/`util` for seqviz) that then
  // surface as `require(...)` calls missing from the client module table.
  // - `path` is a node builtin seqparse imports directly; map to the polyfill.
  // - `node-fetch` is seqparse's accession-fetch dep (unused here): browser shim.
  // - `seqviz`: its node entry lazily `require("react-dom/server")`; use the
  //   browser entry (which never references react-dom/server).
  alias: {
    path: 'path-browserify',
    'node-fetch': 'node-fetch/browser',
    seqviz: 'seqviz/dist/index.browser.js',
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
