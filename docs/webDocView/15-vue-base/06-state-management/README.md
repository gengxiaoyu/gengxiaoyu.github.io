---
title: Vue状态管理
createTime: 2026/02/04 15:24:32
permalink: /webDocView/15-vue-base/06-state-management/
---

# Vue状态管理

## 模块概述

状态管理是Vue应用开发中的重要组成部分，尤其是在处理复杂的应用状态时。本模块将系统介绍Vue的状态管理解决方案，包括传统的Vuex和Vue 3推荐的Pinia，帮助你理解状态管理的核心概念和最佳实践，为构建可维护的大型应用打下基础。

## 知识点清单

### 1. 状态管理基础
- **状态管理概念**：什么是状态管理，为什么需要状态管理
- **状态管理模式**：集中式存储、单向数据流
- **Vue应用中的状态类型**：组件内状态、应用级状态
- **状态管理库选择**：Vuex vs Pinia

### 2. Vuex核心概念
- **Store**：Vuex的核心，包含应用状态
- **State**：存储状态的对象
- **Getters**：计算属性，从state中派生状态
- **Mutations**：修改状态的方法，必须是同步的
- **Actions**：异步操作，可以提交mutations
- **Modules**：模块，将store分割成多个模块
- **命名空间**：模块的命名空间，避免命名冲突

### 3. Vuex使用
- **安装和配置**：Vuex的安装和基本配置
- **创建Store**：定义state、getters、mutations、actions
- **在组件中使用**：mapState、mapGetters、mapMutations、mapActions
- **模块的使用**：创建和使用模块
- **插件**：Vuex插件的使用
- **严格模式**：Vuex的严格模式

### 4. Pinia核心概念
- **Store**：Pinia的核心，每个store都是一个独立的模块
- **State**：存储状态的对象
- **Getters**：计算属性，从state中派生状态
- **Actions**：可以是同步或异步的方法
- **Plugins**：Pinia插件
- **DevTools**：Pinia的DevTools支持

### 5. Pinia使用
- **安装和配置**：Pinia的安装和基本配置
- **创建Store**：定义state、getters、actions
- **在组件中使用**：使用useStore
- **组合式API**：在Composition API中使用Pinia
- **插件**：Pinia插件的使用

### 6. Vuex vs Pinia
- **对比**：两者的区别和特点
- **迁移**：从Vuex迁移到Pinia
- **选择建议**：根据项目情况选择合适的状态管理库

### 7. 状态管理最佳实践
- **状态设计**：合理设计状态结构
- **模块化**：按功能模块化状态
- **命名规范**：统一的命名规范
- **异步操作**：合理处理异步操作
- **性能优化**：状态管理的性能优化
- **调试**：状态管理的调试技巧

### 8. 高级特性
- **持久化**：状态的持久化存储
- **中间件**：使用中间件处理状态
- **类型安全**：TypeScript支持
- **服务端渲染**：在SSR中使用状态管理

## 核心概念详解

### 1. 状态管理基础

#### 状态管理概念

状态管理是指管理应用中可以共享的数据和状态的方式。在Vue应用中，状态可以是：
- **组件内状态**：仅在组件内部使用的状态，通过data属性管理
- **应用级状态**：需要在多个组件间共享的状态，需要状态管理库管理

#### 单向数据流

Vue的状态管理遵循单向数据流模式：
1. **State**：存储应用状态
2. **View**：根据State渲染视图
3. **Actions**：用户交互或其他操作触发Actions
4. **Mutations**：Actions提交Mutations修改State
5. **State更新**：State更新后，View自动更新

### 2. Vuex核心概念

#### Store

Store是Vuex的核心，它是一个容器，包含应用的大部分状态。

```javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
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
  },
  getters: {
    doubleCount: state => state.count * 2
  }
})

export default store
```

#### State

State是存储应用状态的对象，是Vuex的数据源。

