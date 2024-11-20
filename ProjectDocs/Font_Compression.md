# vue2 压缩字体

## 安装
```js 
npm i font-spider-plus -g 
```
## 创建common文件：
```js
  src
    >common
      >fonts
        字体01.ttf
        字体02.ttf
      >index
        index.html
    >components
```
## 文件内容：
```js
/* common/index/index.html 文件内容 */
/* 需要压缩的字体搜集罗列到这里 */
<div class="test">
    1234567890
</div>
<div class="title">
    恭喜发财
</div>

<style>
    {/* 引入字体 */}
    @font-face {
        font-family: 'YouSheBiaoTiHei';
        src: url('../fonts/YouSheBiaoTiHei.ttf');
        font-weight: normal;
        font-style: normal;
    }
    @font-face {
        font-family: 'FontquanXinYiGuanHeiTi';
        src: url('../fonts/ZITIQUANXINYIGUANHEITI4.0-2.TTF');
        font-weight: normal;
        font-style: normal;
    }

    {/* 使用字体 */}
    .test {
        font-family: 'YouSheBiaoTiHei';
    }
    .title {
        font-family: 'FontquanXinYiGuanHeiTi';
    }
</style>
```
## 执行
```js 
/* 在common/index下执行 */
fsp local index.html
```
## 执行结果
```js
/* 出现一下文字执行成功 */
PS G:\work\caseDemo\some-dome\src\common\index> fsp local index.html
√ 优化完成
已提取 10 个 YouSheBiaoTiHei 字体：
 0123456789 
生成字体文件：
* g:/work/caseDemo/some-dome/src/common/fonts/YouSheBiaoTiHei.ttf,2K (已优化体积：0K)
已提取 4 个 FontquanXinYiGuanHeiTi 字体：
 发喜恭财 
生成字体文件：
* g:/work/caseDemo/some-dome/src/common/fonts/ZITIQUANXINYIGUANHEITI4.0-2.TTF,7K (已优化体积：27K)
PS G:\work\caseDemo\some-dome\src\common\index> 
```
## 目录变化
```js
 /*  生成了.font-spider文件夹 这里面的文件就是压缩后的文件*/
  src
    >common
      >fonts
        >.font-spider
          压缩字体用到的01.ttf
          压缩字体用到的02.ttf
        字体01.ttf
        字体02.ttf
      >index
        index.html
    >components
```
友情链接：
1.  [字蛛+（Font-spider-Plus）](https://www.npmjs.com/package/font-spider-plus/v/1.0.2)

# vue3 压缩字体
当然，这里提供一个具体的方案，使用 `vite-plugin-purge-icons` 插件来去除未使用的图标字体，并使用 `fontmin` 来压缩字体。

### 安装必要的依赖

```bash
npm install vite-plugin-purge-icons fontmin --save-dev
```

### 配置 `vite.config.js`

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import PurgeIcons from 'vite-plugin-purge-icons';
import path from 'path';

export default defineConfig({
    plugins: [
        PurgeIcons(),
        {
            name: 'font-minification',
            apply: 'build',
            // 在构建过程中压缩字体
            transform(code, id) {
                if (/\.(woff|woff2|ttf|eot|otf|svg)$/.test(id)) {
                    const fontmin = require('fontmin');
                    return fontmin
                        .src(id)
                        .then(result => {
                        return {
                            code: result[0].buffer,
                            map: null
                        };
                    });
                }
            }
        }
    ],
});
```

### 创建字体压缩脚本

```javascript
// fontmin.js
const fontmin = require('fontmin');
const path = require('path');

fontmin({
    src: path.resolve(__dirname, 'src/fonts/my-font.ttf'),
    dest: path.resolve(__dirname, 'dest/fonts'),
    ext: 'woff2', // 指定输出格式
}).then(result => {
    console.log('Font minified!');
});
```

### 在 `package.json` 中添加脚本

```json
"scripts": {
    "compress-fonts": "node fontmin.js"
}
```

### 运行字体压缩脚本

```bash
npm run compress-fonts
```

### 在 CSS 中使用字体

```css
/* src/assets/styles/fonts.css */
@font-face {
    font-family: 'MyCustomFont';
    src: url('/fonts/my-subset-font.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

/* 使用字体的类 */
.font-custom {
    font-family: 'MyCustomFont', sans-serif;
}
```

### 在组件中使用字体类

```vue
<!-- src/components/MyComponent.vue -->
<template>
    <div class="font-custom">
        Hello, this text will use the custom font.
    </div>
</template>

<script setup>
    // ...
</script>
```

### 总结

通过上述步骤，你可以在 Vue 3 项目中使用 Vite 进行字体压缩，并移除不必要的字符集，从而优化项目的加载性能。

1. **安装依赖**：`vite-plugin-purge-icons` 和 `fontmin`。
2. **配置 `vite.config.js`**：使用 `PurgeIcons` 插件去除未使用的图标字体，并在构建过程中使用 `fontmin` 压缩字体。
3. **创建字体压缩脚本**：使用 `fontmin` 压缩字体。
4. **在 CSS 中使用字体**：定义 `@font-face` 规则并在组件中使用字体类。

这样，你就可以有效地管理和压缩字体资源，提高页面加载速度和性能。