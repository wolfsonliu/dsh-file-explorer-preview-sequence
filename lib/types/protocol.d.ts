/** Shared constants for the sequence-preview plugin. */
/** Package id stamped into the client bundle handoff and locale namespace. */
export declare const PLUGIN_ID = "@dsh-external/dsh-file-explorer-preview-sequence";
/**
 * Sequence file extensions (lowercase, no leading dot) whose preview this
 * plugin overrides at priority 10, mapped to the format label shown in the
 * status bar. `.xml` (SBOL) and `.seq` (JBEI) are ambiguous with generic XML /
 * Ape `.seq`, so their component falls back to plain-text when parsing fails.
 */
export declare const SEQUENCE_FORMATS: {
    readonly fasta: "FASTA";
    readonly fa: "FASTA";
    readonly fas: "FASTA";
    readonly fna: "FASTA";
    readonly faa: "FASTA";
    readonly ffn: "FASTA";
    readonly gb: "GenBank";
    readonly gbk: "GenBank";
    readonly genbank: "GenBank";
    readonly gp: "GenBank";
    readonly dna: "SnapGene";
    readonly seq: "JBEI SEQ";
    readonly sbol: "SBOL";
    readonly xml: "SBOL";
};
export type SequenceExt = keyof typeof SEQUENCE_FORMATS;
/** Every extension this plugin registers, in the canonical map order. */
export declare const SEQUENCE_EXTS: SequenceExt[];
