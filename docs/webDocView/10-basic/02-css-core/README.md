---
title: CSS核心
createTime: 2026/02/04 15:23:51
permalink: /webDocView/10-basic/02-css-core/
---

# CSS核心

## 模块概述

本模块涵盖CSS（层叠样式表）的核心概念和现代技术，是前端开发中实现页面样式和布局的基础。通过学习本模块，你将掌握CSS的核心原理、布局技术、响应式设计和动画效果等知识，为构建美观、功能完善的前端页面打下坚实的基础。

## 知识点清单

### 1. CSS基础语法
- **选择器**：元素选择器、类选择器、ID选择器、属性选择器、伪类选择器、伪元素选择器
- **优先级**：选择器权重计算、!important规则
- **继承**：可继承属性、不可继承属性
- **层叠**：样式冲突解决机制
- **注释**：CSS注释语法

### 2. 盒模型
- **标准盒模型**：content、padding、border、margin
- **IE盒模型**：box-sizing属性
- **块级元素与行内元素**：display属性
- **盒模型计算**：宽度和高度的计算方式
- **外边距合并**：margin-collapse

### 3. 布局技术
- **文档流**：正常文档流、脱离文档流
- **浮动布局**：float属性、清除浮动
- **定位布局**：position属性（static、relative、absolute、fixed、sticky）
- **Flexbox布局**：弹性盒模型、容器属性、项目属性
- **Grid布局**：网格布局、容器属性、项目属性
- **多列布局**：column属性

### 4. 响应式设计
- **媒体查询**：@media规则、断点设置
- **视口设置**：viewport meta标签
- **流体布局**：百分比宽度、max-width/min-width
- **响应式图片**：srcset、sizes属性、picture元素
- **响应式字体**：rem单位、clamp()函数

### 5. 视觉效果
- **颜色**：颜色表示方法（十六进制、RGB、RGBA、HSL、HSLA）
- **背景**：background属性、背景图片、渐变
- **边框**：border属性、边框样式、圆角
- **阴影**：box-shadow、text-shadow
- **文本效果**：字体、文本对齐、文本装饰、文本溢出
- **滤镜**：filter属性
- **混合模式**：mix-blend-mode

### 6. 动画与过渡
- **过渡**：transition属性、过渡效果
- **动画**：@keyframes规则、animation属性
- **变换**：transform属性（平移、旋转、缩放、倾斜）
- **性能优化**：GPU加速、will-change属性

### 7. CSS变量
- **自定义属性**：--变量名
- **变量作用域**：全局变量、局部变量
- **变量使用**：var()函数
- **变量计算**：calc()函数

### 8. CSS预处理器
- **Sass/Less**：嵌套规则、变量、混合宏
- **PostCSS**：插件系统、 autoprefixer

### 9. 性能优化
- **选择器优化**：避免复杂选择器
- **样式精简**：避免冗余样式
- **CSS压缩**：减少文件大小
- **关键CSS**：内联首屏样式
- **字体优化**：字体加载策略

## 核心概念详解

### 1. CSS基础语法

#### 选择器

```css
/* 元素选择器 */
p {
  color: blue;
}

/* 类选择器 */
.text-red {
  color: red;
}

/* ID选择器 */
#header {
  background: #f0f0f0;
}

/* 属性选择器 */
input[type="text"] {
  border: 1px solid #ccc;
}

/* 伪类选择器 */
a:hover {
  color: orange;
}

/* 伪元素选择器 */
p::before {
  content: "→ ";
}
```

#### 优先级

选择器优先级从高到低：
1. !important声明
2. 内联样式
3. ID选择器
4. 类选择器、属性选择器、伪类选择器
5. 元素选择器、伪元素选择器
6. 通配符选择器

### 2. 盒模型

#### 标准盒模型与IE盒模型

```css
/* 标准盒模型（默认） */
.box-standard {
  width: 200px;
  padding: 20px;
  border: 10px solid #000;
  /* 实际宽度：200 + 20*2 + 10*2 = 260px */
}

/* IE盒模型 */
.box-ie {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 10px solid #000;
  /* 实际宽度：200px（包含padding和border） */
}
```

