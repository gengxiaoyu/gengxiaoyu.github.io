---
title: Vue组件系统
createTime: 2026/02/04 15:24:13
permalink: /webDocView/15-vue-base/03-component-system/
---

# Vue组件系统

## 模块概述

本模块涵盖Vue框架的组件系统，是Vue开发的核心部分。通过学习本模块，你将掌握Vue组件的创建、通信、生命周期、高级特性等核心概念，为构建复杂的Vue应用打下坚实的基础。

## 知识点清单

### 1. 组件基础
- **组件概念**：什么是组件
- **组件优势**：代码复用、逻辑分离、维护性提高
- **组件类型**：全局组件、局部组件、单文件组件
- **组件注册**：全局注册、局部注册
- **组件命名**：kebab-case vs PascalCase

### 2. 组件通信
- **父向子通信**：props
- **子向父通信**：$emit
- **兄弟组件通信**：eventBus、Vuex/Pinia
- **跨层级通信**：provide/inject
- **组件引用**：ref
- ** attrs和$listeners**：透传属性和事件

### 3. 组件生命周期
- **组件生命周期钩子**：创建、挂载、更新、销毁
- **父子组件生命周期**：执行顺序
- **生命周期应用场景**：各钩子的最佳使用场景

### 4. 组件高级特性
- **动态组件**：component
- **异步组件**：defineAsyncComponent
- **递归组件**：组件自引用
- **函数式组件**：无状态组件
- **插槽**：默认插槽、具名插槽、作用域插槽
- **混入**：mixin
- **自定义指令**：directive

### 5. 组件样式
- **组件样式隔离**：scoped
- **CSS Modules**：局部作用域
- **深度选择器**：:deep()
- **全局样式**：

### 6. 组件性能优化
- **组件拆分**：合理拆分组件
- **虚拟滚动**：处理长列表
- **缓存组件**：keep-alive
- **异步组件**：按需加载
- **计算属性**：缓存计算结果
- **v-memo**：缓存模板片段

## 核心概念详解

### 1. 组件基础

#### 组件概念

```vue
<!-- 什么是组件 -->
<!-- 组件是Vue中最强大的功能之一，它允许我们将UI拆分为独立、可复用的部分 -->
<!-- 每个组件都有自己的模板、逻辑和样式，可以独立开发和测试 -->

<!-- 组件的基本结构 -->
<template>
  <div class="component">
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: 'MyComponent',
  props: {
    title: String,
    description: String
  }
}
</script>

<style scoped>
.component {
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>

<!-- 组件的特点 -->
<!-- 1. 独立性：每个组件都有自己的状态和行为 -->
<!-- 2. 可复用：可以在多个地方重复使用 -->
<!-- 3. 可组合：可以通过组合多个组件构建复杂的UI -->
<!-- 4. 可维护：组件化使代码结构清晰，便于维护 -->
```

#### 组件优势

```vue
<!-- 1. 代码复用 -->
<!-- 可以在多个地方重复使用相同的组件，避免代码重复 -->
<user-card v-for="user in users" :key="user.id" :user="user"></user-card>

<!-- 2. 逻辑分离 -->
<!-- 每个组件负责自己的逻辑，使代码更清晰、更易维护 -->
<user-card>
  <user-avatar></user-avatar>
  <user-info></user-info>
  <user-actions></user-actions>
</user-card>

<!-- 3. 维护性提高 -->
<!-- 组件化使代码结构清晰，便于定位和修复问题 -->
<!-- 修改某个功能时，只需要修改对应的组件 -->

<!-- 4. 团队协作 -->
<!-- 不同开发人员可以并行开发不同的组件 -->
<!-- 组件之间通过明确的接口进行通信 -->

<!-- 5. 测试友好 -->
<!-- 组件可以独立测试，提高测试覆盖率 -->

<!-- 6. 性能优化 -->
<!-- 组件可以独立优化，如异步加载、缓存等 -->
```

#### 组件命名

```vue
<!-- 1. kebab-case（短横线命名） -->
<!-- 在HTML模板中使用kebab-case -->
<my-component></my-component>
<user-card></user-card>
<app-header></app-header>

<!-- 2. PascalCase（帕斯卡命名） -->
<!-- 在JavaScript中使用PascalCase -->
import MyComponent from './MyComponent.vue';
import UserCard from './UserCard.vue';

export default {
  components: {
    MyComponent,
    UserCard
  }
};

<!-- 3. 命名规范 -->
<!-- ✅ 推荐：使用多个单词 -->
<user-card></user-card>
<app-header></app-header>
<button-primary></button-primary>

<!-- ❌ 不推荐：使用单个单词（可能与HTML标签冲突） -->
<button></button>
<header></header>
<footer></footer>

<!-- 4. 组件名称与文件名对应 -->
<!-- MyComponent.vue -->
export default {
  name: 'MyComponent'
};

<!-- 使用时 -->
<my-component></my-component>

<!-- 5. 自闭合组件 -->
<!-- Vue允许组件自闭合，但建议始终使用闭合标签 -->
<!-- ✅ 推荐 -->
<my-component></my-component>

<!-- ⚠️ 可以使用，但不推荐 -->
<my-component />

<!-- 注意：在DOM模板中必须使用闭合标签 -->
<div id="app">
  <my-component></my-component>
</div>
```