```javascript
const store = new Vuex.Store({
  state: {
    count: 0,
    user: {
      name: 'John',
      age: 30
    },
    todos: [
      { id: 1, text: 'Learn Vue', done: true },
      { id: 2, text: 'Learn Vuex', done: false }
    ]
  }
})
```

#### Getters

Getters是从state中派生的状态，相当于Vue中的计算属性。

```javascript
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: 'Learn Vue', done: true },
      { id: 2, text: 'Learn Vuex', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    },
    getTodoById: (state) => (id) => {
      return state.todos.find(todo => todo.id === id)
    }
  }
})
```

#### Mutations

Mutations是修改state的方法，必须是同步的。

```javascript
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++
    },
    incrementBy(state, payload) {
      state.count += payload.amount
    }
  }
})

// 提交mutation
store.commit('increment')
store.commit('incrementBy', { amount: 10 })
// 或者使用对象风格的提交方式
store.commit({ type: 'incrementBy', amount: 10 })
```

#### Actions

Actions是异步操作，可以提交mutations。

```javascript
const store = new Vuex.Store({
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
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('increment')
          resolve()
        }, 1000)
      })
    },
    incrementAsyncWithPayload({ commit }, payload) {
      setTimeout(() => {
        commit('incrementBy', payload)
      }, 1000)
    }
  }
})

// 分发action
store.dispatch('incrementAsync')
  .then(() => {
    // 异步操作完成
  })

// 带参数的action
store.dispatch('incrementAsyncWithPayload', { amount: 10 })
```

#### Modules

Modules是将store分割成多个模块，每个模块可以有自己的state、getters、mutations和actions。

```javascript
const userModule = {
  namespaced: true,
  state: {
    name: 'John',
    age: 30
  },
  getters: {
    fullName: state => state.name
  },
  mutations: {
    setName(state, name) {
      state.name = name
    }
  },
  actions: {
    updateName({ commit }, name) {
      commit('setName', name)
    }
  }
}

const store = new Vuex.Store({
  modules: {
    user: userModule
  }
})

// 访问模块状态
store.state.user.name

// 提交模块的mutation
store.commit('user/setName', 'Jane')

// 分发模块的action
store.dispatch('user/updateName', 'Jane')

// 访问模块的getter
store.getters['user/fullName']
```

### 3. Vuex使用

#### 安装和配置

```bash
# 安装Vuex
npm install vuex
```

```javascript
// store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import products from './modules/products'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    doubleCount: state => state.count * 2
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
  },
  modules: {
    user,
    products
  }
})
```

```javascript
// main.js
import Vue from 'vue'
import App from './App.vue'
import store from './store'

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
```

#### 在组件中使用

```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double Count: {{ doubleCount }}</p>
    <button @click="increment">Increment</button>
    <button @click="incrementAsync">Increment Async</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      count: state => state.count
    }),
    ...mapGetters([
      'doubleCount'
    ])
  },
  methods: {
    ...mapMutations([
      'increment'
    ]),
    ...mapActions([
      'incrementAsync'
    ])
  }
}
</script>
```

#### 模块的使用

```javascript
// store/modules/user.js
export default {
  namespaced: true,
  state: {
    name: 'John',
    age: 30
  },
  getters: {
    fullName: state => state.name
  },
  mutations: {
    setName(state, name) {
      state.name = name
    },
    setAge(state, age) {
      state.age = age
    }
  },
  actions: {
    updateName({ commit }, name) {
      commit('setName', name)
    },
    updateAge({ commit }, age) {
      commit('setAge', age)
    }
  }
}
```

```vue
<template>
  <div>
    <p>Name: {{ name }}</p>
    <p>Age: {{ age }}</p>
    <button @click="updateName('Jane')">Update Name</button>
    <button @click="updateAge(25)">Update Age</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('user', [
      'name',
      'age'
    ])
  },
  methods: {
    ...mapActions('user', [
      'updateName',
      'updateAge'
    ])
  }
}
</script>
```

### 4. Pinia核心概念

#### Store

Store是Pinia的核心，每个store都是一个独立的模块。