### 3. 布局技术

#### Flexbox布局

```css
/* 容器属性 */
.flex-container {
  display: flex;
  flex-direction: row; /* row, row-reverse, column, column-reverse */
  justify-content: space-between; /* flex-start, flex-end, center, space-between, space-around */
  align-items: center; /* stretch, flex-start, flex-end, center, baseline */
  flex-wrap: wrap; /* nowrap, wrap, wrap-reverse */
  gap: 10px; /* 项目间距 */
}

/* 项目属性 */
.flex-item {
  flex: 1; /*  flex-grow, flex-shrink, flex-basis的简写 */
  align-self: flex-start; /* 覆盖align-items */
  order: 1; /* 项目顺序 */
}
```

#### Grid布局

```css
/* 容器属性 */
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3列，每列等宽 */
  grid-template-rows: 100px 200px; /* 2行，高度分别为100px和200px */
  grid-gap: 10px; /* 网格间距 */
  grid-template-areas: 
    "header header header"
    "sidebar content content";
}

/* 项目属性 */
.grid-item {
  grid-area: header; /* 对应grid-template-areas */
  grid-column: 1 / 3; /* 列跨度 */
  grid-row: 1 / 2; /* 行跨度 */
}
```

### 4. 响应式设计

#### 媒体查询

```css
/* 基础样式 */
.container {
  width: 100%;
  padding: 20px;
}

/* 平板设备 */
@media (min-width: 768px) {
  .container {
    max-width: 720px;
    margin: 0 auto;
  }
}

/* 桌面设备 */
@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}
```

#### 视口设置

