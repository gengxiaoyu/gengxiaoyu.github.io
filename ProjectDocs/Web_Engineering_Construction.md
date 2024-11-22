
要构建一个基于JavaScript、Pinia、Tailwind CSS、Lint-Staged、Vue Router、ESLint、Prettier、Vite、Ant Design Vue、Axios、Vue 3、pnpm的前端工程，可以按照以下步骤进行：

### 1. 项目初始化
使用Vite创建一个新的Vue 3项目。
```bash
pnpm create vite@latest my-vue-app --template vue
cd my-vue-app
```

### 2. 安装依赖
安装项目所需的依赖包。
```bash
pnpm install
```

### 3. 配置Tailwind CSS
安装Tailwind CSS及其相关依赖。
```bash
pnpm add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
在`tailwind.config.js`中配置Tailwind CSS。
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
在`postcss.config.js`中配置PostCSS。
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

### 4. 配置ESLint和Prettier
1、安装ESLint和Prettier及其相关依赖。
```bash
pnpm add -D eslint eslint-plugin-vue @vue/eslint-config-prettier eslint-config-prettier eslint-plugin-prettier
```
2、初始化配置EsLint
```js
npx eslint --init
```
3-1、选择模式： (To check syntax and find problems)
```js
You can also run this command directly using 'npm init @eslint/config'.
? How would you like to use ESLint? ... 
  To check syntax only
> To check syntax and find problems
  To check syntax, find problems, and enforce code style
```
3-2、选择语言模块： (选JavaScript modules)
```js
? What type of modules does your project use? ...
> JavaScript modules (import/export)
  CommonJS (require/exports)
  None of these
```
3-3、选择语言框架 (选Vue.js)
```js
? Which framework does your project use? ...
  React
> Vue.js
  None of these
```
3-4、是否使用ts (视自己情况而定,我这里不用选No)
```js
 ? Does your project use TypeScript? » No / Yes
```
3-5、代码在哪里运行 (用空格选中 Browser+Node)
```js
 ? Where does your code run? ...  (Press <space> to select, <a> to toggle all, <i> to invert selection)
√ Browser
√ Node
```
3-6、您希望您的配置文件是什么格式? (选JavaScript)
```js
? What format do you want your config file to be in? ...
> JavaScript
  YAML
  JSON
```
3-7、您想现在安装它们吗? (选择Yes)
```js
? Would you like to install them now? » No / Yes
```
3-8、您要使用哪个软件包管理器？ (选择pnpm)
```js
? Which package manager do you want to use? ...
  npm
  yarn
> pnpm
```
4、安装完成后 (在项目根目录会出现eslint.config.js文件)
```javascript
import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,vue}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  // 后面添加过滤掉index.vue文件
  {
    rules: {
      'vue/multi-word-component-names': ['error', {
        ignores: ['index'] // 忽略 index 组件
      }]
    }
  }
];
```
5、继续安装 vite-plugin-eslint
```json
  // 说明: 该包是用于配置vite运行的时候自动检测eslint规范
  // 问题: 不装这个包可以吗? 答案是“可以的”,使用yarn dev时并不会主动检查代码
  yarn add -D vite-plugin-eslint
```
6、配置 vite.config.js
```js
 import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint' //导入包

export default defineConfig({
  plugins: [
    vue(),
    // 增加下面的配置项,这样在运行时就能检查eslint规范
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
    })
  ]
})
```
7、创建`.prettierrc`文件。
```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 80,
  "tabWidth": 2
}
```
8、package.json
```json
  "lint": "eslint src", // 这里会出现问题，之前是把文件都放在这里
  "format": "prettier --write src",
```

### 5. 配置Vue Router和Pinia
安装Vue Router和Pinia。
```bash
pnpm add vue-router@next pinia
```
在`src`目录下创建`router/index.js`文件。
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
在`main.js`中引入并使用路由。
```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
```

### 6. 配置Axios
安装Axios。
```bash
pnpm add axios
```
在`src/utils/request.js`中配置Axios。
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

### 7. 配置Ant Design Vue
安装Ant Design Vue。
```bash
pnpm add ant-design-vue@next
```
在`main.js`中引入并使用Ant Design Vue。
```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css';