```javascript
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    name: 'Eduardo'
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
    doubleCountPlusOne() {
      return this.doubleCount + 1
    }
  },
  actions: {
    increment() {
      this.count++
    },
    async incrementAsync() {
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.increment()
    },
    incrementBy(amount) {
      this.count += amount
    }
  }
})
```

#### State

State是存储状态的对象，在Pinia中，state是一个函数，返回状态对象。

```javascript
export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      name: 'John',
      age: 30,
      email: 'john@example.com'
    },
    tokens: {
      access: '',
      refresh: ''
    }
  })
})
```

#### Getters

Getters是从state中派生的状态，在Pinia中，getters是计算属性。

```javascript
export const useProductStore = defineStore('product', {
  state: () => ({
    products: [
      { id: 1, name: 'Product 1', price: 100, inStock: true },
      { id: 2, name: 'Product 2', price: 200, inStock: false },
      { id: 3, name: 'Product 3', price: 300, inStock: true }
    ]
  }),
  getters: {
    inStockProducts: (state) => {
      return state.products.filter(product => product.inStock)
    },
    productById: (state) => {
      return (productId) => state.products.find(product => product.id === productId)
    },
    totalPrice: (state) => {
      return state.products.reduce((total, product) => total + product.price, 0)
    }
  }
})
```

#### Actions

Actions是可以是同步或异步的方法，在Pinia中，actions可以直接修改state。

```javascript
export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchTodos() {
      this.loading = true
      this.error = null
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos')
        this.todos = await response.json()
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    addTodo(todo) {
      this.todos.push(todo)
    },
    toggleTodo(id) {
      const todo = this.todos.find(todo => todo.id === id)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    deleteTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id)
    }
  }
})
```

### 5. Pinia使用

#### 安装和配置

```bash
# 安装Pinia
npm install pinia
```

```javascript
// main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')
```

#### 创建Store

```javascript
// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    name: 'Eduardo'
  }),
  getters: {
    doubleCount: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count++
    }
  }
})

// stores/user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token
  },
  actions: {
    async login(credentials) {
      // 模拟API调用
      const response = await new Promise(resolve => {
        setTimeout(() => {
          resolve({ 
            user: { id: 1, name: 'John' }, 
            token: 'mock-token' 
          })
        }, 1000)
      })
      
      this.user = response.user
      this.token = response.token
      localStorage.setItem('token', response.token)
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    }
  }
})
```

#### 在组件中使用

```vue
<template>
  <div>
    <h1>Counter</h1>
    <p>Count: {{ counter.count }}</p>
    <p>Double Count: {{ counter.doubleCount }}</p>
    <button @click="counter.increment">Increment</button>
    <button @click="counter.incrementAsync">Increment Async</button>
    <button @click="counter.incrementBy(5)">Increment By 5</button>
  </div>
</template>

<script setup>
import { useCounterStore } from '../stores/counter'

const counter = useCounterStore()
</script>
```

#### 在Composition API中使用

```vue
<template>
  <div>
    <h1>User</h1>
    <div v-if="userStore.isAuthenticated">
      <p>Welcome, {{ userStore.user.name }}!</p>
      <button @click="userStore.logout">Logout</button>
    </div>
    <div v-else>
      <button @click="login">Login</button>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/user'

const userStore = useUserStore()

const login = async () => {
  await userStore.login({ username: 'test', password: 'test' })
}
</script>
```

### 6. Vuex vs Pinia

#### 对比

| 特性 | Vuex | Pinia |
|------|------|-------|
| 版本支持 | Vue 2 | Vue 2和Vue 3 |
| API设计 | 复杂，需要mutations和actions分离 | 简单，只有state、getters和actions |
| TypeScript支持 | 有限，需要额外配置 | 优秀，内置TypeScript支持 |
| DevTools支持 | 支持 | 更好的支持，包括时间旅行 |
| 模块化 | 需要modules | 天然模块化，每个store都是模块 |
| 命名空间 | 需要显式开启 | 天然支持命名空间 |
| 代码分割 | 有限 | 更好的代码分割支持 |
| 体积 | 较大 | 较小 |

