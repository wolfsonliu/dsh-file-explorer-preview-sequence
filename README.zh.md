# dsh-file-explorer-preview-sequence

[English](README.md) | 中文

为 [dsh-file-explorer](https://github.com/wolfsonliu/dsh-file-explorer) 增加 **SeqViz 序列查看器** 的 [DSH Web](https://deepseek.com) 插件，覆盖其对 **FASTA / GenBank / JBEI / SnapGene / SBOL** 文件的纯文本预览。

在文件浏览器里选中 `.gb` / `.fasta`（或下列任意支持格式），预览面板即渲染交互式序列查看器，而非原始文本。

## 截图

| 深色主题 | 浅色主题 |
| --- | --- |
| ![深色主题下的序列预览](assets/dsh-file-explorer-preview-sequence_dark.png) | ![浅色主题下的序列预览](assets/dsh-file-explorer-preview-sequence_light.png) |

## 特性

- **交互式查看器**：基于 [`seqviz`](https://github.com/Lattice-Automation/seqviz)（`<SeqViz>`），由 [`seqparse`](https://github.com/Lattice-Automation/seqparse) 解析。
- **拓扑**：环状 / 线性 / 并排 / 反向并排。
- **feature 注释着色**、**搜索高亮**、**酶切位点**、互补链与刻度开关、线性缩放。
- **状态栏**：格式徽标 + 名称 + 类型 + 长度。
- **可选查看器**：注册为具名 **SeqViz** 查看器（dsh-file-explorer v0.9.0+），出现在文件行的"打开方式…"菜单与预览面板切换器中 —— 可在歧义扩展名 `.xml`/`.seq` 上显式选择，或回退为纯文本。
- **文案双语**（中文 / English）。
- **深浅主题自适应**：跟随 DSH 的 `data-ds-dark-theme`。

## 支持的格式

| 扩展名 | 格式 |
|--------|------|
| `fasta` `fa` `fas` `fna` `faa` `ffn` | FASTA |
| `gb` `gbk` `genbank` `gp` | GenBank / GenPept |
| `dna` | SnapGene |
| `seq` | JBEI SEQ |
| `sbol` `xml` | SBOL v1/v2 |

## 安装

### 从 Git 仓库安装

```sh
dsh plugin --profile web add github:wolfsonliu/dsh-file-explorer-preview-sequence
dsh web
```

### 从源码安装

```sh
git clone https://github.com/wolfsonliu/dsh-file-explorer-preview-sequence
cd dsh-file-explorer-preview-sequence
npm install
npm run build
dsh plugin --profile web add .
dsh web
```

## 依赖

本插件**依赖** [`@dsh-external/dsh-file-explorer`](https://github.com/wolfsonliu/dsh-file-explorer)（v0.1.0+）—— 它注入 `fileExplorer` cordis 服务（`registerViewer` / `registerPreview` / `writeFile` / `readRawFile`）。请先安装并启用 `dsh-file-explorer`：

```sh
# 从 git 安装核心
dsh plugin --profile web add github:wolfsonliu/dsh-file-explorer

# 或，从源码安装
git clone https://github.com/wolfsonliu/dsh-file-explorer
cd dsh-file-explorer
npm install && npm run build
dsh plugin --profile web add .
```

> 本地开发时，本仓库的 `devDependencies` 用于让 tsc 解析 `@dsh-external/dsh-file-explorer` 的 `./client` 类型定义；`npm install` 前请将其指向你自己的 checkout（或 registry 上发布的包）。

≤ 2 MiB 的文件插件直接解析 `text` 预览内容。SnapGene `.dna`（二进制）与 > 2 MiB 的大文件通过 `readRawFile`（dsh-file-explorer v0.1.0+ 已提供）处理。当 `readRawFile` 不可用时（旧版核心），插件自动降级：≤ 2 MiB 的文本格式仍可预览，`.dna` 与大文件显示暂不支持提示。

在 dsh-file-explorer v0.9.0+ 上，插件还会通过 `registerViewer` 注册为单个具名 **SeqViz** 条目，出现在"打开方式…"中；旧版核心则回退为逐扩展名的 `registerPreview` 注册。

## 限制

- 只读预览（不支持编辑）。
- SnapGene `.dna` 与 > 2 MiB 文件需 dsh-file-explorer v0.1.0+（旧版自动降级）。
- `.xml` 与 `.seq` 为歧义扩展名；非 SBOL / JBEI 的同扩展名文件会回退为纯文本显示。

## 开发

```sh
npm run check   # tsc 类型检查
npm test        # vitest 单元测试
npm run build   # tsc + tsdown（单文件 lib/client.js，内联 seqviz + seqparse）
```

真实的 SeqViz canvas 无法在 jsdom 下运行；请用 `dsh web` 配合 `examples/` 里的序列文件做冒烟验证。

> `npm run build` 后请硬刷新浏览器（`Ctrl/Cmd+Shift+R`）：`dsh web` 可能仍缓存旧的插件 bundle，软刷新用不到最新构建。

## 许可

[MIT](LICENSE)