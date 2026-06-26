# Chinglo — Works (v2, Dumb Type 结构语言)

完全静态站点，零依赖，可直接放进 GitHub Pages。

## 这一版和上一版的区别

上一版是"温暖纸感 + 衬线大字"的编辑设计路线，被推翻重做。这一版完全照搬
[dumbtype.com](https://dumbtype.com) 的结构语言：

- **纯黑背景 + 纯白文字**，没有第三种颜色，没有灰阶过渡
- **左侧固定目录**代替顶部导航栏——永远可见，永远在同一位置，点击直接
  切换右侧内容，不跳页、不刷新（单页应用式）
- **右侧满版媒体**：图片/视频铺满主区域，没有卡片、圆角、阴影、留白边框
- **等宽字体的朴素信息列表**（`<dl>` 结构），像剧场节目单背面的演出资料，
  不做任何视觉修饰
- 唯一的版式语言是**精确对齐**，不靠任何装饰性元素制造"设计感"

## 文件结构

```
index.html       — 全部内容在一个文件里，每个作品是一个 <article class="panel">
css/style.css     — 全部样式
js/main.js         — 目录点击切换面板 + 移动端目录展开/收起
assets/images/      — 放你自己的作品图片
```

## 怎么换成你自己的内容

### 1. 替换图片（最先做的事）

`index.html` 里现在用的是 Unsplash 占位图（链接形如
`https://images.unsplash.com/photo-...`），**这些只是占位，必须换掉**。

把你的图片放进 `assets/images/`，比如 `assets/images/work01.jpg`，然后把：

```html
<img src="https://images.unsplash.com/photo-xxxx" alt="" loading="eager">
```

改成：

```html
<img src="assets/images/work01.jpg" alt="作品名称的简短描述" loading="eager">
```

`alt` 属性建议填一句简短描述（屏幕阅读器和 SEO 都需要），不要留空。

### 2. 替换文字

每个作品对应一个 `<article class="panel" id="w01">…</article>` 区块，
里面：

- `.panel__title` — 作品标题
- `.panel__meta` 里的 `<dt>/<dd>` — 类型、年份、状态等元数据，按需增删
- `.panel__text` — 一段简短说明文字

同时记得把左侧目录里对应的链接文字也改掉（`<a data-target="w01">` 那一行）。

### 3. 增加/删除作品

新增一个作品需要改两处，保持同步：

1. 左侧目录 `<ul class="index__list">` 里加一行 `<li><a data-target="wXX">…</a></li>`
2. 右侧主区域加一个对应的 `<article class="panel" id="wXX" data-folio="XX / 总数">…</article>`

删除作品时同理，两处都要删，并且**记得把所有 `data-folio` 里的总数
（比如 "07 / 06" 这种 06）更新成新的作品总数**——folio 页码是手写在
HTML 里的，不是自动计算的。

### 4. 关于音频/声音作品

目前声音类作品（études、marginalia、notation）用的是纯 CSS 画的极简
竖线示意图（`.audio-block`），不是真实音频播放器。如果想换成真的可以
播放的音频：

- 简单方案：把 `.panel__media--audio` 里的 `<div class="audio-block">`
  换成原生 `<audio controls src="assets/audio/xxx.mp3"></audio>`
- 如果是嵌入 Vimeo/YouTube 视频（dumbtype.com 原站就是这么处理影像作品
  的），用 `<iframe>` 替换 `.panel__media` 里的内容即可，CSS 不需要改，
  因为 `.panel__media { height: 100vh }` 对 iframe 同样生效。

## 部署到 GitHub Pages

和之前一样，把这个文件夹的全部内容放进你的仓库（保留 CNAME 文件），
然后：

```bash
git add .
git commit -m "v2: dumb type 风格重做"
git push
```

等一两分钟，刷新你的域名就能看到新版本。

## 已知的设计取舍（不是 bug）

- **移动端目录默认收起**，点击顶部 "index" 按钮才展开——窄屏放不下
  一个常驻侧栏列表，这是唯一向响应式让步的地方，其余视觉语言完全不变。
- **没有任何过渡动画、悬停放大、渐变**——这是刻意的，原版网站本身
  也几乎没有动效，朴素到近乎"工业感"是这个方向的核心特征，不是
  没做完。
- **没有 favicon / 没有 Open Graph 预览图**——如果之后要发到社交媒体
  需要预览卡片，告诉我，我可以单独补上，目前先专注主站本身。
