# Changelog

All notable changes to this package are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this package
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2026-08-23

### Added

- Aligned with `dsh-file-explorer` v0.7.0: when reading raw bytes for SnapGene
  `.dna` and > 2 MiB sequence files, the viewer now passes an `AbortSignal` so
  an in-flight read is aborted when the preview unmounts or you switch files,
  instead of running to completion.