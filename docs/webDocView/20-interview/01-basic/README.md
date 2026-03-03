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
- **变量与数据类型**：var、let、const 的区别，基本数据类型与引用数据类型，Symbol 和 BigInt
- **类型转换与比较**：隐式转换规则，== vs ===，类型检测方法（typeof、instanceof、Object.prototype.toString）
- **作用域与闭包**：全局作用域、函数作用域、块级作用域，闭包的概念与应用
- **this 关键字**：this 的指向规则，call、apply、bind 的使用
- **原型与原型链**：原型对象、原型链的概念，继承实现方式，类与继承（class 语法）
- **异步编程**：回调函数、Promise、async/await，事件循环机制，迭代器与生成器
- **ES6+ 特性**：箭头函数、解构赋值、模板字符串、Promise、async/await，函数参数（默认参数、剩余参数、展开运算符）
- **函数式编程**：纯函数、高阶函数、函数柯里化、组合函数
- **数组方法**：map、filter、reduce、forEach、find、some、every、flat、flatmap 等
- **对象方法**：Object.keys、Object.values、Object.entries、Object.assign、Object.freeze 等
- **正则表达式**：正则语法与匹配规则，常用正则表达式模式
- **模块化**：CommonJS vs ES Modules，import/export 语法
- **事件处理**：事件委托机制，事件冒泡与事件捕获，阻止事件传播与默认行为
- **错误处理**：try/catch、错误类型、自定义错误
- **内存管理**：内存泄漏的原因与解决方案，垃圾回收机制

### 2. CSS 基础
- **选择器与优先级**：各种选择器的使用，优先级计算规则
- **盒模型**：标准盒模型与 IE 盒模型，box-sizing 属性
- **布局技术**：Flexbox、Grid、浮动布局、定位布局，浮动与清除浮动
- **层叠与定位**：层叠上下文（Stacking Context），z-index 的工作原理，五种定位方式（static、relative、absolute、fixed、sticky）
- **响应式设计**：媒体查询、rem、em、vw/vh 单位，单位系统（px、rem、em、vw、vh、%、ch 等）
- **视觉效果**：颜色模型、渐变、阴影、圆角
- **动画与过渡**：transition、animation、transform
- **伪类与伪元素**：常用伪类（:hover、:active、:focus、:nth-child 等），常用伪元素（::before、::after、::first-letter 等）
- **CSS 变量**：自定义属性的使用
- **BEM 命名规范**：Block、Element、Modifier 命名方法
- **CSS 工程化**：CSS 预处理器（Sass/Less），CSS-in-JS，CSS Modules

### 3. HTML 基础
- **文档结构**：DOCTYPE 声明，HTML 文档结构
- **语义化标签**：header、nav、main、section、article 等
- **表单元素**：各种表单控件的使用，表单验证
- **元数据**：meta 标签的使用，SEO 基础
- **媒体元素**：图片优化（lazy loading、srcset、sizes），音频与视频标签
- **链接与导航**：锚点链接，邮件与电话链接
- **HTML5 新特性**：Canvas、SVG、本地存储、Web Worker 等
- **其他元素**：iframe 使用，data 属性，script 标签的 async 与 defer
- **无障碍访问**：ARIA 属性的使用，无障碍设计原则

### 4. 浏览器原理
- **浏览器架构**：多进程架构，渲染进程的职责
- **渲染原理**：HTML 解析、CSS 解析、DOM 树构建、渲染树构建、布局、绘制
- **回流与重绘**：概念、触发条件、优化策略
- **事件机制**：事件委托，事件冒泡与捕获
- **同源策略**：概念，跨域解决方案
- **CORS**：跨域资源共享的原理与配置
- **浏览器存储**：localStorage、sessionStorage、cookie、indexedDB
- **缓存机制**：强缓存与协商缓存，Service Worker
- **性能优化**：资源加载优化，关键渲染路径优化，懒加载与预加载
- **安全机制**：XSS 攻击与防御，CSRF 攻击与防御，CSP（内容安全策略）
- **网络相关**：HTTP/HTTPS 协议基础，HTTP 状态码，请求方法（GET、POST、PUT、DELETE 等）
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
- **原型链的终点**：Object.prototype.__proto__ 指向 null
- **继承实现方式**：
  1. 原型链继承
  2. 构造函数继承
  3. 组合继承
  4. 寄生组合继承
  5. class 继承

**代码示例**：
```javascript
// 原型与原型链
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function() {
  console.log(`Hello, ${this.name}!`);
};

const person = new Person('张三');
person.sayHello(); // Hello, 张三!
console.log(person.toString()); // [object Object]（继承自 Object.prototype）

// 原型链关系
console.log(person.__proto__ === Person.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__ === null); // true

// 原型链继承
function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function() {
  console.log(`${this.name} is eating`);
};

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

const dog = new Dog('旺财', '金毛');
dog.eat(); // 旺财 is eating
console.log(dog instanceof Dog); // true
console.log(dog instanceof Animal); // true

// 组合继承
function Parent(name) {
  this.name = name;
  this.colors = ['red', 'blue'];
}

Parent.prototype.sayName = function() {
  console.log(this.name);
};

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}

Child.prototype = new Parent();
Child.prototype.constructor = Child;
Child.prototype.sayAge = function() {
  console.log(this.age);
};

const child = new Child('小明', 10);
child.sayName(); // 小明
child.sayAge(); // 10
console.log(child.colors); // ['red', 'blue']

// 寄生组合继承（最佳实践）
function inheritPrototype(child, parent) {
  const prototype = Object.create(parent.prototype);
  prototype.constructor = child;
  child.prototype = prototype;
}

function Parent2(name) {
  this.name = name;
}

Parent2.prototype.sayName = function() {
  console.log(this.name);
};

function Child2(name, age) {
  Parent2.call(this, name);
  this.age = age;
}

inheritPrototype(Child2, Parent2);

Child2.prototype.sayAge = function() {
  console.log(this.age);
};

const child2 = new Child2('小红', 12);
child2.sayName(); // 小红
child2.sayAge(); // 12
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

#### 类与继承

**面试题**：ES6 的 class 语法与 ES5 的构造函数有什么区别？

**答案**：
- **class 语法**：ES6 引入的语法糖，本质还是基于原型
- **与构造函数的区别**：
  1. class 必须使用 new 调用，构造函数可以直接调用
  2. class 内部方法不可枚举，构造函数方法可枚举
  3. class 有严格模式，构造函数默认非严格模式
  4. class 继承更简洁，使用 extends 关键字
- **继承方式**：
  1. 原型链继承
  2. 构造函数继承
  3. 组合继承
  4. class 继承（extends）

**代码示例**：
```javascript
// ES5 构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sayHello = function() {
  console.log(`Hello, ${this.name}!`);
};

const person1 = new Person('张三', 30);
person1.sayHello(); // Hello, 张三!

// ES6 class
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    console.log(`Hello, ${this.name}!`);
  }

  static create(name, age) {
    return new Person(name, age);
  }

  get info() {
    return `${this.name} is ${this.age} years old`;
  }

  set info(value) {
    const [name, age] = value.split(' is ');
    this.name = name;
    this.age = parseInt(age);
  }
}

const person2 = new Person('李四', 25);
person2.sayHello(); // Hello, 李四!
console.log(person2.info); // 李四 is 25 years old
person2.info = '王五 is 28';
console.log(person2.name); // 王五

// 静态方法
const person3 = Person.create('赵六', 35);
console.log(person3.name); // 赵六

// ES5 继承
function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function() {
  console.log(`${this.name} is eating`);
};

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.bark = function() {
  console.log(`${this.name} is barking`);
};

const dog1 = new Dog('旺财', '金毛');
dog1.eat(); // 旺财 is eating
dog1.bark(); // 旺财 is barking

// ES6 class 继承
class Animal {
  constructor(name) {
    this.name = name;
  }

  eat() {
    console.log(`${this.name} is eating`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  bark() {
    console.log(`${this.name} is barking`);
  }

  eat() {
    super.eat();
    console.log(`${this.name} is eating dog food`);
  }
}

const dog2 = new Dog('小黑', '哈士奇');
dog2.eat(); // 小黑 is eating; 小黑 is eating dog food
dog2.bark(); // 小黑 is barking

// 方法重写
class Cat extends Animal {
  constructor(name, color) {
    super(name);
    this.color = color;
  }

  eat() {
    console.log(`${this.name} is eating fish`);
  }
}

const cat = new Cat('小白', '白色');
cat.eat(); // 小白 is eating fish
```

#### 迭代器与生成器

**面试题**：什么是迭代器和生成器？它们有什么区别？

**答案**：
- **迭代器（Iterator）**：一种接口，为各种不同的数据结构提供统一的访问机制
- **生成器（Generator）**：一种特殊的函数，可以暂停执行并在需要时恢复执行
- **区别**：
  - 迭代器是对象，生成器是函数
  - 生成器返回迭代器对象
  - 生成器使用 `function*` 和 `yield` 关键字

**代码示例**：
```javascript
// 迭代器示例
const arr = [1, 2, 3];
const iterator = arr[Symbol.iterator]();
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }

// 生成器示例
function* fibonacci() {
  let [prev, curr] = [0, 1];
  while (true) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

const gen = fibonacci();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3
console.log(gen.next().value); // 5
```

#### 类型转换与比较

**面试题**：== 和 === 有什么区别？隐式转换的规则是什么？

**答案**：
- **==（宽松相等）**：比较值时会进行类型转换
- **===（严格相等）**：比较值和类型，不进行类型转换
- **隐式转换规则**：
  1. 对象转原始类型：先调用 valueOf，再调用 toString
  2. 字符串转数字：使用 Number() 转换
  3. 布尔值转数字：true → 1，false → 0
  4. null 和 undefined：null == undefined 为 true，其他为 false

**代码示例**：
```javascript
// == vs ===
console.log(1 == '1'); // true（类型转换）
console.log(1 === '1'); // false（类型不同）
console.log(null == undefined); // true
console.log(null === undefined); // false
console.log([] == false); // true
console.log([] === false); // false

// 类型检测
console.log(typeof 123); // number
console.log(typeof 'hello'); // string
console.log(typeof true); // boolean
console.log(typeof undefined); // undefined
console.log(typeof null); // object（历史遗留问题）
console.log(typeof []); // object
console.log(typeof {}); // object
console.log(typeof function() {}); // function

// instanceof
console.log([] instanceof Array); // true
console.log({} instanceof Object); // true
console.log(function() {} instanceof Function); // true

// Object.prototype.toString
console.log(Object.prototype.toString.call([])); // [object Array]
console.log(Object.prototype.toString.call({})); // [object Object]
console.log(Object.prototype.toString.call(null)); // [object Null]
console.log(Object.prototype.toString.call(undefined)); // [object Undefined]
```

#### ES6+ 特性

**面试题**：请列举 ES6+ 的重要特性并举例说明

**答案**：
- **箭头函数**：更简洁的函数语法，this 指向定义时的外层作用域
- **解构赋值**：从数组或对象中提取值
- **模板字符串**：使用反引号创建字符串，支持插值
- **默认参数**：函数参数的默认值
- **剩余参数**：使用 ... 收集剩余参数
- **展开运算符**：使用 ... 展开数组或对象

**代码示例**：
```javascript
// 箭头函数
const add = (a, b) => a + b;
const square = x => x * x;
const greet = name => `Hello, ${name}!`;

// 解构赋值
const arr = [1, 2, 3];
const [first, second, third] = arr;
console.log(first, second, third); // 1 2 3

const obj = { name: '张三', age: 30 };
const { name, age } = obj;
console.log(name, age); // 张三 30

// 模板字符串
const name = '李四';
const age = 25;
const message = `我叫${name}，今年${age}岁`;
console.log(message); // 我叫李四，今年25岁

// 默认参数
function greet(name = '世界') {
  console.log(`Hello, ${name}!`);
}
greet(); // Hello, 世界!
greet('张三'); // Hello, 张三!

// 剩余参数
function sum(...args) {
  return args.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3, 4, 5)); // 15

// 展开运算符
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];
console.log(arr2); // [1, 2, 3, 4, 5]

