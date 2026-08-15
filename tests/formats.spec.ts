import { describe, expect, test } from 'vitest'
import { extensionOf, fallsBackToText, formatLabelFor } from '../src/client/formats.ts'

describe('extensionOf', () => {
  test('extracts a lowercase extension from a workspace-relative path', () => {
    expect(extensionOf('dir/pBbE0c-RFP.gb')).toBe('gb')
    expect(extensionOf('pBbE0c-RFP.Gb')).toBe('gb')
    expect(extensionOf('a/b/c.fas')).toBe('fas')
  })

  test('returns empty string when there is no extension', () => {
    expect(extensionOf('README')).toBe('')
    expect(extensionOf('dir/trailing.')).toBe('')
    expect(extensionOf('')).toBe('')
  })
})

describe('formatLabelFor', () => {
  test('maps sequence extensions to a human-readable label', () => {
    expect(formatLabelFor('fasta')).toBe('FASTA')
    expect(formatLabelFor('fna')).toBe('FASTA')
    expect(formatLabelFor('gb')).toBe('GenBank')
    expect(formatLabelFor('gp')).toBe('GenBank')
    expect(formatLabelFor('dna')).toBe('SnapGene')
    expect(formatLabelFor('seq')).toBe('JBEI SEQ')
    expect(formatLabelFor('sbol')).toBe('SBOL')
    expect(formatLabelFor('xml')).toBe('SBOL')
  })

  test('returns null for unknown extensions', () => {
    expect(formatLabelFor('')).toBeNull()
    expect(formatLabelFor('txt')).toBeNull()
    expect(formatLabelFor('png')).toBeNull()
  })
})

describe('fallsBackToText', () => {
  test('returns true for ambiguous extensions xml/seq (case-insensitive)', () => {
    expect(fallsBackToText('xml')).toBe(true)
    expect(fallsBackToText('XML')).toBe(true)
    expect(fallsBackToText('seq')).toBe(true)
  })

  test('returns false otherwise', () => {
    expect(fallsBackToText('gb')).toBe(false)
    expect(fallsBackToText('fasta')).toBe(false)
    expect(fallsBackToText('')).toBe(false)
  })
})
