import type { FileExplorerService, Translate } from '@dsh-external/dsh-file-explorer/client';
/**
 * `readRawFile` is provided by dsh-file-explorer v0.1.0+. When absent (older
 * core), the plugin degrades: binary/too-large/text-large files show an
 * unsupported message.
 */
type SequenceFileExplorer = FileExplorerService & {
    readRawFile?: (path: string, offset?: number, limit?: number) => Promise<ArrayBuffer>;
};
interface ClientContext {
    fileExplorer: SequenceFileExplorer;
    locale: {
        register(ns: string, locale: string, dict: Record<string, string>): () => void;
        bind(ns: string): Translate;
    };
    effect(callback: () => (() => void), label?: string): void;
}
export declare const inject: string[];
export declare function apply(ctx: ClientContext): void;
export {};