const obj1 = { name: '张三', age: 30 };
const obj2 = { ...obj1, city: '北京' };
console.log(obj2); // { name: '张三', age: 30, city: '北京' }
```

#### 函数式编程

**面试题**：什么是纯函数？什么是高阶函数？

**答案**：
- **纯函数**：相同的输入永远得到相同的输出，且不产生副作用
- **高阶函数**：接收函数作为参数或返回函数的函数
- **函数柯里化**：将多参数函数转换为单参数函数的序列
- **组合函数**：将多个函数组合成一个新函数

**代码示例**：
```javascript
// 纯函数
function add(a, b) {
  return a + b;
}
console.log(add(1, 2)); // 3
console.log(add(1, 2)); // 3（相同输入，相同输出）

// 非纯函数
let count = 0;
function increment() {
  count++;
  return count;
}
console.log(increment()); // 1
console.log(increment()); // 2（相同输入，不同输出）

// 高阶函数
function map(arr, fn) {
  return arr.map(fn);
}
const doubled = map([1, 2, 3], x => x * 2);
console.log(doubled); // [2, 4, 6]

// 函数柯里化
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...moreArgs) {
        return curried.apply(this, args.concat(moreArgs));
      };
    }
  };
}

function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6

// 组合函数
function compose(...fns) {
  return function(x) {
    return fns.reduceRight((acc, fn) => fn(acc), x);
  };
}

const toUpperCase = str => str.toUpperCase();
const reverse = str => str.split('').reverse().join('');
const shout = compose(toUpperCase, reverse);

console.log(shout('hello')); // OLLEH
```

#### 数组方法

**面试题**：请解释 map、filter、reduce 的区别并举例

**答案**：
- **map**：对数组每个元素执行函数，返回新数组
- **filter**：过滤数组元素，返回符合条件的元素组成的新数组
- **reduce**：对数组元素进行累积计算，返回一个值
- **forEach**：遍历数组，不返回值
- **find**：返回第一个符合条件的元素
- **some**：判断是否有元素满足条件
- **every**：判断是否所有元素都满足条件
- **flat**：将嵌套数组展平
- **flatMap**：先 map 后 flat

**代码示例**：
```javascript
const numbers = [1, 2, 3, 4, 5];

// map
const doubled = numbers.map(x => x * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter
const evens = numbers.filter(x => x % 2 === 0);
console.log(evens); // [2, 4]

// reduce
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 15

// forEach
numbers.forEach(x => console.log(x)); // 1 2 3 4 5

// find
const found = numbers.find(x => x > 3);
console.log(found); // 4

// some
const hasEven = numbers.some(x => x % 2 === 0);
console.log(hasEven); // true

// every
const allPositive = numbers.every(x => x > 0);
console.log(allPositive); // true

// flat
const nested = [1, [2, [3, [4]]]];
const flattened = nested.flat(Infinity);
console.log(flattened); // [1, 2, 3, 4]

// flatMap
const words = ['hello world', 'foo bar'];
const result = words.flatMap(str => str.split(' '));
console.log(result); // ['hello', 'world', 'foo', 'bar']
```

#### 对象方法

**面试题**：请列举常用的 Object 方法并说明其用途

**答案**：
- **Object.keys**：返回对象所有可枚举属性的键名数组
- **Object.values**：返回对象所有可枚举属性的值数组
- **Object.entries**：返回对象所有可枚举属性的键值对数组
- **Object.assign**：将源对象的可枚举属性复制到目标对象
- **Object.freeze**：冻结对象，防止修改
- **Object.seal**：密封对象，防止添加或删除属性
- **Object.create**：创建一个新对象，使用现有对象作为原型

**代码示例**：
```javascript
const obj = {
  name: '张三',
  age: 30,
  city: '北京'
};

// Object.keys
const keys = Object.keys(obj);
console.log(keys); // ['name', 'age', 'city']

// Object.values
const values = Object.values(obj);
console.log(values); // ['张三', 30, '北京']

// Object.entries
const entries = Object.entries(obj);
console.log(entries); // [['name', '张三'], ['age', 30], ['city', '北京']]

// Object.assign
const target = { a: 1 };
const source = { b: 2, c: 3 };
Object.assign(target, source);
console.log(target); // { a: 1, b: 2, c: 3 }

// Object.freeze
const frozen = { name: '李四' };
Object.freeze(frozen);
frozen.name = '王五';
console.log(frozen.name); // 李四（无法修改）

// Object.seal
const sealed = { name: '赵六' };
Object.seal(sealed);
sealed.name = '钱七';
delete sealed.name;
console.log(sealed.name); // 钱七（可以修改，但不能删除）

// Object.create
const person = {
  greet: function() {
    console.log(`Hello, ${this.name}!`);
  }
};

const student = Object.create(person);
student.name = '孙八';
student.greet(); // Hello, 孙八!
```

#### 正则表达式

**面试题**：请解释正则表达式的基本语法和常用模式

**答案**：
- **基本语法**：
  - `.`：匹配任意字符（除换行符）
  - `*`：匹配前一个字符 0 次或多次
  - `+`：匹配前一个字符 1 次或多次
  - `?`：匹配前一个字符 0 次或 1 次
  - `^`：匹配字符串开头
  - `$`：匹配字符串结尾
  - `[]`：字符集
  - `()`：分组
  - `|`：或
- **常用模式**：
  - `\d`：数字
  - `\w`：单词字符
  - `\s`：空白字符
  - `{n}`：匹配 n 次
  - `{n,m}`：匹配 n 到 m 次

**代码示例**：
```javascript
// 基本匹配
const str = 'hello world';
console.log(/hello/.test(str)); // true
console.log(/world/.test(str)); // true

// 量词
console.log(/a*/.test('')); // true（0次）
console.log(/a+/.test('a')); // true（1次）
console.log(/a+/.test('aa')); // true（多次）
console.log(/a?/.test('b')); // true（0次）

// 字符集
console.log(/[abc]/.test('a')); // true
console.log(/[0-9]/.test('5')); // true
console.log(/[^0-9]/.test('a')); // true（非数字）

// 常用模式
console.log(/\d/.test('123')); // true（数字）
console.log(/\w/.test('abc')); // true（单词字符）
console.log(/\s/.test(' ')); // true（空白字符）

// 常用正则表达式
// 邮箱验证
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
console.log(emailRegex.test('test@example.com')); // true

// 手机号验证（中国大陆）
const phoneRegex = /^1[3-9]\d{9}$/;
console.log(phoneRegex.test('13800138000')); // true

// 身份证号验证（中国大陆）
const idCardRegex = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/;
console.log(idCardRegex.test('11010519900307234X')); // true

// URL 验证
const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
console.log(urlRegex.test('https://www.example.com')); // true

// 替换
const text = 'Hello 123 World 456';
const result = text.replace(/\d+/g, 'NUM');
console.log(result); // Hello NUM World NUM
```

#### 模块化

**面试题**：CommonJS 和 ES Modules 有什么区别？

**答案**：
- **CommonJS**：Node.js 使用的模块系统，运行时加载，同步加载
- **ES Modules**：ES6 标准的模块系统，编译时加载，支持静态分析
- **区别**：
  1. CommonJS 使用 `require` 和 `module.exports`
  2. ES Modules 使用 `import` 和 `export`
  3. CommonJS 是动态加载，ES Modules 是静态加载
  4. ES Modules 支持 Tree Shaking，CommonJS 不支持

**代码示例**：
```javascript
// CommonJS
// math.js
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
module.exports = { add, subtract };

// main.js
const math = require('./math');
console.log(math.add(1, 2)); // 3
console.log(math.subtract(5, 3)); // 2

// ES Modules
// math.js
export function add(a, b) {
  return a + b;
}
export function subtract(a, b) {
  return a - b;
}

// main.js
import { add, subtract } from './math.js';
console.log(add(1, 2)); // 3
console.log(subtract(5, 3)); // 2

// 默认导出
// utils.js
export default function greet(name) {
  console.log(`Hello, ${name}!`);
}

// main.js
import greet from './utils.js';
greet('张三'); // Hello, 张三!

// 混合导出
// index.js
export { add, subtract } from './math.js';
export { default as greet } from './utils.js';

// 动态导入
async function loadModule() {
  const module = await import('./math.js');
  console.log(module.add(1, 2)); // 3
}
```

#### 事件处理

**面试题**：什么是事件委托？事件冒泡和事件捕获有什么区别？

**答案**：
- **事件委托**：利用事件冒泡机制，将事件处理器绑定到父元素上
- **事件冒泡**：事件从最具体的元素开始，向上传播到不具体的元素
- **事件捕获**：事件从不具体的元素开始，向下传播到最具体的元素
- **阻止事件传播**：`event.stopPropagation()` 阻止事件冒泡/捕获
- **阻止默认行为**：`event.preventDefault()` 阻止元素的默认行为

**代码示例**：
```javascript
// 事件委托
<ul id="list">
  <li>项目 1</li>
  <li>项目 2</li>
  <li>项目 3</li>
</ul>

<script>
const list = document.getElementById('list');
list.addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    console.log('点击了:', event.target.textContent);
  }
});
</script>

// 事件冒泡 vs 事件捕获
<div id="outer">
  <div id="middle">
    <div id="inner">点击我</div>
  </div>
</div>

<script>
const outer = document.getElementById('outer');
const middle = document.getElementById('middle');
const inner = document.getElementById('inner');

// 事件冒泡（默认）
outer.addEventListener('click', () => console.log('Outer'));
middle.addEventListener('click', () => console.log('Middle'));
inner.addEventListener('click', () => console.log('Inner'));

// 点击 inner，输出：Inner → Middle → Outer

// 事件捕获
outer.addEventListener('click', () => console.log('Outer (capture)'), true);
middle.addEventListener('click', () => console.log('Middle (capture)'), true);
inner.addEventListener('click', () => console.log('Inner (capture)'), true);

// 点击 inner，输出：Outer (capture) → Middle (capture) → Inner (capture)

// 阻止事件传播
inner.addEventListener('click', (event) => {
  event.stopPropagation();
  console.log('Inner (stopped)');
});

