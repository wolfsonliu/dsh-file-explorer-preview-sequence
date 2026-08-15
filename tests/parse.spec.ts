import { describe, expect, test } from 'vitest'
import type { Seq } from 'seqparse'
import { fallsBackToText } from '../src/client/formats.ts'
import { parseSequence, toSeqvizAnnotations } from '../src/client/parse.ts'

describe('parseSequence', () => {
  test('parses a FASTA string into a unified Seq', async () => {
    const seq = await parseSequence('>test\nATCGATCG', 'test.fa')

    expect(seq.name).toBe('test')
    expect(seq.type).toBe('dna')
    expect(seq.seq).toBe('ATCGATCG')
    expect(seq.annotations).toEqual([])
  })

  test('rejects content that is not a recognized sequence format', async () => {
    await expect(parseSequence('this is just plain text', 'notes.txt')).rejects.toThrow()
  })
})

describe('toSeqvizAnnotations', () => {
  test('strips the type field and keeps name/start/end/direction/color', () => {
    const annotations: Seq['annotations'] = [
      { name: 'CDS', start: 0, end: 10, direction: -1, color: '#f00', type: 'CDS' },
      { name: 'gene', start: 5, end: 20 },
    ]

    expect(toSeqvizAnnotations(annotations)).toEqual([
      { name: 'CDS', start: 0, end: 10, direction: -1, color: '#f00' },
      { name: 'gene', start: 5, end: 20 },
    ])
  })
})

describe('fallsBackToText', () => {
  test('is true for xml/seq and false otherwise', () => {
    expect(fallsBackToText('xml')).toBe(true)
    expect(fallsBackToText('seq')).toBe(true)
    expect(fallsBackToText('gb')).toBe(false)
    expect(fallsBackToText('')).toBe(false)
  })
})
