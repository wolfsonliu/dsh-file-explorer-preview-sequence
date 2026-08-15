# dsh-file-explorer-preview-sequence

English | [中文](README.zh.md)

为 [dsh-file-explorer](https://github.com/wolfsonliu/dsh-file-explorer) 增加 **SeqViz** 序列查看器的 DSH Web 预览插件，覆盖其对 **FASTA / GenBank / JBEI / SnapGene / SBOL** 文件的纯文本预览。

## 特性

- 线型 / 环状 / 并排拓扑、feature 注释着色。
- 搜索高亮、常见酶切位点、互补链与刻度开关、线型缩放、选中区间回显。
- 跟随 DSH 深浅主题，文案双语（中文 / English）。

## 支持的格式

| 扩展名 | 格式 |
|---|---|
| `fasta fa fas fna faa ffn` | FASTA |
| `gb gbk genbank gp` | GenBank / GenPept |
| `dna` | SnapGene（二进制，核心 `readRawFile` 落地前自动降级） |
| `seq` | JBEI SEQ |
| `sbol xml` | SBOL v1/v2 |

## 依赖

依赖 [`@dsh-external/dsh-file-explorer`](https://github.com/wolfsonliu/dsh-file-explorer)。SnapGene `.dna` 与 > 2 MiB 文件需要核心 `readRawFile` 改动，落地前自动降级。

## 开发

```sh
npm install --cache ./.npm-cache
npm run check   # tsc 类型检查
npm test        # vitest
npm run build   # tsc + tsdown → lib/client.js
```

## 许可

[MIT](LICENSE)
