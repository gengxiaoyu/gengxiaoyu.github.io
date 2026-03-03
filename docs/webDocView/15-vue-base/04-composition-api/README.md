---
title: Vue Composition API
createTime: 2026/02/04 15:24:20
permalink: /webDocView/15-vue-base/04-composition-api/
---

# Vue Composition API

## 模块概述

本模块涵盖Vue 3中引入的Composition API，这是Vue框架的重大革新之一。通过学习本模块，你将掌握Composition API的核心概念、使用方法和最佳实践，为构建更灵活、更模块化的Vue应用打下坚实的基础。

## 知识点清单

### 1. Composition API基础
- **Composition API概念**：什么是Composition API
- **Composition API优势**：与Options API的对比
- **setup函数**：Composition API的入口点
- **ref和reactive**：响应式数据
- **computed和watch**：计算属性和监听器
- **生命周期钩子**：onMounted、onUpdated等

### 2. 响应式系统
- **ref**：基本类型响应式
- **reactive**：对象类型响应式
- **toRef**：创建单个属性的ref
- **toRefs**：将reactive对象转换为ref对象
- **shallowRef**：浅响应式
- **shallowReactive**：浅响应式
- **readonly**：只读响应式
- **shallowReadonly**：浅只读响应式

### 3. 计算与监听
- **computed**：计算属性
- **watch**：监听单个或多个源
- **watchEffect**：自动跟踪依赖
- **watchPostEffect**：DOM更新后执行
- **watchSyncEffect**：同步执行

### 4. 生命周期
- **与Options API对应**：beforeCreate/created → setup
- **挂载相关**：onBeforeMount、onMounted
- **更新相关**：onBeforeUpdate、onUpdated
- **卸载相关**：onBeforeUnmount、onUnmounted
- **错误处理**：onErrorCaptured、onRenderTracked、onRenderTriggered

### 5. 依赖注入
- **provide**：提供依赖
- **inject**：注入依赖
- **响应式provide/inject**：

### 6. 自定义组合式函数
- **组合式函数概念**：
- **组合式函数命名**：useXXX
- **组合式函数最佳实践**：
- **内置组合式函数**：useRouter、useStore等

### 7. Composition API与Options API
- **对比**：两种API的差异
- **混用**：在同一组件中混用
- **迁移**：从Options API迁移到Composition API

### 8. 高级特性
- **Teleport**：传送门
- **Suspense**：异步组件加载
- **Fragment**：多根节点
- **emits选项**：显式声明事件
- **expose选项**：暴露公共方法

## 核心概念详解

### 1. Composition API基础

#### setup函数

```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double: {{ doubleCount }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  setup() {
    // 创建响应式数据
    const count = ref(0);
    
    // 计算属性
    const doubleCount = computed(() => count.value * 2);
    
    // 方法
    const increment = () => {
      count.value++;
    };
    
    // 返回给模板
    return {
      count,
      doubleCount,
      increment
    };
  }
};
</script>
```

#### setup函数的参数

```vue
<template>
  <div>
    <p>Message: {{ msg }}</p>
    <button @click="emit('custom-event', 'Hello')">Emit Event</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    msg: {
      type: String,
      default: 'Hello'
    }
  },
  emits: ['custom-event'],
  setup(props, { emit, attrs, slots, expose }) {
    // 使用props
    console.log(props.msg);
    
    // 暴露公共方法
    expose({
      reset() {
        console.log('Reset method');
      }
    });
    
    return {
      emit
    };
  }
};
</script>
```

### 2. 响应式系统

#### ref和reactive

```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>User: {{ user.name }}, {{ user.age }}</p>
    <button @click="updateData">Update Data</button>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';

export default {
  setup() {
    // 基本类型响应式
    const count = ref(0);
    
    // 对象类型响应式
    const user = reactive({
      name: 'John',
      age: 30
    });
    
    const updateData = () => {
      // ref需要通过.value访问
      count.value++;
      
      // reactive直接访问
      user.age++;
    };
    
    return {
      count,
      user,
      updateData
    };
  }
};
</script>
```

#### toRef和toRefs

```vue
<template>
  <div>
    <p>Name: {{ name }}</p>
    <p>Age: {{ age }}</p>
    <button @click="updateUser">Update User</button>
  </div>
</template>

<script>
import { reactive, toRef, toRefs } from 'vue';

export default {
  setup() {
    const user = reactive({
      name: 'John',
      age: 30
    });
    
    // 创建单个属性的ref
    const name = toRef(user, 'name');
    
    // 将reactive对象转换为ref对象
    const { age } = toRefs(user);
    
    const updateUser = () => {
      name.value = 'Jane';
      age.value++;
    };
    
    return {
      name,
      age,
      updateUser
    };
  }
};
</script>

#### shallowRef、shallowReactive、readonly、shallowReadonly

```vue
<!-- shallowRef：浅响应式ref -->
<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>User: {{ user.name }}</p>
    <button @click="updateCount">Update Count</button>
    <button @click="updateUser">Update User</button>
  </div>
</template>

<script>
import { shallowRef, triggerRef } from 'vue';

