# H5 SVG页面演示

<!--
  @description: 适配手机的H5页面，展示SVG图片
  @author: GXY
  @date: 2024-12-24
-->

<style>
/**
 * 使页面适配移动端
 */
.h5-svg-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fafbfc;
}
.h5-svg-container img {
  max-width: 90vw;
  max-height: 80vh;
  display: block;
}
</style>

<div class="h5-svg-container">
  <!-- 请将 example.svg 替换为你的 SVG 文件路径 -->
  <img src="/images/520_poster.svg" alt="SVG示例图片" />
</div>