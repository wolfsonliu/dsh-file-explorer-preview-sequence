// @vitest-environment jsdom
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { apply } from '../src/client/index.ts'
import { SEQUENCE_EXTS } from '../src/protocol.ts'

interface MockCtx {
  fileExplorer: {
    registerPreview: ReturnType<typeof vi.fn>
    registerViewer?: ReturnType<typeof vi.fn>
    registerFileAction: ReturnType<typeof vi.fn>
    writeFile: ReturnType<typeof vi.fn>
    readRawFile?: ReturnType<typeof vi.fn>
  }
  locale: {
    register: ReturnType<typeof vi.fn>
    bind: ReturnType<typeof vi.fn>
  }
  effect: ReturnType<typeof vi.fn>
}

function makeFileExplorer(
  overrides: Partial<MockCtx['fileExplorer']> = {},
): MockCtx['fileExplorer'] {
  return {
    registerPreview: vi.fn(() => () => {}),
    registerViewer: vi.fn(() => () => {}),
    registerFileAction: vi.fn(),
    writeFile: vi.fn(async () => {}),
    ...overrides,
  }
}

function makeCtx(fileExplorer = makeFileExplorer()): { ctx: MockCtx; cleanup: () => void } {
  let cleanup: () => void = () => {}
  const ctx: MockCtx = {
    fileExplorer,
    locale: {
      register: vi.fn(() => () => {}),
      bind: vi.fn(() => ((key: string) => key)),
    },
    effect: vi.fn((cb: () => (() => void)) => { cleanup = cb() }),
  }
  return { ctx, cleanup: () => cleanup() }
}

beforeEach(() => {
  document.head.innerHTML = ''
})

describe('apply', () => {
  test('registers one named viewer across every extension at priority 10 via registerViewer', () => {
    const { ctx } = makeCtx()
    apply(ctx as never)

    expect(ctx.fileExplorer.registerViewer).toHaveBeenCalledTimes(1)
    expect(ctx.fileExplorer.registerViewer).toHaveBeenCalledWith({
      id: 'seqviz',
      label: 'SeqViz',
      exts: SEQUENCE_EXTS,
      component: expect.any(Function),
      priority: 10,
    })
    expect(ctx.fileExplorer.registerPreview).not.toHaveBeenCalled()
  })

  test('falls back to registerPreview per extension when registerViewer is absent', () => {
    const { ctx } = makeCtx(makeFileExplorer({ registerViewer: undefined }))
    apply(ctx as never)

    expect(ctx.fileExplorer.registerPreview).toHaveBeenCalledTimes(SEQUENCE_EXTS.length)
    for (const ext of SEQUENCE_EXTS) {
      expect(ctx.fileExplorer.registerPreview).toHaveBeenCalledWith(ext, expect.any(Function), 10)
    }
  })

  test('registers zh/en locale dictionaries for the plugin namespace', () => {
    const { ctx } = makeCtx()
    apply(ctx as never)

    expect(ctx.locale.register).toHaveBeenCalledWith('file-explorer-preview-sequence', 'zh', expect.any(Object))
    expect(ctx.locale.register).toHaveBeenCalledWith('file-explorer-preview-sequence', 'en', expect.any(Object))
  })

  test('cleanup disposes the viewer registration, the locale, and the style tag', () => {
    const viewerDispose = vi.fn()
    const { ctx, cleanup } = makeCtx(makeFileExplorer({ registerViewer: vi.fn(() => viewerDispose) }))
    apply(ctx as never)

    expect(document.querySelector('style[data-sequence-preview-style]')).not.toBeNull()

    cleanup()
    expect(viewerDispose).toHaveBeenCalledTimes(1)
    expect(document.querySelector('style[data-sequence-preview-style]')).toBeNull()
  })

  test('cleanup disposes every preview registration in the registerPreview fallback', () => {
    const disposers: (() => void)[] = []
    const { ctx, cleanup } = makeCtx(makeFileExplorer({
      registerViewer: undefined,
      registerPreview: vi.fn(() => { const d = vi.fn(); disposers.push(d); return d }),
    }))
    apply(ctx as never)

    expect(disposers).toHaveLength(SEQUENCE_EXTS.length)
    expect(document.querySelector('style[data-sequence-preview-style]')).not.toBeNull()

    cleanup()
    for (const dispose of disposers) expect(dispose).toHaveBeenCalledTimes(1)
    expect(document.querySelector('style[data-sequence-preview-style]')).toBeNull()
  })

  test('degrades gracefully when readRawFile is absent from the service', () => {
    const { ctx } = makeCtx(makeFileExplorer({ readRawFile: undefined }))
    expect(() => apply(ctx as never)).not.toThrow()
    expect(ctx.fileExplorer.registerViewer).toHaveBeenCalledTimes(1)
  })
})