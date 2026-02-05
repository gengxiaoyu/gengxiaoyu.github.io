---
title: Vue核心原理
createTime: 2026/02/04 15:23:57
permalink: /webDocView/15-vue-base/01-core-principles/
---

# Vue核心原理

## 模块概述

本模块涵盖Vue框架的核心原理和内部机制，是理解Vue工作原理的基础。通过学习本模块，你将掌握Vue的响应式系统、生命周期、虚拟DOM、Diff算法等核心概念，为深入理解和使用Vue框架打下坚实的基础。

## 知识点清单

### 1. Vue实例
- **Vue实例创建**：new Vue()
- **选项对象**：data、methods、computed、watch等
- **实例属性与方法**：$data、$el、$props、$emit等
- **实例生命周期**：从创建到销毁的全过程

### 2. 响应式系统
- **Vue2响应式原理**：Object.defineProperty
- **Vue3响应式原理**：Proxy
- **依赖收集**：Dep类
- **观察者模式**：Watcher类
- **计算属性**：缓存机制
- **监听属性**：深度监听

### 3. 生命周期钩子
- **Vue2生命周期**：beforeCreate、created、beforeMount、mounted、beforeUpdate、updated、beforeDestroy、destroyed
- **Vue3生命周期**：onBeforeMount、onMounted、onBeforeUpdate、onUpdated、onBeforeUnmount、onUnmounted等
- **生命周期执行顺序**：父子组件生命周期执行顺序
- **生命周期应用场景**：各钩子的最佳使用场景

### 4. 虚拟DOM
- **虚拟DOM概念**：什么是虚拟DOM
- **虚拟DOM优势**：为什么使用虚拟DOM
- **VNode结构**：虚拟节点的结构
- **VNode类型**：不同类型的虚拟节点

### 5. Diff算法
- **Diff算法概念**：什么是Diff算法
- **Diff算法原理**：同层比较策略
- **key的作用**：为什么需要key
- **Diff算法优化**：Vue的Diff算法优化策略

### 6. 编译原理
- **模板编译过程**：模板 → AST → 渲染函数
- **词法分析**：将模板解析为tokens
- **语法分析**：将tokens解析为AST
- **代码生成**：将AST转换为渲染函数
- **编译器优化**：静态节点标记、 PatchFlag等

## 核心概念详解

### 1. Vue实例

#### Vue实例创建

```javascript
// Vue2
const vm = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  },
  methods: {
    greet() {
      console.log(this.message);
    }
  },
  computed: {
    reversedMessage() {
      return this.message.split('').reverse().join('');
    }
  },
  watch: {
    message(newVal, oldVal) {
      console.log(`Message changed from ${oldVal} to ${newVal}`);
    }
  }
});

// Vue3
import { createApp } from 'vue'

const app = createApp({
  data() {
    return {
      message: 'Hello Vue!'
    }
  },
  methods: {
    greet() {
      console.log(this.message);
    }
  },
  computed: {
    reversedMessage() {
      return this.message.split('').reverse().join('');
    }
  },
  watch: {
    message(newVal, oldVal) {
      console.log(`Message changed from ${oldVal} to ${newVal}`);
    }
  }
});

app.mount('#app');
```

#### 实例属性与方法

```javascript
// 实例属性
console.log(vm.$data); // 数据对象
console.log(vm.$el); // DOM元素
console.log(vm.$props); // 组件 props
console.log(vm.$children); // 子组件
console.log(vm.$parent); // 父组件
console.log(vm.$root); // 根组件

// 实例方法
vm.$watch('message', (newVal, oldVal) => {
  console.log(`Message changed: ${oldVal} -> ${newVal}`);
});

vm.$emit('custom-event', data); // 触发自定义事件
vm.$forceUpdate(); // 强制更新
vm.$nextTick(() => {
  // DOM更新后执行
});
```

### 2. 响应式系统

#### Vue2响应式原理（Object.defineProperty）

