# dsh-file-explorer-preview-sequence

[中文](README.zh.md) | English

A DSH Web preview plugin that renders **FASTA**, **GenBank**, **JBEI**, **SnapGene**, and **SBOL** sequence files with the [SeqViz](https://github.com/Lattice-Automation/seqviz) viewer, overriding [dsh-file-explorer](https://github.com/wolfsonliu/dsh-file-explorer)'s plain-text previews.

## Features

- Linear / circular / both topologies, feature annotations with colors.
- Search with highlight, enzyme cut sites (common enzymes), complement and index toggles, linear zoom, selection readout.
- Dark/light aware (follows DSH `data-ds-dark-theme`), bilingual (中文 / English).

## Supported formats

| Extension | Format |
|---|---|
| `fasta fa fas fna faa ffn` | FASTA |
| `gb gbk genbank gp` | GenBank / GenPept |
| `dna` | SnapGene (binary — degrades until core `readRawFile` lands) |
| `seq` | JBEI SEQ |
| `sbol xml` | SBOL v1/v2 |

## Dependencies

Requires [`@dsh-external/dsh-file-explorer`](https://github.com/wolfsonliu/dsh-file-explorer). SnapGene `.dna` and files larger than 2 MiB require the core `readRawFile` change; until it lands the plugin degrades gracefully.

## Development

```sh
npm install --cache ./.npm-cache
npm run check   # tsc type check
npm test        # vitest
npm run build   # tsc + tsdown → lib/client.js
```

## License

[MIT](LICENSE)
