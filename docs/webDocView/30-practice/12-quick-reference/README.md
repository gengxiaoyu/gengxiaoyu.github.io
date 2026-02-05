---
title: 快速参考
createTime: 2026/02/04 15:25:41
permalink: /webDocView/30-practice/12-quick-reference/
---
# 快速参考

## JavaScript API 速查

### 数组方法

#### 基本方法

```javascript
// 创建数组
const arr = [1, 2, 3];
const arr2 = new Array(1, 2, 3);
const arr3 = Array.of(1, 2, 3);

// 数组长度
arr.length;

// 访问元素
arr[0]; // 1

// 修改元素
arr[0] = 10;

// 添加元素
arr.push(4); // 末尾添加
arr.unshift(0); // 开头添加

// 删除元素
arr.pop(); // 删除末尾
arr.shift(); // 删除开头

// 合并数组
const arr4 = arr.concat(arr2);
const arr5 = [...arr, ...arr2];
```

#### 遍历方法

```javascript
// forEach
arr.forEach((item, index, array) => {
  console.log(item, index);
});

// map
const doubled = arr.map(item => item * 2);

// filter
const evens = arr.filter(item => item % 2 === 0);

// find
const found = arr.find(item => item > 1);

// findIndex
const index = arr.findIndex(item => item > 1);

// some
const hasEven = arr.some(item => item % 2 === 0);

// every
const allPositive = arr.every(item => item > 0);

// reduce
const sum = arr.reduce((acc, item) => acc + item, 0);

// reduceRight
const sum2 = arr.reduceRight((acc, item) => acc + item, 0);
```

#### 转换方法

```javascript
// join
const str = arr.join(', '); // '1, 2, 3'

// toString
const str2 = arr.toString(); // '1,2,3'

// toLocaleString
const str3 = arr.toLocaleString();

// flat
const nested = [1, [2, [3]]];
const flat = nested.flat(2); // [1, 2, 3]

// flatMap
const mapped = arr.flatMap(item => [item, item * 2]);
```

#### 查找方法

```javascript
// indexOf
const idx = arr.indexOf(2);

// lastIndexOf
const lastIdx = arr.lastIndexOf(2);

// includes
const has = arr.includes(2);

// find
const found = arr.find(item => item > 1);

// findIndex
const idx2 = arr.findIndex(item => item > 1);
```

#### 排序方法

```javascript
// sort
arr.sort(); // 按字符排序
arr.sort((a, b) => a - b); // 按数字升序
arr.sort((a, b) => b - a); // 按数字降序

// reverse
arr.reverse();
```

#### 其他方法

```javascript
// slice
const sliced = arr.slice(1, 3); // [2, 3]

// splice
arr.splice(1, 2, 4, 5); // 从索引 1 开始删除 2 个元素，插入 4, 5

// fill
arr.fill(0); // 填充 0

// copyWithin
arr.copyWithin(0, 1, 2); // 从索引 1 复制到索引 0
```

### 字符串方法

#### 基本方法

```javascript
// 创建字符串
const str = 'Hello';
const str2 = new String('Hello');

// 字符串长度
str.length;

// 访问字符
str[0]; // 'H'
str.charAt(0); // 'H'

// 字符编码
str.charCodeAt(0); // 72
str.codePointAt(0); // 72
```

#### 查找方法

```javascript
// indexOf
const idx = str.indexOf('e'); // 1

// lastIndexOf
const lastIdx = str.lastIndexOf('l'); // 3

// includes
const has = str.includes('ell'); // true

// startsWith
const starts = str.startsWith('He'); // true

// endsWith
const ends = str.endsWith('lo'); // true

// search
const match = str.search(/l/); // 2

// match
const matches = str.match(/l/g); // ['l', 'l']
```

#### 转换方法

```javascript
// toUpperCase
const upper = str.toUpperCase(); // 'HELLO'

// toLowerCase
const lower = str.toLowerCase(); // 'hello'

// trim
const trimmed = '  hello  '.trim(); // 'hello'

// trimStart
const trimmedStart = '  hello  '.trimStart(); // 'hello  '

// trimEnd
const trimmedEnd = '  hello  '.trimEnd(); // '  hello'

// replace
const replaced = str.replace('l', 'L'); // 'HeLlo'

// replaceAll
const replacedAll = str.replaceAll('l', 'L'); // 'HeLLo'

// split
const arr = str.split(''); // ['H', 'e', 'l', 'l', 'o']
```

#### 截取方法

```javascript
// slice
const sliced = str.slice(1, 3); // 'el'

// substring
const sub = str.substring(1, 3); // 'el'

// substr
const sub2 = str.substr(1, 2); // 'el'
```

