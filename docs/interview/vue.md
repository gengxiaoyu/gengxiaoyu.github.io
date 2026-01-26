---
title: VUE 面试
createTime: 2026/01/26 17:06:51
permalink: /interview/s18s5hpy/
---

# Vue2 vs Vue3 核心对比（面试版）

## 一、Vue2 vs Vue3 核心差异总览
| 核心考点    | Vue2（选项式API）        | Vue3（组合式API）            | 面试考察重点                    |
| ----------- | ------------------------ | ---------------------------- | ------------------------------- |
| 响应式原理  | Object.defineProperty    | Proxy + Reflect              | ✅ 原理对比、优缺点、监听范围    |
| 核心API风格 | 选项式（data/methods等） | 组合式（setup/ref/reactive） | ✅ 逻辑复用、代码组织方式        |
| 生命周期    | beforeDestroy/destroyed  | onBeforeUnmount/onUnmounted  | ✅ 钩子对应关系、setup执行时机   |
| 组件通信    | $parent/$children/.sync  | 废弃$parent、重构v-model     | ✅ 多v-model、provide/inject响应式 |
| 编译优化    | 全量DOM diff             | PatchFlag + 静态提升         | ✅ 性能优化原理                  |
| 全局API     | Vue.use/Vue.component    | createApp 实例化             | ✅ 树摇优化、全局配置隔离        |
| 兼容性      | 支持IE9+                 | 不支持IE（Proxy限制）        | ✅ 迁移注意事项                  |

---

## 二、响应式原理（面试必考：使用+原理+对比）
> ⚠️ 面试核心：原理差异、ref/reactive区别、为什么Vue3换Proxy

### 1. 使用层面：响应式数据定义（面试手写）
#### Vue2：基于Object.defineProperty，限制多
```javascript
// Vue2 组件（面试手写模板）
export default {
  // data必须是函数（避免组件复用数据共享）
  data() {
    return {
      name: '张三',
      age: 20,
      list: [1, 2, 3]
    };
  },
  mounted() {
    // 问题1：无法监听数组下标修改
    this.list[0] = 100; // 非响应式
    // 解决：用Vue提供的7个重写方法（push/pop/shift/unshift/splice/sort/reverse）
    this.list.splice(0, 1, 100); // 响应式
    
    // 问题2：无法监听对象新增属性
    this.gender = '男'; // 非响应式
    // 解决：Vue.set/this.$set
    this.$set(this, 'gender', '男'); // 响应式
  }
};
```

#### Vue3：基于Proxy，无限制（ref/reactive）
```javascript
// Vue3 组合式API（面试手写模板）
import { ref, reactive, toRef, toRefs } from 'vue';

export default {
  setup() {
    // 1. ref：处理基本类型（包装为{ value: xxx }），引用类型内部调用reactive
    const name = ref('张三');
    const objRef = ref({ age: 20 }); // 引用类型：内部自动reactive
    // 模板中ref自动解包（无需.value），脚本中需.value
    objRef.value.age = 21; // 响应式
    
    // 2. reactive：处理引用类型（对象/数组）
    const list = reactive([1, 2, 3]);
    const user = reactive({ name: '张三' });
    
    // 无任何限制：监听数组下标、新增属性
    list[0] = 100; // 响应式
    user.gender = '男'; // 响应式

    // 面试追问：解构reactive丢失响应式的解决方法
    const { name: userName } = toRefs(user); // 批量解构仍响应式
    const userAge = toRef(user, 'age'); // 单个属性响应式
    
    return { name, objRef, list, user, userName, userAge };
  }
};
```