// 阻止默认行为
const link = document.querySelector('a');
link.addEventListener('click', (event) => {
  event.preventDefault();
  console.log('链接点击被阻止');
});
</script>
```

#### 错误处理

**面试题**：JavaScript 中有哪些错误类型？如何进行错误处理？

**答案**：
- **错误类型**：
  1. `Error`：基础错误类型
  2. `SyntaxError`：语法错误
  3. `TypeError`：类型错误
  4. `ReferenceError`：引用错误
  5. `RangeError`：范围错误
  6. `URIError`：URI 错误
  7. `EvalError`：eval 错误
- **错误处理**：
  1. `try/catch/finally`：捕获和处理错误
  2. `throw`：抛出错误
  3. 自定义错误：继承 Error 类

**代码示例**：
```javascript
// try/catch/finally
try {
  const result = someUndefinedFunction();
} catch (error) {
  console.error('捕获到错误:', error.message);
} finally {
  console.log('finally 块总是执行');
}

// 输出：
// 捕获到错误: someUndefinedFunction is not defined
// finally 块总是执行

// throw
function divide(a, b) {
  if (b === 0) {
    throw new Error('除数不能为零');
  }
  return a / b;
}

try {
  console.log(divide(10, 2)); // 5
  console.log(divide(10, 0)); // 抛出错误
} catch (error) {
  console.error(error.message); // 除数不能为零
}

// 自定义错误
class CustomError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'CustomError';
    this.code = code;
  }
}

function validateAge(age) {
  if (age < 0) {
    throw new CustomError('年龄不能为负数', 'INVALID_AGE');
  }
  if (age > 150) {
    throw new CustomError('年龄不能超过150', 'INVALID_AGE');
  }
  return true;
}

try {
  validateAge(-1);
} catch (error) {
  if (error instanceof CustomError) {
    console.error(`错误代码: ${error.code}, 错误信息: ${error.message}`);
  }
}

// 错误类型示例
console.log(new Error('普通错误'));
console.log(new SyntaxError('语法错误'));
console.log(new TypeError('类型错误'));
console.log(new ReferenceError('引用错误'));
console.log(new RangeError('范围错误'));

// Promise 错误处理
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('Promise 失败'));
  }, 1000);
});

promise
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error('Promise 错误:', error.message);
  });

// async/await 错误处理
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('获取数据失败:', error.message);
    throw error;
  }
}
```

#### 内存管理

**面试题**：什么是内存泄漏？常见的内存泄漏场景有哪些？如何避免？

**答案**：
- **内存泄漏**：程序中已动态分配的堆内存由于某种原因程序未释放或无法释放
- **垃圾回收机制**：
  1. **引用计数**：记录对象被引用的次数，为 0 时回收
  2. **标记清除**：从根对象开始标记可达对象，未标记的回收
- **常见内存泄漏场景**：
  1. 全局变量
  2. 未清除的定时器
  3. 未移除的事件监听器
  4. 闭包
  5. DOM 引用
- **避免方法**：
  1. 避免使用全局变量
  2. 及时清除定时器
  3. 及时移除事件监听器
  4. 注意闭包的使用
  5. 及时释放 DOM 引用

**代码示例**：
```javascript
// 1. 全局变量导致的内存泄漏
var globalVar = { data: '大量数据' };

// 解决：使用局部变量或及时释放
function processData() {
  const localVar = { data: '大量数据' };
  return localVar.data;
}

// 2. 未清除的定时器导致的内存泄漏
setInterval(() => {
  console.log('定时任务');
}, 1000);

// 解决：保存定时器 ID 并及时清除
const timerId = setInterval(() => {
  console.log('定时任务');
}, 1000);
clearInterval(timerId);

// 3. 未移除的事件监听器导致的内存泄漏
const button = document.getElementById('button');
button.addEventListener('click', function() {
  console.log('点击事件');
});

// 解决：及时移除事件监听器
const button = document.getElementById('button');
const handleClick = function() {
  console.log('点击事件');
};
button.addEventListener('click', handleClick);
button.removeEventListener('click', handleClick);

// 4. 闭包导致的内存泄漏
function createClosure() {
  const largeData = new Array(1000000).fill('data');
  return function() {
    console.log('闭包函数');
  };
}
const closure = createClosure();

// 解决：避免在闭包中保留大量数据
function createClosure() {
  return function() {
    console.log('闭包函数');
  };
}
const closure = createClosure();

// 5. DOM 引用导致的内存泄漏
const element = document.getElementById('element');
const elementRef = element;
document.body.removeChild(element);

// 解决：及时释放 DOM 引用
const element = document.getElementById('element');
document.body.removeChild(element);
elementRef = null;

// 使用 WeakMap 和 WeakSet 避免内存泄漏
const weakMap = new WeakMap();
const obj = { name: '张三' };
weakMap.set(obj, '数据');
obj = null;
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

#### 盒模型

**面试题**：标准盒模型和 IE 盒模型有什么区别？box-sizing 属性有什么作用？

**答案**：
- **标准盒模型（content-box）**：width 只包含内容宽度，不包含 padding 和 border
- **IE 盒模型（border-box）**：width 包含内容、padding 和 border 的总宽度
- **box-sizing 属性**：
  - `content-box`：标准盒模型（默认值）
  - `border-box`：IE 盒模型
  - `padding-box`：width 包含内容和 padding（已废弃）
- **推荐使用**：border-box，因为更符合直觉

**代码示例**：
```css
/* 标准盒模型 */
.box1 {
  box-sizing: content-box;
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  /* 实际宽度 = 200 + 20*2 + 5*2 = 250px */
}

/* IE 盒模型 */
.box2 {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  /* 实际宽度 = 200px（包含 padding 和 border） */
  /* 内容宽度 = 200 - 20*2 - 5*2 = 150px */
}

/* 全局使用 border-box */
* {
  box-sizing: border-box;
}
```

#### 浮动布局

**面试题**：什么是浮动？如何清除浮动？

**答案**：
- **浮动**：让元素脱离文档流，向左或向右移动，直到碰到父元素边缘或其他浮动元素
- **浮动特性**：
  1. 脱离文档流
  2. 块级元素会并排显示
  3. 文字会环绕浮动元素
- **清除浮动方法**：
  1. 使用 clear 属性
  2. 使用伪元素清除浮动（推荐）
  3. 使用 overflow: hidden
  4. 使用 BFC

**代码示例**：
```css
/* 浮动布局 */
.container {
  width: 100%;
}

.left {
  float: left;
  width: 200px;
  height: 100px;
  background-color: red;
}

.right {
  float: right;
  width: 200px;
  height: 100px;
  background-color: blue;
}

/* 清除浮动方法1：使用 clear 属性 */
.clearfix {
  clear: both;
}

/* 清除浮动方法2：使用伪元素（推荐） */
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}

/* 清除浮动方法3：使用 overflow */
.container {
  overflow: hidden;
}

/* 清除浮动方法4：使用 BFC */
.container {
  display: flow-root;
}
```

#### 定位布局

**面试题**：CSS 有哪五种定位方式？它们有什么区别？

**答案**：
- **static（默认定位）**：元素按照正常文档流排列，top、right、bottom、left 属性无效
- **relative（相对定位）**：相对于元素自身原始位置进行偏移，不脱离文档流
- **absolute（绝对定位）**：相对于最近的已定位祖先元素进行定位，脱离文档流
- **fixed（固定定位）**：相对于浏览器窗口进行定位，脱离文档流，滚动时固定不动
- **sticky（粘性定位）**：基于用户的滚动位置在 relative 和 fixed 之间切换

**代码示例**：
```css
/* static（默认） */
.box1 {
  position: static;
  /* top、right、bottom、left 无效 */
}

/* relative（相对定位） */
.box2 {
  position: relative;
  left: 20px;
  top: 10px;
  /* 相对于原始位置向右偏移20px，向下偏移10px */
}

/* absolute（绝对定位） */
.parent {
  position: relative;
}

.child {
  position: absolute;
  top: 0;
  left: 0;
  /* 相对于 parent 定位在左上角 */
}

/* fixed（固定定位） */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  /* 固定在页面顶部 */
}

/* sticky（粘性定位） */
.nav {
  position: sticky;
  top: 0;
  /* 滚动到顶部时固定 */
}
```

#### 层叠上下文与 z-index

**面试题**：什么是层叠上下文？z-index 是如何工作的？

**答案**：
- **层叠上下文（Stacking Context）**：HTML 元素的一个三维概念，表示元素在 z 轴上的位置
- **触发层叠上下文的条件**：
  1. 根元素（html）
  2. position: absolute/relative/fixed 且 z-index 不为 auto
  3. position: sticky 且 z-index 不为 auto
  4. flex/grid 容器的子元素且 z-index 不为 auto
  5. opacity 小于 1
  6. transform 不为 none
  7. filter 不为 none
  8. isolation: isolate
  9. mix-blend-mode 不为 normal
- **z-index 工作原理**：
  1. 只在同一个层叠上下文中比较
  2. 数值越大，层级越高
  3. 不同层叠上下文中的元素，父元素的 z-index 决定子元素的层级

**代码示例**：
```css
/* 层叠上下文示例 */
.parent1 {
  position: relative;
  z-index: 1;
}

.child1 {
  position: absolute;
  z-index: 100;
  /* 即使 z-index 很大，但父元素的 z-index 小，所以层级低 */
}

.parent2 {
  position: relative;
  z-index: 2;
}

.child2 {
  position: absolute;
  z-index: 10;
  /* 父元素的 z-index 大，所以层级高 */
}

/* 触发层叠上下文 */
.box1 {
  position: relative;
  z-index: 1;
}

.box2 {
  opacity: 0.9;
}

.box3 {
  transform: translateZ(0);
}

.box4 {
  filter: blur(5px);
}

.box5 {
  isolation: isolate;
}
```

#### 响应式设计

**面试题**：如何实现响应式设计？常用的 CSS 单位有哪些？

**答案**：
- **响应式设计**：根据不同设备屏幕尺寸自动调整页面布局
- **实现方式**：
  1. 媒体查询（Media Query）
  2. 弹性布局（Flexbox/Grid）
  3. 相对单位（rem、em、vw、vh）
- **CSS 单位**：
  - **绝对单位**：px、pt、cm、mm、in
  - **相对单位**：em、rem、vw、vh、vmin、vmax、%、ch
  - **em**：相对于父元素的 font-size
  - **rem**：相对于根元素（html）的 font-size
  - **vw**：视口宽度的 1%
  - **vh**：视口高度的 1%
  - **vmin**：vw 和 vh 中较小的一个
  - **vmax**：vw 和 vh 中较大的一个
  - **%**：相对于父元素
  - **ch**：相对于字符 "0" 的宽度

**代码示例**：
```css
/* 媒体查询 */
.container {
  width: 100%;
  padding: 20px;
}

@media (max-width: 768px) {
  .container {
    padding: 10px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .container {
    padding: 15px;
  }
}

@media (min-width: 1025px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
}

/* rem 单位 */
html {
  font-size: 16px;
}

.title {
  font-size: 2rem;
  /* 2 * 16 = 32px */
}

/* em 单位 */
.parent {
  font-size: 20px;
}

.child {
  font-size: 1.5em;
  /* 1.5 * 20 = 30px */
}

/* vw/vh 单位 */
.full-screen {
  width: 100vw;
  height: 100vh;
}

.half-screen {
  width: 50vw;
  height: 50vh;
}

/* 响应式字体 */
html {
  font-size: 16px;
}

@media (max-width: 768px) {
  html {
    font-size: 14px;
  }
}

.title {
  font-size: 2rem;
  /* 桌面端：32px，移动端：28px */
}
```

