---
title: 面试手写题练习
createTime: 2026/02/04 15:24:59
permalink: /webDocView/20-interview/03-coding/
---
# 面试手写题练习

## 模块概述

手写题是前端面试的重要组成部分，主要考察候选人的编码能力、算法思维和对前端核心原理的理解。本模块涵盖了前端常见的手写题，包括防抖节流、深拷贝、响应式实现、Promise工具等，帮助你系统练习前端手写题，应对面试中的编码挑战，提高编码能力和算法思维。

## 知识点清单

### 1. 函数式编程
- **防抖（Debounce）**：延迟执行，适用于输入、滚动等频繁触发的事件
- **节流（Throttle）**：限制执行频率，适用于 resize、滚动等事件
- **函数柯里化（Currying）**：将多参数函数转换为单参数函数
- **函数组合（Composition）**：将多个函数组合为一个函数
- **偏函数（Partial Application）**：固定部分参数，返回新函数

### 2. 对象操作
- **深拷贝（Deep Clone）**：复制对象，包括嵌套对象
- **浅拷贝（Shallow Clone）**：复制对象的第一层属性
- **对象合并（Merge）**：合并多个对象
- **对象扁平化（Flatten）**：将嵌套对象转换为扁平对象

### 3. 响应式实现
- **Vue2 响应式**：使用 Object.defineProperty 实现
- **Vue3 响应式**：使用 Proxy 实现
- **依赖收集**：追踪响应式数据的依赖
- **触发更新**：当响应式数据变化时触发更新

### 4. Promise 工具
- **Promise.all**：并行执行多个 Promise
- **Promise.race**：返回第一个完成的 Promise
- **Promise.allSettled**：等待所有 Promise 完成（无论成功或失败）
- **Promise.any**：返回第一个成功的 Promise
- **Async/Await 实现**：基于 Promise 实现 async/await

### 5. 数组操作
- **数组扁平化（Flatten）**：将嵌套数组转换为一维数组
- **数组去重（Unique）**：去除数组中的重复元素
- **数组排序（Sort）**：实现各种排序算法
- **数组交集/并集/差集**：集合操作
- **数组过滤（Filter）**：实现数组过滤功能

### 6. 其他常见手写题
- **JSON.parse 实现**：手动解析 JSON 字符串
- **事件总线（Event Bus）**：实现事件的发布订阅
- **LRU 缓存**：实现最近最少使用缓存
- **模板字符串解析**：实现类似 ES6 模板字符串的功能
- **URL 解析**：解析 URL 参数

## 核心概念详解

### 1. 函数式编程

#### 防抖（Debounce）

**原理**：将多次执行的函数合并为一次执行，在指定时间内多次触发只执行最后一次。

**应用场景**：输入框搜索、滚动事件、窗口 resize 事件。

**实现**：
```javascript
function debounce(func, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// 使用示例
const handleSearch = debounce((keyword) => {
  console.log('Search for:', keyword);
}, 300);

// 输入时调用
// handleSearch('vue');
// handleSearch('vue 3');
// handleSearch('vue 3 composition api');
// 只会在最后一次调用后 300ms 执行
```

#### 节流（Throttle）

**原理**：限制函数的执行频率，在指定时间内只执行一次。

**应用场景**：滚动事件、游戏中的动画效果。

**实现**：
```javascript
function throttle(func, delay) {
  let lastTime = 0;
  return function(...args) {
    const currentTime = Date.now();
    if (currentTime - lastTime >= delay) {
      func.apply(this, args);
      lastTime = currentTime;
    }
  };
}

// 使用示例
const handleScroll = throttle(() => {
  console.log('Scroll position:', window.scrollY);
}, 200);

// window.addEventListener('scroll', handleScroll);
```

#### 函数柯里化（Currying）

**原理**：将多参数函数转换为一系列单参数函数。

**应用场景**：参数复用、函数组合。

**实现**：
```javascript
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...nextArgs) {
        return curried.apply(this, args.concat(nextArgs));
      };
    }
  };
}

// 使用示例
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6
```

### 2. 对象操作