#### 其他方法

```javascript
// repeat
const repeated = str.repeat(2); // 'HelloHello'

// padStart
const padded = '5'.padStart(2, '0'); // '05'

// padEnd
const padded2 = '5'.padEnd(2, '0'); // '50'

// concat
const concat = str.concat(' World'); // 'Hello World'
```

### 对象方法

#### 基本方法

```javascript
// 创建对象
const obj = { name: 'Vue', version: 3 };
const obj2 = Object.create(null);
const obj3 = new Object({ name: 'Vue' });

// 访问属性
obj.name; // 'Vue'
obj['name']; // 'Vue'

// 添加属性
obj.author = 'Evan';

// 删除属性
delete obj.author;

// 检查属性
'name' in obj; // true
obj.hasOwnProperty('name'); // true
```

#### Object 静态方法

```javascript
// Object.keys
const keys = Object.keys(obj); // ['name', 'version']

// Object.values
const values = Object.values(obj); // ['Vue', 3]

// Object.entries
const entries = Object.entries(obj); // [['name', 'Vue'], ['version', 3]]

// Object.assign
const merged = Object.assign({}, obj, { author: 'Evan' });

// Object.create
const proto = { greet() { console.log('Hello'); } };
const obj4 = Object.create(proto);

// Object.defineProperty
Object.defineProperty(obj, 'readonly', {
  value: 'test',
  writable: false
});

// Object.defineProperties
Object.defineProperties(obj, {
  prop1: { value: 'value1' },
  prop2: { value: 'value2' }
});

// Object.freeze
const frozen = Object.freeze(obj);

// Object.seal
const sealed = Object.seal(obj);

// Object.getPrototypeOf
const proto2 = Object.getPrototypeOf(obj);

// Object.setPrototypeOf
Object.setPrototypeOf(obj, proto);
```

### Promise 方法

```javascript
// 创建 Promise
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Success');
  }, 1000);
});

// then
promise.then(value => {
  console.log(value);
});

// catch
promise.catch(error => {
  console.error(error);
});

// finally
promise.finally(() => {
  console.log('Finally');
});

// Promise.all
Promise.all([promise1, promise2, promise3])
  .then(values => console.log(values));

// Promise.allSettled
Promise.allSettled([promise1, promise2, promise3])
  .then(results => console.log(results));

// Promise.race
Promise.race([promise1, promise2, promise3])
  .then(value => console.log(value));

// Promise.any
Promise.any([promise1, promise2, promise3])
  .then(value => console.log(value));

// Promise.resolve
Promise.resolve('Success');

// Promise.reject
Promise.reject('Error');
```

### async/await

```javascript
// async 函数
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// 并行执行
async function parallel() {
  const [data1, data2] = await Promise.all([
    fetch('/api/data1').then(r => r.json()),
    fetch('/api/data2').then(r => r.json())
  ]);
  return { data1, data2 };
}
```

## Vue API 速查

### Vue3 Composition API

#### 响应式 API

```javascript
import { ref, reactive, computed, watch, watchEffect } from 'vue';

// ref
const count = ref(0);
count.value++;

// reactive
const state = reactive({
  count: 0,
  name: 'Vue3'
});
state.count++;

// readonly
const readonlyState = readonly(state);

// shallowRef
const shallow = shallowRef({ count: 0 });

// shallowReactive
const shallowState = shallowReactive({ count: 0 });

// toRef
const countRef = toRef(state, 'count');

// toRefs
const { count, name } = toRefs(state);

// isRef
isRef(count); // true

// isReactive
isReactive(state); // true

// isReadonly
isReadonly(readonlyState); // true

// unref
const value = unref(count);

// proxyRefs
const proxy = proxyRefs({ count });
```

#### 计算属性

```javascript
// computed
const doubled = computed(() => state.count * 2);

// computed getter/setter
const fullName = computed({
  get() {
    return state.firstName + ' ' + state.lastName;
  },
  set(value) {
    const [first, last] = value.split(' ');
    state.firstName = first;
    state.lastName = last;
  }
});
```

#### 监听器

```javascript
// watch
watch(() => state.count, (newVal, oldVal) => {
  console.log(`count changed from ${oldVal} to ${newVal}`);
});

// watch multiple sources
watch([() => state.count, () => state.name], ([newCount, newName], [oldCount, oldName]) => {
  console.log(`count: ${oldCount} -> ${newCount}, name: ${oldName} -> ${newName}`);
});

// watchEffect
watchEffect(() => {
  console.log(state.count);
});

// watchPostEffect
watchPostEffect(() => {
  console.log(state.count);
});

// watchSyncEffect
watchSyncEffect(() => {
  console.log(state.count);
});

// stop watch
const stopWatch = watch(() => state.count, (newVal) => {
  console.log(newVal);
});
stopWatch();
```