#### 视觉效果

**面试题**：如何实现渐变、阴影和圆角效果？

**答案**：
- **渐变**：
  - `linear-gradient`：线性渐变
  - `radial-gradient`：径向渐变
  - `conic-gradient`：锥形渐变
- **阴影**：
  - `box-shadow`：盒子阴影
  - `text-shadow`：文字阴影
  - `drop-shadow`：滤镜阴影
- **圆角**：
  - `border-radius`：设置圆角
- **颜色模型**：
  - HEX：#RRGGBB
  - RGB：rgb(r, g, b)
  - RGBA：rgba(r, g, b, a)
  - HSL：hsl(h, s%, l%)
  - HSLA：hsla(h, s%, l%, a)

**代码示例**：
```css
/* 线性渐变 */
.gradient1 {
  background: linear-gradient(to right, red, blue);
}

.gradient2 {
  background: linear-gradient(45deg, red, yellow, green);
}

.gradient3 {
  background: linear-gradient(to bottom, rgba(255,0,0,0), rgba(255,0,0,1));
}

/* 径向渐变 */
.radial1 {
  background: radial-gradient(circle, red, blue);
}

.radial2 {
  background: radial-gradient(circle at center, red, yellow, green);
}

/* 锥形渐变 */
.conic {
  background: conic-gradient(red, yellow, green, blue, red);
}

/* 盒子阴影 */
.box-shadow1 {
  box-shadow: 10px 10px 5px #888888;
}

.box-shadow2 {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.box-shadow3 {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 0, 0, 0.3);
}

/* 文字阴影 */
.text-shadow1 {
  text-shadow: 2px 2px 4px #000000;
}

.text-shadow2 {
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}

/* 圆角 */
.border-radius1 {
  border-radius: 10px;
}

.border-radius2 {
  border-radius: 50%;
}

.border-radius3 {
  border-radius: 10px 20px 30px 40px;
}

.border-radius4 {
  border-top-left-radius: 10px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 40px;
}

/* 颜色模型 */
.color1 {
  color: #FF0000;
}

.color2 {
  color: rgb(255, 0, 0);
}

.color3 {
  color: rgba(255, 0, 0, 0.5);
}

.color4 {
  color: hsl(0, 100%, 50%);
}

.color5 {
  color: hsla(0, 100%, 50%, 0.5);
}
```

#### 动画与过渡

**面试题**：transition 和 animation 有什么区别？如何使用？

**答案**：
- **transition（过渡）**：
  - 用于简单的状态变化
  - 需要触发条件（如 hover）
  - 只能从开始到结束
- **animation（动画）**：
  - 用于复杂的动画效果
  - 可以自动播放
  - 可以设置多个关键帧
- **transform（变换）**：
  - 用于元素的 2D/3D 变换
  - 不影响文档流
  - 性能更好

**代码示例**：
```css
/* transition 过渡 */
.box {
  width: 100px;
  height: 100px;
  background-color: red;
  transition: all 0.3s ease;
}

.box:hover {
  width: 200px;
  height: 200px;
  background-color: blue;
}

/* 多个属性过渡 */
.box2 {
  width: 100px;
  height: 100px;
  background-color: red;
  transition: width 0.3s ease, height 0.3s ease, background-color 0.5s ease;
}

/* animation 动画 */
@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

.box3 {
  animation: slideIn 1s ease-in-out;
}

/* 多个关键帧 */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.box4 {
  animation: bounce 1s ease-in-out infinite;
}

/* animation 完整语法 */
.box5 {
  animation: name duration timing-function delay iteration-count direction fill-mode;
}

.box6 {
  animation: slideIn 1s ease-in-out 0.5s 3 alternate forwards;
}

/* transform 变换 */
.transform1 {
  transform: translate(10px, 20px);
}

.transform2 {
  transform: rotate(45deg);
}

.transform3 {
  transform: scale(1.5);
}

.transform4 {
  transform: skew(10deg, 20deg);
}

.transform5 {
  transform: translate(10px, 20px) rotate(45deg) scale(1.5);
}

/* 3D 变换 */
.transform6 {
  transform: rotateX(45deg);
}

.transform7 {
  transform: rotateY(45deg);
}

.transform8 {
  transform: rotateZ(45deg);
}

.transform9 {
  transform: perspective(500px) rotateX(45deg);
}
```

#### 伪类与伪元素

**面试题**：伪类和伪元素有什么区别？常用的伪类和伪元素有哪些？

**答案**：
- **伪类**：用于选择处于特定状态的元素，使用单冒号 `:`
- **伪元素**：用于创建不在文档树中的元素，使用双冒号 `::`
- **常用伪类**：
  - `:hover`：鼠标悬停
  - `:active`：鼠标按下
  - `:focus`：获得焦点
  - `:visited`：已访问的链接
  - `:link`：未访问的链接
  - `:first-child`：第一个子元素
  - `:last-child`：最后一个子元素
  - `:nth-child(n)`：第 n 个子元素
  - `:nth-of-type(n)`：同类型第 n 个子元素
  - `:not(selector)`：不匹配选择器的元素
  - `:checked`：被选中的复选框/单选框
  - `:disabled`：禁用的元素
  - `:enabled`：启用的元素
- **常用伪元素**：
  - `::before`：元素之前插入内容
  - `::after`：元素之后插入内容
  - `::first-letter`：第一个字母
  - `::first-line`：第一行文本
  - `::selection`：被选中的文本

**代码示例**：
```css
/* 伪类示例 */
a:hover {
  color: red;
}

a:active {
  color: blue;
}

input:focus {
  border-color: blue;
  outline: none;
}

a:visited {
  color: purple;
}

a:link {
  color: blue;
}

li:first-child {
  color: red;
}

li:last-child {
  color: blue;
}

li:nth-child(odd) {
  background-color: #f0f0f0;
}

li:nth-child(even) {
  background-color: #e0e0e0;
}

li:nth-child(3n) {
  color: red;
}

input:not([type="checkbox"]) {
  border: 1px solid #ccc;
}

input:checked + label {
  color: red;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 伪元素示例 */
.box::before {
  content: "前缀：";
  color: red;
}

.box::after {
  content: "后缀";
  color: blue;
}

p::first-letter {
  font-size: 2em;
  color: red;
}

p::first-line {
  color: blue;
}

::selection {
  background-color: yellow;
  color: black;
}

/* 清除浮动 */
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}

/* 三角形 */
.triangle {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid red;
}
```

#### CSS 变量

**面试题**：如何使用 CSS 变量？CSS 变量有什么优势？

**答案**：
- **CSS 变量**：自定义属性，可以在整个文档中重复使用
- **定义方式**：`--variable-name: value;`
- **使用方式**：`var(--variable-name, default-value);`
- **优势**：
  1. 提高代码复用性
  2. 便于维护和修改
  3. 支持动态修改
  4. 支持继承
- **作用域**：
  1. 全局变量：定义在 `:root` 或 `html` 上
  2. 局部变量：定义在特定元素上

**代码示例**：
```css
/* 定义全局变量 */
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --success-color: #28a745;
  --danger-color: #dc3545;
  --font-size-base: 16px;
  --border-radius: 4px;
  --box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 使用变量 */
.button {
  background-color: var(--primary-color);
  color: white;
  font-size: var(--font-size-base);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
}

.button-secondary {
  background-color: var(--secondary-color);
}

/* 变量默认值 */
.box {
  color: var(--text-color, black);
}

/* 局部变量 */
.card {
  --card-bg: #ffffff;
  --card-border: #e0e0e0;
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
}

/* 变量继承 */
.parent {
  --parent-color: red;
}

.child {
  color: var(--parent-color);
}

/* 动态修改变量 */
@media (prefers-color-scheme: dark) {
  :root {
    --primary-color: #0d6efd;
    --secondary-color: #6c757d;
    --background-color: #212529;
    --text-color: #f8f9fa;
  }
}

/* JavaScript 修改 CSS 变量 */
/* document.documentElement.style.setProperty('--primary-color', '#ff0000'); */
```

#### BEM 命名规范

**面试题**：什么是 BEM 命名规范？如何使用？

**答案**：
- **BEM**：Block、Element、Modifier 的缩写
- **Block（块）**：独立的实体，可复用
- **Element（元素）**：块的组成部分，不能独立存在
- **Modifier（修饰符）**：改变块或元素的外观或行为
- **命名规则**：
  - Block：`.block-name`
  - Element：`.block-name__element-name`
  - Modifier：`.block-name--modifier-name` 或 `.block-name__element-name--modifier-name`
- **优势**：
  1. 代码结构清晰
  2. 避免命名冲突
  3. 提高代码可维护性
  4. 便于团队协作

**代码示例**：
```css
/* Block */
.card {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Element */
.card__title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.card__content {
  font-size: 14px;
  line-height: 1.5;
}

.card__footer {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

/* Modifier */
.card--primary {
  border-color: #007bff;
  background-color: #f0f8ff;
}

.card--success {
  border-color: #28a745;
  background-color: #f0fff4;
}

.card__title--large {
  font-size: 24px;
}

.card__content--highlight {
  background-color: #fff3cd;
}

/* HTML 示例 */
<div class="card card--primary">
  <h2 class="card__title card__title--large">标题</h2>
  <p class="card__content card__content--highlight">内容</p>
  <div class="card__footer">页脚</div>
</div>

/* 更多示例 */
.button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button--primary {
  background-color: #007bff;
  color: white;
}

.button--secondary {
  background-color: #6c757d;
  color: white;
}

.button--large {
  padding: 15px 30px;
  font-size: 18px;
}

.button--small {
  padding: 5px 10px;
  font-size: 12px;
}

.menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu__item {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.menu__item--active {
  background-color: #007bff;
  color: white;
}

.menu__link {
  text-decoration: none;
  color: inherit;
}
```

#### CSS 工程化

**面试题**：什么是 CSS 预处理器？CSS-in-JS 和 CSS Modules 有什么区别？

**答案**：
- **CSS 预处理器**：
  - Sass/SCSS、Less、Stylus
  - 支持变量、嵌套、混合、继承等特性
  - 需要编译成 CSS
- **CSS-in-JS**：
  - styled-components、emotion、JSS
  - CSS 写在 JavaScript 中
  - 支持动态样式
  - 自动处理作用域
- **CSS Modules**：
  - CSS 文件模块化
  - 自动生成唯一的类名
  - 避免样式冲突
- **对比**：
  - 预处理器：编译时，支持嵌套、变量、混合
  - CSS-in-JS：运行时，支持动态样式，自动作用域
  - CSS Modules：编译时，自动作用域，避免冲突

**代码示例**：
/* Sass/SCSS */
```scss
/* 变量 */
$primary-color: #007bff;
$secondary-color: #6c757d;
$font-size-base: 16px;

/* 嵌套 */
.card {
  padding: 20px;
  
  &__title {
    font-size: 18px;
    
    &:hover {
      color: red;
    }
  }
  
  &--primary {
    background-color: $primary-color;
  }
}

/* 混合 */
@mixin button($bg-color, $text-color) {
  padding: 10px 20px;
  background-color: $bg-color;
  color: $text-color;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button-primary {
  @include button($primary-color, white);
}

/* 继承 */
%button-base {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button {
  @extend %button-base;
  background-color: $primary-color;
}

/* 函数 */
@function px-to-rem($px) {
  @return ($px / 16px) * 1rem;
}

.title {
  font-size: px-to-rem(32px);
}
```