#### 组件创建方式

##### 全局组件

```javascript
// Vue2
Vue.component('my-component', {
  template: '<div>Hello Global Component</div>'
});

// Vue3
import { createApp } from 'vue'
const app = createApp({})

app.component('my-component', {
  template: '<div>Hello Global Component</div>'
});
```

##### 局部组件

```vue
<template>
  <div>
    <my-local-component></my-local-component>
  </div>
</template>

<script>
export default {
  components: {
    'my-local-component': {
      template: '<div>Hello Local Component</div>'
    }
  }
}
</script>
```

##### 单文件组件（.vue文件）

```vue
<!-- MyComponent.vue -->
<template>
  <div>Hello Single File Component</div>
</template>

<script>
export default {
  name: 'MyComponent'
}
</script>

<style scoped>
div {
  color: red;
}
</style>
```

#### 组件注册

```javascript
// 导入组件
import MyComponent from './MyComponent.vue';

// 局部注册
export default {
  components: {
    MyComponent
  }
};

// 全局注册
import { createApp } from 'vue';
import App from './App.vue';
import MyComponent from './MyComponent.vue';

const app = createApp(App);
app.component('MyComponent', MyComponent);
app.mount('#app');
```

### 2. 组件通信

#### 父向子通信（props）

```vue
<!-- ParentComponent.vue -->
<template>
  <div>
    <child-component :message="parentMessage" :user="user"></child-component>
  </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  components: {
    ChildComponent
  },
  data() {
    return {
      parentMessage: 'Hello from parent',
      user: {
        name: 'John',
        age: 30
      }
    };
  }
};
</script>
```

```vue
<!-- ChildComponent.vue -->
<template>
  <div>
    <p>{{ message }}</p>
    <p>{{ user.name }} is {{ user.age }} years old</p>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: 'Default message'
    },
    user: {
      type: Object,
      required: true
    }
  }
};
</script>
```

#### 子向父通信（$emit）

```vue
<!-- ChildComponent.vue -->
<template>
  <div>
    <button @click="sendMessage">Send Message to Parent</button>
  </div>
</template>

<script>
export default {
  methods: {
    sendMessage() {
      this.$emit('child-event', 'Hello from child', { data: 'some data' });
    }
  }
};
</script>
```

```vue
<!-- ParentComponent.vue -->
<template>
  <div>
    <child-component @child-event="handleChildEvent"></child-component>
    <p>{{ messageFromChild }}</p>
  </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  components: {
    ChildComponent
  },
  data() {
    return {
      messageFromChild: ''
    };
  },
  methods: {
    handleChildEvent(message, data) {
      this.messageFromChild = message;
      console.log(data); // { data: 'some data' }
    }
  }
};
</script>
```

#### 跨层级通信（provide/inject）

```vue
<!-- GrandparentComponent.vue -->
<template>
  <div>
    <parent-component></parent-component>
  </div>
</template>

<script>
import ParentComponent from './ParentComponent.vue';

export default {
  components: {
    ParentComponent
  },
  provide() {
    return {
      globalMessage: 'Hello from grandparent',
      user: {
        name: 'John',
        age: 30
      }
    };
  }
};
</script>
```

```vue
<!-- ChildComponent.vue -->
<template>
  <div>
    <p>{{ globalMessage }}</p>
    <p>{{ user.name }} is {{ user.age }} years old</p>
  </div>
</template>

<script>
export default {
  inject: ['globalMessage', 'user']
};
</script>
```

#### 组件引用（ref）

```vue
<template>
  <div>
    <child-component ref="childRef"></child-component>
    <button @click="callChildMethod">Call Child Method</button>
  </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  components: {
    ChildComponent
  },
  methods: {
    callChildMethod() {
      this.$refs.childRef.childMethod();
    }
  }
};
</script>
```

```vue
<!-- ChildComponent.vue -->
<template>
  <div>Child Component</div>
</template>

<script>
export default {
  methods: {
    childMethod() {
      console.log('Child method called');
    }
  }
};
</script>
```

#### 兄弟组件通信