export default {
  setup() {
    // shallowRef：只有.value的访问是响应式的，对象内部属性不是响应式的
    const count = shallowRef(0);
    const user = shallowRef({
      name: 'John',
      age: 30
    });
    
    const updateCount = () => {
      // ✅ 会触发响应式更新
      count.value++;
    };
    
    const updateUser = () => {
      // ❌ 不会触发响应式更新
      user.value.name = 'Jane';
      
      // ✅ 需要手动触发更新
      triggerRef(user);
    };
    
    return {
      count,
      user,
      updateCount,
      updateUser
    };
  }
};
</script>

<!-- shallowReactive：浅响应式reactive -->
<template>
  <div>
    <p>User: {{ user.name }}</p>
    <p>Address: {{ user.address.city }}</p>
    <button @click="updateUser">Update User</button>
    <button @click="updateAddress">Update Address</button>
  </div>
</template>

<script>
import { shallowReactive } from 'vue';

export default {
  setup() {
    // shallowReactive：只有第一层属性是响应式的，深层属性不是响应式的
    const user = shallowReactive({
      name: 'John',
      age: 30,
      address: {
        city: 'New York',
        country: 'USA'
      }
    });
    
    const updateUser = () => {
      // ✅ 会触发响应式更新
      user.name = 'Jane';
    };
    
    const updateAddress = () => {
      // ❌ 不会触发响应式更新
      user.address.city = 'Los Angeles';
    };
    
    return {
      user,
      updateUser,
      updateAddress
    };
  }
};
</script>

<!-- readonly：只读响应式 -->
<template>
  <div>
    <p>User: {{ user.name }}</p>
    <p>Age: {{ user.age }}</p>
    <button @click="updateOriginal">Update Original</button>
  </div>
</template>

<script>
import { reactive, readonly } from 'vue';

export default {
  setup() {
    const original = reactive({
      name: 'John',
      age: 30
    });
    
    // 创建只读副本
    const user = readonly(original);
    
    const updateOriginal = () => {
      // ✅ 可以修改原始对象
      original.name = 'Jane';
      
      // ❌ 不能修改只读副本
      // user.age = 31; // 警告：Set operation on key "age" failed
    };
    
    return {
      user,
      updateOriginal
    };
  }
};
</script>

<!-- shallowReadonly：浅只读响应式 -->
<template>
  <div>
    <p>User: {{ user.name }}</p>
    <p>Address: {{ user.address.city }}</p>
    <button @click="updateOriginal">Update Original</button>
  </div>
</template>

<script>
import { reactive, shallowReadonly } from 'vue';

export default {
  setup() {
    const original = reactive({
      name: 'John',
      age: 30,
      address: {
        city: 'New York',
        country: 'USA'
      }
    });
    
    // 创建浅只读副本
    const user = shallowReadonly(original);
    
    const updateOriginal = () => {
      // ❌ 不能修改第一层属性
      // user.name = 'Jane'; // 警告
      
      // ✅ 可以修改深层属性
      user.address.city = 'Los Angeles';
    };
    
    return {
      user,
      updateOriginal
    };
  }
};
</script>

<!-- 使用场景 -->

<!-- 1. shallowRef：用于大型对象，避免深层响应式带来的性能开销 -->
const largeData = shallowRef({
  // 大量数据
});

<!-- 2. shallowReactive：用于只需要监听第一层属性变化的场景 -->
const state = shallowReactive({
  count: 0,
  config: {
    // 不需要监听深层变化
  }
});

<!-- 3. readonly：用于保护数据不被修改，如props -->
const props = readonly({
  // 只读属性
});

<!-- 4. shallowReadonly：用于保护第一层属性，但允许深层修改 -->
const config = shallowReadonly({
  api: 'https://api.example.com',
  options: {
    // 可以修改
  }
});
```

### 3. 计算与监听

#### computed

```vue
<template>
  <div>
    <p>First name: <input v-model="firstName"></p>
    <p>Last name: <input v-model="lastName"></p>
    <p>Full name: {{ fullName }}</p>
    <p>Reversed full name: {{ reversedFullName }}</p>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  setup() {
    const firstName = ref('John');
    const lastName = ref('Doe');
    
    // 计算属性
    const fullName = computed(() => {
      return `${firstName.value} ${lastName.value}`;
    });
    
    // 计算属性（带getter和setter）
    const reversedFullName = computed({
      get: () => {
        return fullName.value.split('').reverse().join('');
      },
      set: (value) => {
        const [last, first] = value.split(' ');
        firstName.value = first;
        lastName.value = last;
      }
    });
    
    return {
      firstName,
      lastName,
      fullName,
      reversedFullName
    };
  }
};
</script>
```

#### watch和watchEffect

```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Message: {{ message }}</p>
    <button @click="count++">Increment Count</button>
    <button @click="message = 'Hello' + Math.random()">Change Message</button>
  </div>
</template>

<script>
import { ref, watch, watchEffect } from 'vue';

export default {
  setup() {
    const count = ref(0);
    const message = ref('Hello');
    
    // 监听单个源
    watch(count, (newValue, oldValue) => {
      console.log(`Count changed: ${oldValue} → ${newValue}`);
    });
    
    // 监听多个源
    watch([count, message], ([newCount, newMessage], [oldCount, oldMessage]) => {
      console.log(`Count changed: ${oldCount} → ${newCount}`);
      console.log(`Message changed: ${oldMessage} → ${newMessage}`);
    });
    
    // 自动跟踪依赖
    watchEffect(() => {
      console.log(`Watch effect: count = ${count.value}, message = ${message.value}`);
    });
    
    return {
      count,
      message
    };
  }
};
</script>

#### watchPostEffect和watchSyncEffect

