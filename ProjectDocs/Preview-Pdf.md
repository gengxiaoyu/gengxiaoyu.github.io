## vue3 PDF预览
在 Vue 3 中实现 PDF 预览功能，你可以使用一些现成的库，如 `pdf.js`，这是一个通用的 PDF 渲染库，可以很容易地集成到 Vue 应用中。以下是实现 PDF 预览的基本步骤：

### 1. 安装 `pdf.js` 和 `pdfjs-dist`

```bash
npm install pdfjs-dist
```

### 2. 创建一个 PDF 预览组件

当然，以下是你的 Vue 组件代码，添加了详细的注释来解释每个部分的功能：

```vue
<!-- src/components/PdfViewer.vue -->
<template>
	<div>
        <!-- 使用 canvas 元素来渲染 PDF 页面 -->
        <canvas ref="pdfCanvas" />
        <!-- 如果有错误，显示错误信息 -->
        <div v-if="error" class="error-message">
            {{ error.message }}
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import PDFJS from 'pdfjs-dist/legacy/build/pdf.js';

    // 定义一个响应式引用来存储 PDF 文件的 URL
    const pdfUrl = ref('');
    // 定义一个响应式引用来存储 canvas 元素
    const pdfCanvas = ref(null);
    // 定义一个响应式引用来存储可能发生的错误
    const error = ref(null);

    // 在组件挂载后执行的生命周期钩子
    onMounted(async () => {
        // 设置 PDF.js 的全局 Worker 选项
        PDFJS.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.js';

        try {
            // 加载 PDF 文档
            const loadingTask = PDFJS.getDocument(pdfUrl.value);
            // 等待 PDF 文档加载完成
            const pdf = await loadingTask.promise;

            // 获取 PDF 的第一页
            const 一页 = await pdf.getPage(1);
            // 设置页面的缩放比例
            const scale = 1.5;
            // 获取页面的视图尺寸
            const viewport = 一页.getViewport({ scale: scale });

            // 获取 canvas 的 2D 渲染上下文
            const context = pdfCanvas.value.getContext('2d');
            // 设置 canvas 的高度和宽度
            pdfCanvas.value.height = viewport.height;
            pdfCanvas.value.width = viewport.width;

            // 准备渲染上下文
            const renderContext = {
                canvasContext: context,
                viewport: viewport,
            };
            // 开始渲染 PDF 页面
            const renderTask = 一页.render(renderContext);
            // 等待渲染任务完成
            await renderTask.promise;
        } catch (err) {
            // 如果有错误，存储错误信息
            error.value = err;
        }
    });
</script>

<style>
    .error-message {
        color: red;
    }
</style>
```

### 代码解释：

1. **模板部分 (`<template>`)**:
    - `canvas` 元素用于渲染 PDF 页面。
    - 如果有错误，显示错误信息。

2. **脚本部分 (`<script setup>`)**:
    - 导入必要的 Vue 函数和 `pdfjs-dist` 库。
    - 定义响应式引用 `pdfUrl` 来存储 PDF 文件的 URL。
    - 定义响应式引用 `pdfCanvas` 来存储 canvas 元素。
    - 定义响应式引用 `error` 来存储可能发生的错误。
    - 在组件挂载后 (`onMounted`)，设置 PDF.js 的全局 Worker 选项，并加载 PDF 文档。
    - 获取 PDF 的第一页，并设置页面的视图尺寸和缩放比例。
    - 使用 canvas 的 2D 渲染上下文来渲染 PDF 页面。

3. **样式部分 (`<style>`)**:
    - 定义错误信息的样式，使其颜色为红色。

通过这些注释，你可以更好地理解每个部分的功能和作用。

### 3. 在你的应用中使用 PDF 预览组件

```vue
<!-- src/App.vue -->
<template>
  <div>
    <PdfViewer :pdfUrl="pdfUrl" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PdfViewer from './components/PdfViewer.vue';

const pdfUrl = ref('path/to/your/document.pdf');
</script>
```

### 4. 处理 PDF 文件

你可以将 PDF 文件放在项目的 `public` 目录中，并通过相对路径进行访问，或者从远程服务器加载 PDF 文件。

### 5. 样式和布局

你可能需要添加一些 CSS 样式来控制 PDF 预览组件的布局和样式，以适应你的应用设计。

### 6. 错误处理

在上面的 `PdfViewer` 组件中，我们使用了一个简单的错误处理逻辑来捕获和显示加载或渲染过程中的错误。

### 7. 性能优化

对于大型 PDF 文件，渲染可能会消耗较多资源，因此你可能需要考虑性能优化措施，如分页加载、流式加载等。

通过上述步骤，你可以在 Vue 3 应用中实现 PDF 预览功能。`pdf.js` 提供了丰富的 API 来处理 PDF 文件，你可以根据自己的需求进行扩展和定制。