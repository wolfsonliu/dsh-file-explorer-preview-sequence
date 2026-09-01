# Changelog

All notable changes to this package are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this package
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2026-09-01

### Added

- Adopted `dsh-file-explorer`'s `registerViewer` (v0.9.0+): the viewer now
  registers as a single named **SeqViz** entry in the file row's "Open with…"
  menu and the preview-panel switcher, so you can explicitly pick the viewer
  (or fall back to plain text) for ambiguous `.xml` / `.seq` files. On older
  cores (< v0.9.0) it falls back to per-extension `registerPreview`
  registrations.

## [0.3.0] - 2026-08-23

### Added

- Aligned with `dsh-file-explorer` v0.7.0: when reading raw bytes for SnapGene
  `.dna` and > 2 MiB sequence files, the viewer now passes an `AbortSignal` so
  an in-flight read is aborted when the preview unmounts or you switch files,
  instead of running to completion.