import { SEQUENCE_FORMATS } from "../protocol.js";
/** Extract the lowercase extension (no leading dot) from a workspace-relative
 *  path; '' when absent. Mirrors dsh-file-explorer's `extensionOf`. */
export function extensionOf(filePath) {
    const lastDot = filePath.lastIndexOf('.');
    if (lastDot === -1 || lastDot === filePath.length - 1)
        return '';
    return filePath.slice(lastDot + 1).toLowerCase();
}
/** Human-readable format label for an extension, or null when unknown. */
export function formatLabelFor(ext) {
    const key = ext.toLowerCase();
    if (!(key in SEQUENCE_FORMATS))
        return null;
    return SEQUENCE_FORMATS[key];
}
/** Ambiguous extensions: when parsing fails, render plain text instead of an
 *  error (so generic `.xml` / non-JBEI `.seq` files still preview). */
export function fallsBackToText(ext) {
    const key = ext.toLowerCase();
    return key === 'xml' || key === 'seq';
}