#### 生命周期

```javascript
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered
} from 'vue';

onBeforeMount(() => {
  console.log('before mount');
});

onMounted(() => {
  console.log('mounted');
});

onBeforeUpdate(() => {
  console.log('before update');
});

onUpdated(() => {
  console.log('updated');
});

onBeforeUnmount(() => {
  console.log('before unmount');
});

onUnmounted(() => {
  console.log('unmounted');
});
```

#### 依赖注入

```javascript
// provide
import { provide } from 'vue';

provide('theme', 'dark');
provide('user', reactive({ name: 'Vue' }));

// inject
import { inject } from 'vue';

const theme = inject('theme');
const user = inject('user', { name: 'Default' });
```

#### 组件

```javascript
// defineComponent
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MyComponent',
  props: {
    msg: String
  },
  setup(props) {
    return { props };
  }
});

// defineProps
const props = defineProps({
  msg: String,
  count: {
    type: Number,
    default: 0
  }
});

// defineEmits
const emit = defineEmits(['update', 'delete']);

// defineExpose
defineExpose({
  publicMethod() {
    console.log('public method');
  }
});
```

#### 模板引用

```javascript
import { ref, onMounted } from 'vue';

const inputRef = ref(null);

onMounted(() => {
  inputRef.value.focus();
});
```

### Vue Router

#### 基本配置

```javascript
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
```

#### 导航

```javascript
// 编程式导航
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// 导航到指定路由
router.push('/about');
router.push({ name: 'About' });
router.push({ path: '/about', query: { id: 1 } });

// 替换当前路由
router.replace('/about');

// 前进/后退
router.go(1);
router.back();
router.forward();
```

#### 路由信息

```javascript
// 当前路由信息
const route = useRoute();

// 路径
route.path; // '/about'

// 参数
route.params; // { id: '1' }

// 查询参数
route.query; // { page: 1 }

// 哈希
route.hash; // '#section'

// 名称
route.name; // 'About'
```

#### 导航守卫

```javascript
// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/login');
  } else {
    next();
  }
});

// 全局后置钩子
router.afterEach((to, from) => {
  console.log(`Navigated from ${from.path} to ${to.path}`);
});

// 路由独享守卫
const routes = [
  {
    path: '/admin',
    component: Admin,
    beforeEnter: (to, from, next) => {
      if (isAdmin()) {
        next();
      } else {
        next('/login');
      }
    }
  }
];

// 组件内守卫
export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log(vm);
    });
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  beforeRouteLeave(to, from, next) {
    if (hasUnsavedChanges()) {
      if (confirm('Discard changes?')) {
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  }
};
```

### Pinia

#### 定义 Store

```javascript
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  getters: {
    doubleCount: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count++;
    }
  }
});
```

#### 使用 Store

```javascript
import { useCounterStore } from './stores/counter';

const counter = useCounterStore();

// 访问 state
counter.count;

// 访问 getters
counter.doubleCount;

// 调用 actions
counter.increment();

// 重置 state
counter.$reset();

// 修改 state
counter.$patch({
  count: 10
});

// 订阅变化
counter.$subscribe((mutation, state) => {
  console.log(state);
});
```

## CSS 速查

### Flexbox

#### 容器属性

```css
.container {
  display: flex;

  /* 主轴方向 */
  flex-direction: row; /* row | row-reverse | column | column-reverse */

  /* 换行 */
  flex-wrap: nowrap; /* nowrap | wrap | wrap-reverse */

  /* 主轴对齐 */
  justify-content: flex-start; /* flex-start | flex-end | center | space-between | space-around | space-evenly */

  /* 交叉轴对齐 */
  align-items: stretch; /* stretch | flex-start | flex-end | center | baseline */

  /* 多行对齐 */
  align-content: stretch; /* stretch | flex-start | flex-end | center | space-between | space-around | space-evenly */

  /* 简写 */
  flex-flow: row nowrap;
}
```

#### 项目属性

```css
.item {
  /* 放大比例 */
  flex-grow: 0;

  /* 缩小比例 */
  flex-shrink: 1;

  /* 初始大小 */
  flex-basis: auto;

  /* 简写 */
  flex: 0 1 auto;

  /* 单独对齐 */
  align-self: auto; /* auto | flex-start | flex-end | center | baseline | stretch */

  /* 排序 */
  order: 0;
}
```

### Grid

#### 容器属性

