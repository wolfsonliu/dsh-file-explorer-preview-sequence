import { parseFile, type Seq } from 'seqparse'
import type { SeqVizProps } from 'seqviz'

type AnnotationProp = NonNullable<SeqVizProps['annotations']>[number]

/** Parse file content (string) into a unified Seq. Uses seqparse's `parseFile`
 *  (not its default export) so a non-empty `fileName` drives extension-based
 *  disambiguation (.seq/.xml) and the accession-ID fetch branch is never hit. */
export async function parseSequence(content: string, fileName: string): Promise<Seq> {
  const seqs = parseFile(content, { fileName })
  if (seqs.length === 0) throw new Error(`no sequence parsed from ${fileName}`)
  return seqs[0]
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
