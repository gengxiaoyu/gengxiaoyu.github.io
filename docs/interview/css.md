---
title: CSS 面试
createTime: 2026/01/26 17:00:40
permalink: /interview/gtkrhn19/
---

# CSS & CSS3 核心知识点（面试通关版）
## 前言：面试考点权重
CSS/ CSS3 面试核心考察「基础原理 + 实战手写 + 性能优化」，考点权重排序：
1. 布局体系（Flex/Grid/盒模型/BFC）→ 40%
2. 动效三剑客（transform/transition/animation）→ 30%
3. 基础核心（选择器/优先级）→ 10%
4. 视觉特效（圆角/阴影/渐变）→ 10%
5. 响应式增强（媒体查询/CSS变量）→ 5%
6. 性能优化 → 5%

## 一、CSS 基础核心（面试打底）
### 1. 选择器与优先级（必考）
#### （1）实战代码（手写高频）
```css
/* 优先级四元组：(行内, ID, 类/伪类/属性, 元素/伪元素) */
* {}          /* 通配符：0,0,0,0 */
div {}        /* 元素选择器：0,0,0,1 */
.class {}     /* 类选择器：0,0,1,0 */
#id {}        /* ID选择器：0,1,0,0 */
style=""      /* 行内样式：1,0,0,0 */
!important    /* 突破层叠规则（非提升优先级） */

/* 优先级叠加示例（面试常问：哪个生效） */
#box { color: red; }       /* 0,1,0,0 → 生效 */
div.box { color: yellow; } /* 0,0,1,1 */
.box { color: blue; }      /* 0,0,1,0 */
div { color: green; }      /* 0,0,0,1 */
```
#### （2）面试追问（底层原理）
- 匹配规则：浏览器**从右到左**匹配选择器（如 `div .box p` 先找`p`，减少匹配次数）；
- 继承规则：文字属性（font/color）可继承，盒模型/定位属性不可继承；
- `!important` 本质：改变层叠规则，带该标识的样式优先于所有普通样式（行内+`!important` > 外部+`!important`）。

### 2. 盒模型 & BFC（布局基石）
#### （1）实战代码（手写高频）
```css
/* 1. 盒模型类型 */
/* 标准盒模型（默认）：width = 内容宽 → 总宽=content+padding+border+margin */
.box-standard {
  box-sizing: content-box;
  width: 200px;
  padding: 10px;
  border: 5px solid #000; /* 总宽230px */
}

/* 怪异盒模型（开发首选）：width = content+padding+border → 总宽=width+margin */
.box-border {
  box-sizing: border-box;
  width: 200px;
  padding: 10px;
  border: 5px solid #000; /* 总宽200px */
}

/* 2. 解决margin塌陷（触发BFC） */
.parent {
  overflow: hidden; /* 最简BFC触发方式 */
}
.child {
  margin-top: 20px; /* 不再穿透父元素 */
}
```
#### （2）面试追问（底层原理）
- margin塌陷：仅发生在**普通流块级元素的垂直方向**（设计初衷：适配文字排版）；
- BFC（块格式化上下文）：独立渲染区域，解决margin塌陷/浮动塌陷/文字环绕；
- 触发BFC条件：`overflow: hidden`/`display: flex`/`position: absolute`等。

## 二、CSS3 视觉特效（面试基础）
### 1. 高频特性实战（手写必考）
```css
/* 1. 圆角：50%实现圆形（宽高相等） */
.box { border-radius: 50%; }

/* 2. 阴影：多重阴影/内阴影 */
.box { box-shadow: 5px 5px 10px rgba(0,0,0,0.3), inset 0 0 10px #f00; }

/* 3. 渐变文字（面试必考） */
.gradient-text {
  background: linear-gradient(to right, #f00, #00f);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* 4. 多背景：逗号分隔，先写在上层 */
.box {
  background: url(icon.png) no-repeat 10px 10px, linear-gradient(#f00, #00f);
  background-size: 50px 50px, cover;
}
```
#### （2）面试追问（性能/原理）
| 特性         | 底层实现                 | 性能影响               |
|--------------|--------------------------|------------------------|
| border-radius| 贝塞尔曲线绘制           | 仅触发重绘（Paint）    |
| box-shadow   | 额外渲染图层（不占文档流）| 模糊半径越大性能消耗越高 |
| 渐变         | 浏览器动态生成位图       | 优于背景图（无网络请求）|

## 三、CSS3 动效三剑客（面试核心）
### 1. transform（性能最优）
```css
.box {
  transform-origin: top left; /* 变换原点（默认center） */
  /* 组合变换（顺序影响结果） */
  transform: translate(20px, 20px) rotate(30deg) scale(1.2);
  /* 3D变换（进阶） */
  transform: perspective(500px) rotateX(30deg);
}
```
**面试追问**：`transform` 由GPU处理，仅触发「合成（Composite）」，性能远高于top/left（触发重排）。

