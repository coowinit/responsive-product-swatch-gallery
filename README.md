# Responsive Product Color Swatch Gallery

一个基于 **Bootstrap 5 + Swiper** 的产品色卡图片轮播组件。左侧为场景大图轮播，支持缩略图导航和点击放大；右侧为色卡列表，点击色卡后会切换左侧对应的一组场景图片。

当前版本已新增 **顶部多选过滤按钮（Filter By）**：过滤按钮统一放在组件最上方，用户可以通过 `All / SunComfortable / Fire-Rated / Popular / Browns / Greys / Neutrals / Reds` 等标签快速筛选右侧色卡。适合产品详情页、地板/墙板/户外地板/色卡展示等场景。

## 功能特点

- 左侧大图 Swiper 轮播
- 底部缩略图与主图联动
- 右侧色卡点击切换对应场景图片组
- 默认选中第一张色卡
- 当前色卡绿色边框高亮
- 色卡 hover 时显示半透明遮罩和白色色卡名称
- 大图点击后在当前图片窗口内放大查看
- 鼠标移动时自动调整放大位置
- 手机端自适应布局，色卡保持 3 列显示
- 顶部新增 `Filter By` 色卡过滤按钮区域
- 支持 `All` 一键恢复显示全部色卡
- 支持多个过滤条件同时选中
- 支持按功能标签筛选，例如 `SunComfortable`、`Fire-Rated`、`Popular`
- 支持按颜色系筛选，例如 `Browns`、`Greys`、`Neutrals`、`Reds`
- 过滤后右侧色卡自动刷新
- 如果当前选中的色卡被过滤隐藏，会自动切换到过滤结果中的第一个色卡
- 没有匹配结果时显示 `No matching colors.`
- Bootstrap、Swiper、CSS、JS、图片均为本地文件，方便上传到 GitHub Pages 或集成到现有网站

## 当前效果结构

```text
顶部 Filter By 多选过滤按钮

左侧主图轮播区域        右侧色卡列表区域
底部缩略图导航          点击色卡切换左侧图片组
```

过滤按钮已经从右侧色卡区域移动到整个组件的最上方，视觉结构更清晰，也更适合后期放到产品详情页的主图库模块中。

## 项目结构

```text
.
├── index.html
├── css/
│   ├── bootstrap.min.css
│   ├── swiper-bundle.min.css
│   └── style.css
├── js/
│   ├── gallery.js
│   └── swiper-bundle.min.js
└── images/
    ├── scenes/
    │   ├── ash-wood-1.svg
    │   ├── ash-wood-2.svg
    │   └── ...
    └── swatches/
        ├── ash-wood.svg
        ├── blue-black.svg
        └── ...
```

## 快速预览

直接用浏览器打开：

```text
index.html
```

不需要安装 Node.js，也不需要构建工具。

## 如何修改色卡和图片

主要数据在：

```text
js/gallery.js
```

在 `deckGalleryData` 中添加、删除或修改色卡：

```js
{
  id: 'teak',
  name: 'Teak',
  swatch: 'images/swatches/teak.svg',
  images: [
    'images/scenes/teak-1.svg',
    'images/scenes/teak-2.svg',
    'images/scenes/teak-3.svg',
    'images/scenes/teak-4.svg'
  ],
  tags: ['Browns', 'Popular']
}
```

字段说明：

- `id`：色卡唯一标识，不要重复。
- `name`：色卡名称，会用于 hover 遮罩文字和图片 alt 文本。
- `swatch`：右侧色卡图片路径。
- `images`：左侧对应的场景大图列表，同时会生成底部缩略图。
- `tags`：该色卡所属的过滤分类，可用于顶部过滤按钮筛选。

## 如何修改过滤按钮

过滤按钮相关内容主要在：

```text
js/gallery.js
```

每个色卡通过 `tags` 字段绑定分类。例如：

```js
tags: ['Browns', 'Popular']
```

这样该色卡会同时出现在 `Browns` 和 `Popular` 的筛选结果中。

当前过滤按钮包括：

```text
All
SunComfortable
Fire-Rated
Popular
Browns
Greys
Neutrals
Reds
```

### 过滤逻辑

当前默认逻辑是：**选中多个过滤项时，只要色卡命中任意一个标签，就会显示。**

也就是：

```text
Browns + Popular = 显示 Browns 或 Popular 中的色卡
```

如果后期想改成“必须同时满足所有选中的标签才显示”，可以在 `js/gallery.js` 中找到：

```js
var FILTER_MATCH_MODE = 'any';
```

改成：

```js
var FILTER_MATCH_MODE = 'all';
```

