import type { Translate } from '@dsh-external/dsh-file-explorer/client';
/** Locale namespace owning the viewer toolbar/status copy. */
export declare const SEQ_NS = "file-explorer-preview-sequence";
export declare const ZH: {
    readonly loading: "解析中…";
    readonly loadError: "解析失败";
    readonly unsupportedYet: "暂不支持预览此文件（二进制或文件过大）";
    readonly viewSource: "查看源文件";
    readonly topology: "拓扑";
    readonly both: "环状 + 线性";
    readonly circular: "环状";
    readonly linear: "线性";
    readonly bothFlip: "线性 + 环状";
    readonly search: "搜索";
    readonly searchPlaceholder: "搜索序列…";
    readonly zoom: "缩放";
    readonly complement: "互补链";
    readonly index: "刻度";
    readonly enzymes: "酶切位点";
    readonly bp: "bp";
    readonly aa: "aa";
    readonly selection: "选中";
};
export declare const EN: {
    readonly loading: "Loading…";
    readonly loadError: "Failed to load";
    readonly unsupportedYet: "Cannot preview this file yet (binary or too large)";
    readonly viewSource: "View source";
    readonly topology: "Topology";
    readonly both: "Circular + Linear";
    readonly circular: "Circular";
    readonly linear: "Linear";
    readonly bothFlip: "Linear + Circular";
    readonly search: "Search";
    readonly searchPlaceholder: "Search sequence…";
    readonly zoom: "Zoom";
    readonly complement: "Complement";
    readonly index: "Index";
    readonly enzymes: "Enzymes";
    readonly bp: "bp";
    readonly aa: "aa";
    readonly selection: "Selection";
};
interface LocaleContext {
    locale: {
        register(ns: string, locale: string, dict: Record<string, string>): () => void;
        bind(ns: string): Translate;
    };
}
/** Register the plugin's zh/en dictionaries; returns a disposer for both. */
export declare function registerSequenceLocale(ctx: LocaleContext): () => void;
export {};
