/** Locale namespace owning the viewer toolbar/status copy. */
export const SEQ_NS = 'file-explorer-preview-sequence';
export const ZH = {
    loading: '解析中…',
    loadError: '解析失败',
    unsupportedYet: '暂不支持预览此文件（二进制或文件过大）',
    viewSource: '查看源文件',
    topology: '拓扑',
    both: '环状 + 线性',
    circular: '环状',
    linear: '线性',
    bothFlip: '线性 + 环状',
    search: '搜索',
    searchPlaceholder: '搜索序列…',
    zoom: '缩放',
    complement: '互补链',
    index: '刻度',
    enzymes: '酶切位点',
    bp: 'bp',
    aa: 'aa',
    selection: '选中',
};
export const EN = {
    loading: 'Loading…',
    loadError: 'Failed to load',
    unsupportedYet: 'Cannot preview this file yet (binary or too large)',
    viewSource: 'View source',
    topology: 'Topology',
    both: 'Circular + Linear',
    circular: 'Circular',
    linear: 'Linear',
    bothFlip: 'Linear + Circular',
    search: 'Search',
    searchPlaceholder: 'Search sequence…',
    zoom: 'Zoom',
    complement: 'Complement',
    index: 'Index',
    enzymes: 'Enzymes',
    bp: 'bp',
    aa: 'aa',
    selection: 'Selection',
};
/** Register the plugin's zh/en dictionaries; returns a disposer for both. */
export function registerSequenceLocale(ctx) {
    const d1 = ctx.locale.register(SEQ_NS, 'zh', ZH);
    const d2 = ctx.locale.register(SEQ_NS, 'en', EN);
    return () => { d1(); d2(); };
}