#### 深拷贝（Deep Clone）

**原理**：复制对象的所有属性，包括嵌套对象。

**应用场景**：需要完全隔离原对象和复制对象时。

**实现**：
```javascript
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  if (obj instanceof Array) {
    return obj.map(item => deepClone(item));
  }
  if (obj instanceof Object) {
    const clonedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
}

// 使用示例
const obj = {
  name: '张三',
  age: 30,
  address: {
    city: '北京',
    district: '朝阳区'
  },
  hobbies: ['篮球', '足球']
};

const clonedObj = deepClone(obj);
clonedObj.address.city = '上海';
console.log(obj.address.city); // 北京
console.log(clonedObj.address.city); // 上海
```

### 3. 响应式实现

#### Vue2 响应式（Object.defineProperty）

**原理**：使用 Object.defineProperty 劫持对象的 getter 和 setter，实现依赖收集和触发更新。

**实现**：
```javascript
function defineReactive(obj, key, value) {
  // 递归处理嵌套对象
  if (typeof value === 'object' && value !== null) {
    observe(value);
  }
  
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log(`获取 ${key}: ${value}`);
      // 依赖收集
      // dep.depend();
      return value;
    },
    set(newValue) {
      if (value === newValue) {
        return;
      }
      console.log(`设置 ${key}: ${newValue}`);
      value = newValue;
      // 递归处理新值
      if (typeof newValue === 'object' && newValue !== null) {
        observe(newValue);
      }
      // 触发更新
      // dep.notify();
    }
  });
}

function observe(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return;
  }
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      defineReactive(obj, key, obj[key]);
    }
  }
}

// 使用示例
const obj = {
  name: '张三',
  age: 30
};

observe(obj);
console.log(obj.name); // 获取 name: 张三
obj.age = 31; // 设置 age: 31
```

#### Vue3 响应式（Proxy）

**原理**：使用 Proxy 代理对象，拦截对象的操作，实现依赖收集和触发更新。

**实现**：
```javascript
function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver);
      console.log(`获取 ${key}: ${result}`);
      // 依赖收集
      // track(target, key);
      // 递归处理嵌套对象
      if (typeof result === 'object' && result !== null) {
        return reactive(result);
      }
      return result;
    },
    set(target, key, value, receiver) {
      const oldValue = Reflect.get(target, key, receiver);
      const result = Reflect.set(target, key, value, receiver);
      if (oldValue !== value) {
        console.log(`设置 ${key}: ${value}`);
        // 触发更新
        // trigger(target, key);
      }
      return result;
    },
    deleteProperty(target, key) {
      const result = Reflect.deleteProperty(target, key);
      console.log(`删除 ${key}`);
      // 触发更新
      // trigger(target, key);
      return result;
    }
  });
}

// 使用示例
const obj = reactive({
  name: '张三',
  age: 30,
  address: {
    city: '北京'
  }
});

console.log(obj.name); // 获取 name: 张三
obj.age = 31; // 设置 age: 31
console.log(obj.address.city); // 获取 city: 北京
obj.address.city = '上海'; // 设置 city: 上海
```

### 4. Promise 工具

#### Promise.all

**原理**：并行执行多个 Promise，等待所有 Promise 完成后返回结果数组。

**实现**：
```javascript
function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('Arguments must be an array'));
    }
    
    const results = [];
    let completedCount = 0;
    const totalCount = promises.length;
    
    if (totalCount === 0) {
      return resolve(results);
    }
    
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          results[index] = value;
          completedCount++;
          if (completedCount === totalCount) {
            resolve(results);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  });
}

// 使用示例
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.resolve(3);

myPromiseAll([promise1, promise2, promise3])
  .then(results => {
    console.log(results); // [1, 2, 3]
  });
```

#### Promise.race

**原理**：并行执行多个 Promise，返回第一个完成的 Promise 的结果。

