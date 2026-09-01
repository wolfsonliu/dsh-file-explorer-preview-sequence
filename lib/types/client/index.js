import { SEQUENCE_EXTS, SEQUENCE_VIEWER_ID, SEQUENCE_VIEWER_LABEL } from "../protocol.js";
import { makeSequencePreview } from "./SequencePreview.js";
import { registerSequenceLocale, SEQ_NS } from "./locale.js";
import { VIEWER_CSS } from "./styles.js";
export const inject = ['fileExplorer', 'locale'];
/**
 * Register the shared viewer component.
 *
 * `registerViewer` (dsh-file-explorer v0.9.0+) registers one named identity
 * across every sequence extension — a single "Open with…" entry and a single
 * disposer. Older cores lack it, so degrade to the anonymous per-extension
 * `registerPreview` loop (same probe-and-degrade discipline as `readRawFile`).
 */
function registerSequenceViewer(fileExplorer, component) {
    if (typeof fileExplorer.registerViewer === 'function') {
        return fileExplorer.registerViewer({
            id: SEQUENCE_VIEWER_ID,
            label: SEQUENCE_VIEWER_LABEL,
            exts: SEQUENCE_EXTS,
            component,
            priority: 10,
        });
    }
    const disposers = SEQUENCE_EXTS.map(ext => fileExplorer.registerPreview(ext, component, 10));
    return () => { for (const dispose of disposers)
        dispose(); };
}
export function apply(ctx) {
    // Inject viewer styles (an external plugin cannot import a CSS module).
    const styleEl = document.createElement('style');
    styleEl.setAttribute('data-sequence-preview-style', '');
    styleEl.textContent = VIEWER_CSS;
    document.head.appendChild(styleEl);
    ctx.effect(() => {
        const disposeLocale = registerSequenceLocale(ctx);
        const t = ctx.locale.bind(SEQ_NS);
        const readRaw = typeof ctx.fileExplorer.readRawFile === 'function'
            ? ctx.fileExplorer.readRawFile
            : undefined;
        // One shared viewer component for every sequence extension at priority 10,
        // overriding dsh-file-explorer's built-in previews (priority 0).
        const component = makeSequencePreview(readRaw, t);
        const disposeViewer = registerSequenceViewer(ctx.fileExplorer, component);
        return () => {
            disposeViewer();
            disposeLocale();
            styleEl.remove();
        };
    }, 'file-explorer-preview-sequence: client');
}