```vue
<!-- watchPostEffect：DOM更新后执行 -->
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="count++">Increment</button>
    <div ref="boxRef" class="box"></div>
  </div>
</template>

<script>
import { ref, watchPostEffect } from 'vue';

export default {
  setup() {
    const count = ref(0);
    const boxRef = ref(null);
    
    // watchPostEffect：在DOM更新后执行，可以访问更新后的DOM
    watchPostEffect(() => {
      console.log('Count changed:', count.value);
      console.log('Box height:', boxRef.value?.offsetHeight);
    });
    
    return {
      count,
      boxRef
    };
  }
};
</script>

<!-- watchSyncEffect：同步执行 -->
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="count++">Increment</button>
  </div>
</template>

<script>
import { ref, watchSyncEffect } from 'vue';

export default {
  setup() {
    const count = ref(0);
    
    // watchSyncEffect：同步执行，立即执行
    watchSyncEffect(() => {
      console.log('Count changed (sync):', count.value);
    });
    
    return {
      count
    };
  }
};
</script>

<!-- watchEffect vs watchPostEffect vs watchSyncEffect -->

<!-- watchEffect：在组件更新前执行 -->
watchEffect(() => {
  console.log('Before DOM update');
});

<!-- watchPostEffect：在组件更新后执行 -->
watchPostEffect(() => {
  console.log('After DOM update');
  // 可以访问更新后的DOM
});

<!-- watchSyncEffect：同步执行 -->
watchSyncEffect(() => {
  console.log('Sync execution');
  // 立即执行，不等待组件更新
});

<!-- 使用场景 -->

<!-- 1. watchPostEffect：需要访问更新后的DOM -->
watchPostEffect(() => {
  // 计算元素尺寸
  const height = elementRef.value.offsetHeight;
  // 更新布局
});

<!-- 2. watchSyncEffect：需要同步执行的逻辑 -->
watchSyncEffect(() => {
  // 同步更新状态
  // 立即执行某些操作
});

<!-- 3. watchEffect：默认的副作用函数 -->
watchEffect(() => {
  // 一般的副作用逻辑
});
```

### 4. 生命周期

```vue
<template>
  <div>
    <p>Component</p>
  </div>
</template>

<script>
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

export default {
  setup() {
    console.log('setup');
    
    onBeforeMount(() => {
      console.log('onBeforeMount');
    });
    
    onMounted(() => {
      console.log('onMounted');
    });
    
    onBeforeUpdate(() => {
      console.log('onBeforeUpdate');
    });
    
    onUpdated(() => {
      console.log('onUpdated');
    });
    
    onBeforeUnmount(() => {
      console.log('onBeforeUnmount');
    });
    
    onUnmounted(() => {
      console.log('onUnmounted');
    });
    
    onErrorCaptured((error, instance, info) => {
      console.log('onErrorCaptured:', error, instance, info);
    });
    
    onRenderTracked((event) => {
      console.log('onRenderTracked:', event);
    });
    
    onRenderTriggered((event) => {
      console.log('onRenderTriggered:', event);
    });
  }
};
</script>
```

### 5. 依赖注入

```vue
<!-- ParentComponent.vue -->
<template>
  <div>
    <child-component></child-component>
  </div>
</template>

<script>
import { provide, ref } from 'vue';
import ChildComponent from './ChildComponent.vue';

export default {
  components: {
    ChildComponent
  },
  setup() {
    const count = ref(0);
    
    // 提供依赖
    provide('count', count);
    provide('increment', () => {
      count.value++;
    });
  }
};
</script>
```

```vue
<!-- ChildComponent.vue -->
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script>
import { inject } from 'vue';

export default {
  setup() {
    // 注入依赖
    const count = inject('count');
    const increment = inject('increment');
    
    return {
      count,
      increment
    };
  }
};
</script>

#### 响应式provide/inject

```vue
<!-- ParentComponent.vue -->
<template>
  <div>
    <child-component></child-component>
  </div>
</template>

<script>
import { provide, ref, reactive, computed } from 'vue';
import ChildComponent from './ChildComponent.vue';

export default {
  components: {
    ChildComponent
  },
  setup() {
    // 提供响应式ref
    const count = ref(0);
    provide('count', count);
    
    // 提供响应式reactive
    const user = reactive({
      name: 'John',
      age: 30
    });
    provide('user', user);
    
    // 提供响应式computed
    const doubleCount = computed(() => count.value * 2);
    provide('doubleCount', doubleCount);
    
    // 提供响应式方法
    const increment = () => {
      count.value++;
    };
    provide('increment', increment);
    
    // 提供只读数据
    const readonlyUser = computed(() => ({ ...user }));
    provide('readonlyUser', readonlyUser);
  }
};
</script>

<!-- ChildComponent.vue -->
<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double Count: {{ doubleCount }}</p>
    <p>User: {{ user.name }}, {{ user.age }}</p>
    <p>Readonly User: {{ readonlyUser.name }}</p>
    <button @click="increment">Increment</button>
    <button @click="updateUser">Update User</button>
  </div>
</template>

<script>
import { inject } from 'vue';