**实现**：
```javascript
function myPromiseRace(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('Arguments must be an array'));
    }
    
    promises.forEach(promise => {
      Promise.resolve(promise)
        .then(value => {
          resolve(value);
        })
        .catch(error => {
          reject(error);
        });
    });
  });
}

// 使用示例
const promise1 = new Promise(resolve => setTimeout(resolve, 100, 'one'));
const promise2 = new Promise(resolve => setTimeout(resolve, 50, 'two'));

myPromiseRace([promise1, promise2])
  .then(value => {
    console.log(value); // 'two'
  });
```

### 5. 数组操作

#### 数组扁平化（Flatten）

**原理**：将嵌套数组转换为一维数组。

**实现**：
```javascript
// 递归实现
function flatten(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

// 使用 reduce 实现
function flattenReduce(arr) {
  return arr.reduce((prev, curr) => {
    return prev.concat(Array.isArray(curr) ? flattenReduce(curr) : curr);
  }, []);
}

// 使用示例
const nestedArray = [1, [2, [3, [4, 5]]]];
console.log(flatten(nestedArray)); // [1, 2, 3, 4, 5]
console.log(flattenReduce(nestedArray)); // [1, 2, 3, 4, 5]
```

#### 数组去重（Unique）

**原理**：去除数组中的重复元素。

**实现**：
```javascript
// 使用 Set 实现
function uniqueSet(arr) {
  return [...new Set(arr)];
}

// 使用 filter 实现
function uniqueFilter(arr) {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index;
  });
}

// 使用示例
const arr = [1, 2, 2, 3, 4, 4, 5];
console.log(uniqueSet(arr)); // [1, 2, 3, 4, 5]
console.log(uniqueFilter(arr)); // [1, 2, 3, 4, 5]
```

## 实战练习

### 1. 实现函数组合

**题目**：实现一个函数组合函数，将多个函数组合为一个函数。

**答案**：
```javascript
function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

// 使用示例
const add1 = x => x + 1;
const multiply2 = x => x * 2;
const subtract3 = x => x - 3;

const composeFn = compose(subtract3, multiply2, add1);
console.log(composeFn(5)); // (5 + 1) * 2 - 3 = 9
```

### 2. 实现 Promise.allSettled

**题目**：实现 Promise.allSettled，等待所有 Promise 完成（无论成功或失败）。

**答案**：
```javascript
function myPromiseAllSettled(promises) {
  return new Promise((resolve) => {
    if (!Array.isArray(promises)) {
      return resolve([]);
    }
    
    const results = [];
    let completedCount = 0;
    const totalCount = promises.length;
    
    if (totalCount === 0) {
      return resolve(results);
    }
    
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          results[index] = {
            status: 'fulfilled',
            value
          };
        })
        .catch(reason => {
          results[index] = {
            status: 'rejected',
            reason
          };
        })
        .finally(() => {
          completedCount++;
          if (completedCount === totalCount) {
            resolve(results);
          }
        });
    });
  });
}

// 使用示例
const promise1 = Promise.resolve(1);
const promise2 = Promise.reject('Error');
const promise3 = Promise.resolve(3);

myPromiseAllSettled([promise1, promise2, promise3])
  .then(results => {
    console.log(results);
    // [
    //   { status: 'fulfilled', value: 1 },
    //   { status: 'rejected', reason: 'Error' },
    //   { status: 'fulfilled', value: 3 }
    // ]
  });
```

### 3. 实现 LRU 缓存

**题目**：实现一个 LRU（最近最少使用）缓存，具有以下功能：
- 限制缓存大小
- 当缓存达到上限时，移除最久未使用的项
- 支持 get 和 put 操作

**答案**：
```javascript
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }
  
  get(key) {
    if (!this.cache.has(key)) {
      return -1;
    }
    
    // 重新设置键，使其成为最近使用的
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    
    return value;
  }
  
  put(key, value) {
    // 如果键已存在，先删除
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    
    // 如果缓存达到上限，删除最久未使用的项（Map 的第一个项）
    if (this.cache.size >= this.capacity) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    // 添加新项
    this.cache.set(key, value);
  }
}

// 使用示例
const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1)); // 1
cache.put(3, 3); // 移除 key 2
console.log(cache.get(2)); // -1
cache.put(4, 4); // 移除 key 1
console.log(cache.get(1)); // -1
console.log(cache.get(3)); // 3
console.log(cache.get(4)); // 4
```