### 2. 原理层面：底层实现与差异（面试核心追问）
#### Vue2：Object.defineProperty 原理
```javascript
// 模拟Vue2响应式核心逻辑（面试手写）
function defineReactive(obj, key, value) {
  // 递归劫持子属性（预递归，层级深时性能差）
  observe(value);
  
  // 劫持属性的get/set
  Object.defineProperty(obj, key, {
    get() {
      console.log('获取值');
      return value;
    },
    set(newVal) {
      if (newVal !== value) {
        console.log('更新值');
        value = newVal;
        // 触发视图更新（依赖收集+派发更新）
      }
    }
  });
}

// 遍历对象所有属性，逐个劫持
function observe(obj) {
  if (typeof obj !== 'object' || obj === null) return;
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key]);
  });
}

// 测试
const data = { name: '张三', list: [1,2,3] };
observe(data);
data.name = '李四'; // 触发set
data.list[0] = 100; // 不触发set（无法监听下标）
```
**核心缺点**：
1. 只能劫持「已有属性」，新增/删除属性需手动调用Vue.set；
2. 数组需重写7个方法（无法监听下标）；
3. 预递归遍历所有属性，对象层级深时性能差。

#### Vue3：Proxy + Reflect 原理
```javascript
// 模拟Vue3响应式核心逻辑（面试手写）
function reactive(obj) {
  if (typeof obj !== 'object' || obj === null) return obj;
  
  // Proxy代理整个对象（而非单个属性）
  return new Proxy(obj, {
    get(target, key, receiver) {
      console.log('获取值', key);
      // Reflect确保this指向正确
      const res = Reflect.get(target, key, receiver);
      // 懒递归：获取属性时才代理子属性（性能更优）
      return typeof res === 'object' ? reactive(res) : res;
    },
    set(target, key, value, receiver) {
      console.log('更新值', key);
      const oldVal = Reflect.get(target, key, receiver);
      if (oldVal !== value) {
        Reflect.set(target, key, value, receiver);
        // 触发视图更新
      }
      return true; // Proxy.set必须返回布尔值
    },
    deleteProperty(target, key) {
      console.log('删除属性', key);
      Reflect.deleteProperty(target, key);
      // 触发视图更新
      return true;
    }
  });
}

// 测试
const data = reactive({ name: '张三', list: [1,2,3] });
data.name = '李四'; // 触发set
data.list[0] = 100; // 触发set（监听下标）
delete data.name; // 触发deleteProperty
```
**核心优势**：
1. 代理整个对象，支持新增/删除属性、数组下标修改；
2. 懒递归（获取属性时才递归代理子属性），性能优于Vue2的预递归；
3. 支持更多操作劫持（delete、in、遍历等）；
**缺点**：Proxy不兼容IE11，这是Vue3放弃IE的核心原因。

### 3. 补充：浅响应式API（面试高频）
| API | 特性 | 适用场景 |
|-----|------|----------|
| shallowRef | 仅监听.value 本身变化，不监听内部属性 | 大型不可变数据（如第三方库实例） |
| shallowReactive | 仅代理对象第一层属性，子属性非响应式 | 表单临时数据（仅需第一层响应式） |

```javascript
// 浅响应式示例（面试易考）
import { shallowRef, shallowReactive } from 'vue';
const shallowObj = shallowReactive({ a: { b: 1 } });
shallowObj.a.b = 2; // 非响应式（仅第一层a响应式）
const shallowVal = shallowRef({ c: 1 });
shallowVal.value.c = 2; // 非响应式（仅.value本身变化才响应）
```

### 4. 对比总结：响应式核心差异
| 特性          | Vue2（Object.defineProperty） | Vue3（Proxy）         |
| ------------- | ----------------------------- | --------------------- |
| 监听范围      | 单个属性                      | 整个对象              |
| 数组支持      | 仅重写7个方法，无法监听下标   | 原生支持下标/长度修改 |
| 新增/删除属性 | 需Vue.set/$delete             | 原生支持              |
| 性能          | 预递归遍历，层级深时性能差    | 懒递归，获取时才代理  |
| 兼容性        | 支持IE9+                      | 不支持IE              |

---