```html
<!-- 在HTML头部添加 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### 5. 视觉效果

#### 背景与渐变

```css
/* 背景图片 */
.background-image {
  background-image: url('image.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* 线性渐变 */
.linear-gradient {
  background: linear-gradient(to right, #ff6b6b, #4ecdc4);
}

/* 径向渐变 */
.radial-gradient {
  background: radial-gradient(circle, #ff6b6b, #4ecdc4);
}
```

#### 阴影效果

```css
/* 盒子阴影 */
.box-shadow {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* 文本阴影 */
.text-shadow {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}
```

### 6. 动画与过渡

#### 过渡效果

```css
.transition {
  width: 100px;
  height: 100px;
  background: blue;
  transition: all 0.3s ease;
}

.transition:hover {
  width: 200px;
  background: red;
}
```

#### 关键帧动画

```css
/* 定义动画 */
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

/* 使用动画 */
.animation {
  animation: pulse 2s infinite;
}
```

### 7. CSS变量

```css
/* 定义全局变量 */
:root {
  --primary-color: #4ecdc4;
  --secondary-color: #ff6b6b;
  --font-size: 16px;
}

/* 使用变量 */
.element {
  color: var(--primary-color);
  font-size: var(--font-size);
  background: var(--secondary-color);
}

/* 局部变量 */
.container {
  --container-bg: #f0f0f0;
  background: var(--container-bg);
}
```

### 8. CSS预处理器

#### Sass/SCSS

Sass是最流行的CSS预处理器，提供了变量、嵌套、混合宏等功能。

```scss
// 变量
$primary-color: #4ecdc4;
$secondary-color: #ff6b6b;
$font-size-base: 16px;
$border-radius: 4px;

// 嵌套规则
.container {
  width: 100%;
  padding: 20px;
  
  .header {
    background: $primary-color;
    padding: 15px;
    
    .title {
      font-size: $font-size-base * 1.5;
      color: #fff;
    }
    
    .subtitle {
      font-size: $font-size-base;
      opacity: 0.8;
    }
  }
  
  .content {
    background: #fff;
    padding: 20px;
    
    p {
      line-height: 1.6;
      margin-bottom: 10px;
    }
  }
}

// 混合宏（Mixin）
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin button-style($bg-color, $text-color: #fff) {
  padding: 10px 20px;
  border: none;
  border-radius: $border-radius;
  background: $bg-color;
  color: $text-color;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: darken($bg-color, 10%);
  }
}

@mixin responsive($breakpoint) {
  @media (max-width: $breakpoint) {
    @content;
  }
}

// 使用混合宏
.card {
  @include flex-center;
  flex-direction: column;
  padding: 20px;
  
  @include responsive(768px) {
    flex-direction: row;
  }
}

.button {
  @include button-style($primary-color);
}

.button-secondary {
  @include button-style($secondary-color);
}

// 函数
@function calculate-width($columns, $gap: 20px) {
  @return ($columns * 100px) + (($columns - 1) * $gap);
}

.grid {
  width: calculate-width(3); // 340px
}

// 继承（Extend）
.button {
  padding: 10px 20px;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
}

.primary-button {
  @extend .button;
  background: $primary-color;
  color: #fff;
}

.secondary-button {
  @extend .button;
  background: $secondary-color;
  color: #fff;
}

// 循环
@for $i from 1 through 5 {
  .col-#{$i} {
    width: $i * 20%;
  }
}

@each $color in (red, blue, green) {
  .text-#{$color} {
    color: $color;
  }
}

// 条件语句
@mixin theme($theme) {
  @if $theme == 'dark' {
    background: #333;
    color: #fff;
  } @else if $theme == 'light' {
    background: #fff;
    color: #333;
  } @else {
    background: #f0f0f0;
    color: #666;
  }
}

.dark-theme {
  @include theme('dark');
}

.light-theme {
  @include theme('light');
}

// 模块化
// _variables.scss
$primary-color: #4ecdc4;
$secondary-color: #ff6b6b;

// _mixins.scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

// _buttons.scss
.button {
  @include flex-center;
  padding: 10px 20px;
}

// main.scss
@import 'variables';
@import 'mixins';
@import 'buttons';
```

#### Less

Less是另一个流行的CSS预处理器，语法更加简洁。

```less
// 变量
@primary-color: #4ecdc4;
@secondary-color: #ff6b6b;
@font-size-base: 16px;
@border-radius: 4px;

// 嵌套
.container {
  width: 100%;
  padding: 20px;
  
  .header {
    background: @primary-color;
    
    .title {
      font-size: @font-size-base * 1.5;
    }
  }
}

// 父选择器引用
.button {
  padding: 10px 20px;
  background: @primary-color;
  
  &:hover {
    background: darken(@primary-color, 10%);
  }
  
  &.active {
    background: darken(@primary-color, 20%);
  }
}

// 混合宏
.flex-center() {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  .flex-center();
}

// 带参数的混合宏
.button-style(@bg-color, @text-color: #fff) {
  padding: 10px 20px;
  border: none;
  border-radius: @border-radius;
  background: @bg-color;
  color: @text-color;
}

.button {
  .button-style(@primary-color);
}

// 运算
.width {
  width: 100% - 20px;
  margin: 10px;
}

.height {
  height: 200px / 2;
}

// 函数
@function calculate-width(@columns) {
  @return @columns * 100px;
}

.grid {
  width: calculate-width(3);
}

// 命名空间
#bundle() {
  .button() {
    padding: 10px 20px;
    border: none;
  }
  
  .input() {
    padding: 8px 12px;
    border: 1px solid #ccc;
  }
}

.container {
  #bundle.button();
  #bundle.input();
}

// 导入
@import 'variables';
@import 'mixins';
```

#### PostCSS

PostCSS是一个CSS转换工具，通过插件系统实现各种功能。

```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: ['last 2 versions', '> 1%', 'not dead']
    }),
    require('cssnano')({
      preset: 'default'
    }),
    require('@fullhuman/postcss-purgecss')({
      content: ['./src/**/*.html', './src/**/*.js'],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
    })
  ]
};
```

```css
/* 输入CSS */
.button {
  display: flex;
  gap: 10px;
  user-select: none;
  transition: all 0.3s ease;
}

