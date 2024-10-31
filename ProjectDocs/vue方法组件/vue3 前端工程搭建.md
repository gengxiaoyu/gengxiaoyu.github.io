# Vue 3 的前端工程

## 1. **环境准备**：
   - 确保已安装 Node.js（建议版本 16 或更高）。
   - 安装最新版本的 npm 或 Yarn 作为包管理工具。
- 在Windows上安装Node.js和包管理工具（npm或Yarn）的步骤如下：
- 安装 Node.js

1. **下载 Node.js安装包**：
   - 打开浏览器，访问[Node.js官方网站](https://nodejs.org/)。
   - 点击“Download”按钮下载推荐版本（通常是LTS版本）的安装包。你也可以下载最新版本的Node.js，但请确保它与你的项目依赖兼容。

2. **运行安装程序**：
   - 找到下载的`.msi`文件（例如：`node-v16.X.X-x64.msi`），双击运行安装程序。
   - 在安装向导中，按照提示进行操作。在安装类型选择界面，你可以选择“典型”安装或“自定义”安装。通常情况下，“典型”安装就足够了。

3. **安装选项**：
   - 在安装过程中，会询问你是否要将Node.js添加到系统环境变量，建议勾选这个选项，这样你就可以在命令提示符下方便地使用`node`和`npm`命令了。
   - 另外，你还可以选择“使用Node.js更新Windows PATH（通过Internet Explorer）”，这将自动配置环境变量。

4. **完成安装**：
   - 完成安装向导，Node.js和npm将被安装到你的系统上。

5. **验证安装**：
   - 打开命令提示符（可以在开始菜单搜索`cmd`或`命令提示符`）。
   - 输入以下命令来验证Node.js和npm是否正确安装：
```cmd
node -v
npm -v
```
   - 这将分别显示Node.js和npm的版本号。
   - 安装 Yarn（可选）
1. **下载 Yarn 安装脚本**：
   - 打开命令提示符。
   - 运行以下命令来下载并运行Yarn安装脚本：
```cmd
npm install -g yarn
```
   - 这将使用npm来全局安装Yarn。

2. **验证 Yarn 安装**：
   - 在命令提示符中输入以下命令来验证Yarn是否正确安装：
```cmd
yarn --version
```
   - 这将显示Yarn的版本号。

- 注意事项
   - 在安装Node.js时，如果系统提示任何安全警告，请确保下载的是官方的安装包。
   - 如果你使用的是Windows的旧版本（如Windows 7），可能需要手动下载并安装更新的Visual C++可再发行包（Redistributable Packages）。
   - 如果你在使用npm安装Yarn时遇到权限问题，尝试以管理员身份运行命令提示符。
   - 如果你在使用代理上网，确保你的npm配置正确地设置了代理。

## 2. **项目初始化**：
   - **使用 `npm create vite@latest` 命令创建一个新的 Vue 3 项目**：
     这个命令会使用最新的 Vite 版本来初始化一个新的 Vue 3 项目。Vite 是一个现代化的前端构建工具，它提供了丰富的功能来优化开发体验和生产环境的构建性能。
   - **选择 Vue 框架和所需的配置（如 JavaScript 支持）**：
     在初始化过程中，你会被询问一系列问题，以定制项目配置。这些问题可能包括：
     - 是否使用 TypeScript。
     - 选择 JavaScript 版本（例如 ES6 或更高）。
     - 选择 CSS 预处理器（例如 Sass、Less）。
     - 是否使用 Vue 路由。
     - 是否使用 Vuex 状态管理。
     - 是否需要添加 ESLint 和 Prettier 等代码质量和格式化工具。
     - 是否需要添加单元测试和端到端测试。

以下是详细的步骤说明：

1. **打开终端**：
   打开你的命令行界面（CLI），如 Terminal、Command Prompt 或 VSCode 的集成终端。

2. **运行创建命令**：
   在终端中运行以下命令：
```bash
npm create vite@latest
```
   这个命令会启动 Vite 的创建向导。

3. **选择项目模板**：
   选择 `Vue` 作为项目模板。你可能会被问到是否需要添加其他功能，如 Vue Router、Vuex、CSS 预处理器等。

4. **选择语言特性**：
   根据你的需要选择 JavaScript 版本。如果你不确定，可以选择默认的 ES6 支持。

5. **选择 CSS 预处理器**：
   如果你需要使用 CSS 预处理器，如 Sass 或 Less，选择一个你喜欢的。

6. **配置路由和状态管理**：
   如果你的项目需要路由或状态管理，选择 Vue Router 和 Pinia

7. **选择代码质量和格式化工具**：
   选择 ESLint 和 Prettier 可以帮助你维护代码质量和风格一致性。

8. **选择测试框架**：
   如果你需要进行单元测试或端到端测试，可以选择相应的测试框架。
   
## 3. **安装依赖**：
   - 进入项目目录，运行 `npm install` 安装依赖。
``` bash
npm install
```
## 4. **启动开发服务器**：
   - 在项目目录中运行以下命令启动开发服务器：
``` bash
npm run dev
```
这将启动一个本地开发服务器，通常在 `localhost:3000`。
## 5. **项目结构调整**：
   - 根据需要调整项目结构，例如创建 `views`、`components`、`router`、`store` 等目录。

## 6. **配置路由**：
   - 安装 Vue Router：`npm install vue-router@next`。
   - 使用 `import.meta.globEager` 自动导入路由模块，减少手动维护路由配置的复杂性。
   - 创建路由配置文件并在 `main.js` 中引入。
   - **自动化路由配置**：
     - 在 `router` 目录下创建一个 `modules` 文件夹。
     - 将不同的路由配置分散到 `modules` 文件夹中的不同文件里。
     - 使用 `import.meta.globEager` 来自动化地加载这些路由配置。
```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
const routeFiles = import.meta.globEager('./modules/**/*.js');

const routes = [];
for (const path in routeFiles) {
    const routeConfig = routeFiles[path].default;
    routes.push(routeConfig);
}
const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    // 验证用户是否登录的逻辑
    const isLoggedIn = /* 检查登录状态 */;
    if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
    	next({ name: 'Login' });
    } else {
    	next();
    }
});

export default router;
```
   - 在 `modules` 文件夹中创建路由配置文件，例如 `home.js` 和 `about.js`。
```javascript
// router/modules/home.js
import HomeView from '../views/HomeView.vue';
export default {
    path: '/',
    name: 'Home',
    component: HomeView
};
```
```javascript
// router/modules/about.js
import AboutView from '../views/AboutView.vue';
export default {
    path: '/about',
    name: 'About',
    component: AboutView
};
```
   - 添加 404 页面路由：
```javascript
// router/modules/not-found.js
import NotFoundView from '../views/NotFoundView.vue';
export default {
    path: '/:notFound(.*)',
    name: 'NotFound',
    component: NotFoundView
};
```
   - 在 `main.js` 中引入路由配置：
```javascript
// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
createApp(App).use(router).mount('#app');
```
   - 使用 `<router-view>` 来显示路由匹配的组件：
```vue
<!-- src/App.vue -->
<template>
    <div id="app">
    	<router-view></router-view>
    </div>
</template>
```
   - 使用 `<router-link>` 创建导航链接：
```vue
<!-- src/components/Navigation.vue -->
<template>
    <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
    </nav>
</template>
```
- **优化点**： 
   - 使用 `import.meta.globEager` 实现自动化路由配置，减少了手动维护的工作量。
   - 利用路由懒加载，按需加载路由对应的组件，减少应用初始加载时间。
   - 使用路由守卫进行登录验证，确保用户在访问受保护路由之前已经登录。
   - 添加 404 路由作为全局的兜底路由，提高应用的健壮性。
   - 通过配置 `meta` 字段，为路由添加额外的元信息，如 `requiresAuth` 标记需要登录的路由。

##7. **状态管理**：
   - 安装 Pinia：`npm install pinia`。
   - 在 `main.js` 中创建并引入 Pinia 存储。
```javascript
// src/main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.mount('#app');
```
   - 创建 Pinia 存储文件。
```javascript
// src/stores/counter.js
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
    state: () => ({
        count: 0
    }),
    actions: {
        increment() {
            this.count++;
        },
        decrement() {
            this.count--;
        }
    }
});
```
   - 在页面组件中使用 Pinia 存储。
```vue
<!-- src/components/Counter.vue -->
<template>
	<div>
        <button @click="decrement">-</button>
        <span>{{ count }}</span>
        <button @click="increment">+</button>
    </div>
</template>

<script setup>
    import { useCounterStore } from '../stores/counter';
    const counterStore = useCounterStore();
    function increment() {
        counterStore.increment();
    }
    function decrement() {
        counterStore.decrement();
    }
</script>
```
- **优化点**：
   - 使用 `storeToRefs` 来将 Store 的响应式状态转换为单独的 ref，以在组件中使用。
```javascript
import { storeToRefs } from 'pinia';
import { useCounterStore } from '@/stores/counter';

const { count } = storeToRefs(useCounterStore());
```
   - 使用 `computed` 属性来创建派生状态。
```javascript
import { computed } from 'vue';
import { useCounterStore } from '@/stores/counter';

const counterStore = useCounterStore();
const doubleCount = computed(() => counterStore.count * 2);
```
   - 使用 `watch` 来监听 Store 中状态的变化。
```javascript
import { watch } from 'vue';
import { useCounterStore } from '@/stores/counter';

const counterStore = useCounterStore();
watch(() => counterStore.count, (newCount) => {
    console.log(`Count has been updated to: ${newCount}`);
});
```
   - 使用 Pinia 的 `mapActions` 和 `mapGetters` 辅助函数来简化组件中的代码。
```javascript
import { mapActions, mapGetters } from 'pinia';
import { useCounterStore } from '@/stores/counter';
const { increment, decrement } = mapActions(useCounterStore());
const { count } = mapGetters(useCounterStore(), ['count']);
```
- **代码备注**：
   - `defineStore` 创建了一个 Pinia store，它接受一个 ID 和一个定义状态、getters 和 actions 的对象。
   - `state` 定义了 store 所拥有的状态。
   - `getters` 定义了计算属性，它们是响应式的，并可作为 store 状态的派生状态。
   - `actions` 定义了可执行的方法，它们可以是同步或异步的，用于修改状态。
   - 在组件中，使用 `useCounterStore` 来获取 store 实例，并调用其 `increment` 和 `decrement` 方法来修改状态。
- **Pinia 优点**：
   - 更简洁的 API，易于理解和使用。
   - 与 Vue 3 的组合式 API 紧密结合，支持在 setup 中直接使用。
   - 更好的 TypeScript 支持，提供类型推断和自动补全。
   - 无需显式注册模块，store 自动化管理。
   - 支持 Vue Devtools，方便调试。
- **为什么不使用 Vuex**：
   - Pinia 是为 Vue 3 设计的状态管理库，与 Vue 3 的组合式 API 更加契合。
   - Vuex 需要使用 `mutations` 和 `actions` 来修改状态，而 Pinia 允许直接修改状态，减少了样板代码。
   - Pinia 提供了更好的 TypeScript 支持，对于使用 TypeScript 的项目来说，这是一个显著的优势。
   - Pinia 的设计更加现代化，适合新的开发模式。
## 8. **样式管理**：
- **使用 CSS 预处理器**（Less）：
```javascript
// vite.config.js
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    css: {
        preprocessorOptions: {
            less: {
                additionalData: `@import "${path.resolve(__dirname, 'src/styles/variables.less')}";`
            }
        }
    }
});
```
   在 Vue 组件中使用：
```vue
<!-- src/components/MyComponent.vue -->
<template>
	<div class="my-component"></div>
</template>
<style lang="less">
    .my-component {
        color: @primary-color;
    }
</style>
```
   创建一个变量文件：
```less
// src/styles/variables.less
@primary-color: #42b983;
@padding: 16px;
```

- **利用 Vue 单文件组件**：
```vue
<!-- src/components/MyComponent.vue -->
<template>
	<div class="my-component">This is my component</div>
</template>
<style scoped lang="less">
    .my-component {
        font-size: 16px;
        padding: @padding;
    }
</style>
```

- **采用 CSS 模块**：
```vue
<!-- src/components/MyComponent.vue -->
<template>
	<div :class="$style.myComponent">This is my component</div>
</template>
<style module lang="less">
    .myComponent {
        font-size: 16px;
        color: @primary-color;
    }
</style>
```

- **使用 BEM 命名规范**：
     BEM 是一种流行的命名约定，旨在帮助开发者编写更易于理解和维护的 CSS 代码。它由块（Block）、元素（Element）和修饰符（Modifier）组成。
     - **块（Block）**：代表一个独立的页面组件，如 `button`、`header` 等。
     - **元素（Element）**：块的组成部分，如 `button__label`、`header__logo` 等。
     - **修饰符（Modifier）**：块或元素的不同状态或版本，如 `button--primary`、`header--fixed` 等。
     在 Less 中使用 BEM：
```less
// Block
.button {
    display: inline-block;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
// Element
.button__label {
    font-size: 16px;
    font-weight: bold;
}
// Modifier
.button--primary {
    background-color: @primary-color;
}
.button--large {
    padding: 15px 30px;
}
```
   对应的 HTML 结构：
```html
<button class="button button--primary">
    <span class="button__label">Click me</span>
</button>
```

- **配置全局样式**：
```javascript
// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import '@/styles/global.less';

createApp(App).mount('#app');
```
   创建全局样式文件：
```less
// src/styles/global.less
html, body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
}
```

- **使用 PostCSS**：
  PostCSS 是一个用 JavaScript 编写的工具，它可以对 CSS 代码进行转换和处理。它提供了一种强大而灵活的方式，通过插件来修改和增强 CSS，使开发者能够以更高效和个性化的方式管理 CSS 样式。
- **具体作用**：
   1. **自动添加浏览器前缀**：使用 `autoprefixer` 插件自动添加必要的浏览器前缀，确保 CSS 属性在所有浏览器上的兼容性。
   2. **CSS 压缩**：使用 `cssnano` 插件对 CSS 代码进行压缩和优化，减小文件体积。
   3. **CSS 变量**：使用 `postcss-custom-properties` 插件支持 CSS 变量。
   4. **嵌套规则**：使用 `postcss-nested` 插件允许 CSS 嵌套规则，使结构更清晰。
   5. **自定义语法**：使用 `postcss-mixins` 插件创建可重用的混合样式。
   6. **网格布局**：使用 `postcss-grid` 插件支持 CSS 网格布局。
   7. **伪类和伪元素**：使用 `postcss-pseudo-class` 插件增强伪类和伪元素的选择器。
- **安装 PostCSS**：
```bash
npm install postcss autoprefixer cssnano --save-dev
```
   - **配置 PostCSS**：
       创建 `postcss.config.js` 文件：
```javascript
module.exports = {
    plugins: [
        require('autoprefixer'),
        require('cssnano')
    ]
};
```

- **优化点**：
   - **性能**：利用 Less 的编译速度和性能优势，减少样式计算的开销。
   - **模块化**：通过 CSS 模块化，实现样式的局部作用域，避免全局污染。
   - **可读性**：BEM 或其他命名规范提供了清晰的样式结构，易于理解和维护。
   - **兼容性**：样式管理工具可以自动处理浏览器兼容性问题，减少手动添加前缀的工作量。
   - **一致性**：UI 框架提供了一套统一的样式和组件，确保应用界面的一致性。
- **为什么不使用 Sass**：
   - **生态兼容性**：Vue 3 与 Less 的集成更为无缝，特别是在使用 Vite 这类现代前端构建工具时，Less 的集成和配置往往更简单。
   - **性能**：Less 通常在编译速度和性能上略胜一筹，这对于大型项目来说可能是一个考虑因素。
   - **易用性**：Less 的语法相对简单直观，对于初学者来说更容易上手。
   - **功能覆盖**：对于大多数项目来说，Less 提供的功能已经足够使用，包括变量、混合器、函数等。
   - **团队熟悉度**：如果团队对 Less 更熟悉，那么继续使用 Less 可以减少学习成本。
   - **工具链支持**：某些项目可能已经建立了基于 Less 的工具链和样式指南，切换到 Sass 可能会导致额外的迁移成本。

## 9. **组件库**：
- **优化**：
   - 使用 `unplugin-vue-components` 和 `unplugin-auto-import` 实现组件的按需加载，减少初始加载时间。
   - 利用 `Element Plus`、`Vant` 或 `Ant Design Vue` 等组件库提供的按需加载功能，只加载项目中实际使用的组件。
   - 对于常用的组件库，如 `Element Plus`，可以通过配置其按需加载来优化性能：
```javascript
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [
                ElementPlusResolver(),
            ],
        }),
        Components({
            resolvers: [
                ElementPlusResolver(),
            ],
        }),
    ],
});
```
- **引用方式**：
   - 在项目中使用组件库时，可以直接通过 `import` 语法引入所需的组件：
```javascript
import { ElButton, ElMessageBox } from 'element-plus';
```
   - 对于需要按需加载的组件，可以使用动态 `import()` 语法：
```javascript
const MyComponent = defineAsyncComponent(() =>
	import('./components/MyComponent.vue')
);
```
- **按需加载配置**：
   - 在 `vite.config.js` 中配置 `unplugin-vue-components` 插件，实现组件的自动按需加载：
```javascript
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [
                ElementPlusResolver(),
            ],
        }),
        Components({
            resolvers: [
                ElementPlusResolver(),
            ],
        }),
    ],
});
```
- 在组件中使用按需加载的组件：
```vue
<!-- src/components/MyComponent.vue -->
<template>
	<el-button @click="handleClick">Click me</el-button>
</template>

<script setup>
    import { ElButton } from 'element-plus';

    const handleClick = () => {
        // Handle click event
    };
</script>
```
- **图标按需加载**：
   - 使用 `unplugin-icons` 插件来实现图标的按需加载：
```javascript
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Icons from 'unplugin-icons/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
    plugins: [
        vue(),
        Icons({
            // 自动安装依赖
            autoInstall: true,
        }),
    ],
});
```
- 在组件中使用图标：
```vue
<!-- src/components/MyIconComponent.vue -->
<template>
	<icon-user />
</template>

<script setup>
    // Icon 组件将自动导入
</script>
```

## 10. HTTP 请求：

在已经封装的 `request.js` 基础上，我们可以通过以下几种方式来优化请求的性能和效率，并考虑添加一些额外的功能：
1. **批量请求处理**：
   实现一个批量请求的方法，可以同时发送多个请求并在它们全部完成后统一处理结果。

2. **超时设置**：
   为不同类型的请求设置不同的超时时间，以适应不同的业务需求。

3. **请求重试机制**：
   在网络请求失败时，自动重试请求，可以设置重试的次数和重试的间隔时间。

4. **请求节流**：
   控制同时发出的请求数量，避免同时发起大量请求导致的问题。

5. **请求缓存**：
   对于重复的请求，可以使用缓存来避免不必要的网络请求。

6. **请求日志记录**：
   记录请求日志，方便调试和监控。

7. **请求参数和响应拦截器**：
   添加对请求参数和响应的统一处理，例如统一添加时间戳、统一处理分页数据等。

以下是添加这些功能的示例代码：

```javascript
// src/utils/request.js
import axios from 'axios';
import { ElMessage, ElNotification } from 'element-plus';

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VITE_API_BASE_URL,
  timeout: 5000,
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // 添加请求参数
    config.params = { ...config.params, timestamp: Date.now() };
    return config;
  },
  error => {
    ElMessage.error('请求错误');
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    if (response.data.code !== 200) {
      ElNotification.error({
        title: '错误',
        message: response.data.message,
      });
      return Promise.reject(response.data.message);
    }
    return response.data;
  },
  error => {
    ElNotification.error({
      title: '错误',
      message: error.message,
    });
    return Promise.reject(error);
  }
);

// 封装请求方法
const request = {
  get(url, params) {
    return service.get(url, { params });
  },
  post(url, data) {
    return service.post(url, data);
  },
  put(url, data) {
    return service.put(url, data);
  },
  delete(url, params) {
    return service.delete(url, { params });
  },
  // 批量请求
  batch(requests) {
    return Promise.all(requests.map(req => request[req.method](req.url, req.data)));
  },
  // 请求重试
  retry(url, data, retries = 3, delay = 1000) {
    return service.get(url, data).catch(error => {
      if (retries > 0) {
        return new Promise((resolve) => {
          setTimeout(() => {
            request.retry(url, data, retries - 1, delay).then(resolve);
          }, delay);
        });
      }
      return Promise.reject(error);
    });
  },
  // 请求节流
  throttle(url, params, limit = 3) {
    const queue = [];
    const execute = () => {
      if (queue.length === 0) return;
      const [request] = queue;
      queue.shift();
      request();
    };
    return (url, params) => {
      return new Promise((resolve, reject) => {
        queue.push(() => request.get(url, params).then(resolve).catch(reject));
        if (queue.length === 1) {
          execute();
        }
      }).then(response => response, () => {
        queue.length = 0;
      });
    };
  },
  // 请求缓存
  cache(url, params, ttl = 60000) {
    const cacheKey = `${url}?${new URLSearchParams(params).toString()}`;
    const cached = cache[cacheKey];
    if (cached && (Date.now() - cached.timestamp < ttl)) {
      return Promise.resolve(cached.data);
    }
    return request.get(url, params).then(data => {
      cache[cacheKey] = { data, timestamp: Date.now() };
      return data;
    });
  },
};
export default request;
```

- **批量请求**：`batch` 方法允许同时发送多个请求，并等待它们全部完成。
- **请求重试**：`retry` 方法在请求失败时自动重试。
- **请求节流**：`throttle` 方法控制同时发出的请求数量。
- **请求缓存**：`cache` 方法缓存请求结果，避免重复请求。

- 1. 批量请求用户列表和获取某个用户详情
```javascript
// src/api/user.js
import request from '@/utils/request';

// 获取用户列表
export function getUserList(params) {
    return request.get('/user/list', params);
}

// 获取用户详情
export function getUserDetail(userId) {
    return request.get(`/user/detail/${userId}`);
}

// 批量请求用户列表和用户详情
export function fetchUserBatch(userId) {
    return request.batch([
        { url: '/user/list', method: 'get', data: { params: { page: 1, limit: 10 } } },
        { url: `/user/detail/${userId}`, method: 'get' }
    ]);
}
```
- 使用案例

在 Vue 组件中，我们可以同时请求用户列表和某个用户详情，并在请求完成后处理这些数据。

```vue
<!-- src/components/UserDetailsWithList.vue -->
<template>
  <div>
    <h1>User Details</h1>
    <div v-if="userDetail"> <!-- 使用 v-if 确保数据加载完成 -->
      <p>Name: {{ userDetail.name }}</p>
      <p>Email: {{ userDetail.email }}</p>
    </div>
    <h2>User List</h2>
    <ul>
      <li v-for="user in userList" :key="user.id">{{ user.name }}</li>
    </ul>
    <div v-if="batchError" class="error-message">{{ batchError }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getUserList, getUserDetail, fetchUserBatch } from '@/api/user';

const userId = 1; // 假设我们要获取的用户 ID
const userList = ref([]);
const userDetail = ref(null);
const batchError = ref(null);

const fetchUsers = async () => {
  try {
    const [list, detail] = await fetchUserBatch(userId);
    userList.value = list;
    userDetail.value = detail;
  } catch (error) {
    batchError.value = 'Failed to fetch user details and list';
  }
};

onMounted(fetchUsers);
</script>

<style>
.error-message {
  color: red;
}
</style>
```
- 2. 创建新用户并重试

```javascript
// src/api/user.js
import request from '@/utils/request';

// 创建用户
export function createUser(data) {
  return request.post('/user/create', data);
}

// 创建用户并重试
export function createUserWithRetry(data, retries = 3, delay = 1000) {
  return request.retry('/user/create', data, retries, delay);
}
```
- 使用案例

在表单提交时，我们可以使用重试机制来确保在网络不稳定的情况下用户能够成功创建。

```vue
<!-- src/components/CreateUserWithRetry.vue -->
<template>
  <div>
    <h1>Create User</h1>
    <form @submit.prevent="createUser">
      <input type="text" v-model="name" placeholder="Name" required />
      <input type="email" v-model="email" placeholder="Email" required />
      <button type="submit">Create User</button>
    </form>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { createUserWithRetry } from '@/api/user';

const name = ref('');
const email = ref('');
const errorMessage = ref('');

const createUser = async () => {
  try {
    await createUserWithRetry({ name: name.value, email: email.value });
    alert('User created successfully!');
    name.value = '';
    email.value = '';
  } catch (error) {
    errorMessage.value = 'Failed to create user, please try again.';
  }
};
</script>

<style>
.error-message {
  color: red;
}
</style>
```
- 3. 节流请求搜索用户

```javascript
// src/api/user.js
import request from '@/utils/request';

// 搜索用户
export function searchUser(query) {
  return request.get('/user/search', { params: { query } });
}

// 节流搜索用户请求
export function throttledSearchUser(query) {
  return request.throttle('/user/search', { params: { query } });
}
```
- 使用案例

在搜索框组件中，我们可以使用节流来限制用户输入时的请求频率。

```vue
<!-- src/components/UserSearchWithThrottle.vue -->
<template>
  <div>
    <input type="text" v-model="searchQuery" placeholder="Search users" @input="searchUsers" />
    <ul>
      <li v-for="user in users" :key="user.id">{{ user.name }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { throttledSearchUser } from '@/api/user';

const searchQuery = ref('');
const users = ref([]);

const searchUsers = async () => {
  if (searchQuery.value.trim()) {
    try {
      const data = await throttledSearchUser(searchQuery.value);
      users.value = data;
    } catch (error) {
      console.error('Search failed:', error);
    }
  } else {
    users.value = [];
  }
};

watch(searchQuery, searchUsers, { immediate: false });
</script>
```
- 4. 缓存用户信息请求

```javascript
// src/api/user.js
import request from '@/utils/request';

// 获取用户信息
export function getUserInfo(userId) {
  return request.cache(`/user/info/${userId}`, {}, 60000);
}
```
- 使用案例

在用户信息组件中，我们可以缓存请求结果，以减少对同一用户信息的重复请求。

```vue
<!-- src/components/CachedUserInfo.vue -->
<template>
  <div>
    <h1>User Info</h1>
    <div v-if="userInfo">
      <p>Name: {{ userInfo.name }}</p>
      <p>Email: {{ userInfo.email }}</p>
    </div>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getUserInfo } from '@/api/user';

const userId = 1; // 假设我们要获取的用户 ID
const userInfo = ref(null);
const errorMessage = ref('');

const fetchUserInfo = async () => {
  try {
    userInfo.value = await getUserInfo(userId);
  } catch (error) {
    errorMessage.value = 'Failed to fetch user info';
  }
};

onMounted(fetchUserInfo);
</script>

<style>
.error-message {
  color: red;
}
</style>
```
## 11. **代码质量和格式化**：
- 在 Vue 3 项目中，代码质量和格式化是确保代码一致性和可读性的重要部分。我们可以使用 ESLint 来检查代码质量，Prettier 来格式化代码。
- 以下是具体的代码展示和配置步骤：

1. **安装 ESLint 和 Prettier**：
```bash
npm install eslint prettier --save-dev
```
2. **安装 Vue 相关的 ESLint 插件**：
```bash
npm install eslint-plugin-vue @vue/eslint-config-prettier --save-dev
```

3. **创建 ESLint 配置文件**：
   创建一个 `.eslintrc.js` 文件在项目根目录，并添加以下配置：
```javascript
// .eslintrc.js
module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        '@vue/prettier',
        '@vue/prettier/vue3',
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    env: {
        browser: true,
        node: true,
    },
    rules: {
        // 可以在这里自定义规则
        'vue/no-unused-vars': 'warn',
        'vue/no-multiple-template-root': 'off',
    },
};
```

4. **创建 Prettier 配置文件**：
   创建一个 `.prettierrc` 文件在项目根目录，并添加以下配置：
```json
// .prettierrc
{
  // 是否在语句末尾添加分号
  "semi": false,
  // 是否使用单引号
  "singleQuote": true,
  // 制表符的宽度，设置为2意味着每两个空格视为一个制表符
  "tabWidth": 2,
  // 是否在对象或数组最后一个元素后面添加逗号
  "trailingComma": "es5",
  // 对象字面量括号和值之间是否打印空格
  "bracketSpacing": true,
  // 箭头函数参数括号的打印规则
  "arrowParens": "always",
  // 行尾序列，lf 表示使用 \n
  "endOfLine": "lf"
}
```

5. **创建 lint 脚本**：
   在 `package.json` 文件中添加 lint 脚本：
```json
"scripts": {
	"lint": "eslint ./src --ext .js,.vue",
	"lint:fix": "eslint ./src --ext .js,.vue --fix"
}
```

6. **在编辑器中集成 ESLint 和 Prettier**：
   - 如果你使用的是 VSCode，可以安装 Vetur 和 ESLint 插件。
   - 确保 Vetur 插件的格式化工具设置为 Prettier。

7. **使用案例**：
   - 在 Vue 3 组件中，当你保存文件时，Prettier 会自动格式化代码。
   - 当你运行 `npm run lint` 命令时，ESLint 会检查代码中的错误。

以下是 Vue 3 组件的示例代码，它遵循了 ESLint 和 Prettier 的规则：

```vue
<!-- src/components/ExampleComponent.vue -->
<template>
<div class="example-component">
    <h1>{{ message }}</h1>
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    const message = ref('Hello, Vue 3!');
</script>

<style scoped>
    .example-component {
        color: #3498db;
    }
</style>
```

在这个组件中，我们使用了 `ref` 来创建一个响应式的数据 `message`。模板中包含了一个简单的欢迎信息，样式使用了 scoped 属性来确保样式只作用于当前组件。
通过上述步骤，你可以确保 Vue 3 项目的代码质量和一致性。

## 12. 构建生产环境：

1. **使用 `npm run build`**:
   - 运行 `npm run build` 命令，Vite 会启动生产环境的构建过程，包括代码压缩、摇树优化（Tree-shaking）等。

2. **使用 `vite-plugin-compression`**:
   - 安装插件：`npm install vite-plugin-compression --save-dev`
   - 在 `vite.config.js` 中配置插件以启用 Gzip 或 Brotli 压缩，减少文件传输大小。

## 13. 性能优化：

1. **使用 `webpack-bundle-analyzer`**:
   - 安装分析工具：`npm install --save-dev webpack-bundle-analyzer`
   - 在 `vite.config.js` 中配置插件以分析打包后的文件大小和依赖关系，帮助识别优化点。

2. **使用 `vite` 的 `build.rollupOptions`**:
   - 在 `vite.config.js` 中配置 `rollupOptions` 来控制代码分割和动态导入，减少初始加载时间和按需加载资源。

3. **使用 `vite` 的 `cssCodeSplit`**:
   - Vite 默认启用 CSS 代码分割，确保样式按需加载。

4. **使用 `vite` 的 `build.lib`**:
   - 使用 `build.lib` 选项构建库模式，适用于创建可复用的 UI 组件库。

5. **使用 `vite` 的 `build.terserOptions`**:
   - 配置 Terser 压缩选项以进一步压缩 JavaScript 代码，提高生产环境的加载性能。

## 14. 服务端渲染（SSR）（可用可不用）：

- **使用 Vue 3 的 SSR 解决方案**:
   - 如 Nuxt 3，可以预渲染页面，提高首屏加载速度和 SEO。
当然可以。以下是使用 Vue 3 和 Vite 实现服务端渲染（SSR）的基本代码示例：
1. **设置项目结构**：
```plaintext
project-root/
├── node_modules/
├── src/
│   ├── App.vue
│   ├── main.js
│   ├── entry-server.js
│   └── entry-client.js
├── public/
│   └── index.html
├── package.json
└── vite.config.js
```

2. **`public/index.html`**：这是服务端发送到客户端的模板 HTML 文件。
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Vue 3 SSR</title>
    </head>
    <body>
        <div id="app"></div>
        <script type="module" src="/src/entry-client.js"></script>
    </body>
</html>
```

3. **`src/App.vue`**：这是应用的根组件。
```vue
<template>
<div>
    <h1>{{ message }}</h1>
    </div>
</template>

<script setup>
    const message = 'Hello from Vue 3 SSR!';
</script>
```

4. **`src/main.js`**：这是客户端和服务器共享的 Vue 应用入口文件。
```javascript
import { createSSRApp } from 'vue';
import App from './App.vue';

export function createApp() {
    const app = createSSRApp(App);
    return app;
}
```

5. **`src/entry-server.js`**：这是服务端入口文件，用于渲染应用。
```javascript
import { createApp } from './main.js';
import { renderToString } from 'vue/server-renderer';

export async function render(req, res) {
    const app = createApp();
    const html = await renderToString(app);
    res.end(html);
}
```

6. **`src/entry-client.js`**：这是客户端入口文件，用于激活应用。
```javascript
import { createApp } from './main.js';

const app = createApp();
app.mount('#app');
```

7. **`vite.config.js`**：这是 Vite 配置文件，用于设置 SSR 环境。
```javascript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    server: {
        middlewareMode: 'ssr',
        csr: false // 禁用 CSR 模式
    },
    build: {
        ssr: true,
        rollupOptions: {
            input: {
                main: 'path/to/entry-server.js',
                server: 'path/to/entry-server.js',
                client: 'path/to/entry-client.js',
            },
        },
    },
});
```

8. **服务器设置**：使用 Express 或其他 Node.js 服务器框架来设置服务器。
```javascript
const express = require('express');
const { createServer: createViteServer } = require('vite');
const { render } = require('./src/entry-server.js');