## 三、生命周期（面试高频：使用+执行时机）
### 1. 使用层面：钩子写法对比（面试手写）
#### Vue2：选项式API
```javascript
export default {
  // 初始化阶段
  beforeCreate() { console.log('初始化前：data/methods未挂载'); },
  created() { console.log('初始化后：可访问data/methods，DOM未生成'); },
  
  // 挂载阶段
  beforeMount() { console.log('挂载前：模板编译完成，未挂载到DOM'); },
  mounted() { console.log('挂载后：DOM生成，可操作DOM'); },
  
  // 更新阶段
  beforeUpdate() { console.log('更新前：数据变化，DOM未更新'); },
  updated() { console.log('更新后：DOM已更新'); },
  
  // 销毁阶段
  beforeDestroy() { console.log('销毁前：组件仍可用，清除定时器/事件'); },
  destroyed() { console.log('销毁后：组件不可用'); }
};
```

#### Vue3：组合式API（setup替代beforeCreate/created）
```javascript
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, onRenderTracked } from 'vue';

export default {
  // 执行顺序：组件实例创建 → setup执行（无this） → beforeCreate → created → 挂载阶段
  setup() {
    console.log('等价于beforeCreate + created');
    
    // 挂载阶段
    onBeforeMount(() => console.log('挂载前'));
    onMounted(() => console.log('挂载后'));
    
    // 更新阶段
    onBeforeUpdate(() => console.log('更新前'));
    onUpdated(() => console.log('更新后'));
    
    // 卸载阶段（改名：销毁→卸载，语义更准确）
    onBeforeUnmount(() => console.log('卸载前（替代beforeDestroy）'));
    onUnmounted(() => console.log('卸载后（替代destroyed）'));

    // 面试低频：调试用生命周期
    onRenderTracked((e) => console.log('依赖收集：', e)); // 开发环境用
  }
};
```

### 2. 原理层面：执行时机与核心变化
| Vue2 钩子     | Vue3 组合式钩子 | 执行时机核心差异                     |
| ------------- | --------------- | ------------------------------------ |
| beforeCreate  | setup（开头）   | Vue3无此钩子，setup完全替代          |
| created       | setup（开头）   | setup中可直接访问响应式数据          |
| beforeDestroy | onBeforeUnmount | 改名原因：「销毁」→「卸载DOM」更贴合 |
| destroyed     | onUnmounted     | 同上                                 |

> 📌 面试追问：setup的执行时机？
答：setup在组件实例创建后、beforeCreate钩子**之前**执行，此时组件的this还未初始化（无法访问this），所有响应式数据、方法都需在setup中定义并返回。

---

## 四、组件通信（面试高频：使用+原理）
### 1. 核心通信方式对比（面试手写）
| 通信方式                 | Vue2 写法                                                 | Vue3 写法                                                  | 核心变化                       |
| ------------------------ | --------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------ |
| 父→子（props）           | 子组件props: { name: String }                             | 同Vue2（可配合TypeScript）                                 | 无核心变化                     |
| 子→父（emit）            | this.$emit('change', val)                                 | setup中用emit（需声明）                                    | 需在emits选项声明事件（规范）  |
| 跨组件（provide/inject） | 父：provide() { return { key: val } } 子：inject: ['key'] | 父：provide('key', ref(val)) 子：const val = inject('key') | 支持响应式（配合ref/reactive） |
| v-model                  | .sync修饰符（如:name.sync）                               | 重构v-model，支持多个                                      | 绑定prop默认是modelValue       |
| 事件总线                 | Vue.prototype.$bus = new Vue()                            | 废弃，推荐mitt/Pinia                                       | 避免全局污染                   |
| $parent/$children        | this.$parent.xxx                                          | 废弃                                                       | 推荐provide/inject替代         |
| 全局状态                 | Vuex（new Vuex.Store）                                    | Pinia（defineStore）                                       | 无mutations、支持TS、自动拆模块 |