#### 迁移

从Vuex迁移到Pinia的步骤：

1. **安装Pinia**：`npm install pinia`
2. **创建Pinia实例**：在main.js中创建并使用Pinia
3. **重写Store**：将Vuex的store重写为Pinia的store
4. **更新组件**：将组件中的Vuex使用更新为Pinia使用

### 7. 状态管理最佳实践

#### 状态设计

- **扁平化状态**：避免深层嵌套的状态结构
- **模块化**：按功能模块化状态
- **单一数据源**：所有状态都应该在store中管理
- **不可变数据**：虽然Vuex和Pinia允许直接修改状态，但建议保持状态的不可变性

#### 模块化

- **按功能划分模块**：将相关的状态和逻辑放在一个模块中
- **使用命名空间**：在Vuex中使用命名空间，避免命名冲突
- **合理拆分**：根据项目大小合理拆分模块

#### 命名规范

- **State**：使用驼峰命名法，如`userInfo`
- **Getters**：使用驼峰命名法，如`getUserInfo`
- **Mutations**：使用大写蛇形命名法，如`SET_USER_INFO`
- **Actions**：使用驼峰命名法，如`fetchUserInfo`
- **Modules**：使用小写蛇形命名法，如`user_module`

#### 异步操作

- **在Actions中处理异步操作**：在Vuex中，异步操作应该在actions中处理
- **使用async/await**：使用async/await处理异步操作
- **错误处理**：合理处理异步操作中的错误
- **加载状态**：管理异步操作的加载状态

#### 性能优化

- **使用计算属性**：对于派生状态，使用getters
- **避免频繁提交mutations**：批量处理状态更新
- **使用模块化**：按功能模块化，减少不必要的状态更新
- **使用缓存**：对于频繁使用的计算结果，使用缓存

#### 调试

- **使用DevTools**：使用Vue DevTools调试状态
- **日志记录**：使用插件记录状态变更
- **严格模式**：在开发环境中使用严格模式

### 8. 高级特性

#### 持久化

**Vuex持久化**：

```bash
# 安装vuex-persist
npm install vuex-persist
```

```javascript
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const store = new Vuex.Store({
  // ...
  plugins: [vuexLocal.plugin]
})
```

**Pinia持久化**：

```bash
# 安装pinia-plugin-persistedstate
npm install pinia-plugin-persistedstate
```

```javascript
// main.js
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
```

```javascript
// stores/user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: null
  }),
  persist: true, // 启用持久化
  // 或者自定义持久化配置
  // persist: {
  //   key: 'user',
  //   storage: localStorage,
  //   paths: ['user', 'token']
  // },
  // ...
})
```

#### 中间件

**Vuex中间件**：

```javascript
const logger = store => {
  store.subscribe((mutation, state) => {
    console.log('Mutation:', mutation.type)
    console.log('Payload:', mutation.payload)
    console.log('State after mutation:', state)
  })
}

const store = new Vuex.Store({
  // ...
  plugins: [logger]
})
```

**Pinia中间件**：

```javascript
// main.js
import { createPinia } from 'pinia'

const pinia = createPinia()

// 添加中间件
pinia.use(({ store }) => {
  store.$subscribe((mutation, state) => {
    console.log('Mutation:', mutation.type)
    console.log('Store:', store.$id)
    console.log('State:', state)
  })
  
  store.$onAction(({ name, store, args, after, onError }) => {
    console.log(`Action ${name} started with args:`, args)
    after((result) => {
      console.log(`Action ${name} finished with result:`, result)
    })
    onError((error) => {
      console.error(`Action ${name} failed with error:`, error)
    })
  })
})
```

#### TypeScript支持

**Vuex TypeScript**：