/* 输出CSS（经过autoprefixer处理） */
.button {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  gap: 10px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
```

#### 面试要点
- **CSS预处理器的作用是什么？**
  提高CSS开发效率，支持变量、嵌套、混合宏、函数等特性，便于代码维护和复用
- **Sass和Less的区别是什么？**
  Sass功能更强大，有更多内置函数和特性；Less语法更简洁，学习曲线平缓；Sass使用$定义变量，Less使用@
- **什么是Mixin？有什么作用？**
  Mixin是可复用的代码块，可以接受参数，用于定义可重用的样式规则，减少代码重复
- **PostCSS的作用是什么？**
  PostCSS是一个CSS转换工具，通过插件系统实现自动添加浏览器前缀、CSS压缩、删除未使用的CSS等功能
- **如何选择CSS预处理器？**
  根据项目需求和个人偏好选择；Sass功能强大适合大型项目；Less简单易学适合小型项目；PostCSS可作为补充工具

### 9. 性能优化

#### 选择器优化

```css
/* 避免：过度嵌套 */
.container .header .nav .menu .item .link {
  color: blue;
}

/* 推荐：使用类选择器 */
.nav-link {
  color: blue;
}

/* 避免：通配符选择器 */
* {
  margin: 0;
  padding: 0;
}

/* 推荐：具体选择器 */
body,
h1,
h2,
h3,
p,
ul,
ol {
  margin: 0;
  padding: 0;
}

/* 避免：标签选择器 */
div.container {
  width: 100%;
}

/* 推荐：类选择器 */
.container {
  width: 100%;
}

/* 避免：属性选择器 */
input[type="text"] {
  border: 1px solid #ccc;
}

/* 推荐：类选择器 */
.input-text {
  border: 1px solid #ccc;
}
```

#### 样式精简

```css
/* 避免：冗余样式 */
.button {
  margin-top: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
}

/* 推荐：简写属性 */
.button {
  margin: 10px;
}

/* 避免：重复样式 */
.header {
  color: #333;
  font-size: 16px;
  line-height: 1.5;
}

.footer {
  color: #333;
  font-size: 16px;
  line-height: 1.5;
}

/* 推荐：提取公共样式 */
.text-base {
  color: #333;
  font-size: 16px;
  line-height: 1.5;
}

.header {
  @extend .text-base;
}

.footer {
  @extend .text-base;
}

/* 使用CSS变量减少重复 */
:root {
  --primary-color: #4ecdc4;
  --secondary-color: #ff6b6b;
  --spacing-unit: 8px;
}

.button {
  padding: calc(var(--spacing-unit) * 2) calc(var(--spacing-unit) * 3);
  background: var(--primary-color);
}

.card {
  padding: calc(var(--spacing-unit) * 3);
  background: var(--secondary-color);
}
```

#### CSS压缩

```css
/* 开发环境：保留格式和注释 */
.button {
  /* 主要按钮样式 */
  padding: 10px 20px;
  background: #4ecdc4;
  color: #fff;
  border: none;
  border-radius: 4px;
}

/* 生产环境：压缩后 */
.button{padding:10px 20px;background:#4ecdc4;color:#fff;border:none;border-radius:4px}
```

#### 关键CSS内联

```html
<!-- 内联首屏关键CSS -->
<style>
  .header {
    background: #333;
    padding: 20px;
  }
  
  .hero {
    height: 500px;
    background: url('hero.jpg') center/cover;
  }
  
  .nav {
    display: flex;
    justify-content: space-between;
  }
</style>

<!-- 其他CSS异步加载 -->
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="styles.css"></noscript>
```

#### 字体优化

```css
/* 字体显示策略 */
@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2') format('woff2'),
       url('font.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap; /* 交换显示策略 */
}

/* 字体子集化 */
@font-face {
  font-family: 'CustomFont';
  src: url('font-latin.woff2') format('woff2');
  unicode-range: U+0000-00FF; /* 只包含拉丁字符 */
}

@font-face {
  font-family: 'CustomFont';
  src: url('font-chinese.woff2') format('woff2');
  unicode-range: U+4E00-9FFF; /* 只包含中文字符 */
}
```

#### 减少重排和重绘

```css
/* 使用transform代替top/left */
.element {
  /* 避免：触发重排 */
  left: 100px;
  top: 100px;
  
  /* 推荐：使用transform */
  transform: translate(100px, 100px);
}

/* 使用opacity代替visibility */
.element {
  /* 避免：触发重排 */
  visibility: hidden;
  
  /* 推荐：使用opacity */
  opacity: 0;
}

/* 批量DOM操作 */
.batch-update {
  /* 推荐：一次性修改多个属性 */
  width: 100px;
  height: 100px;
  background: blue;
  margin: 10px;
}

/* 使用will-change提示浏览器优化 */
.animated-element {
  will-change: transform, opacity;
}
```

#### GPU加速

```css
/* 启用GPU加速 */
.gpu-accelerated {
  transform: translateZ(0);
  /* 或 */
  will-change: transform;
  /* 或 */
  backface-visibility: hidden;
}

/* 动画使用GPU加速 */
.animated {
  animation: slide 0.3s ease-out;
  transform: translateZ(0);
}

@keyframes slide {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
```

#### 避免昂贵的属性

```css
/* 避免使用：box-shadow、filter、border-radius等 */
.expensive {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  filter: blur(10px);
  border-radius: 50%;
}

/* 优化：减少使用频率 */
.optimized {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 使用伪元素减少重绘 */
.card {
  position: relative;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  z-index: -1;
}
```

#### CSS Containment

```css
/* 使用containment隔离渲染 */
.contain {
  contain: strict; /* 或 content、layout、paint、size */
}

/* 部分containment */
.layout-contain {
  contain: layout;
}

.paint-contain {
  contain: paint;
}

/* 实际应用 */
.sidebar {
  contain: layout paint;
  overflow-y: auto;
}
```

#### 响应式图片

```html
<!-- 使用srcset和sizes -->
<img 
  srcset="image-320w.jpg 320w,
          image-640w.jpg 640w,
          image-1280w.jpg 1280w"
  sizes="(max-width: 640px) 100vw,
         (max-width: 1280px) 50vw,
         33vw"
  src="image-1280w.jpg"
  alt="Responsive image">

<!-- 使用picture元素 -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" alt="Fallback image">
</picture>

<!-- 使用lazy loading -->
<img src="image.jpg" loading="lazy" alt="Lazy loaded image">
```

#### Content Visibility

```css
/* 使用content-visibility优化长列表 */
.lazy-section {
  content-visibility: auto;
  contain-intrinsic-size: 1000px;
}

/* 优化表格 */
.table-row {
  content-visibility: auto;
  contain-intrinsic-size: 50px;
}
```

#### CSS代码分割

```css
/* 按功能分割CSS */
/* main.css - 首屏样式 */
/* vendor.css - 第三方库样式 */
/* print.css - 打印样式 */
/* critical.css - 关键CSS */

<link rel="stylesheet" href="main.css">
<link rel="stylesheet" href="vendor.css">
<link rel="stylesheet" href="print.css" media="print">
```

#### 性能检测工具

```javascript
// 使用Chrome DevTools
// 1. Performance标签页：记录页面性能
// 2. Coverage标签页：检查CSS使用率
// 3. Lighthouse：综合性能评分

// 使用CSS Stats
// https://cssstats.com/

// 使用PurgeCSS删除未使用的CSS
// npm install -D purgecss

// postcss.config.js
module.exports = {
  plugins: [
    require('@fullhuman/postcss-purgecss')({
      content: ['./src/**/*.html', './src/**/*.js'],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
      safelist: {
        standard: [/^active/, /^is-/],
        deep: [/^bg-/]
      }
    })
  ]
};

// 使用Critical提取关键CSS
// npm install critical

// critical.config.js
module.exports = {
  src: 'index.html',
  css: ['styles.css'],
  dest: 'index-critical.html',
  inline: true,
  minify: true,
  extract: true,
  width: 1200,
  height: 800
};
```

#### 面试要点
- **如何优化CSS选择器性能？**
  避免过度嵌套、使用类选择器、避免通配符和标签选择器、减少选择器层级
- **什么是关键CSS？如何内联关键CSS？**
  关键CSS是首屏渲染所需的CSS，内联到HTML中可以减少渲染阻塞，使用Critical等工具提取
- **如何减少CSS文件大小？**
  使用CSS压缩工具、删除未使用的CSS、使用简写属性、提取公共样式、使用CSS变量
- **什么是重排和重绘？如何优化？**
  重排是元素位置和尺寸变化，重绘是元素外观变化；使用transform代替top/left、批量DOM操作、使用will-change
- **如何优化字体加载性能？**
  使用font-display: swap、字体子集化、使用WOFF2格式、预加载关键字体
- **CSS containment的作用是什么？**
  隔离元素的渲染，告诉浏览器元素内容不会影响其他部分，提高渲染性能
- **content-visibility属性有什么作用？**
  跳过不可见元素的渲染工作，显著提高长列表和复杂页面的性能

## 实战练习

### 1. 实现三栏布局

```css
/* 使用Flexbox实现三栏布局 */
.three-column {
  display: flex;
  gap: 20px;
}

.sidebar {
  flex: 0 0 200px;
  background: #f0f0f0;
}

.main-content {
  flex: 1;
  background: #fff;
}

.aside {
  flex: 0 0 150px;
  background: #f0f0f0;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .three-column {
    flex-direction: column;
  }
  
  .sidebar,
  .aside {
    flex: 0 0 auto;
  }
}
```

### 2. 实现响应式导航栏

```css
/* 导航栏样式 */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #333;
  color: #fff;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-links a {
  color: #fff;
  text-decoration: none;
}

/* 汉堡菜单按钮 */
.menu-toggle {
  display: none;
  cursor: pointer;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .nav-links {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background: #333;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    gap: 1rem;
    transform: translateY(-100%);
    transition: transform 0.3s ease;
  }
  
  .nav-links.active {
    transform: translateY(0);
  }
  
  .menu-toggle {
    display: block;
  }
}
```

### 3. 实现卡片悬停效果

```css
/* 卡片样式 */
.card {
  width: 300px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.card-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 1rem;
}

.card-title {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.card-text {
  color: #666;
  margin-bottom: 1rem;
}

.card-btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #4ecdc4;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.3s ease;
}

.card-btn:hover {
  background: #45b7aa;
}
```

## 学习建议

### 1. 学习顺序
1. **基础语法**：选择器、优先级、盒模型
2. **布局技术**：浮动、定位、Flexbox、Grid
3. **响应式设计**：媒体查询、视口设置
4. **视觉效果**：颜色、背景、阴影
5. **动画与过渡**：transition、animation
6. **高级特性**：CSS变量、预处理器

### 2. 学习方法
- **实践为主**：通过实际项目练习CSS技能
- **浏览器开发者工具**：使用DevTools调试CSS
- **参考文档**：MDN CSS文档、CSS Tricks
- **模仿学习**：分析优秀网站的CSS实现
- **代码规范**：遵循CSS命名规范（如BEM）

### 3. 常见误区
- **过度使用!important**：破坏样式层叠机制
- **不考虑浏览器兼容性**：导致样式在不同浏览器中表现不一致
- **忽略响应式设计**：页面在移动设备上显示异常
- **CSS代码冗余**：增加文件大小，影响性能
- **布局嵌套过深**：影响页面渲染性能

### 4. 进阶学习资源
- **书籍**：《CSS权威指南》、《CSS揭秘》
- **在线课程**：MDN学习模块、前端进阶课程
- **工具**：CSS预处理器（Sass）、PostCSS、CSS-in-JS
- **社区**：CSS Tricks、Stack Overflow

## 总结

CSS核心知识是前端开发的重要组成部分，掌握这些概念对于构建美观、功能完善的前端页面至关重要。本模块涵盖了CSS的基础语法、布局技术、响应式设计、视觉效果和动画等核心知识点，通过系统学习和实践，你将能够：

1. **掌握CSS基础**：选择器、优先级、盒模型等核心概念
2. **精通布局技术**：Flexbox、Grid等现代布局方法
3. **实现响应式设计**：适配不同屏幕尺寸的设备
4. **创建视觉效果**：背景、阴影、渐变等美化页面
5. **添加动画效果**：过渡、关键帧动画提升用户体验
6. **优化CSS性能**：减少冗余代码，提高页面加载速度

通过本模块的学习，你将建立起完整的CSS知识体系，为后续的前端开发和框架学习做好充分准备。CSS是一门不断发展的语言，持续关注CSS的新特性和最佳实践，将有助于你在前端开发领域保持竞争力。