```javascript
function defineReactive(obj, key, value) {
  // 递归处理嵌套对象
  if (typeof value === 'object' && value !== null) {
    observe(value);
  }
  
  // 创建依赖收集器
  const dep = new Dep();
  
  // 定义属性
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      // 依赖收集
      if (Dep.target) {
        dep.addSub(Dep.target);
      }
      return value;
    },
    set(newValue) {
      if (newValue === value) return;
      value = newValue;
      // 递归处理新值
      if (typeof newValue === 'object' && newValue !== null) {
        observe(newValue);
      }
      // 通知更新
      dep.notify();
    }
  });
}

function observe(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return;
  }
  return new Observer(obj);
}

class Observer {
  constructor(obj) {
    this.walk(obj);
  }
  
  walk(obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key]);
    });
  }
}

class Dep {
  constructor() {
    this.subs = [];
  }
  
  addSub(sub) {
    this.subs.push(sub);
  }
  
  notify() {
    this.subs.forEach(sub => {
      sub.update();
    });
  }
}

class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm;
    this.cb = cb;
    this.getter = typeof expOrFn === 'function' ? expOrFn : () => {
      return expOrFn.split('.').reduce((obj, key) => obj[key], vm);
    };
    this.value = this.get();
  }
  
  get() {
    Dep.target = this;
    const value = this.getter.call(this.vm);
    Dep.target = null;
    return value;
  }
  
  update() {
    const newValue = this.get();
    if (newValue !== this.value) {
      const oldValue = this.value;
      this.value = newValue;
      this.cb.call(this.vm, newValue, oldValue);
    }
  }
}
```

#### Vue3响应式原理（Proxy）

```javascript
function reactive(target) {
  if (typeof target !== 'object' || target === null) {
    return target;
  }
  
  const handler = {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver);
      // 依赖收集
      track(target, key);
      // 递归处理嵌套对象
      if (typeof result === 'object' && result !== null) {
        return reactive(result);
      }
      return result;
    },
    set(target, key, value, receiver) {
      const oldValue = Reflect.get(target, key, receiver);
      const result = Reflect.set(target, key, value, receiver);
      // 触发更新
      if (oldValue !== value) {
        trigger(target, key);
      }
      return result;
    },
    deleteProperty(target, key) {
      const hadKey = Reflect.has(target, key);
      const result = Reflect.deleteProperty(target, key);
      if (hadKey) {
        trigger(target, key);
      }
      return result;
    }
  };
  
  return new Proxy(target, handler);
}

// 依赖收集
const targetMap = new WeakMap();
function track(target, key) {
  if (!activeEffect) return;
  
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }
  
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
  }
}

// 触发更新
function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  
  const dep = depsMap.get(key);
  if (dep) {
    dep.forEach(effect => {
      if (effect.scheduler) {
        effect.scheduler();
      } else {
        effect();
      }
    });
  }
}

// 响应式副作用
let activeEffect;
function effect(fn, options = {}) {
  const effectFn = () => {
    cleanup(effectFn);
    activeEffect = effectFn;
    const result = fn();
    activeEffect = null;
    return result;
  };
  
  effectFn.deps = [];
  effectFn.options = options;
  
  if (options.lazy) {
    return effectFn;
  } else {
    return effectFn();
  }
}

function cleanup(effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    const dep = effectFn.deps[i];
    dep.delete(effectFn);
  }
  effectFn.deps.length = 0;
}
```

### 3. 生命周期钩子

#### Vue2生命周期

```javascript
const vm = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  },
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
  beforeMount() {
    console.log('beforeMount: 挂载前');
    console.log('el:', this.$el); // 已存在但未挂载
  },
  mounted() {
    console.log('mounted: 挂载后');
    console.log('el:', this.$el); // 已挂载
  },
  beforeUpdate() {
    console.log('beforeUpdate: 更新前');
  },
  updated() {
    console.log('updated: 更新后');
  },
  beforeDestroy() {
    console.log('beforeDestroy: 销毁前');
  },
  destroyed() {
    console.log('destroyed: 销毁后');
  }
});
```

#### Vue3生命周期

```javascript
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue';

export default {
  setup() {
    onBeforeMount(() => {
      console.log('onBeforeMount: 挂载前');
    });
    
    onMounted(() => {
      console.log('onMounted: 挂载后');
    });
    
    onBeforeUpdate(() => {
      console.log('onBeforeUpdate: 更新前');
    });
    
    onUpdated(() => {
      console.log('onUpdated: 更新后');
    });
    
    onBeforeUnmount(() => {
      console.log('onBeforeUnmount: 卸载前');
    });
    
    onUnmounted(() => {
      console.log('onUnmounted: 卸载后');
    });
    
    return {
      message: 'Hello Vue!'
    };
  }
};
```

### 4. 虚拟DOM

#### VNode结构

```javascript
// 简化的VNode结构
const vnode = {
  type: 'div', // 元素类型
  props: { // 属性
    id: 'app',
    class: 'container'
  },
  children: [ // 子节点
    {
      type: 'p',
      props: {},
      children: 'Hello Vue!'
    }
  ],
  key: null, // 节点key
  el: null // 对应的真实DOM元素
};
```

#### 创建VNode

```javascript
// Vue2中创建VNode
const vnode = Vue.createElement('div', {
  id: 'app'
}, [
  Vue.createElement('p', {}, 'Hello Vue!')
]);

// Vue3中创建VNode
import { h } from 'vue';

const vnode = h('div', {
  id: 'app'
}, [
  h('p', {}, 'Hello Vue!')
]);
```

