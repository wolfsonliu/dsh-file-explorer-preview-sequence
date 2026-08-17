import { useEffect, useState, type ComponentType } from 'react'
import { SeqViz, type SeqVizProps } from 'seqviz'
import type { PreviewProps, Translate } from '@dsh-external/dsh-file-explorer/client'
import type { Seq } from 'seqparse'
import { extensionOf, fallsBackToText, formatLabelFor } from './formats.ts'
import { parseSequence, parseSequenceFromBuffer, toSeqvizAnnotations } from './parse.ts'

type ReadRaw = (path: string, offset?: number, limit?: number) => Promise<ArrayBuffer>

type Viewer = NonNullable<SeqVizProps['viewer']>

type LoadState =
  | { phase: 'loading' }
  | { phase: 'ready'; seq: Seq }
  | { phase: 'plain'; content: string }
  | { phase: 'error'; message: string }
  | { phase: 'unsupported' }

const TOPOLOGIES: ReadonlyArray<{ id: Viewer; labelKey: 'both' | 'circular' | 'linear' | 'bothFlip' }> = [
  { id: 'both', labelKey: 'both' },
  { id: 'circular', labelKey: 'circular' },
  { id: 'linear', labelKey: 'linear' },
  { id: 'both_flip', labelKey: 'bothFlip' },
]

const ENZYME_CHOICES = ['PstI', 'EcoRI', 'XbaI', 'SpeI', 'NotI', 'HindIII', 'BamHI', 'XhoI'] as const

export function makeSequencePreview(readRaw: ReadRaw | undefined, t: Translate): ComponentType<PreviewProps> {
  return function SequencePreview({ preview, filePath, onViewSource }: PreviewProps) {
    const [state, setState] = useState<LoadState>({ phase: 'loading' })
    const [viewer, setViewer] = useState<Viewer>('both')
    const [zoom, setZoom] = useState(50)
    const [showComplement, setShowComplement] = useState(true)
    const [showIndex, setShowIndex] = useState(true)
    const [enzymes, setEnzymes] = useState<string[]>([...ENZYME_CHOICES])
    const [query, setQuery] = useState('')
    const [selection, setSelection] = useState('')

    const ext = extensionOf(filePath)
    const formatLabel = formatLabelFor(ext)
    const previewable = preview.kind === 'text' || preview.kind === 'binary' || preview.kind === 'too-large'

    useEffect(() => {
      if (!previewable) return
      let cancelled = false
      setState({ phase: 'loading' })

      void (async () => {
        try {
          if (preview.kind === 'text') {
            const seq = await parseSequence(preview.content, preview.name)
            if (!cancelled) setState({ phase: 'ready', seq })
          } else {
            // binary / too-large: call readRaw to get the raw bytes, then
            // parse with seqparse. Degrades to unsupported if readRaw is
            // absent (older dsh-file-explorer core).
            if (readRaw === undefined) {
              if (!cancelled) setState({ phase: 'unsupported' })
              return
            }
            const buffer = await readRaw(filePath)
            const seq = await parseSequenceFromBuffer(buffer, preview.name)
            if (!cancelled) setState({ phase: 'ready', seq })
          }
        } catch (error) {
          if (cancelled) return
          if (preview.kind === 'text' && fallsBackToText(ext)) {
            setState({ phase: 'plain', content: preview.content })
          } else {
            setState({ phase: 'error', message: error instanceof Error ? error.message : String(error) })
          }
        }
      })()

      return () => { cancelled = true }
    }, [preview, filePath, ext, previewable, readRaw, t])

    if (!previewable) return null

    const toggleEnzyme = (enzyme: string): void => {
      setEnzymes(prev => (prev.includes(enzyme) ? prev.filter(e => e !== enzyme) : [...prev, enzyme]))
    }

    return (
      <div className="dsh-sq">
        {state.phase === 'ready' && (
          <>
            <div className="dsh-sq-toolbar">
              <select
                className="dsh-sq-select"
                value={viewer}
                onChange={e => setViewer(e.target.value as Viewer)}
                title={t('topology')}
              >
                {TOPOLOGIES.map(opt => (
                  <option key={opt.id} value={opt.id}>{t(opt.labelKey)}</option>
                ))}
              </select>

              <label className="dsh-sq-field">
                <span>{t('search')}</span>
                <input
                  className="dsh-sq-input"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                />
              </label>

              <label className="dsh-sq-field">
                <span>{t('zoom')}</span>
                <input
                  className="dsh-sq-range"
                  type="range"
                  min={1}
                  max={100}
                  value={zoom}
                  onChange={e => setZoom(Number(e.target.value))}
                />
              </label>

              <label className="dsh-sq-check">
                <input type="checkbox" checked={showComplement} onChange={e => setShowComplement(e.target.checked)} />
                <span>{t('complement')}</span>
              </label>

              <label className="dsh-sq-check">
                <input type="checkbox" checked={showIndex} onChange={e => setShowIndex(e.target.checked)} />
                <span>{t('index')}</span>
              </label>
            </div>

            <div className="dsh-sq-enzymes">
              {ENZYME_CHOICES.map(enzyme => (
                <button
                  key={enzyme}
                  type="button"
                  className={`dsh-sq-chip${enzymes.includes(enzyme) ? ' is-active' : ''}`}
                  onClick={() => toggleEnzyme(enzyme)}
                >
                  {enzyme}
                </button>
              ))}
            </div>

            <div className="dsh-sq-viewport">
              <SeqViz
                name={state.seq.name}
                seq={state.seq.seq}
                seqType={state.seq.type === 'unknown' ? undefined : state.seq.type}
                annotations={toSeqvizAnnotations(state.seq.annotations)}
                viewer={viewer}
                zoom={{ linear: zoom }}
                showComplement={showComplement}
                showIndex={showIndex}
                enzymes={enzymes}
                search={query ? { query } : undefined}
                onSelection={sel => setSelection(
                  sel.start !== undefined && sel.end !== undefined ? `${sel.start}–${sel.end}` : '',
                )}
                disableExternalFonts
              />
            </div>
          </>
        )}

        {state.phase === 'loading' && (
          <div className="dsh-sq-overlay">
            <div className="dsh-sq-spinner" />
            {t('loading')}
          </div>
        )}

        {state.phase === 'plain' && <pre className="dsh-sq-plain">{state.content}</pre>}

        {state.phase === 'error' && (
          <div className="dsh-sq-overlay is-error">
            <div>{t('loadError')}: {state.message}</div>
            {onViewSource && (
              <button type="button" className="dsh-sq-btn" onClick={onViewSource}>{t('viewSource')}</button>
            )}
          </div>
        )}

        {state.phase === 'unsupported' && (
          <div className="dsh-sq-overlay is-error">
            <div>{t('unsupportedYet')}</div>
          </div>
        )}

        <div className="dsh-sq-status">
          {formatLabel && <span className="dsh-sq-format">{formatLabel}</span>}
          {state.phase === 'ready' && (
            <span>
              {state.seq.name} · {state.seq.type} · {state.seq.seq.length} {state.seq.type === 'aa' ? t('aa') : t('bp')}
              {selection && <> · {t('selection')}: {selection}</>}
            </span>
          )}
          {state.phase === 'loading' && <span>{t('loading')}</span>}
        </div>
      </div>
    )
  }
}
