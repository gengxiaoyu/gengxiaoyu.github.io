### 1. 安装 `vue3-scale-box`
```bash
npm install vue3-scale-box
```

### 2. 使用 `ScaleBox` 组件（全局适配）
```vue
<!-- src/App.vue -->
<template>
  <ScaleBox :width="1920" :height="1080" bgc="transparent" :delay="100" :isFlat="false">
    <router-view />
  </ScaleBox>
</template>

<script setup>
import ScaleBox from 'vue3-scale-box';
</script>

<style>
  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
</style>
```

### 3. 自定义适配器组件 `ScreenAdapter`
```vue
<!-- src/components/ScreenAdapter.vue -->
<template>
  <div ref="scaleBox" :style="scaleStyle">
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useWindowSize } from '@vueuse/core';
import { useDebounce } from '@/utils/useDebounce';

const scaleBox = ref(null);
const windowSize = useWindowSize();
const designWidth = ref(1920);
const designHeight = ref(1080);
const scaleStyle = ref({});

const updateScale = () => {
  const scaleX = windowSize.width / designWidth.value;
  const scaleY = windowSize.height / designHeight.value;
  scaleStyle.value = {
    transform: `scale(${Math.min(scaleX, scaleY)})`,
    transformOrigin: 'top left',
    position: 'fixed',
    left: '50%',
    top: '50%',
    transition: 'transform 0.3s ease-in-out', // 平滑过渡效果
  };
};

const debouncedUpdateScale = useDebounce(updateScale, 100);
onMounted(() => {
  window.addEventListener('resize', debouncedUpdateScale);
});
onUnmounted(() => {
  window.removeEventListener('resize', debouncedUpdateScale);
});
updateScale(); // 初始缩放调整
</script>
```

### 4. 封装 `useDebounce` 函数
```javascript
// src/utils/useDebounce.js
import { debounce } from 'lodash';

export function useDebounce(fn, wait) {
  return debounce(fn, wait);
}
```

### 5. 组件使用示例
```vue
<!-- src/components/SomeComponent.vue -->
<template>
  <ScreenAdapter>
    <!-- 你的大屏内容 -->
    <!-- 例如，使用 ECharts 进行大屏数据可视化 -->
  </ScreenAdapter>
</template>

<script setup>
import ScreenAdapter from './ScreenAdapter.vue';
</script>
```

### 优化点说明：
1. **平滑过渡**：在`scaleStyle`中添加了`transition`属性，使缩放动画更平滑。
2. **防抖函数**：使用`lodash`的`debounce`方法，减少窗口调整事件的触发频率，提高性能。
3. **代码组织**：将`updateScale`函数中的样式逻辑与计算逻辑分离，使代码更清晰。
4. **类型定义**：在TypeScript项目中，可以为`useWindowSize`和`useDebounce`等函数添加类型定义，提高代码的可维护性和减少运行时错误。
5. **错误处理**：在`updateScale`函数中添加错误处理逻辑，以应对可能的异常情况。

这些优化使得代码更加健壮、易于维护，并且提升了用户体验。