export default {
  setup() {
    // 注入响应式数据
    const count = inject('count');
    const user = inject('user');
    const doubleCount = inject('doubleCount');
    const increment = inject('increment');
    const readonlyUser = inject('readonlyUser');
    
    const updateUser = () => {
      // ✅ 可以修改响应式数据
      user.name = 'Jane';
      user.age++;
      
      // ❌ 不能修改只读数据
      // readonlyUser.name = 'Bob'; // 错误
    };
    
    return {
      count,
      user,
      doubleCount,
      increment,
      updateUser,
      readonlyUser
    };
  }
};
</script>

<!-- 使用provide/inject的最佳实践 -->

<!-- 1. 使用Symbol作为key，避免命名冲突 -->
const COUNT_KEY = Symbol('count');
const USER_KEY = Symbol('user');

provide(COUNT_KEY, count);
provide(USER_KEY, user);

const count = inject(COUNT_KEY);
const user = inject(USER_KEY);

<!-- 2. 提供默认值 -->
const count = inject('count', 0);
const user = inject('user', { name: 'Default', age: 0 });

<!-- 3. 使用provide/inject创建响应式状态管理 -->
// store.js
import { provide, inject, reactive, readonly } from 'vue';

const STORE_KEY = Symbol('store');

export function provideStore() {
  const state = reactive({
    count: 0,
    user: null
  });
  
  const actions = {
    increment() {
      state.count++;
    },
    setUser(user) {
      state.user = user;
    }
  };
  
  provide(STORE_KEY, {
    state: readonly(state),
    actions
  });
}

export function useStore() {
  return inject(STORE_KEY);
}

<!-- ParentComponent.vue -->
import { provideStore } from './store';

export default {
  setup() {
    provideStore();
  }
};

<!-- ChildComponent.vue -->
import { useStore } from './store';

export default {
  setup() {
    const { state, actions } = useStore();
    
    return {
      count: state.count,
      increment: actions.increment
    };
  }
};
```

### 6. 自定义组合式函数

#### 基本示例

```javascript
// useCounter.js
import { ref, computed } from 'vue';

export function useCounter(initialValue = 0) {
  const count = ref(initialValue);
  const doubleCount = computed(() => count.value * 2);
  
  const increment = () => {
    count.value++;
  };
  
  const decrement = () => {
    count.value--;
  };
  
  const reset = () => {
    count.value = initialValue;
  };
  
  return {
    count,
    doubleCount,
    increment,
    decrement,
    reset
  };
}
```

```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double: {{ doubleCount }}</p>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
    <button @click="reset">Reset</button>
  </div>
</template>

<script>
import { useCounter } from './useCounter';

export default {
  setup() {
    const { count, doubleCount, increment, decrement, reset } = useCounter(10);
    
    return {
      count,
      doubleCount,
      increment,
      decrement,
      reset
    };
  }
};
</script>
```

#### 更复杂的示例

```javascript
// useLocalStorage.js
import { ref, watch } from 'vue';

export function useLocalStorage(key, initialValue) {
  // 从localStorage读取初始值
  const storedValue = localStorage.getItem(key);
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;
  
  const value = ref(initial);
  
  // 监听变化并保存到localStorage
  watch(value, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
  }, { deep: true });
  
  return value;
}
```

```vue
<template>
  <div>
    <p>Name: <input v-model="name"></p>
    <p>Age: <input type="number" v-model.number="user.age"></p>
  </div>
</template>

<script>
import { useLocalStorage } from './useLocalStorage';

export default {
  setup() {
    const name = useLocalStorage('name', 'John');
    const user = useLocalStorage('user', { age: 30 });
    
    return {
      name,
      user
    };
  }
};
</script>

#### 组合式函数最佳实践

```javascript
<!-- 组合式函数最佳实践 -->

<!-- 1. 命名规范 -->
// ✅ 推荐：使用use前缀
export function useCounter() { }
export function useLocalStorage() { }
export function useFetch() { }

// ❌ 不推荐：不使用use前缀
export function counter() { }
export function localStorage() { }

<!-- 2. 参数设计 -->
// ✅ 推荐：提供合理的默认值
export function useCounter(initialValue = 0, step = 1) {
  const count = ref(initialValue);
  
  const increment = () => {
    count.value += step;
  };
  
  return { count, increment };
}

// ✅ 推荐：支持配置对象
export function useFetch(url, options = {}) {
  const {
    method = 'GET',
    headers = {},
    body = null
  } = options;
  
  // ...
}

<!-- 3. 返回值设计 -->
// ✅ 推荐：返回ref对象
export function useCounter() {
  const count = ref(0);
  return { count };
}

// ✅ 推荐：使用toRefs返回reactive对象
export function useUser() {
  const user = reactive({
    name: '',
    age: 0
  });
  
  return toRefs(user);
}

<!-- 4. 响应式处理 -->
// ✅ 推荐：正确处理响应式
export function useWindowSize() {
  const width = ref(window.innerWidth);
  const height = ref(window.innerHeight);
  
  const update = () => {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  };
  
  onMounted(() => {
    window.addEventListener('resize', update);
  });
  
  onUnmounted(() => {
    window.removeEventListener('resize', update);
  });
  
  return { width, height };
}

<!-- 5. 错误处理 -->
// ✅ 推荐：提供错误处理
export function useFetch(url) {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(false);
  
  const fetchData = async () => {
    try {
      loading.value = true;
      error.value = null;
      const response = await fetch(url);
      data.value = await response.json();
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };
  
  return { data, error, loading, fetchData };
}

<!-- 6. 清理副作用 -->
// ✅ 推荐：在组件卸载时清理副作用
export function useInterval(callback, delay) {
  const intervalId = ref(null);
  
  const start = () => {
    if (intervalId.value) return;
    intervalId.value = setInterval(callback, delay);
  };
  
  const stop = () => {
    if (intervalId.value) {
      clearInterval(intervalId.value);
      intervalId.value = null;
    }
  };
  
  onUnmounted(() => {
    stop();
  });
  
  return { start, stop };
}

<!-- 7. 组合多个组合式函数 -->
export function useCounterWithStorage(key, initialValue = 0) {
  const { count, increment, decrement } = useCounter(initialValue);
  
  // 使用useLocalStorage持久化
  const storedCount = useLocalStorage(key, count);
  
  watch(storedCount, (newValue) => {
    count.value = newValue;
  });
  
  return {
    count: storedCount,
    increment,
    decrement
  };
}
```

