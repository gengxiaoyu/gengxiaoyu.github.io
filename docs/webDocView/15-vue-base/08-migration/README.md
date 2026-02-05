---
title: Vue2到Vue3迁移指南
createTime: 2026/02/04 15:24:41
permalink: /webDocView/15-vue-base/08-migration/
---

# Vue2到Vue3迁移指南

## 模块概述

Vue 3 带来了许多激动人心的新特性和性能改进，但从 Vue 2 迁移到 Vue 3 可能会面临一些挑战。本模块将系统介绍从 Vue 2 迁移到 Vue 3 的完整指南，包括迁移前的准备工作、具体的迁移步骤、常见的迁移问题和解决方案，以及最佳实践，帮助你顺利完成迁移过程。

## 知识点清单

### 1. Vue3新特性与改进
- **响应式系统**：Vue 3 使用 Proxy 替代 Object.defineProperty
- **Composition API**：提供更灵活的逻辑组织方式
- **Teleport**：允许将组件内容渲染到 DOM 树的任意位置
- **Suspense**：处理异步组件加载
- **Fragment**：支持多根节点组件
- **性能优化**：虚拟 DOM 改进、编译优化等
- **TypeScript支持**：更好的 TypeScript 集成

### 2. 迁移前准备
- **项目评估**：评估项目规模和复杂度
- **依赖分析**：分析项目依赖的兼容性
- **测试策略**：制定测试计划
- **迁移工具**：了解 Vue 官方提供的迁移工具
- **团队培训**：学习 Vue 3 的新特性

### 3. 迁移步骤
- **升级构建工具**：升级 Vue CLI 或使用 Vite
- **安装 Vue 3**：安装 Vue 3 和相关依赖
- **使用 @vue/compat**：使用兼容构建进行渐进式迁移
- **迁移组件**：逐步迁移组件
- **迁移状态管理**：从 Vuex 迁移到 Pinia
- **迁移路由**：升级 Vue Router
- **测试验证**：确保迁移后功能正常

### 4. 常见迁移问题与解决方案
- **响应式系统变化**：处理响应式数据的差异
- **Composition API 迁移**：从 Options API 迁移到 Composition API
- **指令变化**：处理指令的差异
- **生命周期钩子变化**：处理生命周期钩子的变更
- **事件处理变化**：处理事件处理的差异
- **构建工具配置**：处理构建工具的配置变化

### 5. 迁移工具
- **Vue 2 to 3 Migration Build**：Vue 官方提供的迁移构建
- **Vue Use**：提供 Composition API 的实用工具
- **ESLint 规则**：使用 ESLint 规则检测 Vue 3 不兼容的代码

### 6. 最佳实践
- **渐进式迁移**：采用渐进式迁移策略
- **代码组织**：使用 Composition API 组织代码
- **性能优化**：利用 Vue 3 的性能优化特性
- **测试覆盖**：确保充分的测试覆盖
- **文档更新**：更新项目文档

## 核心概念详解

### 1. Vue3新特性与改进

#### 响应式系统

Vue 3 使用 Proxy 替代 Object.defineProperty 实现响应式系统，带来以下改进：
- **更好的性能**：Proxy 是浏览器原生支持的，性能更好
- **支持更多数据类型**：可以监听 Map、Set、WeakMap、WeakSet 等数据类型
- **深度监听**：自动深度监听对象，不需要递归遍历
- **避免原型链污染**：Proxy 可以更好地处理原型链

#### Composition API

Composition API 是 Vue 3 的核心特性之一，提供了更灵活的逻辑组织方式：
- **逻辑复用**：更容易复用组件逻辑
- **类型推断**：更好的 TypeScript 支持
- **代码组织**：按功能组织代码，而不是按选项
- **树摇优化**：更好的 tree-shaking 支持

#### Teleport

Teleport 允许将组件内容渲染到 DOM 树的任意位置：
- **模态框**：更容易实现模态框
- **通知**：更容易实现全局通知
- **定位**：不受父组件样式的影响