```vue
<!-- EventBus.js -->
import Vue from 'vue';

export const EventBus = new Vue();

<!-- ComponentA.vue -->
<template>
  <div>
    <button @click="sendMessage">Send Message to B</button>
  </div>
</template>

<script>
import { EventBus } from './EventBus';

export default {
  methods: {
    sendMessage() {
      EventBus.$emit('message-from-a', 'Hello from Component A');
    }
  }
};
</script>

<!-- ComponentB.vue -->
<template>
  <div>
    <p>Message from A: {{ message }}</p>
  </div>
</template>

<script>
import { EventBus } from './EventBus';

export default {
  data() {
    return {
      message: ''
    };
  },
  mounted() {
    EventBus.$on('message-from-a', (message) => {
      this.message = message;
    });
  },
  beforeUnmount() {
    // 记得在组件销毁时移除事件监听
    EventBus.$off('message-from-a');
  }
};
</script>

<!-- Vuex/Pinia方式 -->

<!-- store.js -->
import { defineStore } from 'pinia';

export const useMessageStore = defineStore('message', {
  state: () => ({
    message: ''
  }),
  actions: {
    setMessage(message) {
      this.message = message;
    }
  }
});

<!-- ComponentA.vue -->
<template>
  <div>
    <button @click="sendMessage">Send Message to B</button>
  </div>
</template>

<script>
import { useMessageStore } from './store';

export default {
  setup() {
    const messageStore = useMessageStore();
    
    const sendMessage = () => {
      messageStore.setMessage('Hello from Component A');
    };
    
    return {
      sendMessage
    };
  }
};
</script>

<!-- ComponentB.vue -->
<template>
  <div>
    <p>Message from A: {{ message }}</p>
  </div>
</template>

<script>
import { useMessageStore } from './store';
import { storeToRefs } from 'pinia';

export default {
  setup() {
    const messageStore = useMessageStore();
    const { message } = storeToRefs(messageStore);
    
    return {
      message
    };
  }
};
</script>
```

#### $attrs和$listeners透传

```vue
<!-- BaseButton.vue -->
<template>
  <button
    v-bind="$attrs"
    v-on="$listeners"
    class="base-button"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  inheritAttrs: false
};
</script>

<style scoped>
.base-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}
</style>

<!-- PrimaryButton.vue -->
<template>
  <base-button class="primary-button">
    <slot></slot>
  </base-button>
</template>

<script>
import BaseButton from './BaseButton.vue';

export default {
  name: 'PrimaryButton',
  components: {
    BaseButton
  }
};
</script>

<style scoped>
.primary-button {
  background-color: #007bff;
}
</style>

<!-- 使用PrimaryButton -->
<template>
  <div>
    <primary-button
      type="submit"
      @click="handleSubmit"
      :disabled="isSubmitting"
    >
      Submit
    </primary-button>
  </div>
</template>

<!-- Vue3中的透传 -->
<!-- Vue3中，$listeners被合并到$attrs中 -->

<!-- BaseButton.vue (Vue3) -->
<template>
  <button
    v-bind="$attrs"
    class="base-button"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  inheritAttrs: false
};
</script>

<!-- 多层透传 -->
<!-- Grandparent.vue -->
<template>
  <parent-component
    :message="message"
    @custom-event="handleEvent"
  ></parent-component>
</template>

<!-- ParentComponent.vue -->
<template>
  <child-component v-bind="$attrs" v-on="$listeners"></child-component>
</template>

<script>
export default {
  name: 'ParentComponent',
  inheritAttrs: false
};
</script>

<!-- ChildComponent.vue -->
<template>
  <div>{{ message }}</div>
</template>

<script>
export default {
  name: 'ChildComponent',
  props: {
    message: String
  }
};
</script>
```

### 3. 组件生命周期

#### 组件生命周期钩子

```vue
<template>
  <div>{{ message }}</div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello'
    };
  },
  // 创建阶段
  beforeCreate() {
    console.log('beforeCreate: 实例创建前');
    console.log('data:', this.$data); // undefined
    console.log('el:', this.$el); // undefined
  },
  created() {
    console.log('created: 实例创建后');
    console.log('data:', this.$data); // 已初始化
    console.log('el:', this.$el); // undefined
  },
  // 挂载阶段
  beforeMount() {
    console.log('beforeMount: 挂载前');
    console.log('el:', this.$el); // 已存在但未挂载
  },
  mounted() {
    console.log('mounted: 挂载后');
    console.log('el:', this.$el); // 已挂载
  },
  // 更新阶段
  beforeUpdate() {
    console.log('beforeUpdate: 更新前');
  },
  updated() {
    console.log('updated: 更新后');
  },
  // 销毁阶段
  beforeUnmount() {
    console.log('beforeUnmount: 卸载前');
  },
  unmounted() {
    console.log('unmounted: 卸载后');
  }
};
</script>
```

