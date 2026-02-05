---
title: 面试基础考点
createTime: 2026/02/04 15:24:46
permalink: /webDocView/20-interview/01-basic/
---
# 面试基础考点

## 模块概述

基础考点是前端面试的第一道门槛，主要考察候选人对前端核心基础知识的掌握程度。本模块涵盖了 JavaScript、CSS、HTML 和浏览器原理等核心知识点，帮助你系统复习前端基础，应对面试中的常见问题，为高级考点的学习打下坚实基础。

## 知识点清单

### 1. JavaScript 基础
- **变量与数据类型**：var、let、const 的区别，基本数据类型与引用数据类型
- **作用域与闭包**：全局作用域、函数作用域、块级作用域，闭包的概念与应用
- **this 关键字**：this 的指向规则，call、apply、bind 的使用
- **原型与原型链**：原型对象、原型链的概念，继承实现方式
- **异步编程**：回调函数、Promise、async/await，事件循环机制
- **ES6+ 特性**：箭头函数、解构赋值、模板字符串、Promise、async/await 等
- **函数式编程**：纯函数、高阶函数、函数柯里化、组合函数
- **错误处理**：try/catch、错误类型、自定义错误
- **内存管理**：内存泄漏的原因与解决方案，垃圾回收机制

### 2. CSS 基础
- **选择器与优先级**：各种选择器的使用，优先级计算规则
- **盒模型**：标准盒模型与 IE 盒模型，box-sizing 属性
- **布局技术**：Flexbox、Grid、浮动布局、定位布局
- **响应式设计**：媒体查询、rem、em、vw/vh 单位
- **视觉效果**：颜色模型、渐变、阴影、圆角
- **动画与过渡**：transition、animation、transform
- **CSS 变量**：自定义属性的使用
- **BEM 命名规范**：Block、Element、Modifier 命名方法

### 3. HTML 基础
- **语义化标签**：header、nav、main、section、article 等
- **表单元素**：各种表单控件的使用，表单验证
- **元数据**：meta 标签的使用，SEO 基础
- **HTML5 新特性**：Canvas、SVG、本地存储、Web Worker 等
- **无障碍访问**：ARIA 属性的使用，无障碍设计原则

### 4. 浏览器原理
- **浏览器架构**：多进程架构，渲染进程的职责
- **渲染原理**：HTML 解析、CSS 解析、DOM 树构建、渲染树构建、布局、绘制
- **回流与重绘**：概念、触发条件、优化策略
- **同源策略**：概念，跨域解决方案
- **CORS**：跨域资源共享的原理与配置
- **浏览器存储**：localStorage、sessionStorage、cookie、indexedDB
- **Web API**：DOM、BOM、Fetch API、Event API 等

## 核心概念详解

### 1. JavaScript 基础

#### 变量与数据类型

**面试题**：var、let、const 的区别

**答案**：
- **var**：函数作用域，存在变量提升，可重复声明，可修改
- **let**：块级作用域，不存在变量提升，不可重复声明，可修改
- **const**：块级作用域，不存在变量提升，不可重复声明，不可修改（但对象的属性可以修改）

**代码示例**：
```javascript
// var 示例
console.log(a); // undefined（变量提升）
var a = 1;
var a = 2; // 重复声明，不会报错
console.log(a); // 2

// let 示例
// console.log(b); // 报错：Cannot access 'b' before initialization
let b = 1;
// let b = 2; // 报错：Identifier 'b' has already been declared
console.log(b); // 1

// const 示例
const c = 1;
// c = 2; // 报错：Assignment to constant variable
const obj = { name: '张三' };
obj.name = '李四'; // 可以修改对象属性
console.log(obj); // { name: '李四' }
```

#### 作用域与闭包

**面试题**：什么是闭包？闭包有什么应用场景？

**答案**：
- **闭包**：指有权访问另一个函数作用域中变量的函数
- **应用场景**：
  1. 数据私有化（如创建计数器）
  2. 模块化开发（如 IIFE）
  3. 函数柯里化
  4. 防抖与节流函数

**代码示例**：
```javascript
// 闭包示例：创建计数器
function createCounter() {
  let count = 0;
  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
console.log(counter.getCount()); // 1
```

#### this 关键字

**面试题**：this 的指向规则有哪些？

**答案**：
1. **默认绑定**：在非严格模式下，this 指向全局对象；在严格模式下，this 指向 undefined
2. **隐式绑定**：当函数作为对象的方法调用时，this 指向该对象
3. **显式绑定**：使用 call、apply、bind 方法，this 指向指定的对象
4. **new 绑定**：使用 new 关键字创建实例时，this 指向新创建的实例
5. **箭头函数**：箭头函数的 this 指向定义时的外层作用域的 this