#### Suspense

Suspense 处理异步组件加载：
- **加载状态**：更容易处理异步组件的加载状态
- **错误处理**：更好的错误处理机制
- **嵌套使用**：支持嵌套使用

#### Fragment

Fragment 支持多根节点组件：
- **更灵活的组件结构**：不再需要根节点
- **减少 DOM 层级**：减少不必要的 DOM 节点
- **更好的语义**：更符合 HTML 语义

### 2. 迁移前准备

#### 项目评估

在开始迁移前，需要评估项目的规模和复杂度：
- **项目大小**：小型项目可以一次性迁移，大型项目需要分阶段迁移
- **依赖情况**：评估项目依赖的兼容性
- **代码质量**：评估代码质量，清理技术债务
- **团队技能**：评估团队成员对 Vue 3 的熟悉程度

#### 依赖分析

分析项目依赖的兼容性：
- **Vue 相关依赖**：Vue Router、Vuex 等
- **第三方库**：检查第三方库是否支持 Vue 3
- **构建工具**：检查构建工具的兼容性

#### 测试策略

制定测试计划：
- **单元测试**：确保组件的功能正常
- **集成测试**：确保组件之间的交互正常
- **端到端测试**：确保整个应用的功能正常
- **性能测试**：确保迁移后性能不劣化

#### 迁移工具

了解 Vue 官方提供的迁移工具：
- **Vue 2 to 3 Migration Build**：Vue 官方提供的兼容构建
- **@vue/compat**：Vue 3 的兼容模式
- **eslint-plugin-vue**：检测 Vue 3 不兼容的代码

### 3. 迁移步骤

#### 升级构建工具

**使用 Vue CLI**：
```bash
# 升级 Vue CLI
npm install -g @vue/cli

# 创建 Vue 3 项目
vue create my-project

# 或者升级现有项目
vue upgrade
```

**使用 Vite**：
```bash
# 安装 Vite
npm create vite@latest my-project -- --template vue

# 进入项目目录
cd my-project

# 安装依赖
npm install
```

#### 安装 Vue 3

**使用 npm**：
```bash
# 卸载 Vue 2
npm uninstall vue vue-template-compiler

# 安装 Vue 3
npm install vue

# 安装 Vue Router 4
npm install vue-router@4

# 安装 Pinia（替代 Vuex）
npm install pinia
```

**使用 yarn**：
```bash
# 卸载 Vue 2
yarn remove vue vue-template-compiler

# 安装 Vue 3
yarn add vue

# 安装 Vue Router 4
yarn add vue-router@4

# 安装 Pinia
yarn add pinia
```

#### 使用 @vue/compat

**安装 @vue/compat**：
```bash
# 安装 @vue/compat
npm install @vue/compat
```

**配置 @vue/compat**：
```javascript
// vue.config.js
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        vue: '@vue/compat'
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false
      })
    ]
  }
}
```

#### 迁移组件

**基本组件迁移**：
```vue
<!-- Vue 2 组件 -->
<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Hello',
      message: 'Welcome to Vue 2',
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    console.log('Component mounted')
  }
}
</script>

<!-- Vue 3 组件（Options API） -->
<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Hello',
      message: 'Welcome to Vue 3',
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    console.log('Component mounted')
  }
}
</script>

<!-- Vue 3 组件（Composition API） -->
<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const title = ref('Hello')
const message = ref('Welcome to Vue 3')
const count = ref(0)

const increment = () => {
  count.value++
}

onMounted(() => {
  console.log('Component mounted')
})
</script>
```

**多根节点组件**：
```vue
<!-- Vue 2 组件（必须有单个根节点） -->
<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>
  </div>
</template>

<!-- Vue 3 组件（支持多根节点） -->
<template>
  <h1>{{ title }}</h1>
  <p>{{ message }}</p>
</template>
```

#### 迁移状态管理