### 4. 实现事件总线（Event Bus）

**题目**：实现一个事件总线，支持事件的发布、订阅和取消订阅。

**答案**：
```javascript
class EventBus {
  constructor() {
    this.events = {};
  }
  
  // 订阅事件
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  
  // 发布事件
  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(callback => {
        callback(...args);
      });
    }
  }
  
  // 取消订阅
  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }
  
  // 订阅一次事件
  once(event, callback) {
    const onceCallback = (...args) => {
      callback(...args);
      this.off(event, onceCallback);
    };
    this.on(event, onceCallback);
  }
}

// 使用示例
const eventBus = new EventBus();

// 订阅事件
const handleMessage = (message) => {
  console.log('Received message:', message);
};
eventBus.on('message', handleMessage);

// 发布事件
eventBus.emit('message', 'Hello World'); // Received message: Hello World

// 取消订阅
eventBus.off('message', handleMessage);
eventBus.emit('message', 'Hello Again'); // 无输出

// 订阅一次事件
eventBus.once('onceEvent', () => {
  console.log('This event only fires once');
});
eventBus.emit('onceEvent'); // This event only fires once
eventBus.emit('onceEvent'); // 无输出
```

### 5. 实现数组排序（快速排序）

**题目**：实现快速排序算法。

**答案**：
```javascript
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = arr[pivotIndex];
  const left = [];
  const right = [];
  
  for (let i = 0; i < arr.length; i++) {
    if (i === pivotIndex) {
      continue;
    }
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  
  return [...quickSort(left), pivot, ...quickSort(right)];
}

// 使用示例
const arr = [5, 3, 8, 4, 2, 7, 1, 6];
console.log(quickSort(arr)); // [1, 2, 3, 4, 5, 6, 7, 8]
```

## 学习建议

### 1. 理解原理，掌握核心思想
- **算法原理**：理解每个手写题的算法原理和设计思路
- **数据结构**：掌握常见数据结构的使用场景
- **时间空间复杂度**：分析算法的时间和空间复杂度
- **边界情况**：考虑各种边界情况和异常输入

### 2. 多写多练，熟能生巧
- **刻意练习**：针对每个类型的手写题进行专项练习
- **代码量积累**：多写代码，提高编码速度和准确性
- **模拟面试**：在规定时间内完成手写题，模拟面试场景
- **总结归纳**：总结常见的解题模式和技巧

### 3. 深入理解前端核心原理
- **响应式原理**：理解 Vue2 和 Vue3 的响应式实现
- **Promise 原理**：理解 Promise 的工作机制
- **函数式编程**：掌握函数式编程的核心概念
- **浏览器原理**：了解浏览器的工作原理，有助于理解某些手写题的设计

### 4. 关注细节，提高代码质量
- **代码规范**：遵循代码规范，提高代码可读性
- **错误处理**：添加适当的错误处理，提高代码健壮性
- **注释**：添加必要的注释，说明代码的逻辑
- **测试**：为手写题编写测试用例，确保代码正确

### 5. 拓宽视野，了解更多算法
- **经典算法**：学习常见的经典算法（排序、搜索、动态规划等）
- **前端特有算法**：了解前端特有的算法问题（如 DOM 操作相关）
- **LeetCode**：在 LeetCode 上刷题，提高算法能力
- **技术博客**：关注技术博客，了解最新的算法和解题技巧

## 总结

手写题是前端面试的重要组成部分，通过系统练习手写题，不仅可以提高编码能力和算法思维，还可以深入理解前端核心原理。本模块涵盖了前端常见的手写题，包括函数式编程、对象操作、响应式实现、Promise工具、数组操作等，帮助你全面准备面试中的编码挑战。

记住，手写题的练习不仅是为了应对面试，更是为了提高自己的编程能力和解决问题的能力。通过不断练习和总结，你会发现自己的编码能力会有显著提高，面对复杂问题时也会更加从容。祝你面试顺利！