/* Less */
```less
/* 变量 */
@primary-color: #007bff;
@secondary-color: #6c757d;

/* 嵌套 */
.card {
  padding: 20px;
  
  &__title {
    font-size: 18px;
  }
  
  &--primary {
    background-color: @primary-color;
  }
}

/* 混合 */
.button(@bg-color, @text-color) {
  padding: 10px 20px;
  background-color: @bg-color;
  color: @text-color;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button-primary {
  .button(@primary-color, white);
}
```

/* CSS-in-JS (styled-components) */
```javascript
import styled from 'styled-components';

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${props => props.primary ? '#007bff' : '#6c757d'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
  }
`;

const Card = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  
  ${props => props.primary && `
    border-color: #007bff;
    background-color: #f0f8ff;
  `}
`;

// 使用
<Button primary>点击我</Button>
<Card primary>卡片内容</Card>
```

/* CSS Modules */
```css
/* Button.module.css */
.button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button--primary {
  background-color: #007bff;
}

.button--secondary {
  background-color: #6c757d;
}

.button:hover {
  opacity: 0.8;
}
```

```javascript
// 使用 CSS Modules
import styles from './Button.module.css';

function Button({ primary, children }) {
  return (
    <button className={primary ? styles['button--primary'] : styles['button--secondary']}>
      {children}
    </button>
  );
}
```

### 3. HTML 基础

#### 文档结构

**面试题**：HTML 文档的基本结构是什么？DOCTYPE 声明有什么作用？

**答案**：
- **DOCTYPE 声明**：告诉浏览器使用哪种 HTML 版本来解析文档
- **HTML 文档结构**：
  1. `<!DOCTYPE html>`：文档类型声明
  2. `<html>`：根元素
  3. `<head>`：文档头部，包含元数据
  4. `<body>`：文档主体，包含可见内容
- **head 元素**：meta、title、link、style、script 等

**代码示例**：
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="网页描述">
  <meta name="keywords" content="关键词1,关键词2">
  <title>网页标题</title>
  <link rel="stylesheet" href="styles.css">
  <style>
    /* 内部样式 */
  </style>
  <script src="script.js"></script>
</head>
<body>
  <!-- 页面内容 -->
</body>
</html>
```

#### 表单元素

**面试题**：HTML 有哪些表单元素？如何进行表单验证？

**答案**：
- **表单元素**：
  1. `<form>`：表单容器
  2. `<input>`：输入框
  3. `<textarea>`：多行文本输入
  4. `<select>`：下拉选择框
  5. `<button>`：按钮
  6. `<label>`：标签
  7. `<fieldset>`：表单字段集
  8. `<legend>`：字段集标题
- **input 类型**：text、password、email、number、tel、url、date、time、checkbox、radio、file、range、color 等
- **表单验证**：
  1. `required`：必填字段
  2. `pattern`：正则表达式验证
  3. `min`/`max`：最小/最大值
  4. `minlength`/`maxlength`：最小/最大长度
  5. `type`：HTML5 提供的类型验证

**代码示例**：
```html
<form action="/submit" method="POST">
  <!-- 文本输入 -->
  <label for="username">用户名：</label>
  <input type="text" id="username" name="username" required minlength="3" maxlength="20">
  
  <!-- 密码输入 -->
  <label for="password">密码：</label>
  <input type="password" id="password" name="password" required minlength="6">
  
  <!-- 邮箱输入 -->
  <label for="email">邮箱：</label>
  <input type="email" id="email" name="email" required>
  
  <!-- 数字输入 -->
  <label for="age">年龄：</label>
  <input type="number" id="age" name="age" min="1" max="120">
  
  <!-- 电话输入 -->
  <label for="phone">电话：</label>
  <input type="tel" id="phone" name="phone" pattern="[0-9]{11}">
  
  <!-- 日期输入 -->
  <label for="birthday">生日：</label>
  <input type="date" id="birthday" name="birthday">
  
  <!-- 单选框 -->
  <fieldset>
    <legend>性别：</legend>
    <label><input type="radio" name="gender" value="male" required> 男</label>
    <label><input type="radio" name="gender" value="female"> 女</label>
  </fieldset>
  
  <!-- 复选框 -->
  <fieldset>
    <legend>兴趣爱好：</legend>
    <label><input type="checkbox" name="hobby" value="reading"> 阅读</label>
    <label><input type="checkbox" name="hobby" value="sports"> 运动</label>
    <label><input type="checkbox" name="hobby" value="music"> 音乐</label>
  </fieldset>
  
  <!-- 下拉选择 -->
  <label for="city">城市：</label>
  <select id="city" name="city" required>
    <option value="">请选择</option>
    <option value="beijing">北京</option>
    <option value="shanghai">上海</option>
    <option value="guangzhou">广州</option>
  </select>
  
  <!-- 多行文本 -->
  <label for="message">留言：</label>
  <textarea id="message" name="message" rows="4" cols="50" maxlength="500"></textarea>
  
  <!-- 文件上传 -->
  <label for="avatar">头像：</label>
  <input type="file" id="avatar" name="avatar" accept="image/*">
  
  <!-- 提交按钮 -->
  <button type="submit">提交</button>
  <button type="reset">重置</button>
</form>
```

#### 元数据

**面试题**：meta 标签有哪些常用的属性？如何进行 SEO 优化？

**答案**：
- **常用 meta 标签**：
  1. `charset`：字符编码
  2. `viewport`：视口设置（移动端适配）
  3. `description`：页面描述
  4. `keywords`：关键词
  5. `author`：作者
  6. `robots`：搜索引擎爬虫规则
  7. `refresh`：页面跳转
- **SEO 优化**：
  1. 合理的 title 标签
  2. 准确的 description
  3. 合适的 keywords
  4. 语义化标签
  5. Open Graph 标签（社交媒体分享）
  6. 结构化数据（JSON-LD）

**代码示例**：
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  
  <!-- 视口设置（移动端适配） -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  
  <!-- SEO 元数据 -->
  <meta name="description" content="网页描述，150-160个字符">
  <meta name="keywords" content="关键词1,关键词2,关键词3">
  <meta name="author" content="作者名称">
  
  <!-- 搜索引擎爬虫规则 -->
  <meta name="robots" content="index,follow">
  
  <!-- 页面跳转 -->
  <meta http-equiv="refresh" content="5;url=https://example.com">
  
  <!-- 网页标题 -->
  <title>网页标题 - 网站名称</title>
  
  <!-- Open Graph 标签（社交媒体分享） -->
  <meta property="og:title" content="分享标题">
  <meta property="og:description" content="分享描述">
  <meta property="og:image" content="https://example.com/image.jpg">
  <meta property="og:url" content="https://example.com">
  <meta property="og:type" content="website">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="分享标题">
  <meta name="twitter:description" content="分享描述">
  <meta name="twitter:image" content="https://example.com/image.jpg">
  
  <!-- 图标 -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  
  <!-- 结构化数据（JSON-LD） -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "文章标题",
    "author": {
      "@type": "Person",
      "name": "作者名称"
    },
    "datePublished": "2024-01-01",
    "description": "文章描述"
  }
  </script>
</head>
<body>
  <!-- 页面内容 -->
</body>
</html>
```

#### 媒体元素

**面试题**：如何优化图片加载？audio 和 video 标签有哪些属性？

**答案**：
- **图片优化**：
  1. `loading="lazy"`：懒加载
  2. `srcset`：响应式图片
  3. `sizes`：根据屏幕尺寸选择图片
  4. `width`/`height`：避免布局偏移
  5. 使用合适的格式（WebP、AVIF）
- **audio 标签**：
  1. `controls`：显示播放控件
  2. `autoplay`：自动播放
  3. `loop`：循环播放
  4. `muted`：静音
  5. `preload`：预加载
- **video 标签**：
  1. `controls`：显示播放控件
  2. `autoplay`：自动播放
  3. `loop`：循环播放
  4. `muted`：静音
  5. `preload`：预加载
  6. `poster`：封面图片
  7. `width`/`height`：尺寸

**代码示例**：
```html
<!-- 图片懒加载 -->
<img src="image.jpg" alt="图片描述" loading="lazy" width="800" height="600">

<!-- 响应式图片 -->
<img 
  src="image-small.jpg"
  srcset="image-small.jpg 480w, image-medium.jpg 768w, image-large.jpg 1200w"
  sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, 1200px"
  alt="响应式图片"
  loading="lazy"
>

<!-- Picture 元素 -->
<picture>
  <source media="(max-width: 480px)" srcset="image-small.webp" type="image/webp">
  <source media="(max-width: 480px)" srcset="image-small.jpg" type="image/jpeg">
  <source media="(max-width: 768px)" srcset="image-medium.webp" type="image/webp">
  <source media="(max-width: 768px)" srcset="image-medium.jpg" type="image/jpeg">
  <source srcset="image-large.webp" type="image/webp">
  <img src="image-large.jpg" alt="图片描述" loading="lazy">
</picture>

<!-- 音频标签 -->
<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
  <source src="audio.ogg" type="audio/ogg">
  您的浏览器不支持 audio 标签。
</audio>

<!-- 自动播放、循环、静音的音频 -->
<audio autoplay loop muted>
  <source src="background.mp3" type="audio/mpeg">
</audio>

<!-- 视频标签 -->
<video controls width="640" height="360" poster="poster.jpg">
  <source src="video.mp4" type="video/mp4">
  <source src="video.webm" type="video/webm">
  <source src="video.ogv" type="video/ogg">
  您的浏览器不支持 video 标签。
</video>

<!-- 自动播放、静音的视频 -->
<video autoplay muted loop playsinline>
  <source src="video.mp4" type="video/mp4">
</video>

<!-- 视频轨道（字幕） -->
<video controls>
  <source src="video.mp4" type="video/mp4">
  <track src="subtitles.vtt" kind="subtitles" srclang="zh" label="中文字幕">
  <track src="subtitles-en.vtt" kind="subtitles" srclang="en" label="English Subtitles">
</video>
```

#### 链接与导航

**面试题**：HTML 有哪些类型的链接？如何实现锚点跳转？

**答案**：
- **链接类型**：
  1. 外部链接：`<a href="https://example.com">`
  2. 内部链接：`<a href="/page">`
  3. 锚点链接：`<a href="#section">`
  4. 邮件链接：`<a href="mailto:email@example.com">`
  5. 电话链接：`<a href="tel:1234567890">`
  6. 下载链接：`<a href="file.pdf" download>`
- **锚点跳转**：
  1. 使用 `id` 属性定义锚点
  2. 使用 `href="#id"` 跳转到锚点
  3. 使用 `scroll-behavior: smooth` 实现平滑滚动