**从 Vuex 3 迁移到 Vuex 4**：
```javascript
// Vuex 3
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    }
  }
})

// Vuex 4
import { createStore } from 'vuex'

export default createStore({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    }
  }
})
```

**从 Vuex 迁移到 Pinia**：
```javascript
// Vuex
import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
      name: 'John',
      age: 30
    }
  },
  getters: {
    isAdult: state => state.user.age >= 18
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    updateUser({ commit }, user) {
      commit('setUser', user)
    }
  }
})

// Pinia
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      name: 'John',
      age: 30
    }
  }),
  getters: {
    isAdult: (state) => state.user.age >= 18
  },
  actions: {
    updateUser(user) {
      this.user = user
    }
  }
})
```

#### 迁移路由

**从 Vue Router 3 迁移到 Vue Router 4**：
```javascript
// Vue Router 3
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('./views/About.vue')
    }
  ]
})

// Vue Router 4
import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('./views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
```

#### 测试验证

**单元测试**：
```bash
# 运行单元测试
npm run test:unit
```

**端到端测试**：
```bash
# 运行端到端测试
npm run test:e2e
```

**手动测试**：
- 验证所有功能正常
- 检查性能是否劣化
- 确保兼容性

### 4. 常见迁移问题与解决方案

#### 响应式系统变化

**问题**：Vue 3 的响应式系统使用 Proxy，与 Vue 2 的 Object.defineProperty 有差异

**解决方案**：
- 使用 `ref` 和 `reactive` 创建响应式数据
- 注意 `ref` 在模板中自动解包，但在 JavaScript 中需要使用 `.value`
- 使用 `toRef` 和 `toRefs` 保持响应式

```javascript
// Vue 2
const vm = new Vue({
  data() {
    return {
      user: {
        name: 'John',
        age: 30
      }
    }
  }
})

// Vue 3
import { ref, reactive } from 'vue'

// 使用 ref
const count = ref(0)
count.value++ // 需要使用 .value

// 使用 reactive
const user = reactive({
  name: 'John',
  age: 30
})
user.age++ // 直接修改
```

#### Composition API 迁移

**问题**：从 Options API 迁移到 Composition API

**解决方案**：
- 逐步迁移，先使用 Options API，再逐步使用 Composition API
- 使用 `setup` 函数作为 Composition API 的入口
- 使用 `script setup` 语法糖简化代码

```vue
<!-- Options API -->
<template>
  <div>{{ count }}</div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}
</script>

<!-- Composition API（setup 函数） -->
<template>
  <div>{{ count }}</div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    
    const increment = () => {
      count.value++
    }
    
    return {
      count,
      increment
    }
  }
}
</script>

<!-- Composition API（script setup） -->
<template>
  <div>{{ count }}</div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)

const increment = () => {
  count.value++
}
</script>
```

#### 指令变化

**问题**：Vue 3 的指令语法有变化

**解决方案**：
- 注意 `v-model` 的变化
- 了解 `v-for` 和 `v-if` 的优先级变化
- 处理自定义指令的变化

```vue
<!-- Vue 2 v-model -->
<template>
  <input v-model="message">
</template>

<!-- Vue 3 v-model -->
<template>
  <input v-model="message">
</template>

<!-- Vue 2 自定义指令 -->
Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
})

<!-- Vue 3 自定义指令 -->
app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})
```

#### 生命周期钩子变化

**问题**：Vue 3 的生命周期钩子有变化

**解决方案**：
- 了解 Vue 3 生命周期钩子的新名称
- 在 Composition API 中使用新的生命周期钩子

| Vue 2 | Vue 3（Options API） | Vue 3（Composition API） |
|-------|---------------------|-------------------------|
| beforeCreate | beforeCreate | setup |
| created | created | setup |
| beforeMount | beforeMount | onBeforeMount |
| mounted | mounted | onMounted |
| beforeUpdate | beforeUpdate | onBeforeUpdate |
| updated | updated | onUpdated |
| beforeDestroy | beforeUnmount | onBeforeUnmount |
| destroyed | unmounted | onUnmounted |
| errorCaptured | errorCaptured | onErrorCaptured |