**代码示例**：
```javascript
// 默认绑定
function foo() {
  console.log(this);
}
foo(); // 在浏览器中指向 window，在 Node.js 中指向 global

// 隐式绑定
const obj = {
  name: '张三',
  foo: function() {
    console.log(this.name);
  }
};
obj.foo(); // 张三

// 显式绑定
function bar() {
  console.log(this.name);
}
const obj1 = { name: '李四' };
const obj2 = { name: '王五' };
bar.call(obj1); // 李四
bar.apply(obj2); // 王五
const boundBar = bar.bind(obj1);
boundBar(); // 李四

// new 绑定
function Person(name) {
  this.name = name;
}
const person = new Person('赵六');
console.log(person.name); // 赵六

// 箭头函数
const obj3 = {
  name: '钱七',
  foo: function() {
    const bar = () => {
      console.log(this.name);
    };
    bar();
  }
};
obj3.foo(); // 钱七
```

#### 原型与原型链

**面试题**：什么是原型链？它是如何工作的？

**答案**：
- **原型**：每个函数都有一个 prototype 属性，指向一个对象，这个对象就是原型对象
- **原型链**：当访问一个对象的属性时，如果该对象没有这个属性，就会去它的原型对象中查找，如果原型对象也没有，就会去原型对象的原型对象中查找，直到找到 Object.prototype，如果还没有找到，就返回 undefined

**代码示例**：
```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function() {
  console.log(`Hello, ${this.name}!`);
};

const person = new Person('张三');
person.sayHello(); // Hello, 张三!
console.log(person.toString()); // [object Object]（继承自 Object.prototype）
```

#### 异步编程

**面试题**：请解释事件循环机制

**答案**：
- **事件循环**：JavaScript 是单线程的，通过事件循环机制实现异步操作
- **执行过程**：
  1. 同步任务直接在主线程执行
  2. 异步任务（如 setTimeout、Promise）放入任务队列
  3. 主线程执行完毕后，从任务队列取出任务执行
  4. 重复以上过程
- **任务队列**：
  - 宏任务（macrotask）：setTimeout、setInterval、I/O 操作等
  - 微任务（microtask）：Promise.then、async/await、process.nextTick 等
- **执行顺序**：主线程 → 微任务队列 → 宏任务队列

**代码示例**：
```javascript
console.log('1'); // 同步任务

setTimeout(() => {
  console.log('2'); // 宏任务
}, 0);

Promise.resolve().then(() => {
  console.log('3'); // 微任务
});

console.log('4'); // 同步任务

// 输出顺序：1 → 4 → 3 → 2
```

### 2. CSS 基础

#### 选择器与优先级

**面试题**：CSS 选择器的优先级是如何计算的？

**答案**：
- **优先级规则**：!important > 内联样式 > ID 选择器 > 类选择器/属性选择器/伪类选择器 > 标签选择器/伪元素选择器 > 通用选择器
- **计算方法**：
  1. 内联样式：1000
  2. ID 选择器：100
  3. 类选择器/属性选择器/伪类选择器：10
  4. 标签选择器/伪元素选择器：1
  5. 通用选择器：0
- **比较规则**：从高位到低位依次比较，数值大的优先级高

**代码示例**：
```css
/* 优先级：100 */
#header { color: red; }

/* 优先级：10 */
.title { color: blue; }

/* 优先级：1 */
h1 { color: green; }

/* 优先级：11 */
h1.title { color: yellow; }
```

#### Flexbox 布局

**面试题**：如何使用 Flexbox 实现水平居中与垂直居中？

**答案**：
```css
.container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 100vh;
}

.item {
  width: 100px;
  height: 100px;
  background-color: red;
}
```

#### Grid 布局

**面试题**：如何使用 Grid 布局创建一个 3x3 的网格？

**答案**：
```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 100px);
  gap: 10px;
}

.item {
  background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}
```

### 3. HTML 基础

#### 语义化标签

**面试题**：请解释 HTML 语义化的好处

**答案**：
- **有利于 SEO**：搜索引擎更容易理解页面结构
- **有利于无障碍访问**：屏幕阅读器更容易理解页面内容
- **代码可读性更好**：开发者更容易理解页面结构
- **未来兼容性更好**：符合 HTML 标准，未来浏览器支持更好

**代码示例**：
```html
<header>
  <nav>
    <ul>
      <li><a href="#">首页</a></li>
      <li><a href="#">关于我们</a></li>
      <li><a href="#">联系我们</a></li>
    </ul>
  </nav>
</header>
<main>
  <section>
    <h1>欢迎来到我们的网站</h1>
    <p>这是网站的主要内容</p>
  </section>
  <article>
    <h2>文章标题</h2>
    <p>文章内容</p>
  </article>
</main>
<footer>
  <p>版权所有 © 2024</p>
</footer>
```

