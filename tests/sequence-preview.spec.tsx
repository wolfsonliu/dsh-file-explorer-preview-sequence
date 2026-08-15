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
})