### 5. Diff算法

#### Diff算法原理

```javascript
// 简化的Diff算法
function patch(oldVnode, newVnode) {
  if (oldVnode.type !== newVnode.type) {
    // 类型不同，直接替换
    replaceVnode(oldVnode, newVnode);
  } else if (typeof newVnode.type === 'string') {
    // 元素节点
    patchElement(oldVnode, newVnode);
  } else {
    // 组件节点
    patchComponent(oldVnode, newVnode);
  }
}

function patchElement(oldVnode, newVnode) {
  // 更新属性
  patchProps(oldVnode.props, newVnode.props);
  // 更新子节点
  patchChildren(oldVnode.children, newVnode.children);
}

function patchChildren(oldChildren, newChildren) {
  // 简单的双端Diff算法实现
  let oldStartIdx = 0;
  let newStartIdx = 0;
  let oldEndIdx = oldChildren.length - 1;
  let newEndIdx = newChildren.length - 1;
  
  let oldStartVnode = oldChildren[oldStartIdx];
  let newStartVnode = newChildren[newStartIdx];
  let oldEndVnode = oldChildren[oldEndIdx];
  let newEndVnode = newChildren[newEndIdx];
  
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (oldStartVnode.key === newStartVnode.key) {
      // 头头匹配
      patch(oldStartVnode, newStartVnode);
      oldStartVnode = oldChildren[++oldStartIdx];
      newStartVnode = newChildren[++newStartIdx];
    } else if (oldEndVnode.key === newEndVnode.key) {
      // 尾尾匹配
      patch(oldEndVnode, newEndVnode);
      oldEndVnode = oldChildren[--oldEndIdx];
      newEndVnode = newChildren[--newEndIdx];
    } else if (oldStartVnode.key === newEndVnode.key) {
      // 头尾匹配
      patch(oldStartVnode, newEndVnode);
      // 将匹配的节点移到末尾
      moveVnode(oldStartVnode, oldEndVnode.nextSibling);
      oldStartVnode = oldChildren[++oldStartIdx];
      newEndVnode = newChildren[--newEndIdx];
    } else if (oldEndVnode.key === newStartVnode.key) {
      // 尾头匹配
      patch(oldEndVnode, newStartVnode);
      // 将匹配的节点移到开头
      moveVnode(oldEndVnode, oldStartVnode);
      oldEndVnode = oldChildren[--oldEndIdx];
      newStartVnode = newChildren[++newStartIdx];
    } else {
      // 暴力查找
      const idxInOld = findIdxInOld(newStartVnode, oldChildren, oldStartIdx, oldEndIdx);
      if (idxInOld >= 0) {
        // 找到匹配节点
        const vnodeToMove = oldChildren[idxInOld];
        patch(vnodeToMove, newStartVnode);
        // 标记为已处理
        oldChildren[idxInOld] = undefined;
        // 移动节点
        moveVnode(vnodeToMove, oldStartVnode);
      } else {
        // 没找到，创建新节点
        createVnode(newStartVnode, oldStartVnode);
      }
      newStartVnode = newChildren[++newStartIdx];
    }
  }
  
  // 处理剩余节点
  if (oldStartIdx <= oldEndIdx) {
    // 移除多余的旧节点
    removeVnodes(oldChildren, oldStartIdx, oldEndIdx);
  } else if (newStartIdx <= newEndIdx) {
    // 创建新节点
    createVnodes(newChildren, newStartIdx, newEndIdx);
  }
}
```

### 6. 编译原理

#### 模板编译过程

1. **词法分析**：将模板字符串解析为tokens
2. **语法分析**：将tokens解析为抽象语法树(AST)
3. **代码生成**：将AST转换为渲染函数

```javascript
// 模板
const template = `
  <div id="app">
    <p>{{ message }}</p>
  </div>
`;

// 编译后的渲染函数
function render() {
  return h('div', {
    id: 'app'
  }, [
    h('p', {}, this.message)
  ]);
}
```

#### 编译器优化

```javascript
// 静态节点标记
function render() {
  return h('div', {
    id: 'app'
  }, [
    // 静态节点，标记为1
    h('p', { staticClass: 'static' }, 'Static text'),
    // 动态节点，标记为2
    h('p', { class: this.className }, this.message)
  ]);
}
```

## 实战练习

### 1. 实现简单的响应式系统