```typescript
// store/types.ts
export interface User {
  id: number
  name: string
  email: string
}

export interface RootState {
  count: number
  user: User | null
}

// store/index.ts
import { createStore } from 'vuex'
import { RootState } from './types'

export default createStore<RootState>({
  state: {
    count: 0,
    user: null
  },
  getters: {
    doubleCount: (state) => state.count * 2,
    isLoggedIn: (state) => !!state.user
  },
  mutations: {
    increment(state) {
      state.count++
    },
    setUser(state, user: User | null) {
      state.user = user
    }
  },
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    },
    login({ commit }, user: User) {
      commit('setUser', user)
    }
  }
})
```

**Pinia TypeScript**：

```typescript
// stores/user.ts
import { defineStore } from 'pinia'

export interface User {
  id: number
  name: string
  email: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    token: null as string | null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    userEmail: (state) => state.user?.email
  },
  actions: {
    login(user: User, token: string) {
      this.user = user
      this.token = token
    },
    logout() {
      this.user = null
      this.token = null
    }
  }
})
```

## 实战练习

### 1. 实现一个计数器应用

**使用Vuex**：

```javascript
// store/index.js
import { createStore } from 'vuex'

export default createStore({
  state: {
    count: 0,
    history: []
  },
  getters: {
    doubleCount: state => state.count * 2,
    tripleCount: state => state.count * 3,
    history: state => state.history
  },
  mutations: {
    increment(state) {
      state.count++
      state.history.push({ type: 'increment', value: state.count })
    },
    decrement(state) {
      state.count--
      state.history.push({ type: 'decrement', value: state.count })
    },
    reset(state) {
      state.count = 0
      state.history.push({ type: 'reset', value: state.count })
    },
    incrementBy(state, amount) {
      state.count += amount
      state.history.push({ type: 'incrementBy', value: state.count, amount })
    }
  },
  actions: {
    incrementAsync({ commit }) {
      return new Promise(resolve => {
        setTimeout(() => {
          commit('increment')
          resolve()
        }, 1000)
      })
    },
    incrementByAsync({ commit }, amount) {
      return new Promise(resolve => {
        setTimeout(() => {
          commit('incrementBy', amount)
          resolve()
        }, 1000)
      })
    }
  }
})
```

```vue
<template>
  <div class="counter-app">
    <h2>Vuex Counter</h2>
    <div class="counter-value">{{ count }}</div>
    <div class="counter-stats">
      <p>Double: {{ doubleCount }}</p>
      <p>Triple: {{ tripleCount }}</p>
    </div>
    <div class="counter-controls">
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
      <button @click="reset">Reset</button>
      <button @click="incrementAsync">Increment Async</button>
      <button @click="incrementByAsync(5)">Increment By 5 Async</button>
    </div>
    <div class="counter-history">
      <h3>History</h3>
      <ul>
        <li v-for="(item, index) in history" :key="index">
          {{ item.type }}: {{ item.value }}
          <span v-if="item.amount"> ({{ item.amount }})</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['count']),
    ...mapGetters(['doubleCount', 'tripleCount', 'history'])
  },
  methods: {
    ...mapMutations(['increment', 'decrement', 'reset']),
    ...mapActions(['incrementAsync', 'incrementByAsync'])
  }
}
</script>

<style scoped>
.counter-app {
  max-width: 600px;
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

.counter-stats {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
}

.counter-controls {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
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

.counter-history {
  margin-top: 30px;
}

.counter-history ul {
  list-style: none;
  padding: 0;
}

.counter-history li {
  padding: 8px;
  border-bottom: 1px solid #eee;
}
</style>
```

**使用Pinia**：

```javascript
// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    history: []
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
    tripleCount: (state) => state.count * 3
  },
  actions: {
    increment() {
      this.count++
      this.history.push({ type: 'increment', value: this.count })
    },
    decrement() {
      this.count--
      this.history.push({ type: 'decrement', value: this.count })
    },
    reset() {
      this.count = 0
      this.history.push({ type: 'reset', value: this.count })
    },
    incrementBy(amount) {
      this.count += amount
      this.history.push({ type: 'incrementBy', value: this.count, amount })
    },
    async incrementAsync() {
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.increment()
    },
    async incrementByAsync(amount) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.incrementBy(amount)
    }
  }
})
```