#### 内置组合式函数

```javascript
<!-- 内置组合式函数 -->

<!-- 1. useRouter（Vue Router） -->
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    
    const navigateToHome = () => {
      router.push('/');
    };
    
    const navigateToAbout = () => {
      router.push('/about');
    };
    
    return {
      navigateToHome,
      navigateToAbout
    };
  }
};

<!-- 2. useRoute（Vue Router） -->
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    
    const userId = computed(() => route.params.id);
    const query = computed(() => route.query);
    
    return {
      userId,
      query
    };
  }
};

<!-- 3. useStore（Vuex） -->
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    
    const count = computed(() => store.state.count);
    const doubleCount = computed(() => store.getters.doubleCount);
    
    const increment = () => {
      store.commit('increment');
    };
    
    const asyncIncrement = async () => {
      await store.dispatch('asyncIncrement');
    };
    
    return {
      count,
      doubleCount,
      increment,
      asyncIncrement
    };
  }
};

<!-- 4. useHead（VueUse） -->
import { useHead } from '@vueuse/head';

export default {
  setup() {
    useHead({
      title: 'My Page',
      meta: [
        { name: 'description', content: 'My page description' }
      ]
    });
  }
};

<!-- 5. useTitle（VueUse） -->
import { useTitle } from '@vueuse/core';

export default {
  setup() {
    const title = useTitle('My Page');
    
    const updateTitle = () => {
      title.value = 'New Title';
    };
    
    return {
      updateTitle
    };
  }
};

<!-- 6. useLocalStorage（VueUse） -->
import { useStorage } from '@vueuse/core';

export default {
  setup() {
    const name = useStorage('name', 'John');
    const user = useStorage('user', { age: 30 });
    
    return {
      name,
      user
    };
  }
};

<!-- 7. useMouse（VueUse） -->
import { useMouse } from '@vueuse/core';

export default {
  setup() {
    const { x, y } = useMouse();
    
    return {
      mouseX: x,
      mouseY: y
    };
  }
};

<!-- 8. useWindowSize（VueUse） -->
import { useWindowSize } from '@vueuse/core';

export default {
  setup() {
    const { width, height } = useWindowSize();
    
    return {
      windowWidth: width,
      windowHeight: height
    };
  }
};
```

### 7. Composition API与Options API

#### 对比

| 特性 | Options API | Composition API |
|------|-------------|-----------------|
| 组织方式 | 按选项组织（data、methods等） | 按功能组织 |
| 代码复用 | mixins（可能有命名冲突） | 组合式函数（更清晰） |
| TypeScript支持 | 有限 | 更好 |
| 逻辑关注点分离 | 困难 | 容易 |
| 可读性 | 大型组件中较差 | 更好 |

#### 混用

```vue
<template>
  <div>
    <p>Options API count: {{ optionsCount }}</p>
    <p>Composition API count: {{ compositionCount }}</p>
    <button @click="incrementOptions">Increment Options</button>
    <button @click="incrementComposition">Increment Composition</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  // Options API
  data() {
    return {
      optionsCount: 0
    };
  },
  methods: {
    incrementOptions() {
      this.optionsCount++;
    }
  },
  // Composition API
  setup() {
    const compositionCount = ref(0);
    
    const incrementComposition = () => {
      compositionCount.value++;
    };
    
    return {
      compositionCount,
      incrementComposition
    };
  }
};
</script>
```

#### 从Options API迁移到Composition API

