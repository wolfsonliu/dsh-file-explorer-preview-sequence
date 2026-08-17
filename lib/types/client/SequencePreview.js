import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { SeqViz } from 'seqviz';
import { extensionOf, fallsBackToText, formatLabelFor } from "./formats.js";
import { parseSequence, parseSequenceFromBuffer, toSeqvizAnnotations } from "./parse.js";
const TOPOLOGIES = [
    { id: 'both', labelKey: 'both' },
    { id: 'circular', labelKey: 'circular' },
    { id: 'linear', labelKey: 'linear' },
    { id: 'both_flip', labelKey: 'bothFlip' },
];
const ENZYME_CHOICES = ['PstI', 'EcoRI', 'XbaI', 'SpeI', 'NotI', 'HindIII', 'BamHI', 'XhoI'];
export function makeSequencePreview(readRaw, t) {
    return function SequencePreview({ preview, filePath, onViewSource }) {
        const [state, setState] = useState({ phase: 'loading' });
        const [viewer, setViewer] = useState('both');
        const [zoom, setZoom] = useState(50);
        const [showComplement, setShowComplement] = useState(true);
        const [showIndex, setShowIndex] = useState(true);
        const [enzymes, setEnzymes] = useState([...ENZYME_CHOICES]);
        const [query, setQuery] = useState('');
        const [selection, setSelection] = useState('');
        const ext = extensionOf(filePath);
        const formatLabel = formatLabelFor(ext);
        const previewable = preview.kind === 'text' || preview.kind === 'binary' || preview.kind === 'too-large';
        useEffect(() => {
            if (!previewable)
                return;
            let cancelled = false;
            setState({ phase: 'loading' });
            void (async () => {
                try {
                    if (preview.kind === 'text') {
                        const seq = await parseSequence(preview.content, preview.name);
                        if (!cancelled)
                            setState({ phase: 'ready', seq });
                    }
                    else {
                        // binary / too-large: call readRaw to get the raw bytes, then
                        // parse with seqparse. Degrades to unsupported if readRaw is
                        // absent (older dsh-file-explorer core).
                        if (readRaw === undefined) {
                            if (!cancelled)
                                setState({ phase: 'unsupported' });
                            return;
                        }
                        const buffer = await readRaw(filePath);
                        const seq = await parseSequenceFromBuffer(buffer, preview.name);
                        if (!cancelled)
                            setState({ phase: 'ready', seq });
                    }
                }
                catch (error) {
                    if (cancelled)
                        return;
                    if (preview.kind === 'text' && fallsBackToText(ext)) {
                        setState({ phase: 'plain', content: preview.content });
                    }
                    else {
                        setState({ phase: 'error', message: error instanceof Error ? error.message : String(error) });
                    }
                }
            })();
            return () => { cancelled = true; };
        }, [preview, filePath, ext, previewable, readRaw, t]);
        if (!previewable)
            return null;
        const toggleEnzyme = (enzyme) => {
            setEnzymes(prev => (prev.includes(enzyme) ? prev.filter(e => e !== enzyme) : [...prev, enzyme]));
        };
        return (_jsxs("div", { className: "dsh-sq", children: [state.phase === 'ready' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "dsh-sq-toolbar", children: [_jsx("select", { className: "dsh-sq-select", value: viewer, onChange: e => setViewer(e.target.value), title: t('topology'), children: TOPOLOGIES.map(opt => (_jsx("option", { value: opt.id, children: t(opt.labelKey) }, opt.id))) }), _jsxs("label", { className: "dsh-sq-field", children: [_jsx("span", { children: t('search') }), _jsx("input", { className: "dsh-sq-input", value: query, onChange: e => setQuery(e.target.value), placeholder: t('searchPlaceholder') })] }), _jsxs("label", { className: "dsh-sq-field", children: [_jsx("span", { children: t('zoom') }), _jsx("input", { className: "dsh-sq-range", type: "range", min: 1, max: 100, value: zoom, onChange: e => setZoom(Number(e.target.value)) })] }), _jsxs("label", { className: "dsh-sq-check", children: [_jsx("input", { type: "checkbox", checked: showComplement, onChange: e => setShowComplement(e.target.checked) }), _jsx("span", { children: t('complement') })] }), _jsxs("label", { className: "dsh-sq-check", children: [_jsx("input", { type: "checkbox", checked: showIndex, onChange: e => setShowIndex(e.target.checked) }), _jsx("span", { children: t('index') })] })] }), _jsx("div", { className: "dsh-sq-enzymes", children: ENZYME_CHOICES.map(enzyme => (_jsx("button", { type: "button", className: `dsh-sq-chip${enzymes.includes(enzyme) ? ' is-active' : ''}`, onClick: () => toggleEnzyme(enzyme), children: enzyme }, enzyme))) }), _jsx("div", { className: "dsh-sq-viewport", children: _jsx(SeqViz, { name: state.seq.name, seq: state.seq.seq, seqType: state.seq.type === 'unknown' ? undefined : state.seq.type, annotations: toSeqvizAnnotations(state.seq.annotations), viewer: viewer, zoom: { linear: zoom }, showComplement: showComplement, showIndex: showIndex, enzymes: enzymes, search: query ? { query } : undefined, onSelection: sel => setSelection(sel.start !== undefined && sel.end !== undefined ? `${sel.start}–${sel.end}` : ''), disableExternalFonts: true }) })] })), state.phase === 'loading' && (_jsxs("div", { className: "dsh-sq-overlay", children: [_jsx("div", { className: "dsh-sq-spinner" }), t('loading')] })), state.phase === 'plain' && _jsx("pre", { className: "dsh-sq-plain", children: state.content }), state.phase === 'error' && (_jsxs("div", { className: "dsh-sq-overlay is-error", children: [_jsxs("div", { children: [t('loadError'), ": ", state.message] }), onViewSource && (_jsx("button", { type: "button", className: "dsh-sq-btn", onClick: onViewSource, children: t('viewSource') }))] })), state.phase === 'unsupported' && (_jsx("div", { className: "dsh-sq-overlay is-error", children: _jsx("div", { children: t('unsupportedYet') }) })), _jsxs("div", { className: "dsh-sq-status", children: [formatLabel && _jsx("span", { className: "dsh-sq-format", children: formatLabel }), state.phase === 'ready' && (_jsxs("span", { children: [state.seq.name, " \u00B7 ", state.seq.type, " \u00B7 ", state.seq.seq.length, " ", state.seq.type === 'aa' ? t('aa') : t('bp'), selection && _jsxs(_Fragment, { children: [" \u00B7 ", t('selection'), ": ", selection] })] })), state.phase === 'loading' && _jsx("span", { children: t('loading') })] })] }));
    };
}