**代码示例**：
```html
<!-- 外部链接 -->
<a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
  访问示例网站
</a>

<!-- 内部链接 -->
<a href="/about">关于我们</a>
<a href="/contact">联系我们</a>

<!-- 锚点链接 -->
<a href="#section1">跳转到第一部分</a>
<a href="#section2">跳转到第二部分</a>

<!-- 锚点目标 -->
<section id="section1">
  <h2>第一部分</h2>
  <p>内容...</p>
</section>

<section id="section2">
  <h2>第二部分</h2>
  <p>内容...</p>
</section>

<!-- 邮件链接 -->
<a href="mailto:info@example.com?subject=咨询&body=您好，我想咨询...">发送邮件</a>

<!-- 电话链接 -->
<a href="tel:1234567890">拨打电话</a>

<!-- 短信链接 -->
<a href="sms:1234567890">发送短信</a>

<!-- 下载链接 -->
<a href="document.pdf" download="文件名.pdf">下载 PDF</a>

<!-- 平滑滚动（CSS） -->
<style>
  html {
    scroll-behavior: smooth;
  }
</style>

<!-- 导航菜单 -->
<nav>
  <ul>
    <li><a href="#home">首页</a></li>
    <li><a href="#about">关于</a></li>
    <li><a href="#services">服务</a></li>
    <li><a href="#contact">联系</a></li>
  </ul>
</nav>

<!-- 面包屑导航 -->
<nav aria-label="面包屑">
  <ol>
    <li><a href="/">首页</a></li>
    <li><a href="/category">分类</a></li>
    <li aria-current="page">当前页面</li>
  </ol>
</nav>
```

#### HTML5 新特性

**面试题**：HTML5 有哪些新特性？Canvas 和 SVG 有什么区别？

**答案**：
- **HTML5 新特性**：
  1. Canvas：2D 绘图
  2. SVG：矢量图形
  3. 本地存储：localStorage、sessionStorage
  4. Web Worker：多线程
  5. 拖放 API：拖放功能
  6. 地理位置 API：获取位置
  7. Web Speech API：语音识别
  8. Web Notifications：桌面通知
  9. Service Worker：离线缓存
  10. WebRTC：实时通信
- **Canvas vs SVG**：
  - Canvas：基于像素，适合复杂图形，性能好，不可缩放
  - SVG：基于矢量，适合图标和简单图形，可缩放，DOM 操作

**代码示例**：
```html
<!-- Canvas 绘图 -->
<canvas id="myCanvas" width="400" height="300"></canvas>

<script>
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// 绘制矩形
ctx.fillStyle = 'red';
ctx.fillRect(10, 10, 100, 100);

// 绘制圆形
ctx.beginPath();
ctx.arc(200, 150, 50, 0, Math.PI * 2);
ctx.fillStyle = 'blue';
ctx.fill();

// 绘制文本
ctx.font = '20px Arial';
ctx.fillStyle = 'black';
ctx.fillText('Hello Canvas!', 150, 250);
</script>

<!-- SVG 图形 -->
<svg width="400" height="300">
  <!-- 矩形 -->
  <rect x="10" y="10" width="100" height="100" fill="red" />
  
  <!-- 圆形 -->
  <circle cx="200" cy="150" r="50" fill="blue" />
  
  <!-- 文本 -->
  <text x="150" y="250" font-size="20" fill="black">Hello SVG!</text>
</svg>

<!-- 本地存储 -->
<script>
// localStorage
localStorage.setItem('key', 'value');
const value = localStorage.getItem('key');
localStorage.removeItem('key');
localStorage.clear();

// sessionStorage
sessionStorage.setItem('key', 'value');
const value = sessionStorage.getItem('key');
</script>

<!-- 拖放 API -->
<div id="draggable" draggable="true">可拖动元素</div>
<div id="dropzone">放置区域</div>

<script>
const draggable = document.getElementById('draggable');
const dropzone = document.getElementById('dropzone');

draggable.addEventListener('dragstart', (e) => {
  e.dataTransfer.setData('text/plain', e.target.id);
});

dropzone.addEventListener('dragover', (e) => {
  e.preventDefault();
});

dropzone.addEventListener('drop', (e) => {
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain');
  dropzone.appendChild(document.getElementById(id));
});
</script>

<!-- 地理位置 API -->
<button onclick="getLocation()">获取位置</button>

<script>
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert('浏览器不支持地理位置');
  }
}

function showPosition(position) {
  console.log('纬度:', position.coords.latitude);
  console.log('经度:', position.coords.longitude);
}

function showError(error) {
  console.error('获取位置失败:', error.message);
}
</script>

<!-- Web Worker -->
<script id="worker" type="javascript/worker">
  self.onmessage = function(e) {
    const result = e.data * 2;
    self.postMessage(result);
  };
</script>

<script>
const blob = new Blob([document.getElementById('worker').textContent], { type: 'text/javascript' });
const worker = new Worker(window.URL.createObjectURL(blob));

worker.onmessage = function(e) {
  console.log('Worker 返回:', e.data);
};

worker.postMessage(10);
</script>
```

#### 其他元素

**面试题**：iframe 有哪些属性？data 属性如何使用？script 标签的 async 和 defer 有什么区别？

**答案**：
- **iframe 属性**：
  1. `src`：嵌入的页面 URL
  2. `width`/`height`：尺寸
  3. `name`：iframe 名称
  4. `sandbox`：安全限制
  5. `loading`：懒加载
  6. `allow`：权限策略
- **data 属性**：
  1. `data-*`：自定义数据属性
  2. 通过 `dataset` 访问
  3. 用于存储自定义数据
- **script 标签**：
  1. `async`：异步加载，下载完立即执行
  2. `defer`：异步加载，文档解析完成后执行
  3. `type`：脚本类型
  4. `src`：外部脚本 URL

**代码示例**：
```html
<!-- iframe 嵌入 -->
<iframe 
  src="https://www.example.com" 
  width="100%" 
  height="500"
  name="myFrame"
  sandbox="allow-scripts allow-same-origin"
  loading="lazy"
  title="嵌入页面"
>
  您的浏览器不支持 iframe。
</iframe>

<!-- iframe 通信 -->
<iframe id="myFrame" src="page.html"></iframe>

<script>
// 发送消息到 iframe
const iframe = document.getElementById('myFrame');
iframe.contentWindow.postMessage('Hello', '*');

// 接收来自 iframe 的消息
window.addEventListener('message', (e) => {
  console.log('收到消息:', e.data);
});
</script>

<!-- data 属性 -->
<div 
  id="product" 
  data-id="123" 
  data-name="商品名称" 
  data-price="99.99"
  data-category="electronics"
>
  商品信息
</div>

<script>
const product = document.getElementById('product');

// 访问 data 属性
console.log(product.dataset.id);        // "123"
console.log(product.dataset.name);      // "商品名称"
console.log(product.dataset.price);     // "99.99"
console.log(product.dataset.category);  // "electronics"

// 修改 data 属性
product.dataset.price = "89.99";

// 删除 data 属性
delete product.dataset.category;
</script>

<!-- script 标签加载顺序 -->
<!-- 普通 script：阻塞文档解析 -->
<script src="script1.js"></script>

<!-- async：异步加载，下载完立即执行 -->
<script async src="script2.js"></script>

<!-- defer：异步加载，文档解析完成后按顺序执行 -->
<script defer src="script3.js"></script>
<script defer src="script4.js"></script>

<!-- 执行顺序：
  1. script1.js（阻塞）
  2. script3.js（defer，按顺序）
  3. script4.js（defer，按顺序）
  4. script2.js（async，下载完立即执行）
-->

<!-- 内联脚本 -->
<script>
  console.log('内联脚本');
</script>

<!-- 模块脚本 -->
<script type="module">
  import { func } from './module.js';
  func();
</script>

<!-- JSONP -->
<script>
  function handleResponse(data) {
    console.log(data);
  }
</script>
<script src="https://api.example.com/data?callback=handleResponse"></script>
```

#### 无障碍访问

**面试题**：什么是 ARIA 属性？如何提高网页的无障碍性？

**答案**：
- **ARIA（Accessible Rich Internet Applications）**：
  1. 为辅助技术提供语义信息
  2. 弥补 HTML 语义的不足
  3. 提高屏幕阅读器的兼容性
- **常用 ARIA 属性**：
  1. `role`：元素角色
  2. `aria-label`：标签文本
  3. `aria-labelledby`：关联标签
  4. `aria-describedby`：关联描述
  5. `aria-hidden`：隐藏元素
  6. `aria-expanded`：展开状态
  7. `aria-current`：当前项
  8. `aria-live`：动态内容区域
- **无障碍设计原则**：
  1. 语义化标签
  2. 适当的 alt 文本
  3. 键盘导航支持
  4. 足够的颜色对比度
  5. 清晰的焦点指示器

**代码示例**：
```html
<!-- 语义化标签 -->
<header>
  <nav aria-label="主导航">
    <ul>
      <li><a href="/" aria-current="page">首页</a></li>
      <li><a href="/about">关于我们</a></li>
      <li><a href="/contact">联系我们</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>文章标题</h1>
    <p>文章内容...</p>
  </article>
</main>

<footer>
  <p>&copy; 2024 网站名称</p>
</footer>

<!-- 图片 alt 文本 -->
<img src="logo.png" alt="公司 Logo">
<img src="chart.png" alt="2024年销售数据图表">

<!-- 表单标签关联 -->
<label for="username">用户名：</label>
<input type="text" id="username" name="username" aria-required="true">

<!-- ARIA 标签 -->
<button aria-label="关闭对话框">
  <span aria-hidden="true">&times;</span>
</button>

<!-- ARIA 描述 -->
<div>
  <label for="password">密码：</label>
  <input type="password" id="password" aria-describedby="password-hint">
  <small id="password-hint">密码至少包含6个字符</small>
</div>

<!-- ARIA 角色 -->
<nav role="navigation" aria-label="主导航">
  <ul>
    <li><a href="/">首页</a></li>
    <li><a href="/about">关于</a></li>
  </ul>
</nav>

<aside role="complementary" aria-label="侧边栏">
  <h3>相关文章</h3>
  <ul>
    <li><a href="/article1">文章1</a></li>
    <li><a href="/article2">文章2</a></li>
  </ul>
</aside>

<!-- ARIA 状态 -->
<button aria-expanded="false" aria-controls="menu">菜单</button>
<ul id="menu" hidden>
  <li><a href="/">首页</a></li>
  <li><a href="/about">关于</a></li>
</ul>

<!-- ARIA 动态内容 -->
<div aria-live="polite" aria-atomic="true">
  <p id="status">操作成功</p>
</div>

<!-- 隐藏元素 -->
<div aria-hidden="true">
  装饰性内容，屏幕阅读器不读取
</div>

<!-- 跳过导航链接 -->
<a href="#main-content" class="skip-link">跳到主要内容</a>

<main id="main-content">
  <!-- 主要内容 -->
</main>

<!-- 键盘导航 -->
<style>
  a:focus, button:focus, input:focus {
    outline: 3px solid #005fcc;
    outline-offset: 2px;
  }
</style>

<!-- 颜色对比度 -->
<style>
  body {
    color: #333333;
    background-color: #ffffff;
  }
  
  .warning {
    color: #ffffff;
    background-color: #d9534f;
  }
</style>

<!-- 表格无障碍 -->
<table>
  <caption>员工信息表</caption>
  <thead>
    <tr>
      <th scope="col">姓名</th>
      <th scope="col">职位</th>
      <th scope="col">部门</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">张三</th>
      <td>工程师</td>
      <td>技术部</td>
    </tr>
    <tr>
      <th scope="row">李四</th>
      <td>设计师</td>
      <td>设计部</td>
    </tr>
  </tbody>
</table>

<!-- 进度条 -->
<div role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">
  70%
</div>

<!-- 加载状态 -->
<div role="status" aria-live="polite">
  <p>正在加载...</p>
</div>
```

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

