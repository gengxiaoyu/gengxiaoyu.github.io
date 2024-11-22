
要构建一个基于JavaScript、Pinia、Tailwind CSS、Lint-Staged、Vue Router、ESLint、Prettier、Vite、Ant Design Vue、Axios、Vue 3、pnpm的前端工程，可以按照以下步骤进行：

## 前端工程构建指南
---
### 1. 项目初始化

使用 Vite 创建一个新的 Vue 3 项目：

```bash
pnpm create vite@latest my-vue-app --template vue
cd my-vue-app
```
---
### 2. 安装依赖

安装项目所需的依赖包：

```bash
pnpm install
```
---
### 3. 配置 Tailwind CSS

#### 安装 Tailwind CSS 及其相关依赖：

```bash
pnpm add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### 在 `tailwind.config.js` 中配置 Tailwind CSS：

```javascript
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

在 `postcss.config.js` 中配置 PostCSS：

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```
---
### 4. 配置 ESLint 和 Prettier

#### 4.1 安装 ESLint 和 Prettier 依赖

```bash
pnpm add -D eslint eslint-plugin-vue @vue/eslint-config-prettier eslint-config-prettier eslint-plugin-prettier
```

#### 4.2 初始化 ESLint 配置

```bash
npx eslint --init
```

根据提示选择配置选项。

#### 4.3 安装 vite-plugin-eslint

```bash
pnpm add -D vite-plugin-eslint
```

#### 4.4 配置 vite.config.js

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'

export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
    })
  ]
})
```

#### 4.5 创建 `.prettierrc` 文件

```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 80,
  "tabWidth": 2
}
```

#### 4.6 更新 package.json

```json
{
  "scripts": {
    "lint": "eslint src",
    "format": "prettier --write src"
  }
}
```
---
### 5. 配置 Vue Router 和 Pinia

#### 安装 Vue Router 和 Pinia：

```bash
pnpm add vue-router@next pinia
```

#### 创建 `src/router/index.js` 文件：

```javascript
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  { path: '/', component: Home },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
```

#### 在 `main.js` 中引入并使用路由：

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
```
---
### 6. 配置 Axios

#### 安装 Axios：

```bash
pnpm add axios
```

#### 在 `src/utils/request.js` 中配置 Axios：

```javascript
import axios from 'axios'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
})

service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
```
### 7.使用 Pinia 进行状态管理

#### 步骤 1: 安装 Pinia

```bash
pnpm add pinia
```

#### 步骤 2: 定义 Pinia Store

在 `store/index.js` 中定义 Store：

```javascript
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    }
  }
})
```

#### 步骤 3: 在 Vue 应用中使用 Pinia

在 `main.js` 中引入并使用 Pinia：

```javascript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')
```

#### 步骤 4: 在组件中使用 Pinia

在 Vue 组件中导入 `useStore` 钩子，访问和修改状态：

```vue
<template>
  <button @click="increment">Increment</button>
  <p>Count: {{ count }}</p>
</template>

<script setup>
import { useCounterStore } from '../store/counter'

const counterStore = useCounterStore()

function increment() {
  counterStore.increment()
}

const count = counterStore.count
</script>
```

#### 步骤 5: 状态持久化（可选）

安装 `pinia-plugin-persistedstate`：

```bash
pnpm add pinia-plugin-persistedstate
```

配置 Pinia 插件以实现状态持久化。
### 8. 配置 Ant Design Vue

安装 Ant Design Vue：

```bash
pnpm add ant-design-vue@next
```

在 `main.js` 中引入并使用 Ant Design Vue：

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

const app = createApp(App)
app.use(router)
app.use(Antd)
app.mount('#app')
```
---
### 8. 配置 Lint-Staged 和 Husky

安装 Lint-Staged 和 Husky：

```bash
pnpm add -D lint-staged husky
```

在 `package.json` 中添加 Lint-Staged 配置：

```json
{
  "scripts": {
    "prepare": "husky install",
    "lint-staged": "lint-staged"
  },
  "lint-staged": {
    "*.{js,vue}": ["eslint --fix", "prettier --write"]
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  }
}
```
---
### 9. Commitlint 检查提交消息

#### 安装 Commitlint：

```bash
pnpm add -D @commitlint/cli @commitlint/config-conventional
```

#### 创建 `commitlint.config.cjs`：

```js
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "subject-case": [0],
    "type-enum": [
      2,
      "always",
      ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'ci', 'revert', 'chore']
    ],
  },
};
```

#### 创建 `.husky/commit-msg`：

```sh
. "$(dirname "$0")/_/husky.sh"

npx --no-install commitlint --edit $1
```

### 10. Commitizen & cz-git

#### 安装 Commitizen 和 cz-git：

```bash
pnpm add -D commitizen cz-git
```

#### 在 `package.json` 中指定适配器：

```json
"config": {
  "commitizen": {
    "path": "node_modules/cz-git"
  }
}
```

#### 添加提交指令：

```json
"scripts": {
  "commit": "git-cz"
}
```

#### 使用步骤：

1. `git add .`
2. `pnpm commit`
3. 根据提示填写提交信息
4. `git push`
---
### 11. 启动项目

启动开发服务器：

```bash
pnpm dev
```
---

  * [Gitee地址-前端工程模板](https://gitee.com/gengxiaoyugeng/my-project-template)