```vue
<template>
  <div class="counter-app">
    <h2>Pinia Counter</h2>
    <div class="counter-value">{{ counter.count }}</div>
    <div class="counter-stats">
      <p>Double: {{ counter.doubleCount }}</p>
      <p>Triple: {{ counter.tripleCount }}</p>
    </div>
    <div class="counter-controls">
      <button @click="counter.increment">+</button>
      <button @click="counter.decrement">-</button>
      <button @click="counter.reset">Reset</button>
      <button @click="counter.incrementAsync">Increment Async</button>
      <button @click="counter.incrementByAsync(5)">Increment By 5 Async</button>
    </div>
    <div class="counter-history">
      <h3>History</h3>
      <ul>
        <li v-for="(item, index) in counter.history" :key="index">
          {{ item.type }}: {{ item.value }}
          <span v-if="item.amount"> ({{ item.amount }})</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from '../stores/counter'

const counter = useCounterStore()
</script>

<style scoped>
/* 样式与Vuex版本相同 */
</style>
```

### 2. 实现一个待办事项应用

**使用Pinia**：

```javascript
// stores/todo.js
import { defineStore } from 'pinia'

export interface Todo {
  id: number
  text: string
  completed: boolean
}

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [] as Todo[],
    loading: false,
    error: null as string | null
  }),
  getters: {
    completedTodos: (state) => {
      return state.todos.filter(todo => todo.completed)
    },
    pendingTodos: (state) => {
      return state.todos.filter(todo => !todo.completed)
    },
    totalTodos: (state) => {
      return state.todos.length
    },
    completionRate: (state) => {
      if (state.todos.length === 0) return 0
      return Math.round((state.todos.filter(todo => todo.completed).length / state.todos.length) * 100)
    }
  },
  actions: {
    async fetchTodos() {
      this.loading = true
      this.error = null
      try {
        // 模拟API调用
        const response = await new Promise<Todo[]>(resolve => {
          setTimeout(() => {
            resolve([
              { id: 1, text: 'Learn Vue', completed: true },
              { id: 2, text: 'Learn Pinia', completed: false },
              { id: 3, text: 'Build a Todo App', completed: false }
            ])
          }, 1000)
        })
        this.todos = response
      } catch (error) {
        this.error = 'Failed to fetch todos'
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    addTodo(text: string) {
      const newTodo: Todo = {
        id: Date.now(),
        text,
        completed: false
      }
      this.todos.push(newTodo)
    },
    toggleTodo(id: number) {
      const todo = this.todos.find(todo => todo.id === id)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    deleteTodo(id: number) {
      this.todos = this.todos.filter(todo => todo.id !== id)
    },
    updateTodo(id: number, text: string) {
      const todo = this.todos.find(todo => todo.id === id)
      if (todo) {
        todo.text = text
      }
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed)
    }
  }
})
```

