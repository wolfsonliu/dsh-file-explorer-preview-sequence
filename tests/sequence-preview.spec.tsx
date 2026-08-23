// @vitest-environment jsdom
import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { describe, expect, test, vi } from 'vitest'
import type { PreviewProps } from '@dsh-external/dsh-file-explorer/client'

const seqvizMock = vi.hoisted(() => {
  const React = require('react')
  return {
    SeqViz: (props: Record<string, unknown>) =>
      React.createElement('div', {
        'data-testid': 'seqviz',
        'data-name': String(props.name ?? ''),
        'data-seqtype': String(props.seqType ?? ''),
        'data-length': String((props.seq as string | undefined)?.length ?? 0),
        'data-annotations': String((props.annotations as unknown[] | undefined)?.length ?? 0),
      }),
  }
})

vi.mock('seqviz', () => seqvizMock)

import { makeSequencePreview } from '../src/client/SequencePreview.tsx'

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

const t = ((key: string) => `T:${key}`) as PreviewProps['t']

async function renderAndSettle(element: React.ReactElement): Promise<HTMLElement> {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root = createRoot(container)
  await act(async () => {
    root.render(element)
  })
  await act(async () => {})
  return container
}

describe('SequencePreview', () => {
  test('returns null for empty and image preview kinds', async () => {
    const Preview = makeSequencePreview(undefined, t)

    const empty = await renderAndSettle(
      <Preview preview={{ kind: 'empty', name: 'x', size: 0 }} filePath="x.fa" activeView="preview" t={t} />,
    )
    expect(empty.querySelector('.dsh-sq')).toBeNull()

    const image = await renderAndSettle(
      <Preview
        preview={{ kind: 'image', name: 'x.png', mime: 'image/png', dataUrl: 'data:image/png;base64,', size: 1 }}
        filePath="x.png"
        activeView="preview"
        t={t}
      />,
    )
    expect(image.querySelector('.dsh-sq')).toBeNull()
  })

  test('shows the unsupported message for binary/too-large when readRaw is absent', async () => {
    const Preview = makeSequencePreview(undefined, t)
    const container = await renderAndSettle(
      <Preview preview={{ kind: 'binary', name: 'x.dna', size: 10 }} filePath="x.dna" activeView="preview" t={t} />,
    )
    expect(container.textContent).toContain('T:unsupportedYet')
  })

  test('shows the unsupported message for text-large when readRaw is absent', async () => {
    const Preview = makeSequencePreview(undefined, t)
    const container = await renderAndSettle(
      <Preview
        preview={{ kind: 'text-large', name: 'big.fa', extension: 'fa', size: 5_000_000 }}
        filePath="big.fa"
        activeView="preview"
        t={t}
      />,
    )
    expect(container.textContent).toContain('T:unsupportedYet')
  })

  test('falls back to plain text for a non-SBOL .xml file', async () => {
    const Preview = makeSequencePreview(undefined, t)
    const container = await renderAndSettle(
      <Preview
        preview={{ kind: 'text', name: 'config.xml', extension: 'xml', content: '<project><name>demo</name></project>', size: 10 }}
        filePath="config.xml"
        activeView="preview"
        t={t}
      />,
    )
    expect(container.querySelector('pre.dsh-sq-plain')).not.toBeNull()
    expect(container.textContent).toContain('<project>')
  })

  test('shows the error message for an unparseable unambiguous file', async () => {
    const Preview = makeSequencePreview(undefined, t)
    const container = await renderAndSettle(
      <Preview
        preview={{ kind: 'text', name: 'broken.gb', extension: 'gb', content: 'this is not genbank', size: 10 }}
        filePath="broken.gb"
        activeView="preview"
        t={t}
      />,
    )
    expect(container.textContent).toContain('T:loadError')
  })

  test('parses a FASTA file and renders SeqViz with name, seqType and annotations', async () => {
    const Preview = makeSequencePreview(undefined, t)
    const container = await renderAndSettle(
      <Preview
        preview={{ kind: 'text', name: 'sample.fa', extension: 'fa', content: '>test\nATCGATCG', size: 10 }}
        filePath="sample.fa"
        activeView="preview"
        t={t}
      />,
    )

    const seqviz = container.querySelector('[data-testid="seqviz"]')
    expect(seqviz).not.toBeNull()
    expect(seqviz!.getAttribute('data-name')).toBe('test')
    expect(seqviz!.getAttribute('data-seqtype')).toBe('dna')
    expect(seqviz!.getAttribute('data-length')).toBe('8')
    expect(seqviz!.getAttribute('data-annotations')).toBe('0')
  })

  test('parses a binary file via readRaw and renders SeqViz', async () => {
    const text = '>test\nATCGATCG'
    const encoder = new TextEncoder()
    const buffer = encoder.encode(text).buffer
    const readRaw = vi.fn(async () => buffer)

    const Preview = makeSequencePreview(readRaw, t)
    const container = await renderAndSettle(
      <Preview
        preview={{ kind: 'binary', name: 'x.gb', size: 10 }}
        filePath="x.gb"
        activeView="preview"
        t={t}
      />,
    )

    const seqviz = container.querySelector('[data-testid="seqviz"]')
    expect(seqviz).not.toBeNull()
    expect(readRaw).toHaveBeenCalledWith('x.gb', undefined, undefined, expect.any(AbortSignal))
  })

  test('parses a too-large file via readRaw and renders SeqViz', async () => {
    const text = '>test\nATCGATCG'
    const encoder = new TextEncoder()
    const buffer = encoder.encode(text).buffer
    const readRaw = vi.fn(async () => buffer)

    const Preview = makeSequencePreview(readRaw, t)
    const container = await renderAndSettle(
      <Preview
        preview={{ kind: 'too-large', name: 'big.fa', size: 5_000_000 }}
        filePath="big.fa"
        activeView="preview"
        t={t}
      />,
    )

    const seqviz = container.querySelector('[data-testid="seqviz"]')
    expect(seqviz).not.toBeNull()
    expect(readRaw).toHaveBeenCalledWith('big.fa', undefined, undefined, expect.any(AbortSignal))
  })

  test('parses a text-large file via readRaw and renders SeqViz', async () => {
    const text = '>test\nATCGATCG'
    const encoder = new TextEncoder()
    const buffer = encoder.encode(text).buffer
    const readRaw = vi.fn(async () => buffer)

    const Preview = makeSequencePreview(readRaw, t)
    const container = await renderAndSettle(
      <Preview
        preview={{ kind: 'text-large', name: 'big.fa', extension: 'fa', size: 5_000_000 }}
        filePath="big.fa"
        activeView="preview"
        t={t}
      />,
    )

    const seqviz = container.querySelector('[data-testid="seqviz"]')
    expect(seqviz).not.toBeNull()
    expect(readRaw).toHaveBeenCalledWith('big.fa', undefined, undefined, expect.any(AbortSignal))
  })

  test('shows error when readRaw fails for binary/too-large', async () => {
    const readRaw = vi.fn(async () => { throw new Error('network error') })

    const Preview = makeSequencePreview(readRaw, t)
    const container = await renderAndSettle(
      <Preview
        preview={{ kind: 'too-large', name: 'big.fa', size: 5_000_000 }}
        filePath="big.fa"
        activeView="preview"
        t={t}
      />,
    )

    expect(container.textContent).toContain('T:loadError')
    expect(container.textContent).toContain('network error')
    expect(readRaw).toHaveBeenCalledWith('big.fa', undefined, undefined, expect.any(AbortSignal))
  })

  test('passes an AbortSignal to readRaw and aborts it on unmount', async () => {
    const text = '>test\nATCGATCG'
    const buffer = new TextEncoder().encode(text).buffer
    let capturedSignal: AbortSignal | null = null
    const readRaw = vi.fn(async (_path: string, _offset?: number, _limit?: number, signal?: AbortSignal) => {
      capturedSignal = signal ?? null
      return buffer
    })

    const Preview = makeSequencePreview(readRaw, t)

    const container = document.createElement('div')
    document.body.appendChild(container)
    const root = createRoot(container)
    await act(async () => {
      root.render(
        <Preview preview={{ kind: 'binary', name: 'x.dna', size: 10 }} filePath="x.dna" activeView="preview" t={t} />,
      )
    })
    await act(async () => {})

    expect(capturedSignal).not.toBeNull()
    expect(capturedSignal!.aborted).toBe(false)

    await act(async () => {
      root.unmount()
    })

    expect(capturedSignal!.aborted).toBe(true)
  })
})