```javascript
// Vue 2
export default {
  beforeMount() {
    console.log('Before mount')
  },
  mounted() {
    console.log('Mounted')
  },
  beforeDestroy() {
    console.log('Before destroy')
  },
  destroyed() {
    console.log('Destroyed')
  }
}

// Vue 3（Options API）
export default {
  beforeMount() {
    console.log('Before mount')
  },
  mounted() {
    console.log('Mounted')
  },
  beforeUnmount() {
    console.log('Before unmount')
  },
  unmounted() {
    console.log('Unmounted')
  }
}

// Vue 3（Composition API）
import { onBeforeMount, onMounted, onBeforeUnmount, onUnmounted } from 'vue'

export default {
  setup() {
    onBeforeMount(() => {
      console.log('Before mount')
    })
    
    onMounted(() => {
      console.log('Mounted')
    })
    
    onBeforeUnmount(() => {
      console.log('Before unmount')
    })
    
    onUnmounted(() => {
      console.log('Unmounted')
    })
  }
}
```

#### 事件处理变化

**问题**：Vue 3 的事件处理有变化

**解决方案**：
- 了解事件修饰符的变化
- 处理自定义事件的变化
- 使用 `emits` 选项声明事件

```vue
<!-- Vue 2 事件处理 -->
<template>
  <button @click.stop="handleClick">Click</button>
</template>

<script>
export default {
  methods: {
    handleClick() {
      this.$emit('custom-event', 'data')
    }
  }
}
</script>

<!-- Vue 3 事件处理 -->
<template>
  <button @click.stop="handleClick">Click</button>
</template>

<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['custom-event'])

const handleClick = () => {
  emit('custom-event', 'data')
}
</script>
```

#### 构建工具配置

**问题**：构建工具配置需要调整

**解决方案**：
- 使用 Vite 简化构建配置
- 调整 Vue CLI 配置
- 确保 TypeScript 配置正确

**Vite 配置**：
```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
```

**Vue CLI 配置**：
```javascript
// vue.config.js
module.exports = {
  transpileDependencies: true,
  configureWebpack: {
    // 配置
  }
}
```

### 5. 迁移工具

#### Vue 2 to 3 Migration Build

**安装**：
```bash
npm install @vue/compat
```

**配置**：
```javascript
// webpack.config.js
module.exports = {
  resolve: {
    alias: {
      vue: '@vue/compat'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    })
  ]
}
```

**使用**：
- 启用兼容模式后，可以使用 Vue 2 的 API
- 逐步迁移，移除兼容代码

#### ESLint 规则

**安装**：
```bash
npm install eslint-plugin-vue
```

**配置**：
```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'plugin:vue/vue3-recommended'
  ],
  rules: {
    // 规则配置
  }
}
```

**使用**：
- 运行 ESLint 检测不兼容代码
- 修复检测到的问题

### 6. 最佳实践

#### 渐进式迁移

- **分阶段迁移**：先迁移核心功能，再迁移次要功能
- **使用 @vue/compat**：使用兼容构建进行渐进式迁移
- **测试驱动**：每迁移一部分，就测试一部分
- **文档更新**：及时更新文档

#### 代码组织

- **按功能组织代码**：使用 Composition API 按功能组织代码
- **使用 composables**：将复用逻辑提取为 composables
- **命名规范**：使用一致的命名规范
- **代码分割**：合理使用代码分割

#### 性能优化

- **利用编译优化**：Vue 3 的编译优化
- **使用 Teleport**：合理使用 Teleport
- **使用 Suspense**：处理异步组件
- **虚拟滚动**：处理大量数据

#### 测试覆盖

- **单元测试**：为每个组件编写单元测试
- **集成测试**：测试组件之间的交互
- **端到端测试**：测试整个应用的功能
- **性能测试**：确保性能不劣化