### 4. 浏览器原理

#### 渲染原理

**面试题**：请描述浏览器渲染页面的过程

**答案**：
1. **HTML 解析**：浏览器解析 HTML 文档，生成 DOM 树
2. **CSS 解析**：浏览器解析 CSS 样式，生成 CSSOM 树
3. **渲染树构建**：将 DOM 树与 CSSOM 树结合，生成渲染树
4. **布局**：计算每个元素的位置和大小
5. **绘制**：将渲染树绘制到屏幕上

#### 回流与重绘

**面试题**：什么是回流与重绘？如何减少回流与重绘？

**答案**：
- **回流**：当元素的位置、大小、结构发生变化时，浏览器需要重新计算布局，这个过程称为回流
- **重绘**：当元素的样式发生变化，但位置和大小不变时，浏览器只需要重新绘制元素，这个过程称为重绘
- **减少回流与重绘的方法**：
  1. 避免频繁操作 DOM
  2. 使用文档片段（DocumentFragment）批量操作 DOM
  3. 避免频繁读取布局属性（如 offsetWidth、offsetHeight）
  4. 使用 CSS transform 代替位置属性
  5. 使用 will-change 属性提示浏览器

#### 同源策略与跨域

**面试题**：什么是同源策略？有哪些跨域解决方案？

**答案**：
- **同源策略**：指协议、域名、端口都相同的安全策略，不同源的脚本不能相互访问
- **跨域解决方案**：
  1. **CORS**：服务器设置 Access-Control-Allow-Origin 响应头
  2. **JSONP**：利用 script 标签的跨域特性
  3. **代理服务器**：使用代理服务器转发请求
  4. **WebSocket**：WebSocket 不受同源策略限制
  5. **postMessage**：HTML5 提供的跨域通信 API

## 实战练习

### 1. 实现一个防抖函数

**题目**：实现一个防抖函数，用于处理频繁触发的事件（如滚动、输入）

**答案**：
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
const handleScroll = debounce(() => {
  console.log('滚动事件触发');
}, 200);

window.addEventListener('scroll', handleScroll);
```

### 2. 实现一个节流函数

**题目**：实现一个节流函数，用于限制函数的执行频率

**答案**：
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
const handleResize = throttle(() => {
  console.log(' resize 事件触发');
}, 200);

window.addEventListener('resize', handleResize);
```

### 3. 实现深拷贝

**题目**：实现一个深拷贝函数，用于复制对象，包括嵌套对象

**答案**：
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

### 4. 实现 Promise.all

**题目**：实现一个 Promise.all 函数，用于并行执行多个 Promise

**答案**：
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

## 学习建议

### 1. 系统学习，构建知识体系
- **按模块学习**：分模块系统学习 JavaScript、CSS、HTML 和浏览器原理
- **理解概念**：不仅要知道怎么用，还要理解为什么这么用
- **建立联系**：理解各个知识点之间的联系，形成知识网络

### 2. 多做练习，巩固基础知识
- **编码练习**：多写代码，巩固基础知识
- **算法练习**：刷 LeetCode 等算法题，提高逻辑思维能力
- **项目练习**：做一些小型项目，将知识应用到实践中

### 3. 关注面试题，针对性准备
- **常见面试题**：整理常见面试题，理解答案的原理
- **模拟面试**：进行模拟面试，提高面试技巧
- **总结归纳**：总结面试中的问题，不断改进

### 4. 关注前沿技术，拓宽视野
- **ES6+ 特性**：学习 ES6+ 的新特性，提高代码质量
- **CSS 新特性**：学习 CSS 的新特性，如 Grid、Flexbox 等
- **浏览器新 API**：学习浏览器的新 API，如 Fetch、Web Worker 等

### 5. 培养良好的编码习惯
- **代码规范**：遵循代码规范，提高代码可读性
- **注释**：添加适当的注释，提高代码可维护性
- **测试**：编写测试用例，确保代码质量
- **性能优化**：关注代码性能，写出高效的代码

## 总结

基础考点是前端面试的重要组成部分，也是前端开发的基础。通过系统学习 JavaScript、CSS、HTML 和浏览器原理等核心知识点，掌握常见面试题的解答方法，多做练习，巩固基础知识，你将能够轻松应对面试中的基础考点，为高级考点的学习打下坚实基础。

记住，基础不牢，地动山摇。只有掌握了扎实的基础知识，才能在前端开发的道路上走得更远。祝你面试顺利！