#### 父子组件生命周期执行顺序

1. 父组件：beforeCreate
2. 父组件：created
3. 父组件：beforeMount
4. 子组件：beforeCreate
5. 子组件：created
6. 子组件：beforeMount
7. 子组件：mounted
8. 父组件：mounted
```

#### 生命周期应用场景

```vue
<!-- 生命周期应用场景 -->

<template>
  <div>
    <p>{{ message }}</p>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello',
      count: 0,
      timer: null,
      chart: null
    };
  },
  
  // beforeCreate: 实例创建前
  // 应用场景：无法访问data、methods等，很少使用
  beforeCreate() {
    console.log('beforeCreate');
    // ❌ 不能访问this.message
    // ❌ 不能调用this.increment()
  },
  
  // created: 实例创建后
  // 应用场景：初始化数据、调用API获取数据
  created() {
    console.log('created');
    // ✅ 可以访问data和methods
    this.message = 'Hello Vue!';
    
    // 获取初始数据
    this.fetchInitialData();
    
    // 设置定时器
    this.timer = setInterval(() => {
      this.count++;
    }, 1000);
  },
  
  // beforeMount: 挂载前
  // 应用场景：最后的初始化工作，DOM还未挂载
  beforeMount() {
    console.log('beforeMount');
    // ❌ 不能访问DOM元素
    // console.log(this.$el); // undefined
  },
  
  // mounted: 挂载后
  // 应用场景：DOM操作、第三方库初始化、订阅事件
  mounted() {
    console.log('mounted');
    // ✅ 可以访问DOM元素
    console.log(this.$el); // DOM元素
    
    // 初始化图表库
    this.initChart();
    
    // 订阅事件
    window.addEventListener('resize', this.handleResize);
    
    // 自动聚焦
    this.$refs.inputRef?.focus();
  },
  
  // beforeUpdate: 更新前
  // 应用场景：访问更新前的DOM状态
  beforeUpdate() {
    console.log('beforeUpdate');
    // ✅ 可以访问更新前的DOM
    const oldHeight = this.$el.offsetHeight;
    this.oldHeight = oldHeight;
  },
  
  // updated: 更新后
  // 应用场景：DOM更新后的处理、避免无限循环
  updated() {
    console.log('updated');
    // ✅ 可以访问更新后的DOM
    const newHeight = this.$el.offsetHeight;
    
    // 避免无限循环
    if (newHeight !== this.oldHeight) {
      this.adjustLayout();
    }
  },
  
  // beforeUnmount: 销毁前
  // 应用场景：清理工作、解绑事件、清除定时器
  beforeUnmount() {
    console.log('beforeUnmount');
    // 清理定时器
    if (this.timer) {
      clearInterval(this.timer);
    }
    
    // 解绑事件
    window.removeEventListener('resize', this.handleResize);
    
    // 销毁图表实例
    if (this.chart) {
      this.chart.destroy();
    }
  },
  
  // unmounted: 销毁后
  // 应用场景：最后的清理工作
  unmounted() {
    console.log('unmounted');
    // 所有的事件监听器和定时器已被清理
  },
  
  methods: {
    async fetchInitialData() {
      const response = await fetch('/api/data');
      const data = await response.json();
      this.message = data.message;
    },
    
    initChart() {
      // 初始化图表库
      this.chart = new Chart(this.$refs.chartRef, {
        data: this.chartData
      });
    },
    
    handleResize() {
      // 处理窗口大小变化
      this.adjustLayout();
    },
    
    adjustLayout() {
      // 调整布局
      console.log('Layout adjusted');
    },
    
    increment() {
      this.count++;
    }
  }
};
</script>

<!-- 生命周期最佳实践 -->

<!-- 1. 数据获取 -->
export default {
  created() {
    // ✅ 推荐：在created中获取数据
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const response = await fetch('/api/data');
      this.data = await response.json();
    }
  }
};

<!-- 2. DOM操作 -->
export default {
  mounted() {
    // ✅ 推荐：在mounted中操作DOM
    this.$refs.inputRef.focus();
    this.initChart();
  }
};

<!-- 3. 事件监听 -->
export default {
  mounted() {
    // ✅ 添加事件监听
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    // ✅ 移除事件监听
    window.removeEventListener('resize', this.handleResize);
  }
};