#### 关键示例1：Vue3的emit + 多v-model（面试必考）
```javascript
// Vue3 子组件
export default {
  emits: ['change-name', 'update:age'], // 声明事件（规范，未声明警告）
  props: {
    name: String,
    age: Number
  },
  setup(props, { emit }) { // setup第二个参数解构emit
    const handleClick = () => {
      // 子→父：emit事件
      emit('change-name', '李四');
      // 多v-model：update:xxx 格式
      emit('update:age', props.age + 1);
    };
    return { handleClick };
  }
};

// Vue3 父组件
<template>
  <Child 
    v-model:name="name" 
    v-model:age="age"
    @change-name="handleChange"
  />
</template>
<script setup>
import { ref } from 'vue';
const name = ref('张三');
const age = ref(20);
const handleChange = (newName) => {
  name.value = newName;
};
</script>
```

#### 关键示例2：Pinia（替代Vuex，面试必问）
```javascript
// stores/user.js（面试手写模板）
import { defineStore } from 'pinia';
export const useUserStore = defineStore('user', {
  state: () => ({ name: '张三' }),
  actions: {
    changeName(newName) { this.name = newName; } // 替代mutations
  }
});

// 组件中使用
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
userStore.changeName('李四');
```

### 2. 原理层面：核心通信逻辑
- **props/emit**：props是单向数据流（父→子），emit基于发布订阅模式，子组件触发事件，父组件监听处理；
- **provide/inject**：依赖注入，Vue3中配合ref/reactive可实现「响应式注入」；
- **v-model**：Vue2是`:value + @input`语法糖，Vue3重构为`:modelValue + @update:modelValue`，支持自定义prop名；
- **Pinia**：基于组合式API，无mutations（actions直接修改状态），天然支持TS，模块自动隔离。

---

## 五、核心API：选项式 vs 组合式（Vue3核心）
### 1. 使用层面：逻辑组织对比（面试手写）
#### Vue2：选项式API（逻辑分散，复用难）
```javascript
// Vue2 选项式：数据、方法、监听分散在不同选项
export default {
  data() {
    return { count: 0 };
  },
  methods: {
    increment() { this.count++; },
    decrement() { this.count--; }
  },
  watch: {
    count(newVal) { console.log('count变化：', newVal); }
  },
  computed: {
    doubleCount() { return this.count * 2; }
  }
};
```

#### Vue3：组合式API（逻辑聚合，复用易）
```javascript
// Vue3 组合式：相关逻辑聚合（面试手写模板）
import { ref, watch, computed } from 'vue';

export default {
  setup() {
    // count相关逻辑聚合
    const count = ref(0);
    const increment = () => count.value++;
    const decrement = () => count.value--;
    watch(count, (newVal) => console.log('count变化：', newVal));
    const doubleCount = computed(() => count.value * 2);
    
    // 组合式函数（hooks，替代mixins，逻辑复用）
    const useCount = () => {
      const count = ref(0);
      const increment = () => count.value++;
      return { count, increment };
    };
    
    return { count, increment, decrement, doubleCount };
  }
};

// 抽离为独立hooks文件（hooks/useCount.js）
export const useCount = () => {
  const count = ref(0);
  const increment = () => count.value++;
  return { count, increment };
};
// 组件中使用：import { useCount } from '@/hooks/useCount';
```

### 2. 原理层面：核心优势
- **逻辑复用**：Vue2的mixins易命名冲突、来源不清晰；Vue3的组合式函数是「函数复用」，命名可控、来源清晰；
- **代码组织**：选项式按「API类型」拆分，组合式按「业务逻辑」聚合，复杂组件更易维护；
- **类型支持**：组合式API更好兼容TS（Vue2的this指向不明确，类型推导差）；
- **树摇优化**：组合式API按需导入，未使用的代码可被树摇，减小打包体积。

---

## 六、性能优化（面试进阶：原理+实践）
### 1. 通用优化（Vue2/Vue3都适用）
- v-for加key（避免DOM复用错误）；
- 避免v-if和v-for同节点（Vue2：v-if优先级高，Vue3：v-for优先级高）；
- 冻结静态数据（Vue2：Object.freeze，Vue3：reactive不代理冻结对象）；
- 异步组件（Vue2：component: () => import()，Vue3：defineAsyncComponent）。