#### 文档更新

- **更新 API 文档**：更新使用的 API
- **更新示例代码**：更新示例代码
- **更新迁移指南**：记录迁移过程和注意事项
- **团队培训**：培训团队成员使用 Vue 3

## 实战练习

### 1. 迁移一个简单的 Vue 2 组件

**Vue 2 组件**：
```vue
<template>
  <div class="counter">
    <h2>Counter</h2>
    <div class="counter-value">{{ count }}</div>
    <div class="counter-controls">
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
      <button @click="reset">Reset</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
    reset() {
      this.count = 0
    }
  },
  mounted() {
    console.log('Counter component mounted')
  },
  beforeDestroy() {
    console.log('Counter component before destroy')
  }
}
</script>

<style scoped>
.counter {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.counter-value {
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  margin: 20px 0;
}

.counter-controls {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.counter-controls button {
  padding: 10px 20px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #f8f9fa;
  cursor: pointer;
}

.counter-controls button:hover {
  background: #e9ecef;
}
</style>
```

**Vue 3 组件（Options API）**：
```vue
<template>
  <div class="counter">
    <h2>Counter</h2>
    <div class="counter-value">{{ count }}</div>
    <div class="counter-controls">
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
      <button @click="reset">Reset</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
    reset() {
      this.count = 0
    }
  },
  mounted() {
    console.log('Counter component mounted')
  },
  beforeUnmount() {
    console.log('Counter component before unmount')
  }
}
</script>

<style scoped>
/* 样式与 Vue 2 版本相同 */
</style>
```

**Vue 3 组件（Composition API）**：
```vue
<template>
  <div class="counter">
    <h2>Counter</h2>
    <div class="counter-value">{{ count }}</div>
    <div class="counter-controls">
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
      <button @click="reset">Reset</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const count = ref(0)

const increment = () => {
  count.value++
}

const decrement = () => {
  count.value--
}

const reset = () => {
  count.value = 0
}

onMounted(() => {
  console.log('Counter component mounted')
})

onBeforeUnmount(() => {
  console.log('Counter component before unmount')
})
</script>

<style scoped>
/* 样式与 Vue 2 版本相同 */
</style>
```

### 2. 迁移状态管理

**Vuex 3**：
```javascript
// store/index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [
      { id: 1, name: 'Product 1', price: 100 },
      { id: 2, name: 'Product 2', price: 200 }
    ],
    cart: []
  },
  getters: {
    totalPrice: state => {
      return state.cart.reduce((total, item) => {
        return total + item.price * item.quantity
      }, 0)
    }
  },
  mutations: {
    addToCart(state, product) {
      const existingItem = state.cart.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        state.cart.push({ ...product, quantity: 1 })
      }
    },
    removeFromCart(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId)
    }
  },
  actions: {
    addToCartAsync({ commit }, product) {
      setTimeout(() => {
        commit('addToCart', product)
      }, 1000)
    }
  }
})
```

**Pinia**：
```javascript
// stores/product.js
import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [
      { id: 1, name: 'Product 1', price: 100 },
      { id: 2, name: 'Product 2', price: 200 }
    ],
    cart: []
  }),
  getters: {
    totalPrice: (state) => {
      return state.cart.reduce((total, item) => {
        return total + item.price * item.quantity
      }, 0)
    }
  },
  actions: {
    addToCart(product) {
      const existingItem = this.cart.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.cart.push({ ...product, quantity: 1 })
      }
    },
    removeFromCart(productId) {
      this.cart = this.cart.filter(item => item.id !== productId)
    },
    async addToCartAsync(product) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.addToCart(product)
    }
  }
})
```

### 3. 迁移路由

**Vue Router 3**：
```javascript
// router/index.js
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Product from '@/views/Product.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/product/:id',
      name: 'Product',
      component: Product,
      props: true
    }
  ]
})
```

**Vue Router 4**：
```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Product from '@/views/Product.vue'

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
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: Product,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
```