const app = createApp(App)
app.use(router)
app.use(Antd)
app.mount('#app')
```

### 8. 配置Lint-Staged
安装Lint-Staged。
```bash
pnpm add -D lint-staged
```
在`package.json`中添加Lint-Staged配置。
```json
{
  "lintStaged": {
    "*.{js,vue}": ["eslint --fix", "prettier --write"]
  }
}
```

### 9. 启动项目
启动开发服务器。
```bash
pnpm dev
```

通过以上步骤，你可以成功构建一个基于JavaScript、Pinia、Tailwind CSS、Lint-Staged、Vue Router、ESLint、Prettier、Vite、Ant Design Vue、Axios、Vue 3和pnpm的前端工程。

#### 如何在Vue 3项目中使用Pinia进行状态管理？


在Vue 3项目中使用Pinia进行状态管理的步骤如下：

   首先，通过npm或yarn在项目中安装Pinia。可以使用以下命令：
```bash
   npm install pinia
```
   或者：
```bash
   yarn add pinia
```
   这一步是必要的，因为Pinia是Vue 3推荐的状态管理库，它提供了简洁且高效的API来管理应用的状态。

   在Vue 3应用中，使用`defineStore`函数创建一个Pinia Store来管理状态。例如，可以定义一个计数器的Store，包含计数和增加、减少操作。具体步骤包括：
   - 在`store/index.js `文件中，使用`defineStore`函数定义Store。
```javascript
   import { defineStore } from 'pinia'

   export const useCounterStore = defineStore('counter', {
     state: () => ({
       count: 0
     }),
     actions: {
       increment() {
         this.count ++
       },
       decrement() {
         this.count-- 
       }
     }
   })
```
   - 在`main.js `或`main.ts `文件中，导入`createApp`和`createPinia`，并将Pinia插件应用到Vue应用中。
```javascript
   import { createApp } from 'vue'
   import { createPinia } from 'pinia'
   import App from './App.vue '

   const app = createApp(App)
   const pinia = createPinia()

   app.use (pinia)
   app.mount ('#app')
```

   在Vue组件中导入Pinia的`useStore`钩子，访问和修改状态。例如，在一个按钮点击事件中增加计数器的值：
```vue
   <template>
     <button @click="increment">Increment</button>
     <p>Count: {{ count }}</p>
   </template>

   <script setup>
   import { useCounterStore } from '../store/counter'

   const counterStore = useCounterStore()

   function increment() {
     counterStore.increment ()
   }

   const count = counterStore.count 
   </script>
```
   这里使用了组合式API，通过`useStore`获取Store实例，并直接访问其状态和方法。

   如果需要在浏览器刷新后保持状态的连续性，可以使用`pinia-plugin-persistedstate`插件实现状态的持久化存储。安装并配置该插件：
```bash
   npm install pinia-plugin-persistedstate
```

  在Vue 3项目中配置ESLint和Prettier以提高代码质量，可以按照以下步骤进行：

   首先，确保你的项目中已经安装了ESLint和Prettier。你可以使用以下命令来安装它们：
​```bash
   npm install eslint prettier --save-dev
```
   如果你使用的是TypeScript，还需要安装TypeScript相关的依赖：
```bash
   npm install @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
```

   在项目根目录中创建一个`.eslintrc.js`文件，并添加以下代码来配置ESLint：
```javascript
   module.exports = {
     root: true,
     env: {
       node: true,
     },
     extends: [
       'plugin:vue/vue3-essential',
       'eslint:recommended',
       '@vue/typescript/recommended',
       'plugin:prettier/recommended', // 添加Prettier配置
     ],
     parserOptions: {
       ecmaVersion: 2020,
     },
     rules: {
       // 自定义规则
     },
   };
```
  * [Gitee地址-前端工程模板](https://gitee.com/gengxiaoyugeng/my-project-template)