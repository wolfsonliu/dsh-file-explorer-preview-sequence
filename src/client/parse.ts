import seqparse, { type Seq } from 'seqparse'
import type { SeqVizProps } from 'seqviz'

type AnnotationProp = NonNullable<SeqVizProps['annotations']>[number]

/** Parse file content (string) into a unified Seq. Always pass fileName so
 *  seqparse can disambiguate extensions (.seq/.xml) and skip its accession-ID
 *  online-fetch branch (this plugin does no network lookups). */
export async function parseSequence(content: string, fileName: string): Promise<Seq> {
  return await seqparse(content, { fileName })
}

/** Normalize seqparse annotations into SeqViz's AnnotationProp shape, dropping
 *  the `type` field (SeqViz has no type). direction/color are kept only when
 *  defined. */
export function toSeqvizAnnotations(annotations: Seq['annotations']): AnnotationProp[] {
  return annotations.map(a => ({
    name: a.name,
    start: a.start,
    end: a.end,
    ...(a.direction !== undefined ? { direction: a.direction } : {}),
    ...(a.color !== undefined ? { color: a.color } : {}),
  }))
}