```vue
<template>
  <div class="todo-app">
    <h2>Todo App</h2>
    
    <div class="todo-input">
      <input 
        v-model="newTodo" 
        @keyup.enter="addTodo" 
        placeholder="Add a new todo"
      >
      <button @click="addTodo">Add</button>
    </div>
    
    <div v-if="todoStore.loading">Loading...</div>
    <div v-else-if="todoStore.error">{{ todoStore.error }}</div>
    <div v-else>
      <div class="todo-filters">
        <button 
          v-for="filter in filters" 
          :key="filter.value"
          :class="{ active: currentFilter === filter.value }"
          @click="currentFilter = filter.value"
        >
          {{ filter.label }}
        </button>
      </div>
      
      <ul class="todo-list">
        <li 
          v-for="todo in filteredTodos" 
          :key="todo.id"
          :class="{ completed: todo.completed }"
        >
          <input 
            type="checkbox" 
            v-model="todo.completed"
            @change="todoStore.toggleTodo(todo.id)"
          >
          <span>{{ todo.text }}</span>
          <button @click="todoStore.deleteTodo(todo.id)">Delete</button>
        </li>
      </ul>
      
      <div class="todo-footer">
        <p>{{ todoStore.totalTodos }} items total</p>
        <p>{{ todoStore.completedTodos.length }} completed</p>
        <p>{{ todoStore.pendingTodos.length }} pending</p>
        <p>Completion rate: {{ todoStore.completionRate }}%</p>
        <button @click="todoStore.clearCompleted" :disabled="todoStore.completedTodos.length === 0">
          Clear completed
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useTodoStore } from '../stores/todo'

const todoStore = useTodoStore()
const newTodo = ref('')
const currentFilter = ref('all')

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Completed', value: 'completed' },
  { label: 'Pending', value: 'pending' }
]

const filteredTodos = computed(() => {
  switch (currentFilter.value) {
    case 'completed':
      return todoStore.completedTodos
    case 'pending':
      return todoStore.pendingTodos
    default:
      return todoStore.todos
  }
})

const addTodo = () => {
  if (newTodo.value.trim()) {
    todoStore.addTodo(newTodo.value.trim())
    newTodo.value = ''
  }
}

onMounted(() => {
  todoStore.fetchTodos()
})
</script>

<style scoped>
.todo-app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.todo-input {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}

.todo-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.todo-input button {
  padding: 10px 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #f8f9fa;
  cursor: pointer;
}

.todo-filters {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}

.todo-filters button {
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #f8f9fa;
  cursor: pointer;
}

.todo-filters button.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 20px 0;
}

.todo-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
}

.todo-list li.completed {
  text-decoration: line-through;
  color: #6c757d;
}

.todo-list li button {
  margin-left: auto;
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #dc3545;
  color: white;
  cursor: pointer;
}

.todo-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #ddd;
}

.todo-footer button {
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #f8f9fa;
  cursor: pointer;
}

.todo-footer button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
```

## 学习建议

### 1. 学习顺序
1. **状态管理基础**：理解状态管理的基本概念
2. **Vuex**：学习Vuex的核心概念和使用方法
3. **Pinia**：学习Pinia的核心概念和使用方法
4. **对比和迁移**：理解两者的区别和迁移方法
5. **最佳实践**：掌握状态管理的最佳实践
6. **高级特性**：学习状态管理的高级特性

### 2. 学习方法
- **理论结合实践**：理解概念后通过代码练习巩固
- **官方文档**：参考Vuex和Pinia的官方文档
- **项目实践**：在实际项目中应用状态管理
- **调试技巧**：使用DevTools调试状态

### 3. 常见误区
- **过度使用状态管理**：不是所有状态都需要放在store中
- **状态设计不合理**：深层嵌套的状态结构
- **异步操作处理不当**：在mutations中处理异步操作
- **命名不规范**：不一致的命名规范
- **性能问题**：频繁提交mutations

### 4. 进阶学习资源
- **书籍**：《Vue.js实战》、《深入理解Vue.js》
- **文档**：Vuex官方文档、Pinia官方文档
- **课程**：Vue状态管理专项课程
- **源码**：Vuex和Pinia的源码

## 总结

状态管理是Vue应用开发中的重要组成部分，本模块介绍了Vue的两种状态管理方案：Vuex和Pinia。通过学习本模块，你应该能够：

1. **理解状态管理的基本概念**：掌握单向数据流和状态管理的核心思想
2. **使用Vuex**：掌握Vuex的核心概念和使用方法
3. **使用Pinia**：掌握Pinia的核心概念和使用方法
4. **选择合适的状态管理库**：根据项目情况选择Vuex或Pinia
5. **应用最佳实践**：掌握状态管理的最佳实践
6. **处理高级场景**：如持久化、中间件、TypeScript支持等

无论是使用Vuex还是Pinia，合理的状态管理都能帮助你构建更可维护、更可扩展的Vue应用。在实际项目中，你应该根据项目的规模和需求选择合适的状态管理方案，并遵循最佳实践来设计和实现状态管理。