```javascript
// 实现一个简单的响应式系统
class Dep {
  constructor() {
    this.subscribers = [];
  }
  
  addSub(subscriber) {
    this.subscribers.push(subscriber);
  }
  
  notify() {
    this.subscribers.forEach(subscriber => subscriber.update());
  }
}

class Watcher {
  constructor(target, key, callback) {
    this.target = target;
    this.key = key;
    this.callback = callback;
    this.value = this.get();
  }
  
  get() {
    Dep.target = this;
    const value = this.target[this.key];
    Dep.target = null;
    return value;
  }
  
  update() {
    const oldValue = this.value;
    this.value = this.get();
    this.callback(this.value, oldValue);
  }
}

function defineReactive(obj, key, value) {
  const dep = new Dep();
  
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      if (Dep.target) {
        dep.addSub(Dep.target);
      }
      return value;
    },
    set(newValue) {
      if (newValue === value) return;
      value = newValue;
      dep.notify();
    }
  });
}

function observe(obj) {
  for (let key in obj) {
    defineReactive(obj, key, obj[key]);
  }
}

// 使用示例
const data = { message: 'Hello' };
observe(data);

new Watcher(data, 'message', (newValue, oldValue) => {
  console.log(`Message changed from ${oldValue} to ${newValue}`);
});

data.message = 'Hello Vue!'; // 输出: Message changed from Hello to Hello Vue!
```

### 2. 理解虚拟DOM和Diff算法

```javascript
// 实现简单的虚拟DOM和Diff算法
function h(type, props, children) {
  return {
    type,
    props,
    children
  };
}

function createElement(vnode) {
  if (typeof vnode === 'string') {
    return document.createTextNode(vnode);
  }
  
  const el = document.createElement(vnode.type);
  
  // 设置属性
  if (vnode.props) {
    for (let key in vnode.props) {
      el.setAttribute(key, vnode.props[key]);
    }
  }
  
  // 创建子元素
  if (vnode.children) {
    vnode.children.forEach(child => {
      el.appendChild(createElement(child));
    });
  }
  
  return el;
}

function patch(oldEl, newVnode) {
  const newEl = createElement(newVnode);
  oldEl.parentNode.replaceChild(newEl, oldEl);
  return newEl;
}

// 使用示例
const app = document.getElementById('app');

// 初始渲染
const vnode1 = h('div', { id: 'app' }, [
  h('p', {}, 'Hello'),
  h('p', {}, 'World')
]);

const el = createElement(vnode1);
app.appendChild(el);

// 更新渲染
const vnode2 = h('div', { id: 'app' }, [
  h('p', {}, 'Hello'),
  h('p', {}, 'Vue!')
]);

patch(el, vnode2);
```

## 学习建议

### 1. 学习顺序
1. **Vue实例**：理解Vue实例的创建和使用
2. **响应式系统**：掌握Vue的响应式原理
3. **生命周期**：了解Vue的生命周期钩子
4. **虚拟DOM**：理解虚拟DOM的概念和作用
5. **Diff算法**：掌握Vue的Diff算法原理
6. **编译原理**：了解Vue的模板编译过程

### 2. 学习方法
- **理论结合实践**：理解原理后通过代码练习巩固
- **调试源码**：通过调试Vue源码加深理解
- **对比学习**：对比Vue2和Vue3的实现差异
- **项目实践**：在实际项目中应用所学知识

### 3. 常见误区
- **混淆Vue2和Vue3的响应式原理**：Vue2使用Object.defineProperty，Vue3使用Proxy
- **不理解生命周期执行顺序**：父子组件生命周期的执行顺序
- **忽视key的作用**：在使用v-for时不添加key
- **对虚拟DOM的误解**：认为虚拟DOM一定比直接操作DOM快

### 4. 进阶学习资源
- **书籍**：《Vue.js实战》、《深入理解Vue.js》
- **源码**：Vue GitHub仓库
- **文档**：Vue官方文档
- **课程**：Vue高级进阶课程

## 总结

Vue核心原理是理解Vue框架工作机制的关键，掌握这些概念对于使用Vue进行高效开发至关重要。本模块涵盖了Vue的响应式系统、生命周期、虚拟DOM、Diff算法和编译原理等核心知识点，通过系统学习和实践，你将能够：

1. **理解Vue的工作原理**：从实例创建到渲染更新的全过程
2. **掌握响应式系统**：理解Vue如何实现数据驱动视图
3. **合理使用生命周期**：在适当的时机执行相应的操作
4. **优化组件性能**：利用虚拟DOM和Diff算法的特性
5. **编写高效代码**：根据编译原理优化模板和代码
6. **迁移到Vue3**：理解Vue2和Vue3的差异，顺利迁移

通过本模块的学习，你将对Vue框架有更深入的理解，为构建复杂的Vue应用打下坚实的基础。