```vue
<!-- Options API示例 -->
<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double: {{ doubleCount }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    };
  },
  computed: {
    doubleCount() {
      return this.count * 2;
    }
  },
  methods: {
    increment() {
      this.count++;
    }
  },
  mounted() {
    console.log('Component mounted');
  }
};
</script>

<!-- 迁移到Composition API -->
<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double: {{ doubleCount }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';

export default {
  setup() {
    // data → ref/reactive
    const count = ref(0);
    
    // computed → computed
    const doubleCount = computed(() => count.value * 2);
    
    // methods → 普通函数
    const increment = () => {
      count.value++;
    };
    
    // 生命周期钩子 → onXxx
    onMounted(() => {
      console.log('Component mounted');
    });
    
    return {
      count,
      doubleCount,
      increment
    };
  }
};
</script>

<!-- 迁移对照表 -->

| Options API | Composition API | 说明 |
|-------------|----------------|------|
| data | ref/reactive | 响应式数据 |
| computed | computed | 计算属性 |
| methods | 普通函数 | 方法 |
| watch | watch | 监听器 |
| mounted | onMounted | 生命周期 |
| beforeCreate/created | setup | 初始化 |
| props | setup第一个参数 | 属性 |
| emits | setup第二个参数 | 事件 |
| expose | expose | 暴露方法 |

<!-- 复杂组件迁移示例 -->

<!-- Options API -->
export default {
  props: {
    userId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      user: null,
      loading: false,
      error: null,
      posts: []
    };
  },
  computed: {
    userName() {
      return this.user ? this.user.name : '';
    },
    postCount() {
      return this.posts.length;
    }
  },
  watch: {
    userId: {
      immediate: true,
      handler(newVal) {
        this.fetchUser(newVal);
      }
    }
  },
  methods: {
    async fetchUser(id) {
      try {
        this.loading = true;
        this.error = null;
        const response = await fetch(`/api/users/${id}`);
        this.user = await response.json();
        await this.fetchPosts(id);
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },
    async fetchPosts(userId) {
      const response = await fetch(`/api/users/${userId}/posts`);
      this.posts = await response.json();
    }
  },
  mounted() {
    console.log('Component mounted');
  }
};

<!-- Composition API -->
import { ref, computed, watch, onMounted } from 'vue';

export default {
  props: {
    userId: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const user = ref(null);
    const loading = ref(false);
    const error = ref(null);
    const posts = ref([]);
    
    const userName = computed(() => user.value ? user.value.name : '');
    const postCount = computed(() => posts.value.length);
    
    const fetchUser = async (id) => {
      try {
        loading.value = true;
        error.value = null;
        const response = await fetch(`/api/users/${id}`);
        user.value = await response.json();
        await fetchPosts(id);
      } catch (err) {
        error.value = err;
      } finally {
        loading.value = false;
      }
    };
    
    const fetchPosts = async (userId) => {
      const response = await fetch(`/api/users/${userId}/posts`);
      posts.value = await response.json();
    };
    
    watch(() => props.userId, (newVal) => {
      fetchUser(newVal);
    }, { immediate: true });
    
    onMounted(() => {
      console.log('Component mounted');
    });
    
    return {
      user,
      loading,
      error,
      posts,
      userName,
      postCount
    };
  }
};

<!-- 迁移步骤 -->

<!-- 1. 创建setup函数 -->
export default {
  setup() {
    // ...
  }
};

<!-- 2. 迁移data -->
const count = ref(0);
const user = reactive({ name: 'John', age: 30 });

<!-- 3. 迁移computed -->
const doubleCount = computed(() => count.value * 2);

<!-- 4. 迁移methods -->
const increment = () => {
  count.value++;
};

<!-- 5. 迁移watch -->
watch(count, (newValue, oldValue) => {
  console.log(`Count changed: ${oldValue} → ${newValue}`);
});

<!-- 6. 迁移生命周期 -->
onMounted(() => {
  console.log('Component mounted');
});

<!-- 7. 迁移props -->
export default {
  props: {
    message: String
  },
  setup(props) {
    console.log(props.message);
  }
};

<!-- 8. 迁移emits -->
export default {
  emits: ['update'],
  setup(props, { emit }) {
    const update = () => {
      emit('update', 'new value');
    };
  }
};

<!-- 9. 返回模板需要的数据和方法 -->
export default {
  setup() {
    const count = ref(0);
    const increment = () => {
      count.value++;
    };
    
    return {
      count,
      increment
    };
  }
};
```

### 8. 高级特性

#### Teleport

```vue
<template>
  <div>
    <h1>Teleport Example</h1>
    <Teleport to="#modal-container">
      <div v-if="showModal" class="modal">
        <h2>Modal Content</h2>
        <button @click="showModal = false">Close</button>
      </div>
    </Teleport>
    <button @click="showModal = true">Open Modal</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const showModal = ref(false);
    
    return {
      showModal
    };
  }
};
</script>

<style>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border: 1px solid #ccc;
  z-index: 1000;
}
</style>
```

#### Suspense

```vue
<template>
  <div>
    <Suspense>
      <template #default>
        <async-component />
      </template>
      <template #fallback>
        <div>Loading...</div>
      </template>
    </Suspense>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

const AsyncComponent = defineAsyncComponent(() => import('./AsyncComponent.vue'));

export default {
  components: {
    AsyncComponent
  }
};
</script>
```

#### Fragment

