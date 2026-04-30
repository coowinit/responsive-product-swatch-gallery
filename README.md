# Responsive Product Color Swatch Gallery

一个基于 **Bootstrap 5 + Swiper** 的产品色卡图片轮播组件。左侧为场景大图轮播，支持缩略图导航和点击放大；右侧为色卡列表，点击色卡后会切换左侧对应的一组场景图片。适合产品详情页、地板/墙板/户外地板/色卡展示等场景。

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
- Bootstrap、Swiper、CSS、JS、图片均为本地文件，方便上传到 GitHub Pages 或集成到现有网站

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
  ]
}
```

字段说明：

- `id`：色卡唯一标识，不要重复。
- `name`：色卡名称，会用于 hover 遮罩文字和图片 alt 文本。
- `swatch`：右侧色卡图片路径。
- `images`：左侧对应的场景大图列表，同时会生成底部缩略图。

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

## License

可根据你的项目需要自行添加许可证，例如 MIT License。
