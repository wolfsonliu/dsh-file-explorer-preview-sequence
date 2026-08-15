import { type Seq } from 'seqparse';
import type { SeqVizProps } from 'seqviz';
type AnnotationProp = NonNullable<SeqVizProps['annotations']>[number];
/** Parse file content (string) into a unified Seq. Uses seqparse's `parseFile`
 *  (not its default export) so a non-empty `fileName` drives extension-based
 *  disambiguation (.seq/.xml) and the accession-ID fetch branch is never hit. */
export declare function parseSequence(content: string, fileName: string): Promise<Seq>;
/** Normalize seqparse annotations into SeqViz's AnnotationProp shape, dropping
 *  the `type` field (SeqViz has no type). direction/color are kept only when
 *  defined. */
export declare function toSeqvizAnnotations(annotations: Seq['annotations']): AnnotationProp[];
export {};