const app = express();

async function init() {
    const vite = await createViteServer({
        server: { middlewareMode: 'ssr' },
    });

    app.use(vite.middlewares);

    app.use('*', async (req, res) => {
        await vite.transformIndexHtml(req.originalUrl, (html) => {
            const { html: renderedHtml } = await render(req, res);
            return renderedHtml;
        });
        res.end(html);
    });

    app.listen(3000, () => {
        console.log('Server is running at http://localhost:3000');
    });
}

init();
```

以上代码提供了一个基本的 Vue 3 SSR 应用的框架。在实际应用中，你可能需要添加路由、状态管理（如 Pinia 或 Vuex）、数据获取逻辑等。此外，你还需要根据项目的具体需求调整配置和代码结构。
## 15. 分析构建包

- **使用 `@rollup/plugin-visualizer`**:
   - 在 `vite.config.js` 中配置 Rollup 插件来分析构建包，帮助理解资源文件的组成和大小。

## 16. 部署

- **配置 `vite` 的 `base` 选项**:
   - 设置部署的基础路径，例如部署到子目录时，需要配置 `base: '/subpath/'`。

以下是具体的代码示例：
当然，以下是添加了详细代码注释的 `vite.config.js` 配置文件：

```javascript
// vite.config.js
import { defineConfig } from 'vite'; // 导入 Vite 配置工厂函数
import vue from '@vitejs/plugin-vue'; // 导入 Vue 插件，用于支持 Vue 单文件组件
import { createVisualizer } from 'rollup-plugin-visualizer'; // 导入 Rollup 可视化插件，用于分析打包后的文件
import compression from 'vite-plugin-compression'; // 导入 Vite 压缩插件，用于 Gzip 压缩
import path from 'path'; // 导入 Node.js 的路径处理模块
import styleImport from 'vite-plugin-style-import'; // 导入样式导入插件