```vue
<!-- Fragment：多根节点 -->

<!-- Vue2：只能有一个根节点 -->
<template>
  <div>
    <header>Header</header>
    <main>Main Content</main>
    <footer>Footer</footer>
  </div>
</template>

<!-- Vue3：支持多个根节点（Fragment） -->
<template>
  <header>Header</header>
  <main>Main Content</main>
  <footer>Footer</footer>
</template>

<!-- Fragment的优势 -->

<!-- 1. 更清晰的DOM结构 -->
<!-- Vue2 -->
<div class="wrapper">
  <h1>Title</h1>
  <p>Content</p>
</div>

<!-- Vue3 -->
<h1>Title</h1>
<p>Content</p>

<!-- 2. 减少不必要的嵌套 -->
<!-- Vue2 -->
<div class="list">
  <li v-for="item in items" :key="item.id">{{ item.name }}</li>
</div>

<!-- Vue3 -->
<li v-for="item in items" :key="item.id">{{ item.name }}</li>

<!-- 3. 更好的CSS布局 -->
<!-- Vue2 -->
<div class="flex-container">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
</div>

<!-- Vue3 -->
<div class="item">Item 1</div>
<div class="item">Item 2</div>
<div class="item">Item 3</div>

<!-- Fragment的使用场景 -->

<!-- 1. 列表组件 -->
<template>
  <li v-for="item in items" :key="item.id">
    {{ item.name }}
  </li>
</template>

<!-- 2. 表单组件 -->
<template>
  <label for="username">Username:</label>
  <input id="username" v-model="username">
  <label for="password">Password:</label>
  <input id="password" type="password" v-model="password">
</template>

<!-- 3. 布局组件 -->
<template>
  <header>Header</header>
  <main>
    <slot></slot>
  </main>
  <footer>Footer</footer>
</template>

<!-- 4. 条件渲染 -->
<template>
  <div v-if="condition1">Content 1</div>
  <div v-else-if="condition2">Content 2</div>
  <div v-else>Content 3</div>
</template>

<!-- Fragment的注意事项 -->

<!-- 1. 事件监听 -->
<!-- 需要在根元素上添加事件监听 -->
<template>
  <div @click="handleClick">Content 1</div>
  <div @click="handleClick">Content 2</div>
</template>

<!-- 2. 属性绑定 -->
<!-- 需要在根元素上绑定属性 -->
<template>
  <div :class="activeClass">Content 1</div>
  <div :class="activeClass">Content 2</div>
</template>

<!-- 3. 过渡动画 -->
<!-- 需要使用TransitionGroup -->
<template>
  <transition-group name="list">
    <div v-for="item in items" :key="item.id">
      {{ item.name }}
    </div>
  </transition-group>
</template>

<!-- Fragment与Teleport结合使用 -->
<template>
  <teleport to="body">
    <div class="modal">
      <h2>Modal Title</h2>
      <p>Modal Content</p>
      <button @click="close">Close</button>
    </div>
  </teleport>
</template>
```

## 实战练习

### 1. 实现一个计数器应用

```vue
<template>
  <div class="counter">
    <h2>Counter</h2>
    <div class="counter-value">{{ count }}</div>
    <div class="counter-controls">
      <button @click="decrement">-</button>
      <button @click="increment">+</button>
      <button @click="reset">Reset</button>
    </div>
    <div class="counter-stats">
      <p>Double: {{ doubleCount }}</p>
      <p>Triple: {{ tripleCount }}</p>
      <p>Clicked: {{ clickCount }} times</p>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  setup() {
    const count = ref(0);
    const clickCount = ref(0);
    
    const doubleCount = computed(() => count.value * 2);
    const tripleCount = computed(() => count.value * 3);
    
    const increment = () => {
      count.value++;
      clickCount.value++;
    };
    
    const decrement = () => {
      count.value--;
      clickCount.value++;
    };
    
    const reset = () => {
      count.value = 0;
    };
    
    return {
      count,
      clickCount,
      doubleCount,
      tripleCount,
      increment,
      decrement,
      reset
    };
  }
};
</script>

<style scoped>
.counter {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
}

.counter-value {
  font-size: 48px;
  font-weight: bold;
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

.counter-stats {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #ddd;
}

.counter-stats p {
  margin: 5px 0;
}
</style>
```

### 2. 实现一个待办事项列表

```vue
<template>
  <div class="todo-app">
    <h2>Todo List</h2>
    <div class="todo-input">
      <input 
        v-model="newTodo" 
        @keyup.enter="addTodo" 
        placeholder="Add a new todo"
      >
      <button @click="addTodo">Add</button>
    </div>
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
        >
        <span>{{ todo.text }}</span>
        <button @click="removeTodo(todo.id)">Delete</button>
      </li>
    </ul>
    <div class="todo-footer">
      <p>{{ remainingCount }} items left</p>
      <button @click="clearCompleted">Clear completed</button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  setup() {
    const todos = ref([
      { id: 1, text: 'Learn Vue 3', completed: false },
      { id: 2, text: 'Build an app', completed: false },
      { id: 3, text: 'Deploy to production', completed: false }
    ]);
    
    const newTodo = ref('');
    const currentFilter = ref('all');
    const filters = [
      { label: 'All', value: 'all' },
      { label: 'Active', value: 'active' },
      { label: 'Completed', value: 'completed' }
    ];
    
    const filteredTodos = computed(() => {
      switch (currentFilter.value) {
        case 'active':
          return todos.value.filter(todo => !todo.completed);
        case 'completed':
          return todos.value.filter(todo => todo.completed);
        default:
          return todos.value;
      }
    });
    
    const remainingCount = computed(() => {
      return todos.value.filter(todo => !todo.completed).length;
    });
    
    const addTodo = () => {
      if (newTodo.value.trim()) {
        todos.value.push({
          id: Date.now(),
          text: newTodo.value.trim(),
          completed: false
        });
        newTodo.value = '';
      }
    };
    
    const removeTodo = (id) => {
      todos.value = todos.value.filter(todo => todo.id !== id);
    };
    
    const clearCompleted = () => {
      todos.value = todos.value.filter(todo => !todo.completed);
    };
    
    return {
      todos,
      newTodo,
      currentFilter,
      filters,
      filteredTodos,
      remainingCount,
      addTodo,
      removeTodo,
      clearCompleted
    };
  }
};
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
</style>
```

### 3. 实现一个响应式表单

