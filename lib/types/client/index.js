import { SEQUENCE_EXTS } from "../protocol.js";
import { makeSequencePreview } from "./SequencePreview.js";
import { registerSequenceLocale, SEQ_NS } from "./locale.js";
import { VIEWER_CSS } from "./styles.js";
export const inject = ['fileExplorer', 'locale'];
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
        const disposers = SEQUENCE_EXTS.map(ext => ctx.fileExplorer.registerPreview(ext, component, 10));
        return () => {
            for (const dispose of disposers)
                dispose();
            disposeLocale();
            styleEl.remove();
        };
    }, 'file-explorer-preview-sequence: client');
}
