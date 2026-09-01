/** Shared constants for the sequence-preview plugin. */

/** Package id stamped into the client bundle handoff and locale namespace. */
export const PLUGIN_ID = '@dsh-external/dsh-file-explorer-preview-sequence'

/**
 * Viewer identity registered via `registerViewer` (dsh-file-explorer v0.9.0+):
 * one "Open with…" / panel-switcher entry covering every sequence extension.
 * `auto` / `text` / `binary` are reserved by the core, so this stays distinct.
 */
export const SEQUENCE_VIEWER_ID = 'seqviz'

/** Static label shown in the "Open with…" list and the panel switcher. */
export const SEQUENCE_VIEWER_LABEL = 'SeqViz'

/**
 * Sequence file extensions (lowercase, no leading dot) whose preview this
 * plugin overrides at priority 10, mapped to the format label shown in the
 * status bar. `.xml` (SBOL) and `.seq` (JBEI) are ambiguous with generic XML /
 * Ape `.seq`, so their component falls back to plain-text when parsing fails.
 */
export const SEQUENCE_FORMATS = {
  // FASTA (nucleic acid / protein)
  fasta: 'FASTA',
  fa: 'FASTA',
  fas: 'FASTA',
  fna: 'FASTA',
  faa: 'FASTA',
  ffn: 'FASTA',
  // GenBank / GenPept
  gb: 'GenBank',
  gbk: 'GenBank',
  genbank: 'GenBank',
  gp: 'GenBank',
  // SnapGene (binary; degrades until core readRawFile lands)
  dna: 'SnapGene',
  // JBEI SEQ
  seq: 'JBEI SEQ',
  // SBOL v1 / v2
  sbol: 'SBOL',
  xml: 'SBOL',
} as const

export type SequenceExt = keyof typeof SEQUENCE_FORMATS

/** Every extension this plugin registers, in the canonical map order. */
export const SEQUENCE_EXTS = Object.keys(SEQUENCE_FORMATS) as SequenceExt[]