```vue
<template>
  <div class="form-app">
    <h2>User Form</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Name:</label>
        <input 
          id="name" 
          v-model="form.name" 
          @blur="validateField('name')"
        >
        <p v-if="errors.name" class="error">{{ errors.name }}</p>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input 
          id="email" 
          type="email" 
          v-model="form.email" 
          @blur="validateField('email')"
        >
        <p v-if="errors.email" class="error">{{ errors.email }}</p>
      </div>
      <div class="form-group">
        <label for="age">Age:</label>
        <input 
          id="age" 
          type="number" 
          v-model.number="form.age" 
          @blur="validateField('age')"
        >
        <p v-if="errors.age" class="error">{{ errors.age }}</p>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input 
          id="password" 
          type="password" 
          v-model="form.password" 
          @blur="validateField('password')"
        >
        <p v-if="errors.password" class="error">{{ errors.password }}</p>
      </div>
      <div class="form-actions">
        <button type="submit" :disabled="!isFormValid">Submit</button>
        <button type="button" @click="resetForm">Reset</button>
      </div>
    </form>
    <div v-if="submitted" class="success">
      <h3>Form submitted successfully!</h3>
      <pre>{{ submittedForm }}</pre>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  setup() {
    const form = ref({
      name: '',
      email: '',
      age: '',
      password: ''
    });
    
    const errors = ref({});
    const submitted = ref(false);
    const submittedForm = ref({});
    
    const validateField = (field) => {
      errors.value[field] = '';
      
      switch (field) {
        case 'name':
          if (!form.value.name) {
            errors.value.name = 'Name is required';
          }
          break;
        case 'email':
          if (!form.value.email) {
            errors.value.email = 'Email is required';
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
            errors.value.email = 'Email is not valid';
          }
          break;
        case 'age':
          if (!form.value.age) {
            errors.value.age = 'Age is required';
          } else if (form.value.age < 18) {
            errors.value.age = 'Age must be at least 18';
          }
          break;
        case 'password':
          if (!form.value.password) {
            errors.value.password = 'Password is required';
          } else if (form.value.password.length < 6) {
            errors.value.password = 'Password must be at least 6 characters';
          }
          break;
      }
    };
    
    const validateForm = () => {
      Object.keys(form.value).forEach(field => {
        validateField(field);
      });
      
      return Object.values(errors.value).every(error => !error);
    };
    
    const isFormValid = computed(() => {
      return Object.values(errors.value).every(error => !error) &&
             Object.values(form.value).every(value => value);
    });
    
    const submitForm = () => {
      if (validateForm()) {
        submittedForm.value = { ...form.value };
        submitted.value = true;
        console.log('Form submitted:', form.value);
      }
    };
    
    const resetForm = () => {
      form.value = {
        name: '',
        email: '',
        age: '',
        password: ''
      };
      errors.value = {};
      submitted.value = false;
    };
    
    return {
      form,
      errors,
      submitted,
      submittedForm,
      isFormValid,
      validateField,
      submitForm,
      resetForm
    };
  }
};
</script>

<style scoped>
.form-app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-group .error {
  margin-top: 5px;
  font-size: 12px;
  color: #dc3545;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}

.form-actions button {
  padding: 10px 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #f8f9fa;
  cursor: pointer;
}

.form-actions button[type="submit"] {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.form-actions button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.success {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #28a745;
  border-radius: 4px;
  background: #d4edda;
  color: #155724;
}
</style>
```

## 学习建议

### 1. 学习顺序
1. **Composition API基础**：理解setup函数和基本响应式API
2. **响应式系统**：掌握ref、reactive等响应式API
3. **计算与监听**：学习computed、watch等
4. **生命周期**：了解Composition API中的生命周期钩子
5. **依赖注入**：学习provide/inject
6. **自定义组合式函数**：创建可复用的组合式函数
7. **高级特性**：Teleport、Suspense等

### 2. 学习方法
- **理论结合实践**：理解概念后通过代码练习巩固
- **官方文档**：参考Vue官方文档的Composition API部分
- **项目实践**：在实际项目中应用所学知识
- **调试技巧**：使用Vue DevTools调试

### 3. 常见误区
- **忘记.value**：在setup函数中使用ref时忘记添加.value
- **响应式丢失**：解构reactive对象时响应式丢失
- **生命周期钩子使用不当**：在不恰当的时机使用生命周期钩子
- **组合式函数命名**：不遵循useXXX命名约定
- **逻辑组织**：仍然按Options API的方式组织逻辑

### 4. 进阶学习资源
- **书籍**：《Vue.js实战》、《深入理解Vue.js》
- **文档**：Vue官方文档 - Composition API
- **课程**：Vue 3 Composition API课程
- **源码**：Vue Composition API相关源码

## 总结

Vue Composition API是Vue 3中引入的重大革新，它提供了一种更灵活、更模块化的方式来组织组件逻辑。本模块涵盖了Composition API的核心概念、响应式系统、计算与监听、生命周期、依赖注入和自定义组合式函数等知识点，通过系统学习和实践，你将能够：

1. **构建更灵活的组件**：使用Composition API组织组件逻辑
2. **提高代码复用性**：创建可复用的组合式函数
3. **更好地处理复杂逻辑**：按功能组织代码
4. **改善TypeScript支持**：获得更好的类型推断
5. **提高代码可读性**：使大型组件更易于理解

通过本模块的学习，你将对Vue Composition API有更深入的理解，为构建复杂的Vue 3应用打下坚实的基础。