<!-- 4. 定时器 -->
export default {
  data() {
    return {
      timer: null
    };
  },
  created() {
    // ✅ 设置定时器
    this.timer = setInterval(() => {
      this.updateTime();
    }, 1000);
  },
  beforeUnmount() {
    // ✅ 清除定时器
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
};

<!-- 5. 第三方库初始化 -->
export default {
  mounted() {
    // ✅ 初始化第三方库
    this.chart = new Chart(this.$refs.chartRef, {
      data: this.chartData
    });
  },
  beforeUnmount() {
    // ✅ 销毁第三方库实例
    if (this.chart) {
      this.chart.destroy();
    }
  }
};
```

### 4. 组件高级特性

#### 动态组件

```vue
<template>
  <div>
    <button @click="currentComponent = 'ComponentA'">Component A</button>
    <button @click="currentComponent = 'ComponentB'">Component B</button>
    <component :is="currentComponent"></component>
  </div>
</template>

<script>
import ComponentA from './ComponentA.vue';
import ComponentB from './ComponentB.vue';

export default {
  components: {
    ComponentA,
    ComponentB
  },
  data() {
    return {
      currentComponent: 'ComponentA'
    };
  }
};
</script>
```

#### 异步组件

```javascript
// Vue2
const AsyncComponent = () => ({
  component: import('./MyComponent.vue'),
  loading: LoadingComponent,
  error: ErrorComponent,
  delay: 200,
  timeout: 3000
});

// Vue3
import { defineAsyncComponent } from 'vue';

const AsyncComponent = defineAsyncComponent({
  loader: () => import('./MyComponent.vue'),
  loadingComponent: LoadingComponent,
  errorComponent: ErrorComponent,
  delay: 200,
  timeout: 3000
});
```

#### 递归组件

```vue
<template>
  <div>
    <p>{{ item.name }}</p>
    <div v-if="item.children && item.children.length">
      <recursive-component
        v-for="child in item.children"
        :key="child.id"
        :item="child"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecursiveComponent', // 必须有name属性
  props: {
    item: {
      type: Object,
      required: true
    }
  }
};
</script>
```

#### 插槽

##### 默认插槽

```vue
<!-- ParentComponent.vue -->
<template>
  <div>
    <child-component>
      <p>Default slot content</p>
    </child-component>
  </div>
</template>

<!-- ChildComponent.vue -->
<template>
  <div>
    <slot></slot>
  </div>
</template>
```

##### 具名插槽

```vue
<!-- ParentComponent.vue -->
<template>
  <div>
    <child-component>
      <template #header>
        <h1>Header content</h1>
      </template>
      <template #footer>
        <p>Footer content</p>
      </template>
    </child-component>
  </div>
</template>

<!-- ChildComponent.vue -->
<template>
  <div>
    <slot name="header"></slot>
    <div>Default content</div>
    <slot name="footer"></slot>
  </div>
</template>
```

##### 作用域插槽

```vue
<!-- ParentComponent.vue -->
<template>
  <div>
    <child-component>
      <template #default="{ item }">
        <p>{{ item.name }} - {{ item.age }}</p>
      </template>
    </child-component>
  </div>
</template>

<!-- ChildComponent.vue -->
<template>
  <div>
    <slot :item="user"></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: 'John',
        age: 30
      }
    };
  }
};
</script>
```

#### 函数式组件

```vue
<!-- 函数式组件是无状态的，没有响应式数据，没有生命周期 -->
<!-- 适用于简单的展示组件，性能更好 -->

<!-- FunctionalComponent.vue -->
<template functional>
  <div class="functional-component">
    <h2>{{ props.title }}</h2>
    <p>{{ props.description }}</p>
    <slot></slot>
  </div>
</template>

<!-- 使用函数式组件 -->
<template>
  <div>
    <functional-component
      title="Hello"
      description="This is a functional component"
    >
      <p>Slot content</p>
    </functional-component>
  </div>
</template>

<!-- Vue3中的函数式组件 -->
<!-- Vue3中，函数式组件使用h函数创建 -->

import { h } from 'vue';

const FunctionalComponent = (props, { slots }) => {
  return h('div', { class: 'functional-component' }, [
    h('h2', {}, props.title),
    h('p', {}, props.description),
    slots.default ? slots.default() : null
  ]);
};

export default FunctionalComponent;

<!-- 函数式组件的应用场景 -->

<!-- 1. 简单的展示组件 -->
<template functional>
  <div class="avatar">
    <img :src="props.src" :alt="props.alt">
  </div>
</template>

<!-- 2. 包装器组件 -->
<template functional>
  <div :class="props.wrapperClass">
    <slot></slot>
  </div>
</template>

<!-- 3. 高阶组件 -->
<template functional>
  <component
    :is="props.is"
    v-bind="props"
    v-on="listeners"
  >
    <slot></slot>
  </component>