#### 浏览器架构

**面试题**：浏览器的多进程架构是怎样的？各个进程的职责是什么？

**答案**：
- **多进程架构**：
  1. **浏览器进程**：负责管理浏览器的主界面、标签页管理、网络请求等
  2. **渲染进程**：负责页面的渲染、JavaScript 执行、事件处理等（每个标签页一个）
  3. **网络进程**：负责网络请求、资源下载等
  4. **GPU 进程**：负责 GPU 加速、3D 绘图等
  5. **插件进程**：负责插件的运行（已废弃）
- **渲染进程的职责**：
  1. DOM 解析
  2. CSS 解析
  3. 布局计算
  4. 绘制
  5. JavaScript 执行
  6. 事件处理
- **多进程的优势**：
  1. 提高稳定性（一个标签页崩溃不影响其他标签页）
  2. 提高安全性（进程间隔离）
  3. 提高性能（多核 CPU 利用）

**代码示例**：
```javascript
// 查看进程信息（Chrome DevTools）
// 1. 打开 Chrome DevTools
// 2. 进入 Performance 标签
// 3. 点击录制
// 4. 查看进程信息

// 查看 Web Worker 进程
const worker = new Worker('worker.js');
worker.onmessage = function(e) {
  console.log('Worker 进程返回:', e.data);
};
worker.postMessage('Hello Worker');
```

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

#### 事件机制

**面试题**：什么是事件委托？事件冒泡和事件捕获有什么区别？

**答案**：
- **事件流**：事件在 DOM 树中传播的三个阶段
  1. **捕获阶段**：从 window 对象向下传播到目标元素
  2. **目标阶段**：在目标元素上触发事件
  3. **冒泡阶段**：从目标元素向上传播到 window 对象
- **事件冒泡**：事件从最具体的元素开始，向上传播到不具体的元素
- **事件捕获**：事件从不具体的元素开始，向下传播到最具体的元素
- **事件委托**：利用事件冒泡机制，将事件处理器绑定到父元素上
- **阻止事件传播**：`event.stopPropagation()` 阻止事件冒泡/捕获
- **阻止默认行为**：`event.preventDefault()` 阻止元素的默认行为

**代码示例**：
```html
<div id="outer">
  <div id="middle">
    <div id="inner">点击我</div>
  </div>
</div>

<script>
const outer = document.getElementById('outer');
const middle = document.getElementById('middle');
const inner = document.getElementById('inner');

// 事件冒泡（默认）
outer.addEventListener('click', () => console.log('Outer'));
middle.addEventListener('click', () => console.log('Middle'));
inner.addEventListener('click', () => console.log('Inner'));

// 点击 inner，输出：Inner → Middle → Outer

// 事件捕获
outer.addEventListener('click', () => console.log('Outer (capture)'), true);
middle.addEventListener('click', () => console.log('Middle (capture)'), true);
inner.addEventListener('click', () => console.log('Inner (capture)'), true);

// 点击 inner，输出：Outer (capture) → Middle (capture) → Inner (capture)

// 阻止事件传播
inner.addEventListener('click', (event) => {
  event.stopPropagation();
  console.log('Inner (stopped)');
});

// 阻止默认行为
const link = document.querySelector('a');
link.addEventListener('click', (event) => {
  event.preventDefault();
  console.log('链接点击被阻止');
});
</script>

// 事件委托
<ul id="list">
  <li>项目 1</li>
  <li>项目 2</li>
  <li>项目 3</li>
</ul>

<script>
const list = document.getElementById('list');
list.addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    console.log('点击了:', event.target.textContent);
  }
});
</script>
```

#### CORS

**面试题**：什么是 CORS？如何配置 CORS？

**答案**：
- **CORS（Cross-Origin Resource Sharing）**：跨域资源共享，允许浏览器向跨源服务器发送 XMLHttpRequest 请求
- **工作原理**：
  1. 简单请求：直接发送请求，服务器返回响应头
  2. 预检请求：先发送 OPTIONS 请求，确认服务器允许后再发送实际请求
- **响应头**：
  1. `Access-Control-Allow-Origin`：允许的源
  2. `Access-Control-Allow-Methods`：允许的 HTTP 方法
  3. `Access-Control-Allow-Headers`：允许的请求头
  4. `Access-Control-Allow-Credentials`：是否允许携带凭证
  5. `Access-Control-Max-Age`：预检请求的缓存时间

**代码示例**：
```javascript
// 前端发送跨域请求
fetch('https://api.example.com/data', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include' // 携带 cookie
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// 使用 XMLHttpRequest
const xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.open('GET', 'https://api.example.com/data', true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onload = function() {
  if (xhr.status === 200) {
    console.log(JSON.parse(xhr.responseText));
  }
};
xhr.send();

// Node.js 服务器配置 CORS
const express = require('express');
const cors = require('cors');
const app = express();

// 简单配置
app.use(cors());

// 自定义配置
app.use(cors({
  origin: 'https://example.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400
}));

// 手动设置响应头
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://example.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// 处理预检请求
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'https://example.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Max-Age', '86400');
  res.sendStatus(200);
});
```

#### 浏览器存储

**面试题**：localStorage、sessionStorage、cookie 和 indexedDB 有什么区别？

**答案**：
- **localStorage**：
  1. 大小：5-10MB
  2. 生命周期：永久存储，除非手动删除
  3. 作用域：同源策略
  4. API：简单键值对存储
- **sessionStorage**：
  1. 大小：5-10MB
  2. 生命周期：会话结束（关闭标签页）时清除
  3. 作用域：同源策略 + 同一标签页
  4. API：简单键值对存储
- **cookie**：
  1. 大小：4KB
  2. 生命周期：可设置过期时间
  3. 作用域：同源策略 + 可设置 domain 和 path
  4. 特点：每次请求都会携带
- **indexedDB**：
  1. 大小：可用磁盘空间的 50%
  2. 生命周期：永久存储，除非手动删除
  3. 作用域：同源策略
  4. API：异步的 NoSQL 数据库

**代码示例**：
```javascript
// localStorage
localStorage.setItem('key', 'value');
const value = localStorage.getItem('key');
localStorage.removeItem('key');
localStorage.clear();
const keys = Object.keys(localStorage);
console.log(keys);

// sessionStorage
sessionStorage.setItem('key', 'value');
const value = sessionStorage.getItem('key');
sessionStorage.removeItem('key');
sessionStorage.clear();

// cookie
document.cookie = 'name=value; expires=Fri, 31 Dec 2024 23:59:59 GMT; path=/; domain=.example.com; secure; samesite=strict';

// 读取 cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

console.log(getCookie('name'));

// 删除 cookie
document.cookie = 'name=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';

// indexedDB
const request = indexedDB.open('myDatabase', 1);

request.onupgradeneeded = (event) => {
  const db = event.target.result;
  const objectStore = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
  objectStore.createIndex('name', 'name', { unique: false });
};

request.onsuccess = (event) => {
  const db = event.target.result;
  
  // 添加数据
  const transaction = db.transaction(['users'], 'readwrite');
  const objectStore = transaction.objectStore('users');
  const request = objectStore.add({ name: '张三', age: 30 });
  
  request.onsuccess = () => console.log('数据添加成功');
  
  // 查询数据
  const getRequest = objectStore.get(1);
  getRequest.onsuccess = () => console.log(getRequest.result);
  
  // 删除数据
  const deleteRequest = objectStore.delete(1);
  deleteRequest.onsuccess = () => console.log('数据删除成功');
};
```

#### 缓存机制

**面试题**：什么是强缓存和协商缓存？Service Worker 是如何工作的？

**答案**：
- **强缓存**：
  1. 不向服务器发送请求，直接从缓存读取
  2. 响应头：`Cache-Control`、`Expires`
  3. 优先级：Cache-Control > Expires
- **协商缓存**：
  1. 向服务器发送请求，服务器判断是否使用缓存
  2. 响应头：`ETag`、`Last-Modified`
  3. 优先级：ETag > Last-Modified
- **Service Worker**：
  1. 运行在浏览器后台的独立线程
  2. 可以拦截网络请求，返回缓存内容
  3. 实现离线访问和推送通知
  4. 生命周期：安装、激活、fetch

**代码示例**：
```javascript
// 强缓存
// Cache-Control: max-age=3600
// Cache-Control: no-cache
// Cache-Control: no-store
// Expires: Wed, 21 Oct 2024 07:28:00 GMT

// 协商缓存
// ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
// Last-Modified: Wed, 21 Oct 2024 07:28:00 GMT

// Service Worker 注册
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => console.log('SW 注册成功:', registration))
      .catch(error => console.error('SW 注册失败:', error));
  });
}

// sw.js
const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
  '/',
  '/styles.css',
  '/script.js',
  '/image.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(response => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 手动控制缓存
caches.open('my-cache').then(cache => {
  // 添加缓存
  cache.add('/data.json');
  
  // 获取缓存
  cache.match('/data.json').then(response => {
    if (response) {
      return response.json();
    }
  });
  
  // 删除缓存
  cache.delete('/data.json');
  
  // 清空缓存
  cache.keys().then(keys => {
    keys.forEach(request => cache.delete(request));
  });
});
```

#### 性能优化

**面试题**：如何优化页面性能？关键渲染路径是什么？

**答案**：
- **资源加载优化**：
  1. 压缩资源（Gzip、Brotli）
  2. 使用 CDN 加速
  3. 图片优化（WebP、懒加载）
  4. 代码分割（Code Splitting）
  5. 预加载和预连接
- **关键渲染路径优化**：
  1. 减少 DOM 深度和宽度
  2. 减少阻塞 CSS
  3. 减少阻塞 JavaScript
  4. 优化关键资源加载顺序
- **懒加载与预加载**：
  1. `loading="lazy"`：懒加载图片和 iframe
  2. `<link rel="preload">`：预加载关键资源
  3. `<link rel="prefetch">`：预取可能需要的资源
  4. `<link rel="preconnect">`：预连接到服务器

**代码示例**：
```html
<!-- 预加载关键资源 -->
<link rel="preload" href="critical.css" as="style">
<link rel="preload" href="critical.js" as="script">
<link rel="preload" href="font.woff2" as="font" crossorigin>

<!-- 预连接到服务器 -->
<link rel="preconnect" href="https://cdn.example.com">
<link rel="dns-prefetch" href="https://cdn.example.com">

<!-- 预取可能需要的资源 -->
<link rel="prefetch" href="next-page.html">
<link rel="prefetch" href="next-page.js">

<!-- 懒加载图片 -->
<img src="image.jpg" alt="描述" loading="lazy" width="800" height="600">

<!-- 懒加载 iframe -->
<iframe src="content.html" loading="lazy"></iframe>

<!-- 延迟加载非关键 JavaScript -->
<script defer src="non-critical.js"></script>

<!-- 异步加载 JavaScript -->
<script async src="analytics.js"></script>

<!-- 图片优化 -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="描述" loading="lazy">
</picture>

<!-- 响应式图片 -->
<img 
  src="image-small.jpg"
  srcset="image-small.jpg 480w, image-medium.jpg 768w, image-large.jpg 1200w"
  sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, 1200px"
  alt="描述"
  loading="lazy"
>

<!-- 内联关键 CSS -->
<style>
  /* 关键 CSS */
</style>

<!-- 延迟加载非关键 CSS -->
<link rel="preload" href="non-critical.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

```javascript
// 代码分割（Webpack）
import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
  console.log(_.join(['Hello', 'webpack'], ' '));
});