```css
.container {
  display: grid;

  /* 列定义 */
  grid-template-columns: 1fr 1fr 1fr; /* repeat(3, 1fr) */

  /* 行定义 */
  grid-template-rows: 100px 100px; /* repeat(2, 100px) */

  /* 间距 */
  grid-gap: 10px; /* row-gap column-gap */

  /* 区域 */
  grid-template-areas:
    "header header header"
    "sidebar content content"
    "footer footer footer";

  /* 简写 */
  grid-template:
    "header header header" 100px
    "sidebar content content" 1fr
    "footer footer footer" 100px
    / 200px 1fr 1fr;
}
```

#### 项目属性

```css
.item {
  /* 列位置 */
  grid-column: 1 / 3; /* start / end */

  /* 行位置 */
  grid-row: 1 / 3;

  /* 区域 */
  grid-area: header;

  /* 对齐 */
  justify-self: start;
  align-self: start;
}
```

## 配置清单

### Vite 配置

```javascript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router', 'pinia']
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});
```

### Vue Router 配置

```javascript
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: '首页',
      requiresAuth: false
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
    meta: {
      title: '关于',
      requiresAuth: false
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Vue App';
  next();
});

export default router;
```

### Pinia 配置

```javascript
import { createPinia } from 'pinia';

const pinia = createPinia();

export default pinia;
```

## 面试 Checklist

### JavaScript

- [ ] 理解 var、let、const 的区别
- [ ] 掌握闭包的概念和应用
- [ ] 理解 this 的指向规则
- [ ] 掌握原型和原型链
- [ ] 理解事件循环机制
- [ ] 掌握 Promise 和 async/await
- [ ] 了解 ES6+ 新特性
- [ ] 掌握数组和字符串常用方法

### CSS

- [ ] 理解盒模型
- [ ] 掌握选择器和优先级
- [ ] 理解 Flexbox 布局
- [ ] 掌握 Grid 布局
- [ ] 理解响应式设计
- [ ] 掌握 CSS3 新特性
- [ ] 了解 CSS 动画和过渡

### Vue

- [ ] 理解 Vue2 响应式原理
- [ ] 理解 Vue3 响应式原理
- [ ] 掌握 Vue 生命周期
- [ ] 理解组件通信方式
- [ ] 掌握 Vue Router
- [ ] 掌握 Vuex/Pinia
- [ ] 理解 Virtual DOM
- [ ] 掌握 Composition API

### 工程化

- [ ] 了解 Webpack 配置
- [ ] 了解 Vite 配置
- [ ] 掌握 Git 常用命令
- [ ] 了解 CI/CD 流程
- [ ] 掌握性能优化方法

## 迁移速查表

### Vue2 到 Vue3

#### 全局 API

```javascript
// Vue2
import Vue from 'vue';
Vue.use(VueRouter);
Vue.component('my-component', MyComponent);
Vue.directive('focus', FocusDirective);
Vue.mixin(MyMixin);
Vue.prototype.$http = axios;

// Vue3
import { createApp } from 'vue';
const app = createApp(App);
app.use(router);
app.component('MyComponent', MyComponent);
app.directive('focus', FocusDirective);
app.mixin(MyMixin);
app.config.globalProperties.$http = axios;
```

#### 生命周期

```javascript
// Vue2
export default {
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {}
};

// Vue3
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue';

export default {
  setup() {
    onBeforeMount(() => {});
    onMounted(() => {});
    onBeforeUpdate(() => {});
    onUpdated(() => {});
    onBeforeUnmount(() => {});
    onUnmounted(() => {});
  }
};
```

#### v-model

```javascript
// Vue2
<ChildComponent v-model="value" />

// Vue3
<ChildComponent v-model="value" />

// Vue2 自定义 v-model
<ChildComponent v-model="value" />

// Vue3 自定义 v-model
<ChildComponent v-model:modelValue="value" @update:modelValue="value = $event" />
```

#### 插槽

```javascript
// Vue2
<slot name="header"></slot>
<template v-slot:header>
  <h1>Header</h1>
</template>

// Vue3
<slot name="header"></slot>
<template #header>
  <h1>Header</h1>
</template>
```

#### 过渡

```javascript
// Vue2
<transition name="fade">
  <div v-if="show">Hello</div>
</transition>

// Vue3
<Transition name="fade">
  <div v-if="show">Hello</div>
</Transition>
```

## 总结

快速参考部分提供了 JavaScript、Vue、CSS 的 API 速查、配置清单、面试 checklist 和迁移速查表。这些内容可以帮助你：

1. **快速查找**：快速查找常用的 API 和方法
2. **快速配置**：快速配置项目环境和工具
3. **面试准备**：通过 checklist 准备面试
4. **快速迁移**：快速从 Vue2 迁移到 Vue3

记住，熟能生巧，多加练习，你一定能够熟练掌握这些技术！