## 迁移策略与最佳实践

### 1. 渐进式迁移策略

- **评估阶段**：评估项目规模和复杂度
- **准备阶段**：安装迁移工具，分析依赖
- **试点阶段**：选择一个小模块进行迁移
- **实施阶段**：逐步迁移所有模块
- **验证阶段**：测试所有功能
- **优化阶段**：利用 Vue 3 的新特性优化代码

### 2. 代码组织最佳实践

- **使用 Composition API**：按功能组织代码
- **提取 composables**：将复用逻辑提取为 composables
- **使用 script setup**：简化代码
- **合理使用 TypeScript**：提高代码质量

### 3. 性能优化最佳实践

- **利用编译优化**：Vue 3 的编译优化
- **使用 Teleport**：合理使用 Teleport
- **使用 Suspense**：处理异步组件
- **虚拟滚动**：处理大量数据
- **避免不必要的响应式**：使用 `shallowRef` 和 `shallowReactive`

### 4. 测试最佳实践

- **单元测试**：为每个组件编写单元测试
- **集成测试**：测试组件之间的交互
- **端到端测试**：测试整个应用的功能
- **性能测试**：确保性能不劣化
- **CI/CD**：集成到 CI/CD 流程

### 5. 团队协作最佳实践

- **培训**：培训团队成员使用 Vue 3
- **文档**：更新项目文档
- **代码审查**：确保代码质量
- **规范**：制定 Vue 3 的代码规范
- **分享**：分享迁移经验

## 常见迁移陷阱

1. **过度使用 @vue/compat**：依赖兼容构建，没有真正迁移到 Vue 3
2. **忽略 TypeScript**：不利用 Vue 3 的 TypeScript 支持
3. **不使用 Composition API**：继续使用 Options API，没有利用 Composition API 的优势
4. **性能回归**：没有利用 Vue 3 的性能优化特性
5. **测试不足**：迁移后没有充分测试
6. **依赖不兼容**：使用不兼容 Vue 3 的依赖
7. **代码组织混乱**：没有合理组织 Composition API 代码
8. **忽略最佳实践**：不遵循 Vue 3 的最佳实践

## 学习资源

### 官方文档
- [Vue 3 官方文档](https://v3.vuejs.org/)
- [Vue 3 迁移指南](https://v3.vuejs.org/guide/migration/introduction.html)
- [Pinia 官方文档](https://pinia.vuejs.org/)
- [Vue Router 4 官方文档](https://next.router.vuejs.org/)

### 教程和课程
- [Vue Mastery](https://www.vuemastery.com/)
- [Vue School](https://vueschool.io/)
- [Frontend Masters](https://frontendmasters.com/)

### 社区资源
- [Vue 论坛](https://forum.vuejs.org/)
- [Vue  Reddit](https://www.reddit.com/r/vuejs/)
- [Vue GitHub](https://github.com/vuejs/vue)

### 工具
- [Vue DevTools](https://devtools.vuejs.org/)
- [Vite](https://vitejs.dev/)
- [ESLint Plugin Vue](https://eslint.vuejs.org/)

## 总结

从 Vue 2 迁移到 Vue 3 是一个渐进的过程，需要充分的准备和规划。通过本模块的学习，你应该能够：

1. **了解 Vue 3 的新特性**：掌握 Vue 3 的核心特性和改进
2. **制定迁移策略**：根据项目情况制定合理的迁移策略
3. **执行迁移步骤**：按照步骤逐步迁移项目
4. **解决迁移问题**：处理常见的迁移问题
5. **应用最佳实践**：利用 Vue 3 的优势优化代码

Vue 3 带来了许多激动人心的新特性和性能改进，通过合理的迁移策略，你可以充分利用这些优势，构建更高效、更可维护的 Vue 应用。

记住，迁移是一个学习的过程，不要急于求成，逐步迁移，确保每个步骤都正确无误。祝你迁移顺利！