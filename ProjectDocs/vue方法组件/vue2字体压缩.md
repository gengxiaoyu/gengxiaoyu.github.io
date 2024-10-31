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