修改后逻辑会变成：

```text
Browns + Popular = 只显示同时属于 Browns 且 Popular 的色卡
```

## 如何调整过滤按钮位置

过滤按钮现在位于整个组件最上方，结构大致为：

```html
<div class="deck-filter-top">
  ...
</div>

<div class="row">
  <div class="col-lg-6">
    左侧主图轮播
  </div>

  <div class="col-lg-6">
    右侧色卡列表
  </div>
</div>
```

相关样式主要在：

```text
css/style.css
```

重点关注：

```css
.deck-filter-top {
  ...
}
```

如果后期希望恢复为右侧布局，可以把过滤区域移动回右侧色卡列表上方。

## 如何替换成真实图片

把真实图片放到对应文件夹：

```text
images/swatches/   色卡图片
images/scenes/     场景大图
```

然后修改 `js/gallery.js` 里的路径即可。

建议尺寸：

- 场景大图：`800 x 600` 或同等 4:3 比例
- 色卡图：`400 x 300` 或同等 4:3 比例

如果使用其他比例，也可以在 `css/style.css` 中调整：

```css
.deck-main-swiper {
  aspect-ratio: 4 / 3;
}

.deck-swatch img {
  aspect-ratio: 4 / 3;
}
```

## 样式自定义

主要样式在：

```text
css/style.css
```

常用修改位置：

```css
/* 色卡选中绿色边框 */
.deck-swatch.is-active::after {
  border: 4px solid #08a66a;
}

/* 色卡 hover 半透明背景 */
.deck-swatch-title {
  background: rgba(0, 0, 0, 0.45);
}

/* 左侧大图比例 */
.deck-main-swiper {
  aspect-ratio: 4 / 3;
}

/* 手机端色卡列数 */
@media (max-width: 575px) {
  .deck-swatches {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

## 本次更新记录

### v1.1.0 - 顶部多选过滤按钮

本次更新重点是为色卡点击切换效果增加更清晰的过滤功能。

更新内容：

- 新增顶部 `Filter By` 过滤按钮区域。
- 过滤按钮从右侧移动到整个组件最上方。
- 新增 `All` 按钮，用于一键重置过滤条件。
- 新增功能类筛选：`SunComfortable`、`Fire-Rated`、`Popular`。
- 新增颜色系筛选：`Browns`、`Greys`、`Neutrals`、`Reds`。
- 支持多个过滤条件同时选中。
- 支持 `any` 和 `all` 两种过滤匹配模式。
- 过滤后色卡区域会自动刷新。
- 当前选中色卡被过滤隐藏时，会自动切换到第一个可见色卡。
- 无匹配色卡时显示空状态提示。
- 更新 `index.html`、`css/style.css`、`js/gallery.js` 三个核心文件。

### v1.0.0 - 基础色卡图库组件

初始版本功能：

- 左侧产品场景图 Swiper 轮播。
- 底部缩略图导航。
- 右侧色卡点击切换对应图片组。
- 色卡选中高亮。
- 色卡 hover 显示名称。
- 大图点击放大查看。
- 响应式布局。
- 本地化依赖文件，方便上传到 GitHub Pages。

## 上传到 GitHub Pages

1. 新建 GitHub 仓库。
2. 上传本项目所有文件到仓库根目录。
3. 进入仓库 `Settings`。
4. 打开 `Pages`。
5. `Build and deployment` 选择：
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
6. 保存后等待 GitHub Pages 自动部署。

## GitHub 提交建议

Commit 标题：

```text
feat: add top multi-select swatch filters
```

Commit 描述：

```text
- Move Filter By controls to the top of the gallery
- Add multi-select filter buttons for product features and color groups
- Add All reset filter option
- Auto-select the first available swatch after filtering
- Document filter tags and match mode in README
```

Release 标题：

```text
v1.1.0 - Top Multi-select Swatch Filters
```

Release 描述：

```text
This release adds a top-level Filter By section for the product swatch gallery. Users can now filter color swatches by product features and color groups, including SunComfortable, Fire-Rated, Popular, Browns, Greys, Neutrals, and Reds. The filter supports multi-select behavior and includes an All reset button.
```

## 依赖说明

当前项目使用本地文件引用：

- Bootstrap 5.3.3
- Swiper 11.2.10
- 原生 JavaScript

页面不依赖 jQuery。

## 适用场景

- 产品详情页图库
- 色卡选择器
- 户外地板颜色展示
- 墙板、地板、家具材质展示
- 电商产品多颜色/多纹理预览
- 带功能标签和颜色分类的产品筛选展示

## License

可根据你的项目需要自行添加许可证，例如 MIT License。