export default defineConfig({
    plugins: [
        vue(), // 使用 Vue 插件
        styleImport({ // 使用样式导入插件
            libs: [
                { libraryName: 'element-plus', resolveStyle: (name) => `element-plus/lib/theme-chalk/${name}.css` }, // 自动引入 Element Plus 样式
            ],
        }), // 配置样式导入插件
        compression({
            ext: '.gz', // 指定压缩后文件的扩展名
            deleteOriginFile: false, // 是否删除原始文件
        }), // 配置压缩插件
        createVisualizer({ open: true, gzipSize: true }) // 配置可视化插件，打开可视化界面并显示 Gzip 压缩大小
    ],
    server: {
        host: '0.0.0.0', // 设置服务器监听所有网络接口
        port: 3000, // 设置服务器监听的端口号
        open: true, // 启动服务器时自动打开浏览器
        proxy: {
            '/api': { // 设置 API 请求的代理规则
                target: 'http://localhost:5000', // 代理目标服务器
                changeOrigin: true, // 是否允许不同源
                rewrite: (path) => path.replace(/^\/api/, ''), // 重写请求路径
            },
        },
        hmr: { overlay: false }, // 禁用热更新层
    },
    build: {
        sourcemap: true, // 是否生成 source map 文件，便于生产环境下调试
        terserOptions: { // 配置 Terser 压缩选项
            compress: { // 压缩选项
                drop_console: true, // 移除所有的 console 语句
                drop_debugger: true, // 移除所有的 debugger 语句
            },
            format: { // 格式化选项
                comments: 'none', // 生产环境中移除所有注释
            },
        },
        rollupOptions: { // 配置 Rollup 选项
            output: { // 输出配置
                chunkFileNames: 'assets/js/[name]-[hash].js', // 代码分割的文件名模板
                entryFileNames: 'assets/js/[name]-[hash].js', // 入口文件的文件名模板
                assetFileNames: 'assets/[name]-[hash][extname]', // 资源文件的文件名模板
            },
            resolve: { // 模块解析配置
                alias: { // 设置路径别名
                    '@/': '/src', // 将 `@` 别名指向 `/src` 目录
                },
            },
        },
    },
    base: '/subpath/', // 设置部署的基础路径
});
```

## 17. 最终的项目目录

```
your-project-name/
├── public/
│   └── index.html              # 项目的入口 HTML 文件
├── src/
│   ├── assets/                # 存放静态资源，如图片、图标等
│   │   └── logo.png
│   ├── composables/          # 存放 Vue 3 的 Composition API 函数
│   │   └── useExample.js
│   ├── components/           # 存放可复用的 UI 组件
│   │   ├── Navigation.vue
│   │   └── UserList.vue
│   ├── views/                # 存放页面组件
│   │   ├── HomeView.vue
│   │   └── AboutView.vue
│   ├── stores/               # 存放 Pinia 存储
│   │   └── useUserStore.js
│   ├── utils/                # 存放工具函数，如 HTTP 请求工具
│   │   └── request.js
│   ├── api/                  # 存放 API 请求函数
│   │   ├── user.js
│   │   └── index.js
│   ├── router/               # 存放路由配置
│   │   ├── index.js
│   │   ├── modules/
│   │   │   ├── home.js
│   │   │   ├── about.js
│   │   │   └── not-found.js
│   ├── App.vue               # 根 Vue 组件
│   ├── main.js               # Vue 应用的入口文件
│   ├── styles/               # 存放样式文件，如 Less 变量
│   │   └── variables.less
│   ├── types/                # 存放 TypeScript 类型定义
│   │   └── index.d.ts
│   ├── tests/                # 存放测试文件
│   │   └── unit/
│   │       └── HomeView.spec.js
│   └── hooks/                # 存放自定义钩子
│       └── useExampleHook.js
├── .gitignore               # 指定 Git 忽略跟踪的文件和目录
├── package.json             # 项目依赖和脚本
├── vite.config.js           # Vite 配置文件
├── postcss.config.js        # PostCSS 配置文件
├── eslintrc.js              # ESLint 配置文件
└── prettierrc               # Prettier 配置文件
```

在这个目录结构中：

- `public/` 目录包含了静态资源文件，通常是 `index.html` 文件，它是应用的入口点。
- `src/` 目录是源代码的根目录，包含了所有的源文件。
  - `assets/` 存放静态资源，如图片、视频、字体等。
  - `composables/` 存放 Vue 3 的 Composition API 函数，用于逻辑复用。
  - `components/` 存放可复用的 UI 组件。
  - `views/` 存放页面组件，通常是较大的页面级组件。
  - `stores/` 存放 Pinia 存储，用于应用的状态管理。
  - `utils/` 存放工具函数，如 HTTP 请求、日期处理等。
  - `api/` 存放 API 请求函数，用于与后端服务进行通信。
  - `router/` 存放路由配置，用于页面路由的定义。
  - `App.vue` 是根 Vue 组件，通常包含应用的模板结构。
  - `main.js` 是 Vue 应用的入口文件，用于创建 Vue 实例和挂载。
  - `styles/` 存放样式文件，如 Less 或 Sass 文件。
  - `types/` 存放 TypeScript 类型定义文件，用于类型检查和智能提示。
  - `tests/` 存放测试文件，用于单元测试和端到端测试。
  - `hooks/` 存放自定义钩子，如 React/Vue 钩子。

- `.gitignore` 文件用于指定 Git 忽略跟踪的文件和目录，如日志文件、依赖目录等。
- `package.json` 文件包含了项目的元数据和依赖信息，以及脚本命令。
- `vite.config.js` 是 Vite 的配置文件，用于自定义构建和开发过程。
- `postcss.config.js` 是 PostCSS 的配置文件，用于添加 PostCSS 插件和处理器。
- `.eslintrc.js` 是 ESLint 的配置文件，用于代码质量和风格检查。
- `.prettierrc` 是 Prettier 的配置文件，用于代码格式化。

## 18. main.js文件
```js
// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // 引入路由配置
import { createPinia } from 'pinia'; // 引入 Pinia 状态管理库
import piniaStore from './stores'; // 引入 Pinia 存储
import 'element-plus/lib/theme-chalk/index.css'; // 引入 Element Plus 样式
import styleImport from 'vite-plugin-style-import'; // 引入样式导入插件

