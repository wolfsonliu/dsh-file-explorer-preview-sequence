import type { FileExplorerService, Translate } from '@dsh-external/dsh-file-explorer/client'
import { SEQUENCE_EXTS } from '../protocol.ts'
import { makeSequencePreview } from './SequencePreview.tsx'
import { registerSequenceLocale, SEQ_NS } from './locale.ts'
import { VIEWER_CSS } from './styles.ts'

/**
 * `readRawFile` is provided by dsh-file-explorer v0.1.0+. When absent (older
 * core), the plugin degrades: binary/too-large/text-large files show an
 * unsupported message.
 */
type SequenceFileExplorer = FileExplorerService & {
  readRawFile?: (path: string, offset?: number, limit?: number) => Promise<ArrayBuffer>
}

interface ClientContext {
  fileExplorer: SequenceFileExplorer
  locale: {
    register(ns: string, locale: string, dict: Record<string, string>): () => void
    bind(ns: string): Translate
  }
  effect(callback: () => (() => void), label?: string): void
}

export const inject = ['fileExplorer', 'locale']

export function apply(ctx: ClientContext): void {
  // Inject viewer styles (an external plugin cannot import a CSS module).
  const styleEl = document.createElement('style')
  styleEl.setAttribute('data-sequence-preview-style', '')
  styleEl.textContent = VIEWER_CSS
  document.head.appendChild(styleEl)

  ctx.effect(() => {
    const disposeLocale = registerSequenceLocale(ctx)
    const t = ctx.locale.bind(SEQ_NS)
    const readRaw = typeof ctx.fileExplorer.readRawFile === 'function'
      ? ctx.fileExplorer.readRawFile
      : undefined

    // One shared viewer component for every sequence extension at priority 10,
    // overriding dsh-file-explorer's built-in previews (priority 0).
    const component = makeSequencePreview(readRaw, t)
    const disposers = SEQUENCE_EXTS.map(ext =>
      ctx.fileExplorer.registerPreview(ext, component, 10),
    )

    return () => {
      for (const dispose of disposers) dispose()
      disposeLocale()
      styleEl.remove()
    }
  }, 'file-explorer-preview-sequence: client')
}