</template>
```

#### 混入（Mixin）

```vue
<!-- mixin.js -->
export const myMixin = {
  data() {
    return {
      mixinData: 'Hello from mixin'
    };
  },
  created() {
    console.log('Mixin created');
  },
  methods: {
    mixinMethod() {
      console.log('Mixin method called');
    }
  }
};

<!-- 使用mixin -->
<template>
  <div>
    <p>{{ mixinData }}</p>
    <button @click="mixinMethod">Call Mixin Method</button>
    <p>{{ componentData }}</p>
    <button @click="componentMethod">Call Component Method</button>
  </div>
</template>

<script>
import { myMixin } from './mixin';

export default {
  mixins: [myMixin],
  data() {
    return {
      componentData: 'Hello from component'
    };
  },
  created() {
    console.log('Component created');
  },
  methods: {
    componentMethod() {
      console.log('Component method called');
    }
  }
};
</script>

<!-- mixin的合并规则 -->

<!-- 1. data合并 -->
// mixin
export const myMixin = {
  data() {
    return {
      message: 'Hello from mixin'
    };
  }
};

// component
export default {
  mixins: [myMixin],
  data() {
    return {
      message: 'Hello from component'
    };
  }
};

// 结果：component的data会覆盖mixin的data
// message: 'Hello from component'

<!-- 2. methods合并 -->
// mixin
export const myMixin = {
  methods: {
    greet() {
      console.log('Hello from mixin');
    }
  }
};

// component
export default {
  mixins: [myMixin],
  methods: {
    greet() {
      console.log('Hello from component');
    }
  }
};

// 结果：component的methods会覆盖mixin的methods
// greet() 输出 'Hello from component'

<!-- 3. 生命周期合并 -->
// mixin和component的生命周期都会执行
// mixin的生命周期先执行，component的生命周期后执行

// mixin
export const myMixin = {
  created() {
    console.log('Mixin created');
  }
};

// component
export default {
  mixins: [myMixin],
  created() {
    console.log('Component created');
  }
};

// 输出：
// Mixin created
// Component created

<!-- 4. 选项合并 -->
// 大部分选项都会合并，但component的选项会覆盖mixin的选项
// props、methods、computed等都会合并
// data、components、directives等会覆盖
```

#### 自定义指令

```vue
<!-- 全局自定义指令 -->
// main.js
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

// 注册全局指令
app.directive('focus', {
  mounted(el) {
    el.focus();
  }
});

app.mount('#app');

<!-- 使用全局指令 -->
<template>
  <div>
    <input v-focus placeholder="Auto focus">
  </div>
</template>

<!-- 局部自定义指令 -->
<template>
  <div>
    <input v-highlight="{ color: 'red', backgroundColor: 'yellow' }">
  </div>
</template>

<script>
export default {
  directives: {
    highlight: {
      mounted(el, binding) {
        el.style.color = binding.value.color;
        el.style.backgroundColor = binding.value.backgroundColor;
      },
      updated(el, binding) {
        el.style.color = binding.value.color;
        el.style.backgroundColor = binding.value.backgroundColor;
      }
    }
  }
};
</script>

<!-- 指令钩子函数 -->

export default {
  directives: {
    myDirective: {
      // 指令绑定到元素时调用
      created(el, binding, vnode, prevVnode) {
        console.log('created');
      },
      // 指令绑定的元素插入到父节点时调用
      mounted(el, binding, vnode, prevVnode) {
        console.log('mounted');
      },
      // 指令绑定的元素更新前调用
      beforeUpdate(el, binding, vnode, prevVnode) {
        console.log('beforeUpdate');
      },
      // 指令绑定的元素更新后调用
      updated(el, binding, vnode, prevVnode) {
        console.log('updated');
      },
      // 指令绑定的元素从父节点移除前调用
      beforeUnmount(el, binding, vnode, prevVnode) {
        console.log('beforeUnmount');
      },
      // 指令绑定的元素从父节点移除后调用
      unmounted(el, binding, vnode, prevVnode) {
        console.log('unmounted');
      }
    }
  }
};

<!-- 指令参数和修饰符 -->

<template>
  <div>
    <!-- 带参数的指令 -->
    <input v-format:text="formatText">
    
    <!-- 带修饰符的指令 -->
    <input v-format.number="formatNumber">
    
    <!-- 带参数和修饰符的指令 -->
    <input v-format:text.trim="formatText">
  </div>
</template>

<script>
export default {
  directives: {
    format: {
      mounted(el, binding) {
        console.log('arg:', binding.arg); // text, number
        console.log('modifiers:', binding.modifiers); // { trim: true }
      }
    }
  },
  methods: {
    formatText(value) {
      return value.toUpperCase();
    },
    formatNumber(value) {
      return Number(value).toFixed(2);
    }
  }
};
</script>
```

### 5. 组件样式

#### 样式隔离（scoped）

```vue
<template>
  <div class="component">Hello</div>
