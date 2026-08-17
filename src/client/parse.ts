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

/**
 * Parse raw bytes (ArrayBuffer) into a unified Seq. For text-based formats
 * (FASTA, GenBank, JBEI, SBOL) the buffer is decoded via TextDecoder first.
 * For SnapGene (.dna) the buffer is passed directly to seqparse.
 */
export async function parseSequenceFromBuffer(buffer: ArrayBuffer, fileName: string): Promise<Seq> {
  const ext = fileName.includes('.') ? fileName.slice(fileName.lastIndexOf('.') + 1).toLowerCase() : ''
  // SnapGene .dna is binary — seqparse handles ArrayBuffer natively for this format.
  // For all other formats, decode as UTF-8 text first.
  if (ext === 'dna') {
    try {
      const seqs = parseFile(buffer, { fileName })
      if (seqs.length > 0) return seqs[0]
    } catch {
      // SnapGene binary parsing failed; fall through to text decoding
    }
  }
  const decoder = new TextDecoder()
  const text = decoder.decode(buffer)
  return parseSequence(text, fileName)
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