// 懒加载组件
const LazyComponent = React.lazy(() => import('./LazyComponent'));

// 虚拟滚动（长列表优化）
import { FixedSizeList } from 'react-window';

function Row({ index, style }) {
  return <div style={style}>Row {index}</div>;
}

function VirtualList() {
  return (
    <FixedSizeList
      height={600}
      itemCount={1000}
      itemSize={35}
      width={300}
    >
      {Row}
    </FixedSizeList>
  );
}

// 防抖和节流
function debounce(func, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

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

// 使用防抖优化输入
const input = document.querySelector('input');
input.addEventListener('input', debounce(e => {
  console.log('输入:', e.target.value);
}, 300));

// 使用节流优化滚动
window.addEventListener('scroll', throttle(() => {
  console.log('滚动位置:', window.scrollY);
}, 100));
```

#### 安全机制

**面试题**：什么是 XSS 和 CSRF？如何防御？

**答案**：
- **XSS（Cross-Site Scripting）**：跨站脚本攻击
  1. **反射型 XSS**：通过 URL 参数注入恶意脚本
  2. **存储型 XSS**：恶意脚本存储在服务器上
  3. **DOM 型 XSS**：通过 DOM 操作注入恶意脚本
  4. **防御方法**：
     - 输入过滤和转义
     - 使用 CSP（内容安全策略）
     - 设置 HttpOnly Cookie
     - 使用 textContent 代替 innerHTML
- **CSRF（Cross-Site Request Forgery）**：跨站请求伪造
  1. **攻击原理**：利用用户的登录状态发送恶意请求
  2. **防御方法**：
     - 使用 CSRF Token
     - 验证 Referer 和 Origin
     - 设置 SameSite Cookie
     - 使用双重提交 Cookie
- **CSP（Content Security Policy）**：内容安全策略
  1. 限制资源加载来源
  2. 限制脚本执行
  3. 防止 XSS 攻击

**代码示例**：
```javascript
// XSS 防御
// 1. 输入过滤
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const userInput = '<script>alert("XSS")</script>';
const safeInput = escapeHtml(userInput);
console.log(safeInput); // &lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;

// 2. 使用 textContent 代替 innerHTML
element.textContent = userInput; // 安全
element.innerHTML = userInput; // 危险

// 3. 使用 DOMPurify 库
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(userInput);
element.innerHTML = clean; // 安全

// CSRF 防御
// 1. 使用 CSRF Token
const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

fetch('/api/data', {
  method: 'POST',
  headers: {
    'X-CSRF-Token': csrfToken
  },
  body: JSON.stringify({ data: 'value' })
});

// 2. 设置 SameSite Cookie
document.cookie = 'session=xxx; SameSite=Strict; Secure';

// 3. 验证 Referer
app.use((req, res, next) => {
  const referer = req.headers.referer;
  if (referer && !referer.startsWith('https://example.com')) {
    return res.status(403).send('Invalid referer');
  }
  next();
});

// CSP 配置
// HTTP 响应头
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.example.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self'; font-src 'self' https://cdn.example.com;

// HTML meta 标签
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.example.com">

// CSP 报告
Content-Security-Policy-Report-Only: default-src 'self'; report-uri /csp-report

// 接收 CSP 报告
app.post('/csp-report', (req, res) => {
  console.log('CSP 违规报告:', req.body);
  res.status(204).send();
});

// HttpOnly Cookie
Set-Cookie: session=xxx; HttpOnly; Secure; SameSite=Strict
```

#### 网络相关

**面试题**：HTTP 和 HTTPS 有什么区别？常见的 HTTP 状态码有哪些？

**答案**：
- **HTTP vs HTTPS**：
  1. HTTPS 是 HTTP 的安全版本
  2. HTTPS 使用 SSL/TLS 加密
  3. HTTPS 需要 SSL 证书
  4. HTTPS 默认端口 443，HTTP 默认端口 80
- **HTTP 状态码**：
  1. **1xx**：信息响应（100 Continue）
  2. **2xx**：成功响应（200 OK, 201 Created, 204 No Content）
  3. **3xx**：重定向（301 Moved Permanently, 302 Found, 304 Not Modified）
  4. **4xx**：客户端错误（400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found）
  5. **5xx**：服务器错误（500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable）
- **HTTP 请求方法**：
  1. **GET**：获取资源
  2. **POST**：创建资源
  3. **PUT**：更新资源
  4. **DELETE**：删除资源
  5. **PATCH**：部分更新资源
  6. **HEAD**：获取响应头
  7. **OPTIONS**：获取服务器支持的 HTTP 方法

**代码示例**：
```javascript
// Fetch API
fetch('https://api.example.com/data', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token'
  },
  credentials: 'include'
})
  .then(response => {
    console.log('状态码:', response.status);
    console.log('状态文本:', response.statusText);
    return response.json();
  })
  .then(data => console.log('数据:', data))
  .catch(error => console.error('错误:', error));

// POST 请求
fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: '张三',
    age: 30
  })
})
  .then(response => response.json())
  .then(data => console.log('创建成功:', data));

// PUT 请求
fetch('https://api.example.com/users/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: '李四',
    age: 25
  })
})
  .then(response => response.json())
  .then(data => console.log('更新成功:', data));

// DELETE 请求
fetch('https://api.example.com/users/1', {
  method: 'DELETE'
})
  .then(response => {
    if (response.status === 204) {
      console.log('删除成功');
    }
  });

// 处理不同的状态码
fetch('https://api.example.com/data')
  .then(response => {
    switch (response.status) {
      case 200:
        console.log('成功');
        break;
      case 201:
        console.log('创建成功');
        break;
      case 204:
        console.log('无内容');
        break;
      case 301:
      case 302:
        console.log('重定向:', response.headers.get('Location'));
        break;
      case 304:
        console.log('未修改，使用缓存');
        break;
      case 400:
        console.log('请求错误');
        break;
      case 401:
        console.log('未授权');
        break;
      case 403:
        console.log('禁止访问');
        break;
      case 404:
        console.log('未找到');
        break;
      case 500:
        console.log('服务器错误');
        break;
      default:
        console.log('未知状态码:', response.status);
    }
    return response.json();
  });

// XMLHttpRequest
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.example.com/data', true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    console.log('状态码:', xhr.status);
    if (xhr.status === 200) {
      console.log('响应:', JSON.parse(xhr.responseText));
    }
  }
};
xhr.send();
```

#### Web API

**面试题**：DOM、BOM、Fetch API 和 Event API 有哪些常用方法？

**答案**：
- **DOM（Document Object Model）**：
  1. `document.querySelector()`：选择单个元素
  2. `document.querySelectorAll()`：选择多个元素
  3. `document.createElement()`：创建元素
  4. `element.appendChild()`：添加子元素
  5. `element.removeChild()`：删除子元素
  6. `element.classList`：操作类名
  7. `element.style`：操作样式
- **BOM（Browser Object Model）**：
  1. `window.location`：获取和设置 URL
  2. `window.history`：历史记录管理
  3. `window.navigator`：浏览器信息
  4. `window.screen`：屏幕信息
  5. `window.localStorage`：本地存储
  6. `window.sessionStorage`：会话存储
- **Fetch API**：
  1. `fetch()`：发送网络请求
  2. `Request`：请求对象
  3. `Response`：响应对象
  4. `Headers`：请求/响应头
- **Event API**：
  1. `addEventListener()`：添加事件监听
  2. `removeEventListener()`：移除事件监听
  3. `dispatchEvent()`：触发事件
  4. `Event`：事件对象

**代码示例**：
```javascript
// DOM 操作
const element = document.querySelector('.class');
const elements = document.querySelectorAll('.class');
const newElement = document.createElement('div');
newElement.textContent = 'Hello';
element.appendChild(newElement);
element.removeChild(newElement);
element.classList.add('active');
element.classList.remove('active');
element.classList.toggle('active');
element.style.color = 'red';
element.style.backgroundColor = 'blue';

// BOM 操作
console.log(window.location.href); // 当前 URL
window.location.href = 'https://example.com'; // 跳转
window.history.back(); // 后退
window.history.forward(); // 前进
window.history.pushState({}, '', '/new-url'); // 添加历史记录
console.log(window.navigator.userAgent); // 浏览器信息
console.log(window.screen.width); // 屏幕宽度
console.log(window.screen.height); // 屏幕高度

// Fetch API
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Fetch with options
fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token'
  },
  body: JSON.stringify({ key: 'value' }),
  mode: 'cors',
  credentials: 'include',
  cache: 'no-cache'
})
  .then(response => response.json())
  .then(data => console.log(data));

// Event API
const button = document.querySelector('button');

function handleClick(event) {
  console.log('事件类型:', event.type);
  console.log('目标元素:', event.target);
  console.log('当前元素:', event.currentTarget);
  console.log('鼠标位置:', event.clientX, event.clientY);
  event.preventDefault();
  event.stopPropagation();
}

button.addEventListener('click', handleClick);

button.removeEventListener('click', handleClick);

// 自定义事件
const customEvent = new CustomEvent('myEvent', {
  detail: { message: 'Hello' }
});

element.addEventListener('myEvent', (event) => {
  console.log('自定义事件:', event.detail.message);
});

element.dispatchEvent(customEvent);

// 事件委托
const list = document.querySelector('ul');
list.addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    console.log('点击了:', event.target.textContent);
  }
});

// Intersection Observer（懒加载）
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});

document.querySelectorAll('img[data-src]').forEach(img => {
  observer.observe(img);
});

// Mutation Observer（DOM 变化监听）
const mutationObserver = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    console.log('DOM 变化:', mutation.type);
  });
});

mutationObserver.observe(element, {
  childList: true,
  attributes: true,
  characterData: true
});

// Resize Observer（元素尺寸变化监听）
const resizeObserver = new ResizeObserver((entries) => {
  entries.forEach(entry => {
    console.log('尺寸变化:', entry.contentRect);
  });
});

resizeObserver.observe(element);

// Clipboard API（剪贴板）
navigator.clipboard.writeText('Hello Clipboard');

navigator.clipboard.readText().then(text => {
  console.log('剪贴板内容:', text);
});

// Geolocation API（地理位置）
navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log('纬度:', position.coords.latitude);
    console.log('经度:', position.coords.longitude);
  },
  (error) => {
    console.error('获取位置失败:', error.message);
  }
);

// Notification API（桌面通知）
Notification.requestPermission().then(permission => {
  if (permission === 'granted') {
    new Notification('标题', {
      body: '通知内容',
      icon: '/icon.png'
    });
  }
});
```

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