</template>

<style scoped>
.component {
  color: red;
}
</style>
```

#### 深度选择器

```vue
<template>
  <div class="parent">
    <child-component></child-component>
  </div>
</template>

<style scoped>
/* 深度选择器 */
.parent :deep(.child-class) {
  color: blue;
}
</style>
```

#### CSS Modules

```vue
<!-- MyComponent.vue -->
<template>
  <div :class="$style.container">
    <h2 :class="$style.title">{{ title }}</h2>
    <p :class="$style.description">{{ description }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Hello',
      description: 'This is CSS Modules'
    };
  }
};
</script>

<style module>
.container {
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.title {
  font-size: 24px;
  margin-bottom: 8px;
}

.description {
  color: #666;
}
</style>

<!-- 自定义CSS Modules名称 -->
<template>
  <div :class="cssModules.container">
    <h2 :class="cssModules.title">{{ title }}</h2>
  </div>
</template>

<style module="cssModules">
.container {
  padding: 16px;
}

.title {
  font-size: 24px;
}
</style>

<!-- 在JavaScript中使用CSS Modules -->
<script>
export default {
  computed: {
    containerClass() {
      return this.$style.container;
    }
  }
};
</script>

<!-- CSS Modules的优势 -->

<!-- 1. 避免样式冲突 -->
<!-- 每个类名都会生成唯一的哈希值 -->
<!-- .container_abc123 -->

<!-- 2. 更好的类型支持 -->
<!-- TypeScript可以提供类型提示 -->

<!-- 3. 更清晰的样式组织 -->
<!-- 样式与组件紧密关联 -->
```

#### 全局样式

```vue
<!-- 在组件中使用全局样式 -->
<template>
  <div class="global-container">
    <h2 class="global-title">{{ title }}</h2>
  </div>
</template>

<style>
/* 全局样式 */
.global-container {
  padding: 16px;
}

.global-title {
  font-size: 24px;
}
</style>

<style scoped>
/* 局部样式 */
.local-container {
  padding: 16px;
}
</style>

<!-- 使用:global()选择器 -->
<template>
  <div class="container">
    <h2>{{ title }}</h2>
  </div>
</template>

<style scoped>
.container {
  padding: 16px;
}

/* 全局样式 */
.container :global(.global-class) {
  color: red;
}
</style>

<!-- 全局样式文件 -->

/* global.css */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  font-size: 14px;
}

/* 在main.js中引入全局样式 */
import './global.css';

/* CSS变量 */
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --success-color: #28a745;
  --danger-color: #dc3545;
}

/* 在组件中使用CSS变量 */
<template>
  <div class="container">
    <button class="primary-button">Primary</button>
    <button class="secondary-button">Secondary</button>
  </div>
</template>

<style scoped>
.container {
  padding: 16px;
}

.primary-button {
  background-color: var(--primary-color);
  color: white;
}

.secondary-button {
  background-color: var(--secondary-color);
  color: white;
}
</style>
```

### 6. 组件性能优化

#### 缓存组件（keep-alive）

```vue
<template>
  <div>
    <keep-alive :include="['ComponentA', 'ComponentB']">
      <component :is="currentComponent"></component>
    </keep-alive>
  </div>
</template>

<script>
import ComponentA from './ComponentA.vue';
import ComponentB from './ComponentB.vue';

export default {
  components: {
    ComponentA,
    ComponentB
  },
  data() {
    return {
      currentComponent: 'ComponentA'
    };
  }
};
</script>
```

#### 虚拟滚动

```vue
<template>
  <div>
    <virtual-list
      :data-key="'id'"
      :data-sources="items"
      :data-component="'item-component'"
      :estimate-size="50"
    />
  </div>
</template>

<script>
import VirtualList from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import ItemComponent from './ItemComponent.vue';

export default {
  components: {
    VirtualList,
    ItemComponent
  },
  data() {
    return {
      items: Array.from({ length: 10000 }, (_, index) => ({
        id: index,
        name: `Item ${index}`
      }))
    };
  }
};
</script>
```

## 实战练习

### 1. 实现一个可复用的按钮组件

```vue
<!-- MyButton.vue -->
<template>
  <button
    :class="[
      'my-button',
      `my-button--${variant}`,
      { 'my-button--disabled': disabled }
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'MyButton',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => {
        return ['primary', 'secondary', 'success', 'danger'].includes(value);
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.my-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.my-button:hover {
  opacity: 0.8;
}

.my-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.my-button--primary {
  background-color: #007bff;
  color: white;
}

.my-button--secondary {
  background-color: #6c757d;
  color: white;
}

.my-button--success {
  background-color: #28a745;
  color: white;
}

.my-button--danger {
  background-color: #dc3545;
  color: white;
}
</style>
```

### 2. 实现一个可复用的表单输入组件

```vue
<!-- MyInput.vue -->
<template>
  <div class="my-input-container">
    <label v-if="label" :for="id">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
    />
    <p v-if="error" class="my-input-error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'MyInput',
  props: {
    id: {
      type: String,
      default: () => `input-${Math.random().toString(36).substr(2, 9)}`
    },
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    }
  }
};
</script>