### 2. transition（过渡动画）
```css
.box {
  /* 精准过渡（推荐）：仅过渡transform，性能更高 */
  transition: transform 0.3s ease-in-out;
}
.box:hover {
  transform: scale(1.2); /* 状态变化触发过渡 */
}
```
**面试追问**：`display: none` 无法过渡（无中间状态），替代方案：`opacity: 0 + visibility: hidden`。

### 3. animation（关键帧动画）
```css
/* 定义关键帧 */
@keyframes move {
  0% { transform: translateX(0); }
  50% { transform: translateX(100px); }
  100% { transform: translateX(0); }
}
/* 应用动画 */
.box {
  animation: move 2s infinite alternate forwards;
}
```

### 4. 核心对比（必考）
| 特性       | transition               | animation                |
|------------|--------------------------|--------------------------|
| 触发方式   | 需状态变化（hover/JS）| 自动触发                 |
| 关键帧     | 仅起始/结束帧            | 自定义多帧               |
| 循环       | 单次（需重新触发）| 支持无限循环             |

## 四、CSS 布局体系（面试重中之重）
### 1. Flex布局（一维布局，最高频）
```css
/* 容器属性（手写高频） */
.flex-container {
  display: flex;
  justify-content: space-between; /* 主轴对齐 */
  align-items: center; /* 交叉轴对齐 */
  flex-wrap: wrap;
  gap: 10px; /* 项间距（替代margin） */
}
/* 项目属性 */
.flex-item {
  flex: 1; /* 平分剩余空间：grow=1, shrink=1, basis=0% */
  align-self: flex-end; /* 单独对齐 */
}

/* Flex居中（必考） */
.center-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
}
```
**面试追问**：`flex: 1` 底层是「瓜分剩余空间+空间不足收缩+基准宽0」。

### 2. Grid布局（二维布局，进阶加分）
```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3列等分 */
  grid-template-rows: repeat(3, 100px); /* 3行，每行100px */
  gap: 5px;
}
/* 合并单元格（进阶） */
.grid-item {
  grid-column: 1 / 3; /* 跨2列 */
  grid-row: 1 / 2; /* 跨1行 */
}
```

### 3. 核心对比（必考）
| 布局   | 维度   | 适用场景               |
|--------|--------|------------------------|
| Flex   | 一维   | 导航栏、居中、线性布局 |
| Grid   | 二维   | 九宫格、表单、复杂网格 |

### 4. 浮动/定位（经典布局，追问考点）
```css
/* 解决浮动塌陷（必考） */
.float-parent::after {
  content: "";
  display: block;
  clear: both;
}

/* 绝对定位居中（必考） */
.absolute-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

## 五、CSS3 响应式增强（面试高频）
### 1. 媒体查询（基础）
```css
/* 移动端断点（规范） */
@media (max-width: 768px) { /* 平板及以下 */
  .container { width: 100%; }
}
@media (min-width: 768px) and (max-width: 1200px) { /* 桌面端 */
  .container { width: 750px; }
}
```

### 2. CSS变量（自定义属性）
```css
/* 全局变量 */
:root { --primary-color: #f00; }
/* 使用变量（带默认值） */
.box { color: var(--primary-color, #333); }
/* JS动态修改（必考） */
document.documentElement.style.setProperty('--primary-color', '#00f');
```
**面试追问**：CSS变量是运行时变量，支持动态修改，可统一管理主题色（减少重复代码）。

## 六、CSS 性能优化（面试追问核心）
### 1. 核心优化点（速记）
| 优化方向    | 具体做法                     | 原理                  |
|-------------|------------------------------|-----------------------|
| 动效性能    | 仅用transform/opacity        | GPU加速，仅触发合成   |
| 减少重排    | 避免频繁改width/height/top   | 减少布局计算开销      |
| 提前优化    | will-change: transform       | 浏览器预分配GPU资源   |
| 阴影/渐变   | 降低模糊半径，减少多重阴影   | 减少像素计算量        |

### 2. 优化示例（手写）
```css
/* 优化前（触发重排） */
.animate-bad { transition: left 0.3s; }
/* 优化后（仅触发合成） */
.animate-good { transition: transform 0.3s; }
```

## 七、面试核心考点总结
1. **手写高频**：Flex居中、渐变文字、transform组合变换、关键帧动画、CSS变量修改；
2. **原理追问**：优先级计算、BFC规则、transform性能、动效触发阶段（重排/重绘/合成）；
3. **性能核心**：动效仅用`transform/opacity`，避免触发重排/重绘；
4. **布局重点**：Flex（一维）/Grid（二维）的场景区分，margin塌陷/BFC解决思路。

[CSS 面试](./css.md)
