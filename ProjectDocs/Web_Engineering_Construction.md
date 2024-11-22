
要构建一个基于JavaScript、Pinia、Tailwind CSS、Lint-Staged、Vue Router、ESLint、Prettier、Vite、Ant Design Vue、Axios、Vue 3、pnpm的前端工程，可以按照以下步骤进行：

## 前端工程构建指南
---
### 1. 项目初始化

使用 Vite 创建一个新的 Vue 3 项目：

```bash
# 若未配置pnpm，请先下载并配置镜像
npm install pnpm -g --registry=https://registry.npmmirror.com
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
## package.json文件
```json
{
  "name": "my-project-template",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "prepare": "husky install",
    "lint:": "eslint src",
    "format": "prettier --write src",
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint-staged": "lint-staged",
    "commit": "git-cz"
  },
  "dependencies": {
    "ant-design-vue": "^4.2.6",
    "axios": "^1.7.7",
    "pinia": "^2.2.6",
    "pinia-plugin-persistedstate": "^4.1.3",
    "vite-plugin-eslint": "^1.8.1",
    "vue": "^3.5.12",
    "vue-router": "^4.0.13"
  },
  "devDependencies": {
    "@commitlint/cli": "^19.6.0",
    "@commitlint/config-conventional": "^19.6.0",
    "@eslint/js": "^9.15.0",
    "@vitejs/plugin-vue": "^5.1.4",
    "@vue/eslint-config-prettier": "^10.1.0",
    "autoprefixer": "^10.4.20",
    "commitizen": "^4.3.1",
    "cz-git": "^1.11.0",
    "eslint": "^9.15.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.2.1",
    "eslint-plugin-vue": "^9.31.0",
    "globals": "^15.12.0",
    "husky": "^9.1.7",
    "lint-staged": "^15.2.10",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.15",
    "vite": "^5.4.10"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.{js,vue}": [
      "eslint --fix",
      "prettier --write"
    ]
  },
  "config": {
    "commitizen": {
      "path": "node_modules/cz-git"
    }
  }
}

```
---
## 目录展示

```
MY-PROJECT-TEMPLATE/
│
├── .husky/          # 存放Git hooks的配置文件，用于在Git生命周期中执行脚本
│   ├── commit-msg   # 在提交信息（commit message）提交之前运行的脚本
│   └── pre-commit   # 在提交之前运行的脚本，常用于代码检查和测试
│
├── node_modules/    # 存放项目依赖的第三方库，由npm或pnpm等包管理器自动安装
│
├── public/          # 存放静态资源，如favicon、robots.txt等，这些文件不会被Webpack处理
│
└── src/             # 源代码目录，包含项目的主要代码
    ├── api/         # 存放与后端API交互的代码，如封装的HTTP请求函数
    ├── assets/      # 存放静态资源，如图片、样式表、字体等，这些文件会被Webpack处理
    ├── components/  # 存放Vue组件，每个组件通常包含模板、脚本和样式
    │   ├── common/  # 存放通用组件，这些组件可以在多个地方复用
    │   ├── layout/  # 存放布局组件，如页眉、页脚、侧边栏等
    │   └── HelloWorld.vue  # 示例组件，通常用于展示项目是否正确运行
    ├── composables/  # 存放可复用的Composition API逻辑，如useStore, useAuth等
    ├── directives/  # 存放自定义指令，用于扩展HTML元素的功能
    ├── router/      # 存放路由配置，定义应用的路由规则
    │   ├── modules/ # 存放路由模块，用于模块化路由配置
    │   │   ├── about.js       # 关于页面的路由配置
    │   │   ├── home.js        # 主页的路由配置
    │   │   ├── not-found.js   # 404页面的路由配置
    │   │   └── index.js      # 路由模块的入口文件
    │   ├── stores/  # 存放状态管理相关的代码，如Vuex存储
    │   │   └── counter.js    # 示例状态管理，用于计数器功能
    │   ├── utils/   # 存放工具函数，这些函数可以在项目中复用
    │   │   └── request.js    # 封装的HTTP请求工具函数
    │   └── views/  # 存放视图组件，这些组件通常与路由一一对应
    │       ├── about/        # 关于页面的组件
    │       ├── home/         # 主页的组件
    │       ├── NotFoundView.vue  # 404页面的组件
    │       └── App.vue       # 根组件，作为应用的入口组件
    ├── main.js      # 项目的入口文件，初始化Vue实例并挂载到DOM
    ├── style.css    # 全局样式表，定义项目通用的样式
    ├── .eslintrc.js  # ESLint配置文件，用于代码质量和风格检查
    ├── .gitignore   # Git忽略文件，定义哪些文件或目录不应该被Git追踪
    ├── .prettierrc  # Prettier配置文件，用于代码格式化
    ├── commitlint.config.cjs  # Commitlint配置文件，用于规范Git提交信息
    ├── eslintconfig.js  # ESLint的额外配置文件
    ├── index.html    # 项目的HTML模板文件，作为构建过程的起点
    ├── package.json  # 项目的配置文件，包含项目的元数据和依赖信息
    ├── pnpm-lock.yaml  # PNPM的锁定文件，确保项目依赖的确定性
    ├── postcss.config.js  # PostCSS配置文件，用于处理CSS
    ├── README.en.md  # 英文版的项目说明文件
    ├── README.md      # 中文版的项目说明文件
    ├── tailwind.config.js  # Tailwind CSS的配置文件
    └── vite.config.js  # Vite的配置文件，用于定义项目的构建和开发服务器配置
```

  * [Gitee地址-前端工程模板](https://gitee.com/gengxiaoyugeng/my-project-template)