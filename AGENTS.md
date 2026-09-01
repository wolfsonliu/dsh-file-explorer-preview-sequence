# AGENTS.md

`dsh-file-explorer-preview-sequence` is a DSH Web plugin that **extends** `@dsh-external/dsh-file-explorer`: it overrides that plugin's plain-text previews for sequence files (**FASTA / GenBank / JBEI / SnapGene / SBOL**) with an interactive SeqViz viewer. It is a **client-only** plugin — the browser half does all the work; the host half is a minimal no-op Cordis plugin that exists only so the host Loader can import this roster entry.

- [README.md](README.md) — the user-facing contract (features, install, supported formats, dependency, limitations). [README.zh.md](README.zh.md) is the paired Chinese version.
- The extension contract this plugin consumes (`fileExplorer` service, `PreviewProps`, `Translate`) is **owned by `dsh-file-explorer`**, not by this repo. It is imported only as types from the `@dsh-external/dsh-file-explorer/client` package entry — see [Dependency contract](#dependency-contract).

## Repository layout

```
src/
  index.ts            host half: no-op cordis plugin (inject [] / empty apply) so the host can import the roster entry
  protocol.ts         the single source of truth for formats: SEQUENCE_FORMATS map (ext → label), SEQUENCE_EXTS, PLUGIN_ID, SEQUENCE_VIEWER_ID/LABEL
  client/
    index.ts              browser half: injects ['fileExplorer', 'locale'], injects VIEWER_CSS, registers one shared
                          viewer (registerViewer, with a registerPreview fallback) for every SEQUENCE_FORMATS
                          extension at priority 10, tears down on disposer
    formats.ts            pure helpers: extensionOf / formatLabelFor / fallsBackToText
    parse.ts              seqparse glue: parseSequence (text) / parseSequenceFromBuffer (binary) / toSeqvizAnnotations
    SequencePreview.tsx   makeSequencePreview(readRaw, t) factory → the <SeqViz> viewer component + toolbar/status state machine
    locale.ts             ZH/EN dictionaries for the 'file-explorer-preview-sequence' namespace + registerSequenceLocale
    styles.ts             VIEWER_CSS string, injected as a <style data-sequence-preview-style> tag
tests/                vitest specs — node env by default; *.spec.tsx begin with `// @vitest-environment jsdom`
lib/                  built output, tracked — lib/index.js (host ESM) + lib/client.js(.map) (client CJS) + lib/types (JS + .d.ts for every src file)
assets/               dark/light screenshots (tracked)
examples/             a sample FASTA for smoke-testing via `dsh web` (tracked)
cordis.patch.yml      bundle patch layer — inserts the plugin into the roster
seqparse/, seqviz/    gitignored, local-only upstream source checkouts for reference (NOT this repo's source; see Build notes)
docs/                 gitignored, local-only (plans/ and specs/ live here — never commit them)
```

## Commands

```sh
npm install
npm run check     # tsc -p tsconfig.json --noEmit --pretty false → type-checks src/ only
npm test          # vitest run (tests/**/*.spec.{ts,tsx})
npm run build     # tsc + tsdown → host ESM lib/index.js + client CJS lib/client.js (+ lib/types)
```

- Run one spec with `./node_modules/.bin/vitest run tests/<file>` — never `npx vitest` (the npm cache is read-only in this environment).
- `npm run check` covers `src/` only: `tsconfig.json` includes `src/**/*.{ts,tsx}` and excludes `tests`. Tests are exercised at runtime by vitest, not by `tsc`.
- `tsdown.config.mjs` owns the two-bundle split:
  - **Host half** — entry `lib/types/index.js` (the JS `tsc` just emitted) → ESM `lib/index.js`: the no-op plugin.
  - **Client half** — entry `src/client/index.ts` → a single CJS `lib/client.js`, wrapped as a `window.__ModuleLoader__.load({ id, factory: require => … })` factory with a `banner`/`footer`. `seqparse` + `seqviz` and all their transitive deps are **inlined** (`onlyBundle`/`alwaysBundle`); a minimal `process` shim is injected via `intro`.
  - The `alias` map is the browser-entry fix layer: `path` → `path-browserify`, `node-fetch` → `node-fetch/browser`, `seqviz` → `seqviz/dist/index.browser.js`. Do not remove these without re-verifying the client bundle (the Node entries drag in `http`/`stream`/`zlib`/`react-dom/server` etc. and surface as missing `require(...)` calls).
  - `platformModules` (`neverBundle` = left external): `@deepseek-ai/dsh-client-runtime/client`, `react`, `react/jsx-runtime`, `react-dom`, `react-dom/client`. `package.json`'s `dsh.client.inject` lists only `@deepseek-ai/dsh-client-runtime`; keep the two in sync with what the host actually supplies at runtime.

## Build & commit rules

- `lib/` is committed (including every `lib/types/**` file and `lib/client.js.map`). After any `src/` change, run `npm run build` and commit the regenerated `lib/` as its own `chore: rebuild lib artifacts` commit. Downstream `dsh plugin … add .` resolves `lib/` directly, so it must never lag `src/`.
- `docs/`, `seqparse/`, and `seqviz/` are gitignored — never commit them. (`README.md` / `README.zh.md` ARE tracked.)
- Commit messages use conventional prefixes: `feat:`, `fix:`, `test:`, `chore:`, `docs:`.
- Do not fold unrelated working-tree changes into a feature commit; keep them separate (unless the user asks otherwise).
- After `npm run build`, hard-refresh the browser (`Ctrl/Cmd+Shift+R`): `dsh web` may keep serving a cached plugin bundle; a soft reload can leave the latest build unused.

## Architecture conventions

- **Client does everything; host is a stub.** The host half (`src/index.ts`) is `inject: []` with an empty `apply()`. It has no route, no filesystem access, and no configuration. The browser half (`src/client/index.ts`, `inject: ['fileExplorer', 'locale']`) registers a preview component and renders through the core's own preview panel — it never calls `fetch` itself; the core hands it a `preview` object and calls the registered component.

- **One shared component, priority 10.** `makeSequencePreview(readRaw, t)` returns a single `ComponentType<PreviewProps>` that is registered — via `ctx.fileExplorer.registerViewer({ id: SEQUENCE_VIEWER_ID, label: SEQUENCE_VIEWER_LABEL, exts, component, priority: 10 })` (falling back to a `registerPreview(ext, component, 10)` loop on cores < v0.9.0) — for **every** extension in `SEQUENCE_FORMATS` (`src/protocol.ts`). Priority 10 overrides the core's built-in text previews (priority 0). The extension set is derived programmatically (`SEQUENCE_EXTS = Object.keys(SEQUENCE_FORMATS)`), so adding a format is a one-map-edit change: extend `SEQUENCE_FORMATS` and the README format table together.

- **Preview kinds drive the read path.** The component reads the discriminated `preview.kind` (`text` | `binary` | `too-large` | `text-large` | `empty` | `image`):
  - `text` → `parseSequence(preview.content, preview.name)`.
  - `binary` / `too-large` / `text-large` → `readRawFile(filePath)` then `parseSequenceFromBuffer(buffer, preview.name)`; **when `readRaw` is absent** (dsh-file-explorer < v0.1.0) the component degrades to an `unsupported` message rather than throwing.
  - `empty` / `image` → returns `null` (the core's own kinds; not sequence material). `previewable = kind ∈ {text, binary, too-large, text-large}` gates both the effect and the render.
  - `preview.name` (not `filePath`) is what seqparse receives as `fileName`, so extension disambiguation (`.seq` / `.xml`) and the SnapGene binary branch key off the file name.

- **Ambiguous extensions fall back to plain text.** `.xml` (SBOL) and `.seq` (JBEI) collide with generic XML / Ape `.seq`. `fallsBackToText(ext)` (`src/client/formats.ts`) marks these two; on a parse failure within the `text` path the component renders the raw content as plain text instead of an error. `.dna` (SnapGene) is binary and is handled only through the `binary`/`too-large` + `readRawFile` route.

- **Parsing is seqparse, rendering is SeqViz, and the seam is `parse.ts`.** `parseSequence` / `parseSequenceFromBuffer` both terminate in seqparse's `parseFile` and return a unified `Seq`; `toSeqvizAnnotations` strips seqparse's `type` field and keeps only `name`/`start`/`end` (+ `direction`/`color` when defined) to satisfy SeqViz's `AnnotationProp`. Use seqparse's named `parseFile` export (not its default) so a non-empty `fileName` drives extension-based disambiguation and the accession-ID fetch branch is never hit.

- **Single DOM surface, torn down by the disposer.** `apply` injects one `<style data-sequence-preview-style>` tag, then registers everything inside `ctx.effect(...)`. The disposer disposes the viewer registration (or the composite fallback), disposes the locale registration, and removes the style tag. Keep the disposer complete — this is what makes unload/HMR safe. `tests/apply.spec.tsx` asserts the teardown.

- **Styles are injected, not imported.** An external plugin cannot import a CSS module, so styles live in `VIEWER_CSS` (`src/client/styles.ts`). All classes are scoped under the `dsh-sq` (and `.dsh-sq-*`) prefix; theme values use `var(--dsw-alias-*, fallback)` so dark/light follows DSH automatically. Add no unscoped/global selectors.

## Dependency contract

This plugin consumes the `fileExplorer` cordis service that `@dsh-external/dsh-file-explorer` provides. `src/client/index.ts` types it as `FileExplorerService & { readRawFile? }` imported from `@dsh-external/dsh-file-explorer/client`. The stable members this plugin relies on:

- `registerViewer(viewer: { id, label, exts, component, priority? }): () => void` — the primary integration point (v0.9.0+): one named "Open with…" entry (`SEQUENCE_VIEWER_ID` / `SEQUENCE_VIEWER_LABEL`) across every extension. Probed at runtime; falls back to `registerPreview` on older cores.
- `registerPreview(ext, component, priority?): () => void` — the fallback for cores < v0.9.0.
- `readRawFile(path, offset?, limit?): Promise<ArrayBuffer>` — **optional**; required only for `.dna` and > 2 MiB files (available in v0.1.0+; this plugin degrades when absent).
- `PreviewProps` — `{ preview, filePath, t, onViewSource?, activeView }` (see `src/client/SequencePreview.tsx` for usage).
- `Translate` — `(key, params?) => string`, bound via `locale.bind`.

Treat those signatures as owned upstream and semver-stable. `package.json`'s `devDependencies` resolves `@dsh-external/dsh-file-explorer` for its `./client` type definitions during `npm run check`/`npm run build`; point it at your checkout or the published package before `npm install` (see README "Dependencies").

## Configuration

There is no host configuration and no `Config`/caps of its own — the caps (e.g. the 2 MiB text threshold that decides `text` vs `too-large`) belong to `dsh-file-explorer`. The only behavior knobs are compile-time constants in this repo, and they should stay in sync with the README:

- `SEQUENCE_FORMATS` / `SEQUENCE_EXTS` (`src/protocol.ts`) — the supported extension → format-label map.
- `SEQUENCE_VIEWER_ID` / `SEQUENCE_VIEWER_LABEL` (`src/protocol.ts`) — the "Open with…" viewer identity (`seqviz` / `SeqViz`).
- Preview registration priority `10` (`src/client/index.ts`) — must stay above the core's built-in `0`.
- `TOPOLOGIES` and `ENZYME_CHOICES` (`src/client/SequencePreview.tsx`) — viewer toolbar options.

## Coding conventions

- Strict TypeScript (`strict: true`, `noEmitOnError`), ESM everywhere (`"type": "module"`), `.ts`/`.tsx` extensions in relative imports (`allowImportingTsExtensions` + `rewriteRelativeImportExtensions`).
- Switch on the discriminated `LoadState.phase` tag (`loading | ready | plain | error | unsupported`) rather than scattering booleans; the state union is the single render source of truth.
- Trust TypeScript at typed same-process boundaries: do not re-validate the `PreviewProps`/`FileExplorerService` types the core guarantees. The only runtime boundaries this plugin cares about are `registerViewer` / `readRawFile` presence (`typeof … === 'function'`) and `preview.kind`.
- React uses `jsx: react-jsx` (no `React` import needed just for JSX); import hooks/types by name. Async work in the view effect is guarded by a `cancelled` flag so it never sets state after unmount.
- **`.dsh-sq-*` classes and `data-sequence-preview-style` are the test-hook contract.** `tests/apply.spec.tsx` locates the injected style via `style[data-sequence-preview-style]`; `tests/sequence-preview.spec.tsx` locates the viewer via the mocked SeqViz's `data-testid="seqviz"` and the plain-text fallback via `pre.dsh-sq-plain`. Keep those selectors/attribute values stable and class-scope all new styles under `dsh-sq`.
- An empty/fallback `catch` names what it swallows and why (e.g. the SnapGene branch's `catch` falls through to the UTF-8 text decode path).
- Prefer zero new dependencies: `path-browserify` is a build-time polyfill only; the runtime bundle inlines `seqparse` + `seqviz`. Do not add a dependency for one small helper.
- Files end with exactly one trailing newline. Keep `lib/` and `src/` in lockstep per the build rules above.

## i18n & bilingual docs

- UI copy lives in `src/client/locale.ts` as `ZH`/`EN` const objects under the namespace `file-explorer-preview-sequence` (`SEQ_NS`). **Key sets must stay identical** — any new string is added to both dictionaries at once. This repo has no standalone parity spec (unlike the core), so parity is by convention; keep the two object shapes aligned manually.
- `README.md` / `README.zh.md` are a bilingual pair of equal authority. After editing one side, bring the other along in the same commit. (No `README.i18n.yaml` record exists in this repo.)
- The component binds translator via `ctx.locale.bind(SEQ_NS)` and passes the resulting `Translate` into the factory, so toolbar/status copy follows locale switches.

## Testing

- Tests live in `tests/` and describe behavior, not implementation. `*.spec.ts` run under node; `*.spec.tsx` begin with `// @vitest-environment jsdom`.
- `SeqViz` is always mocked in jsdom (`vi.mock('seqviz', …)`) — the real canvas cannot run under jsdom. Verify the real viewer with `dsh web` + a file in `examples/`.
- Follow TDD: write the failing test, watch it fail, then implement the minimum to pass.
- Coverage map:

  | Spec | Covers |
  | --- | --- |
  | `apply.spec.tsx` | client `apply` bootstrap — registers one named viewer (`registerViewer`) for every `SEQUENCE_FORMATS` extension at priority 10 with a `registerPreview` fallback, registers zh/en locale, full teardown on disposer, graceful degrade when `readRawFile` is absent |
  | `formats.spec.ts` | pure helpers `extensionOf` / `formatLabelFor` / `fallsBackToText` |
  | `parse.spec.ts` | `parseSequence`, `parseSequenceFromBuffer` (UTF-8 FASTA/GenBank, SnapGene binary path), `toSeqvizAnnotations` shape |
  | `sequence-preview.spec.tsx` | `SequencePreview` state machine — null for empty/image, unsupported without `readRaw`, plain-text fallback for non-SBOL `.xml`, error for unparseable unambiguous files, SeqViz render for FASTA and binary/too-large/text-large via `readRaw`, error when `readRaw` throws |