### 2. Vue3专属优化（面试核心追问）
> ⚠️ 面试必答：编译优化 + 响应式优化
#### （1）编译优化：PatchFlag + 静态提升
| 特性 | Vue2 | Vue3 |
|------|------|------|
| DOM diff | 全量遍历vnode树 | PatchFlag标记动态节点，仅对比标记节点 |
| 静态节点 | 每次渲染重新创建 | 静态提升到渲染函数外，复用创建结果 |
| 事件绑定 | 每次渲染重新绑定 | 事件缓存，复用绑定函数 |

#### （2）响应式优化
- Vue3的Proxy懒代理（获取属性时才递归代理子属性），Vue2的Object.defineProperty预递归；
- ref针对基本类型优化（仅包装一层，比reactive更轻量）；
- 浅响应式API（shallowRef/shallowReactive）减少不必要的响应式开销。

---

## 七、全局API与实例化（面试高频：使用+原理）
### 1. 使用层面：全局配置/组件注册对比
#### Vue2：基于`Vue`构造函数（全局污染）
```javascript
// Vue2 全局配置/注册
import Vue from 'vue';
import App from './App.vue';
import MyComponent from './components/MyComponent.vue';

// 全局注册（所有实例共享）
Vue.component('MyComponent', MyComponent);
Vue.directive('focus', { inserted(el) { el.focus(); } });

// 实例化（全局配置共享，微前端易冲突）
new Vue({
  el: '#app',
  render: h => h(App)
});
```

#### Vue3：基于`createApp`（实例隔离）
```javascript
// Vue3 实例化+全局配置（面试手写模板）
import { createApp } from 'vue';
import App from './App.vue';
import MyComponent from './components/MyComponent.vue';

// 创建应用实例（每个实例独立配置）
const app = createApp(App);

// 实例级注册（仅当前应用生效）
app.component('MyComponent', MyComponent);
app.directive('focus', { mounted(el) { el.focus(); } });

// 挂载
app.mount('#app');

// 全局属性挂载（替代Vue2的Vue.prototype）
app.config.globalProperties.$api = axios;
// setup中获取：import { getCurrentInstance } from 'vue';
// const { proxy } = getCurrentInstance(); proxy.$api.get('/data');
```

### 2. 原理层面：核心变化
| 特性         | Vue2                | Vue3            | 面试考察重点                   |
| ------------ | ------------------- | --------------- | ------------------------------ |
| 实例创建     | `new Vue()`         | `createApp()`   | 配置隔离、微前端适配           |
| 全局API形态  | 挂载在Vue构造函数上 | 挂载在app实例上 | 树摇优化（减小体积）           |
| 全局配置共享 | 所有实例共享        | 实例独立配置    | 多应用场景（微前端）兼容性     |

> 📌 面试追问：Vue3为什么重构全局API？
答：① 避免全局污染：Vue2全局配置影响所有实例，Vue3实例级配置更灵活；② 支持树摇：按需调用API，未使用代码可被移除；③ 适配微前端：多实例隔离，避免配置冲突。

---

## 八、迁移注意事项（面试实际应用）
### 1. 核心兼容方案
| 场景           | 迁移方案                                                     |
| -------------- | ------------------------------------------------------------ |
| 保留Vue2写法   | 使用`@vue/compat`兼容包，支持Vue3中运行Vue2代码（渐进式迁移） |
| 第三方库兼容   | 优先选择支持Vue3的版本（如Element Plus替代Element UI）       |
| 自定义指令钩子 | Vue3指令钩子与生命周期对齐（如`inserted`→`mounted`）         |
| `this`指向     | setup中无this，`getCurrentInstance()`仅调试用                |

