/** Extract the lowercase extension (no leading dot) from a workspace-relative
 *  path; '' when absent. Mirrors dsh-file-explorer's `extensionOf`. */
export declare function extensionOf(filePath: string): string;
/** Human-readable format label for an extension, or null when unknown. */
export declare function formatLabelFor(ext: string): string | null;
/** Ambiguous extensions: when parsing fails, render plain text instead of an
 *  error (so generic `.xml` / non-JBEI `.seq` files still preview). */
export declare function fallsBackToText(ext: string): boolean;