// 创建 Pinia 实例
const pinia = createPinia();

// 创建 Vue 应用实例
const app = createApp(App);

// 使用 Pinia
app.use(pinia);

// 使用路由
app.use(router);

// 需要手动引入需要的组件或插件
app.use(styleImport);

// 如果有其他插件或配置，也可以在这里引入和使用
// ...

// 挂载 Vue 应用
app.mount('#app');
```

##  19. **安装Husky**：
### 1.首先，确保你的项目中安装了Husky。使用npm或yarn来安装：
```sh
    npm install husky --save-dev
    # 或者使用yarn
    yarn add husky --dev
```

###  2. **安装Git钩子**：
- 在项目根目录下运行以下命令来安装Husky钩子：
```sh
	npx husky install
```
   这会在`.husky`目录下创建Git钩子文件。

###  3. **配置Husky钩子**：
   - 你可以配置多个钩子，例如`pre-commit`、`commit-msg`、`pre-push`等。以下是一些常见的配置示例：

- **pre-commit**：在提交前运行代码检查和格式化。
```json
"husky": {
    {
    "hooks": {
            "pre-commit": "npm run lint",
            "pre-commit": "npm run format"
        }
    }
}
```
- **commit-msg**：在提交信息编写时检查格式。
```json
"husky": {
    {
        "hooks": {
        	"commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
        }
    }
}
```
- **pre-push**：在推送前运行测试。
```json
"husky": {
    {
        "hooks": {
        	"pre-push": "npm test"
        }
    }
}
```

### 4. **添加到`package.json`**：
将上述配置添加到你的`package.json`文件中。例如：
```json
{
    "name": "your-project-name",
    "version": "1.0.0",
    "scripts": {
        "lint": "eslint .",
        "format": "prettier --write ."
    },
    "devDependencies": {
        "husky": "^7.0.0",
        "eslint": "^7.32.0",
        "prettier": "^2.3.2",
        "commitlint": "^13.2.1",
        "@commitlint/cli": "^13.2.1",
        "@commitlint/config-conventional": "^13.2.1"
    },
    "husky": {
        "hooks": {
            "pre-commit": "npm run lint && npm run format",
            "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
        }
    }
}
```

### 5. **初始化Husky（如果尚未初始化）**：
如果你的项目是新的，或者你刚刚添加了Husky，你可能需要初始化Husky：
```sh
npx husky install
```

### 6. **配置`.huskyrc`文件**（可选）：
如果你需要在Husky钩子中使用额外的配置，可以在项目根目录下创建`.huskyrc`文件。例如：
```json
{
    "hooks": {
        "pre-commit": "echo 'Running pre-commit hooks' && npm run lint && npm run format",
        "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
}
```

完成这些步骤后，Husky将根据你的配置在相应的Git钩子触发时执行指定的脚本。这有助于自动化代码质量检查和格式化，确保代码的一致性和可维护性。