<style scoped>
.my-input-container {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s;
}

input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

input:disabled {
  background-color: #f8f9fa;
  cursor: not-allowed;
}

.my-input-error {
  margin-top: 4px;
  font-size: 12px;
  color: #dc3545;
}
</style>
```

### 3. 实现一个可复用的卡片组件

```vue
<!-- MyCard.vue -->
<template>
  <div class="my-card">
    <div v-if="header" class="my-card-header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="my-card-body">
      <slot></slot>
    </div>
    <div v-if="footer" class="my-card-footer">
      <slot name="footer">{{ footer }}</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyCard',
  props: {
    header: {
      type: String,
      default: ''
    },
    footer: {
      type: String,
      default: ''
    }
  }
};
</script>

<style scoped>
.my-card {
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.my-card-header {
  padding: 16px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #ddd;
  font-weight: 500;
}

.my-card-body {
  padding: 16px;
}

.my-card-footer {
  padding: 16px;
  background-color: #f8f9fa;
  border-top: 1px solid #ddd;
  text-align: right;
}
</style>
```

### 4. 实现一个可复用的列表组件

```vue
<!-- MyList.vue -->
<template>
  <div class="my-list">
    <div v-if="loading" class="my-list-loading">
      {{ loadingText }}
    </div>
    <div v-else-if="error" class="my-list-error">
      {{ error }}
    </div>
    <div v-else-if="items.length === 0" class="my-list-empty">
      {{ emptyText }}
    </div>
    <div v-else class="my-list-items">
      <slot
        v-for="(item, index) in items"
        :key="getKey(item, index)"
        :item="item"
        :index="index"
      ></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyList',
  props: {
    items: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    },
    emptyText: {
      type: String,
      default: 'No items found'
    },
    loadingText: {
      type: String,
      default: 'Loading...'
    },
    keyField: {
      type: String,
      default: 'id'
    }
  },
  methods: {
    getKey(item, index) {
      return item[this.keyField] || index;
    }
  }
};
</script>

<style scoped>
.my-list {
  width: 100%;
}

.my-list-loading,
.my-list-error,
.my-list-empty {
  padding: 32px;
  text-align: center;
  color: #666;
}

.my-list-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
```

## 学习建议

### 1. 学习顺序
1. **组件基础**：理解组件的创建和注册
2. **组件通信**：掌握各种组件通信方式
3. **组件生命周期**：了解组件的生命周期钩子
4. **组件高级特性**：学习动态组件、异步组件等
5. **组件样式**：掌握组件样式隔离
6. **组件性能优化**：学习组件性能优化技巧

### 2. 学习方法
- **理论结合实践**：理解概念后通过代码练习巩固
- **官方文档**：参考Vue官方文档的组件部分
- **项目实践**：在实际项目中应用所学知识
- **调试技巧**：使用Vue DevTools调试组件

### 3. 常见误区
- **组件拆分不合理**：组件拆分过细或过粗
- **组件通信方式选择不当**：应该根据场景选择合适的通信方式
- **生命周期使用不当**：在不恰当的生命周期钩子中执行操作
- **样式隔离问题**：未正确使用scoped或深度选择器
- **性能优化忽略**：未考虑组件性能优化

### 4. 进阶学习资源
- **书籍**：《Vue.js实战》、《深入理解Vue.js》
- **文档**：Vue官方文档 - 组件
- **课程**：Vue组件设计与开发
- **源码**：Vue组件相关源码

## 总结

Vue组件系统是Vue框架的核心特性之一，掌握组件系统对于构建复杂的Vue应用至关重要。本模块涵盖了组件的创建、通信、生命周期、高级特性、样式和性能优化等核心知识点，通过系统学习和实践，你将能够：

1. **构建可复用组件**：创建高质量的可复用组件
2. **实现组件通信**：掌握各种组件通信方式
3. **优化组件性能**：提高组件渲染性能
4. **设计组件架构**：合理设计组件架构
5. **解决组件问题**：快速定位和解决组件相关问题

通过本模块的学习，你将对Vue组件系统有更深入的理解，为构建复杂的Vue应用打下坚实的基础。