### 2. 常见迁移坑（面试避坑）
1. **过滤器（filter）废弃**：推荐计算属性/方法替代；
   ```javascript
   // Vue2 过滤器 → Vue3 计算属性
   // Vue2: filters: { formatName(name) { return `姓名：${name}`; } }
   const formatName = computed(() => `姓名：${name.value}`);
   ```
2. **`v-bind`合并行为**：Vue3中`class/style`合并、其他属性后者覆盖；
3. **`$attrs`包含`class/style`**：Vue2不含，Vue3包含，配合`inheritAttrs: false`更灵活；
4. **移除的API**：`$on/$off/$once`、`$children`、`filter`。

---

## 九、面试错题避坑+答题模板
### 1. 常见面试错题
| 错题类型 | 错误答案 | 正确答案 |
|----------|----------|----------|
| ref和reactive区别 | “ref只能处理基本类型” | “ref可处理所有类型（引用类型内部调用reactive），推荐基本类型用ref、引用类型用reactive；模板中ref自动解包，脚本需.value” |
| Vue3性能优化 | “只有Proxy比Object.defineProperty快” | “① 响应式：Proxy懒代理；② 编译：PatchFlag+静态提升；③ 树摇：按需导入API；④ 浅响应式减少开销” |
| setup中获取this | “用this关键字” | “setup中无this，`getCurrentInstance()`仅调试用；推荐组合式API替代this访问” |
| Pinia vs Vuex | “Pinia是Vuex4的别名” | “Pinia无mutations、支持TS、自动拆模块，是Vue官方推荐的新一代状态管理库，替代Vuex” |

### 2. 高频面试题答题模板（总分总）
#### Q1：Vue3为什么替换响应式原理为Proxy？
答：（总）核心是解决Vue2响应式的局限性，同时提升性能；
（分）① 监听范围：Object.defineProperty只能监听单个属性，Proxy代理整个对象，支持新增/删除属性、数组下标；② 性能：Vue2预递归遍历所有属性，Proxy懒递归（获取时才代理）；③ 功能：Proxy支持更多操作劫持（delete/in等）；
（总）缺点是Proxy不兼容IE，这也是Vue3放弃IE的核心原因。

#### Q2：Vue3的组合式API解决了Vue2的什么问题？
答：（总）核心解决了Vue2逻辑复用难、代码组织差、TS支持弱的问题；
（分）① 逻辑复用：mixins易命名冲突、来源不清晰，组合式函数（hooks）是函数复用，可控性强；② 代码组织：选项式API按API类型拆分，组合式按业务逻辑聚合，复杂组件更易维护；③ 类型支持：组合式API无this指向问题，TS类型推导更精准；
（总）此外，组合式API支持树摇，可减小打包体积。

#### Q3：Vue3比Vue2性能好在哪里？
答：（总）响应式优化+编译优化双维度提升；
（分）① 响应式：Proxy懒递归，替代Vue2预递归，初始化性能更优；② 编译：PatchFlag标记动态节点（仅diff动态内容）、静态提升（复用静态节点）、事件缓存（减少绑定开销）；③ 树摇：按需导入API，未使用代码可被移除；
（总）这些优化让Vue3在大型应用中启动更快、运行更流畅。

---

## 十、终极记忆技巧（面试快速回忆）
### 1. 核心差异“三字诀”
- 响应式：Vue2“单属性”，Vue3“整对象”；
- API：Vue2“分选项”，Vue3“聚逻辑”；
- 性能：Vue2“全量diff”，Vue3“标记diff”。

### 2. 答题逻辑（总分总）
- 总：先答核心差异（响应式/API/生命周期）；
- 分：结合手写代码/原理细节展开；
- 总：总结Vue3的优势（性能/复用/类型支持）。

### 3. 避坑提醒
- 不要只记“API名字变化”，要答“为什么变”（如销毁钩子改名是因为“卸载”更贴合DOM操作）；
- 原理题要结合代码模拟（手写Object.defineProperty/Proxy核心逻辑）；
- 性能题要区分“编译优化”和“响应式优化”，缺一不可。

- [VUE 面试](./vue.md)
