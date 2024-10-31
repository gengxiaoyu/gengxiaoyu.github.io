## vue3 大屏适配
要使用 `vue3-scale-box` 进行大屏适配，并将其封装以便全局使用，同时优化性能，你可以按照以下步骤操作：

### 1. 安装 `vue3-scale-box`
   - 首先，你需要安装 `vue3-scale-box` 插件。
```bash
npm install vue3-scale-box
```

### 2. 使用 `ScaleBox`
   - 在 `App.vue` 中使用 `ScaleBox` 组件，以便全局应用适配。
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

### 3. 适配器组件
   - 创建一个自定义的适配器组件，以便在需要时使用。
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
        };
    };
    const debouncedUpdateScale = useDebounce(updateScale, 100);
    onMounted(() => {
        window.addEventListener('resize', debouncedUpdateScale);
    });
    onUnmounted(() => {
        window.removeEventListener('resize', debouncedUpdateScale);
    });
    // Initial scale adjustment
    updateScale();
</script>
```

### 4. 实现局部适配
   - 在其他组件中，你可以使用自定义的 `ScreenAdapter` 组件来实现局部适配。
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

### 5. 封装 `useDebounce`
   - 封装 `useDebounce` 函数中使用 `lodash` 的 `debounce` 函数。
```javascript
// src/utils/useDebounce.js
import { debounce } from 'lodash';

export function useDebounce(fn, wait) {
    return debounce(fn, wait);
}
```
通过上述步骤，你可以实现一个全局的 scale 方案适配，使得你的 Vue 3 应用能够自适应不同尺寸的 PC 端或大屏设备。这种方法简单且高效，特别适用于数据大屏等需要高度自适应的场景。