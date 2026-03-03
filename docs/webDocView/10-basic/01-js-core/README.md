---
title: JS核心
createTime: 2026/02/04 15:23:41
permalink: /webDocView/10-basic/01-js-core/
---

# JS核心

## 模块概述

本模块涵盖JavaScript核心概念和高级特性，是前端开发的基础。通过学习本模块，你将掌握JavaScript的核心原理和最佳实践，为后续的框架学习和项目开发打下坚实的基础。

## 知识点清单

### 1. 作用域与闭包
- **全局作用域**
- **函数作用域**
- **块级作用域（let/const）**
- **闭包原理与应用**
- **作用域链**

### 2. this关键字
- **this的指向规则**
- **call/apply/bind方法**
- **箭头函数中的this**
- **this绑定优先级**

### 3. 原型与原型链
- **原型对象**
- **原型链**
- **继承实现方式**
- **ES6 Class**
- **new操作符原理**

### 4. 异步编程
- **同步与异步**
- **回调函数**
- **Promise**
- **async/await**
- **事件循环（Event Loop）**
- **宏任务与微任务**

### 5. ES6+特性
- **let/const**
- **箭头函数**
- **模板字符串**
- **解构赋值**
- **扩展运算符**
- **默认参数**
- **剩余参数**
- **Symbol**
- **Map/Set**
- **迭代器与生成器**
- **async/await**

### 6. 函数式编程
- **纯函数**
- **高阶函数**
- **函数柯里化**
- **函数组合**
- **不可变数据**

### 7. 错误处理
- **try/catch**
- **Error对象**
- **自定义错误**
- **promise错误处理**

### 8. 内存管理
- **垃圾回收机制**
- **内存泄漏常见场景**
- **内存优化技巧**

## 核心概念详解

### 1. 作用域与闭包

#### 作用域
作用域是指变量和函数的可访问范围，决定了代码块中变量和函数的可见性。

```javascript
// 全局作用域
var globalVar = 'global';

function outer() {
  // 函数作用域
  var outerVar = 'outer';
  
  function inner() {
    // 函数作用域
    var innerVar = 'inner';
    console.log(globalVar); // 可访问
    console.log(outerVar); // 可访问
    console.log(innerVar); // 可访问
  }
  
  inner();
  console.log(globalVar); // 可访问
  console.log(outerVar); // 可访问
  console.log(innerVar); // 不可访问
}

outer();
console.log(globalVar); // 可访问
console.log(outerVar); // 不可访问
console.log(innerVar); // 不可访问
```

#### 闭包
闭包是指有权访问另一个函数作用域中变量的函数，即便这个外部函数已经执行完毕，其内部的变量依然可以被闭包函数所访问。简单来说，就是函数嵌套函数，内部函数引用了外部函数的变量，并且内部函数在外部函数外部被调用时，就形成了闭包。

```javascript
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

#### 面试要点
- **什么是闭包？闭包的应用场景有哪些？**
  闭包是指有权访问另一个函数作用域中变量的函数。应用场景包括：数据私有化、函数柯里化、模块化、防抖节流等
- **var、let、const的区别是什么？**
  var存在变量提升，有函数作用域；let和const有块级作用域，存在暂时性死区；const声明后不可重新赋值
- **什么是作用域链？**
  作用域链是JavaScript查找变量的机制，从当前作用域开始，逐级向上查找，直到全局作用域

### 2. this关键字

this的指向取决于函数的调用方式：

```javascript
// 1. 全局上下文
console.log(this); // 浏览器中指向window，Node.js中指向global

// 2. 函数调用
function foo() {
  console.log(this);
}
foo(); // 全局对象

// 3. 方法调用
const obj = {
  method: function() {
    console.log(this);
  }
};
obj.method(); // obj

// 4. 构造函数调用
function Person(name) {
  this.name = name;
  console.log(this);
}
new Person('Alice'); // Person实例

// 5. call/apply/bind
function bar() {
  console.log(this);
}
bar.call({ name: 'Bob' }); // { name: 'Bob' }
```

#### 面试要点
- **this的指向规则有哪些？**
  默认绑定（全局对象）、隐式绑定（对象方法调用）、显式绑定（call/apply/bind）、new绑定、箭头函数继承外层this
- **call、apply、bind的区别是什么？**
  call和apply立即执行函数，bind返回新函数；call和apply的区别在于传参方式，call逐个传参，apply传数组
- **箭头函数的this有什么特点？**
  箭头函数没有自己的this，继承外层作用域的this，不能通过call/apply/bind改变this指向

### 3. 原型与原型链

JavaScript是基于原型的语言，每个对象都有一个原型对象。

```javascript
// 构造函数
function Person(name) {
  this.name = name;
}

// 在原型上添加方法
Person.prototype.sayHello = function() {
  console.log(`Hello, my name is ${this.name}`);
};

// 创建实例
const person1 = new Person('Alice');
const person2 = new Person('Bob');

person1.sayHello(); // Hello, my name is Alice
person2.sayHello(); // Hello, my name is Bob

// 原型链
console.log(person1.__proto__ === Person.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__ === null); // true
```

#### 面试要点
- **什么是原型链？如何理解原型继承？**
  原型链是JavaScript实现继承的机制，每个对象都有一个原型对象，通过__proto__属性连接，形成链式结构，查找属性时沿原型链向上查找
- **new操作符执行了哪些步骤？**
  1.创建新对象 2.将新对象的__proto__指向构造函数的prototype 3.将构造函数的this指向新对象 4.执行构造函数代码 5.返回新对象
- **ES6 Class和构造函数的区别是什么？**
  Class是语法糖，本质还是构造函数；Class有更清晰的语法、支持继承、有静态方法、内部默认严格模式

### 4. 异步编程

#### Promise

```javascript
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { name: 'Alice', age: 25 };
      resolve(data);
      // reject(new Error('Failed to fetch data'));
    }, 1000);
  });
}

// 使用Promise
fetchData()
  .then(data => {
    console.log('Data:', data);
    return data.age;
  })
  .then(age => {
    console.log('Age:', age);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

#### async/await

```javascript
async function fetchDataAsync() {
  try {
    const data = await fetchData();
    console.log('Data:', data);
    const age = data.age;
    console.log('Age:', age);
    return age;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

fetchDataAsync();
```

#### 面试要点
- **什么是事件循环？宏任务和微任务的区别是什么？**
  事件循环是JavaScript实现异步的机制；宏任务包括setTimeout、setInterval、I/O等，微任务包括Promise.then、MutationObserver等；微任务优先级高于宏任务
- **Promise的状态有哪些？**
  pending（进行中）、fulfilled（已成功）、rejected（已失败）；状态一旦改变就不会再变
- **async/await和Promise的区别是什么？**
  async/await是Promise的语法糖，使异步代码看起来像同步代码，更易读易维护；async函数返回Promise，await后面跟Promise或值

### 5. ES6+特性

#### let/const

```javascript
// let - 块级作用域，可重新赋值
let name = 'Alice';
name = 'Bob';

// const - 块级作用域，不可重新赋值
const PI = 3.14159;

// 块级作用域示例
if (true) {
  let blockScoped = 'block';
  const constant = 'constant';
}

// var - 函数作用域，存在变量提升
function example() {
  console.log(varVar);
  var varVar = 'var';
}
```

#### 解构赋值

```javascript
// 对象解构
const person = { name: 'Alice', age: 25, city: 'New York' };
const { name, age } = person;
console.log(name, age); // Alice 25

// 数组解构
const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;
console.log(first, second, rest); // 1 2 [3, 4, 5]
```

#### 模板字符串

```javascript
// 基本使用
const name = 'Alice';
const greeting = `Hello, ${name}!`;
console.log(greeting); // Hello, Alice!

// 多行字符串
const multiLine = `
  第一行
  第二行
  第三行
`;

// 表达式计算
const a = 10;
const b = 20;
const result = `10 + 20 = ${a + b}`;
console.log(result); // 10 + 20 = 30

// 嵌套表达式
const user = { name: 'Bob', age: 25 };
const info = `User: ${user.name}, Age: ${user.age}`;
console.log(info); // User: Bob, Age: 25
```

#### 箭头函数

```javascript
// 普通函数
function add(a, b) {
  return a + b;
}

// 箭头函数
const addArrow = (a, b) => a + b;

// 带函数体的箭头函数
const multiply = (a, b) => {
  const result = a * b;
  return result;
};
```

#### 扩展运算符

```javascript
// 数组扩展
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// 对象扩展
const obj1 = { name: 'Alice', age: 25 };
const obj2 = { city: 'New York', country: 'USA' };
const merged = { ...obj1, ...obj2 };
console.log(merged); // { name: 'Alice', age: 25, city: 'New York', country: 'USA' }

// 数组复制
const original = [1, 2, 3];
const copy = [...original];

// 函数参数展开
function sum(a, b, c) {
  return a + b + c;
}
const numbers = [1, 2, 3];
console.log(sum(...numbers)); // 6

// 字符串转数组
const str = 'hello';
const chars = [...str];
console.log(chars); // ['h', 'e', 'l', 'l', 'o']
```

#### 默认参数

```javascript
// 基本默认参数
function greet(name = 'World') {
  console.log(`Hello, ${name}!`);
}
greet(); // Hello, World!
greet('Alice'); // Hello, Alice!

// 多个默认参数
function createUser(name = 'Anonymous', age = 0, country = 'Unknown') {
  return { name, age, country };
}
console.log(createUser('Bob', 25)); // { name: 'Bob', age: 25, country: 'Unknown' }

// 默认值为表达式
function getRandomValue(min = 0, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log(getRandomValue()); // 0-100之间的随机数
```

#### 剩余参数

```javascript
// 收集剩余参数
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4, 5)); // 15

// 结合其他参数
function greet(greeting, ...names) {
  names.forEach(name => {
    console.log(`${greeting}, ${name}!`);
  });
}
greet('Hello', 'Alice', 'Bob', 'Charlie');

// 解构中的剩余参数
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(second); // 2
console.log(rest); // [3, 4, 5]
```

#### Symbol

```javascript
// 创建Symbol
const sym1 = Symbol('description');
const sym2 = Symbol('description');
console.log(sym1 === sym2); // false

// 作为对象属性
const id = Symbol('id');
const user = {
  name: 'Alice',
  [id]: 123
};
console.log(user[id]); // 123

// Symbol.for() - 全局Symbol
const globalSym1 = Symbol.for('key');
const globalSym2 = Symbol.for('key');
console.log(globalSym1 === globalSym2); // true

// 内置Symbol
const obj = {
  [Symbol.toStringTag]: 'MyObject'
};
console.log(obj.toString()); // [object MyObject]
```

#### Map/Set

```javascript
// Map - 键值对集合
const map = new Map();
map.set('name', 'Alice');
map.set(1, 'one');
map.set({ id: 1 }, 'object key');

console.log(map.get('name')); // Alice
console.log(map.has(1)); // true
console.log(map.size); // 3

// 遍历Map
for (const [key, value] of map) {
  console.log(`${key}: ${value}`);
}

// Set - 唯一值集合
const set = new Set([1, 2, 3, 3, 4, 4, 5]);
console.log(set); // Set {1, 2, 3, 4, 5}

set.add(6);
set.delete(1);
console.log(set.has(2)); // true
console.log(set.size); // 5

// 数组去重
const arr = [1, 2, 2, 3, 3, 4];
const uniqueArr = [...new Set(arr)];
console.log(uniqueArr); // [1, 2, 3, 4]
```

#### 迭代器与生成器

```javascript
// 迭代器
const myIterable = {
  data: [1, 2, 3],
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.data.length) {
          return { value: this.data[index++], done: false };
        }
        return { value: undefined, done: true };
      }
    };
  }
};

for (const item of myIterable) {
  console.log(item); // 1, 2, 3
}

// 生成器函数
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

const generator = generateSequence();
console.log(generator.next()); // { value: 1, done: false }
console.log(generator.next()); // { value: 2, done: false }
console.log(generator.next()); // { value: 3, done: false }
console.log(generator.next()); // { value: undefined, done: true }

// 无限序列生成器
function* infiniteCounter() {
  let count = 0;
  while (true) {
    yield count++;
  }
}

const counter = infiniteCounter();
console.log(counter.next().value); // 0
console.log(counter.next().value); // 1
console.log(counter.next().value); // 2
```

#### 面试要点
- **箭头函数和普通函数的区别是什么？**
  箭头函数没有自己的this、arguments、super、new.target；不能作为构造函数使用；没有prototype属性；语法更简洁
- **解构赋值的应用场景有哪些？**
  交换变量、从函数返回多个值、提取对象属性、数组操作、函数参数默认值等
- **Map和Object的区别是什么？**
  Map的键可以是任意类型，Object的键只能是字符串或Symbol；Map有size属性，Object需要手动计算；Map保持插入顺序，Object不保证顺序

### 6. 函数式编程

#### 纯函数

纯函数是指相同的输入永远得到相同的输出，且没有任何可观察的副作用。

```javascript
// 纯函数示例
function pureAdd(a, b) {
  return a + b;
}

console.log(pureAdd(1, 2)); // 3
console.log(pureAdd(1, 2)); // 3

// 非纯函数示例
let count = 0;
function impureAdd(a, b) {
  count++;
  return a + b + count;
}

console.log(impureAdd(1, 2)); // 4
console.log(impureAdd(1, 2)); // 5
```

#### 高阶函数

高阶函数是指接收函数作为参数，或者返回函数的函数。

```javascript
// 接收函数作为参数
function map(array, fn) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(fn(array[i], i, array));
  }
  return result;
}

const numbers = [1, 2, 3, 4, 5];
const doubled = map(numbers, x => x * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// 返回函数
function createMultiplier(multiplier) {
  return function(x) {
    return x * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15

// 函数装饰器
function withLogging(fn) {
  return function(...args) {
    console.log('Calling with:', args);
    const result = fn.apply(this, args);
    console.log('Result:', result);
    return result;
  };
}

const loggedAdd = withLogging(pureAdd);
loggedAdd(3, 4); // Calling with: [3, 4] -> Result: 7
```

#### 函数柯里化

函数柯里化是指将一个多参数函数转换为一系列单参数函数的过程。

```javascript
// 基本柯里化
function add(a) {
  return function(b) {
    return a + b;
  };
}

const add5 = add(5);
console.log(add5(3)); // 8
console.log(add5(10)); // 15

// 通用柯里化函数
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...more) {
      return curried.apply(this, args.concat(more));
    };
  };
}

function multiply(a, b, c) {
  return a * b * c;
}

const curriedMultiply = curry(multiply);
console.log(curriedMultiply(2)(3)(4)); // 24
console.log(curriedMultiply(2, 3)(4)); // 24
console.log(curriedMultiply(2)(3, 4)); // 24

// 实际应用：创建特定功能的函数
const filter = curry((predicate, array) => array.filter(predicate));
const isEven = x => x % 2 === 0;
const filterEven = filter(isEven);

console.log(filterEven([1, 2, 3, 4, 5, 6])); // [2, 4, 6]
```

#### 函数组合

函数组合是指将多个函数组合成一个新函数，数据流从右向左流动。

```javascript
// 基本组合
function compose(...fns) {
  return function(x) {
    return fns.reduceRight((acc, fn) => fn(acc), x);
  };
}

// 管道组合（数据流从左向右）
function pipe(...fns) {
  return function(x) {
    return fns.reduce((acc, fn) => fn(acc), x);
  };
}

const toUpperCase = str => str.toUpperCase();
const exclaim = str => str + '!';
const reverse = str => str.split('').reverse().join('');

const shout = compose(exclaim, toUpperCase);
console.log(shout('hello')); // HELLO!

const process = pipe(toUpperCase, exclaim, reverse);
console.log(process('hello')); // !OLLEH

// 实际应用：数据处理管道
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 }
];

const getNames = users => users.map(u => u.name);
const filterAdults = users => users.filter(u => u.age >= 30);
const getAdultNames = compose(getNames, filterAdults);

console.log(getAdultNames(users)); // ['Bob', 'Charlie']
```

#### 不可变数据

不可变数据是指数据一旦创建就不能被修改，任何修改都会返回新的数据。

```javascript
// 使用展开运算符保持不可变性
const original = { name: 'Alice', age: 25 };

const updated = {
  ...original,
  age: 26
};

console.log(original); // { name: 'Alice', age: 25 }
console.log(updated); // { name: 'Alice', age: 26 }
console.log(original === updated); // false

// 数组不可变操作
const arr = [1, 2, 3];

const arr2 = [...arr, 4]; // 添加元素
const arr3 = arr.filter(x => x !== 2); // 删除元素
const arr4 = arr.map(x => x * 2); // 更新元素

console.log(arr); // [1, 2, 3]
console.log(arr2); // [1, 2, 3, 4]
console.log(arr3); // [1, 3]
console.log(arr4); // [2, 4, 6]

// 使用 Object.freeze 冻结对象
const frozen = Object.freeze({ a: 1, b: 2 });
frozen.a = 10; // 严格模式下会报错
console.log(frozen.a); // 1
```

#### 面试要点
- **什么是纯函数？纯函数的优势是什么？**
  纯函数是相同输入永远得到相同输出且无副作用的函数。优势：可预测、可测试、可缓存、易于并行处理
- **高阶函数的应用场景有哪些？**
  数组方法（map/filter/reduce）、函数装饰器、中间件、事件处理等
- **函数柯里化的作用是什么？**
  参数复用、延迟计算、函数组合、提高代码可读性
- **函数组合的好处是什么？**
  代码可读性高、易于测试、易于维护、符合单一职责原则

### 7. 错误处理

#### try/catch/finally

try/catch/finally 是JavaScript中处理同步错误的基本机制。

```javascript
// 基本用法
try {
  const result = riskyOperation();
  console.log(result);
} catch (error) {
  console.error('Error occurred:', error.message);
} finally {
  console.log('Cleanup code');
}

// 多个catch块
try {
  const data = JSON.parse(invalidJSON);
} catch (error) {
  if (error instanceof SyntaxError) {
    console.error('JSON解析错误:', error.message);
  } else {
    console.error('其他错误:', error.message);
  }
}

// finally 总是执行
let resource;
try {
  resource = acquireResource();
  processResource(resource);
} catch (error) {
  console.error('处理失败:', error);
} finally {
  releaseResource(resource);
}
```

#### Error对象

JavaScript提供了内置的Error对象及其子类。

```javascript
// 基本Error
const error = new Error('Something went wrong');
console.log(error.message); // Something went wrong
console.log(error.name); // Error
console.log(error.stack); // 堆栈信息

// 内置错误类型
const typeError = new TypeError('Wrong type');
const rangeError = new RangeError('Value out of range');
const referenceError = new ReferenceError('Variable not defined');
const syntaxError = new SyntaxError('Invalid syntax');

// 抛出错误
function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
}

try {
  divide(10, 0);
} catch (error) {
  console.error(error.message); // Division by zero
}
```

#### 自定义错误

可以通过继承Error类来创建自定义错误类型。

```javascript
class CustomError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'CustomError';
    this.code = code;
  }
}

class NetworkError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'NetworkError';
    this.statusCode = statusCode;
  }
}

class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

// 使用自定义错误
function validateUser(user) {
  if (!user.name) {
    throw new ValidationError('Name is required', 'name');
  }
  if (!user.email) {
    throw new ValidationError('Email is required', 'email');
  }
  return true;
}

try {
  validateUser({ age: 25 });
} catch (error) {
  if (error instanceof ValidationError) {
    console.error(`Validation error in ${error.field}: ${error.message}`);
  }
}
```

#### Promise错误处理

Promise提供了链式调用中的错误处理机制。

```javascript
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.5;
      if (success) {
        resolve({ data: 'success' });
      } else {
        reject(new Error('Fetch failed'));
      }
    }, 1000);
  });
}

// 基本错误处理
fetchData()
  .then(data => {
    console.log('Data:', data);
    return processData(data);
  })
  .catch(error => {
    console.error('Error:', error.message);
    return { error: true, data: null };
  });

// 多个catch处理不同错误
fetchData()
  .then(data => {
    if (!data) {
      throw new NetworkError('No data received', 404);
    }
    return data;
  })
  .catch(error => {
    if (error instanceof NetworkError) {
      console.error('Network error:', error.statusCode);
    } else {
      console.error('Other error:', error.message);
    }
    throw error;
  })
  .catch(error => {
    console.error('Final error handler:', error.message);
  });

// Promise.all 错误处理
Promise.all([
  fetchData(),
  fetchMoreData()
])
  .then(([data1, data2]) => {
    console.log('All data received');
  })
  .catch(error => {
    console.error('One of the promises failed:', error.message);
  });

// Promise.allSettled - 不会因为某个失败而中断
Promise.allSettled([
  fetchData(),
  fetchMoreData()
])
  .then(results => {
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        console.log('Success:', result.value);
      } else {
        console.error('Failed:', result.reason);
      }
    });
  });
```

#### async/await错误处理

async/await提供了更直观的异步错误处理方式。

```javascript
// 基本错误处理
async function handleAsync() {
  try {
    const data = await fetchData();
    const processed = await processData(data);
    return processed;
  } catch (error) {
    console.error('Async error:', error.message);
    throw error;
  }
}

// 多个await的错误处理
async function handleMultiple() {
  try {
    const data1 = await fetchData();
    const data2 = await fetchMoreData();
    return combineData(data1, data2);
  } catch (error) {
    if (error instanceof NetworkError) {
      console.error('Network issue');
    } else {
      console.error('Unknown error');
    }
    throw error;
  }
}

// 并行请求的错误处理
async function handleParallel() {
  try {
    const [data1, data2] = await Promise.all([
      fetchData(),
      fetchMoreData()
    ]);
    return combineData(data1, data2);
  } catch (error) {
    console.error('Parallel request failed:', error.message);
    throw error;
  }
}

// 错误边界模式
async function withErrorBoundary(fn) {
  try {
    return await fn();
  } catch (error) {
    console.error('Error in boundary:', error.message);
    return { error: true, data: null };
  }
}

const result = await withErrorBoundary(async () => {
  const data = await fetchData();
  return processData(data);
});
```

#### 全局错误处理

全局错误处理可以捕获未处理的错误。

```javascript
// 全局错误处理（浏览器）
window.onerror = function(message, source, lineno, colno, error) {
  console.error('Global error:', message);
  console.error('Source:', source, lineno, colno);
  return true;
};

// 未处理的Promise拒绝
window.addEventListener('unhandledrejection', function(event) {
  console.error('Unhandled promise rejection:', event.reason);
  event.preventDefault();
});

// Node.js全局错误
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
```

#### 面试要点
- **try/catch/finally的执行顺序是什么？**
  try块执行，如果有错误则跳到catch，finally块总是执行；如果try中有return，finally会在return之前执行
- **如何自定义错误类型？**
  继承Error类，设置name属性，可以添加自定义属性如code、statusCode等
- **Promise错误处理的最佳实践是什么？**
  每个Promise链末尾添加catch；使用Promise.allSettled处理部分失败；避免未处理的Promise拒绝
- **async/await中如何处理错误？**
  使用try/catch包裹await；可以配合Promise.all处理并行请求的错误；使用错误边界模式统一处理
- **全局错误捕获的方法有哪些？**
  window.onerror、unhandledrejection事件、process.on('uncaughtException')、process.on('unhandledRejection')

### 8. 内存管理

#### 垃圾回收机制

JavaScript使用自动垃圾回收机制来管理内存。

```javascript
// 标记清除算法（现代浏览器主要使用）
function createObject() {
  const obj = { data: 'test' };
  return obj;
}

const obj1 = createObject();
const obj2 = obj1;

obj1 = null; // obj2仍然引用对象，不会被回收
obj2 = null; // 没有引用了，对象会被回收

// 引用计数算法（旧版IE使用）
function referenceCountExample() {
  const objA = {};
  const objB = {};
  objA.ref = objB;
  objB.ref = objA;
  
  objA = null;
  objB = null;
  // 循环引用导致无法回收（引用计数算法的问题）
}
```

#### 内存泄漏常见场景

```javascript
// 1. 全局变量
var globalData = new Array(1000000);
window.cache = {};

// 2. 闭包引用
function createClosure() {
  const largeData = new Array(1000000);
  return function() {
    console.log(largeData.length);
  };
}

const closure = createClosure();
// largeData一直被闭包引用，无法释放

// 3. 定时器未清除
let timer = setInterval(() => {
  console.log('running');
}, 1000);

// 清除定时器
clearInterval(timer);

// 4. DOM引用
let element = document.getElementById('myElement');
element = null; // 解除引用

// 5. 事件监听器未移除
const handler = () => console.log('clicked');
element.addEventListener('click', handler);

// 移除监听器
element.removeEventListener('click', handler);

// 6. 循环引用
function circularReference() {
  const objA = {};
  const objB = {};
  objA.ref = objB;
  objB.ref = objA;
  return objA;
}
```

#### 内存优化技巧

```javascript
// 1. 及时清除引用
function cleanup() {
  clearInterval(timer);
  element = null;
  largeData = null;
  closure = null;
}

// 2. 使用WeakMap/WeakSet
const weakCache = new WeakMap();

function cacheData(obj, data) {
  weakCache.set(obj, data);
}

const item = {};
cacheData(item, { value: 42 });
item = null; // item被回收，缓存自动清除

// 3. 避免不必要的闭包
function processData(data) {
  return data.map(item => item * 2);
}

// 4. 使用对象池
const objectPool = {
  pool: [],
  
  get() {
    return this.pool.pop() || {};
  },
  
  release(obj) {
    for (const key in obj) {
      delete obj[key];
    }
    this.pool.push(obj);
  }
};

const obj1 = objectPool.get();
obj1.data = 'test';
objectPool.release(obj1);

// 5. 分批处理大数据
function processLargeArray(array, chunkSize, callback) {
  let index = 0;
  
  function processChunk() {
    const chunk = array.slice(index, index + chunkSize);
    callback(chunk);
    index += chunkSize;
    
    if (index < array.length) {
      setTimeout(processChunk, 0);
    }
  }
  
  processChunk();
}

const largeArray = new Array(1000000).fill(0);
processLargeArray(largeArray, 1000, chunk => {
  console.log('Processing chunk:', chunk.length);
});
```

#### 内存检测与调试

```javascript
// 使用Chrome DevTools
// 1. Performance标签页：记录内存使用情况
// 2. Memory标签页：堆快照、内存分配时间线

// 示例：检测内存泄漏
function detectMemoryLeak() {
  const elements = [];
  
  setInterval(() => {
    const div = document.createElement('div');
    div.innerHTML = 'Element ' + elements.length;
    document.body.appendChild(div);
    elements.push(div);
    
    if (elements.length > 100) {
      console.warn('Possible memory leak detected');
    }
  }, 100);
}

// 使用performance.memory（Chrome）
if (performance.memory) {
  console.log('Used JS heap size:', performance.memory.usedJSHeapSize);
  console.log('Total JS heap size:', performance.memory.totalJSHeapSize);
  console.log('JS heap size limit:', performance.memory.jsHeapSizeLimit);
}
```

#### 面试要点
- **JavaScript的垃圾回收机制是什么？**
  主要使用标记清除算法，从根对象开始标记可达对象，未标记的对象会被回收；旧版浏览器使用引用计数算法
- **常见的内存泄漏场景有哪些？**
  全局变量、闭包引用、定时器未清除、DOM引用、事件监听器未移除、循环引用
- **如何检测和解决内存泄漏？**
  使用Chrome DevTools的Memory和Performance标签页；及时清除引用和定时器；使用WeakMap/WeakSet
- **WeakMap和WeakSet的作用是什么？**
  键是弱引用，不会阻止垃圾回收；适合缓存和关联数据；没有size属性，不可遍历
- **如何优化JavaScript的内存使用？**
  及时释放引用、避免不必要的闭包、使用对象池、分批处理大数据、使用WeakMap/WeakSet

## 实战练习

### 1. 实现防抖函数

```javascript
function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

// 使用示例
const debouncedSearch = debounce(function(query) {
  console.log('Searching for:', query);
}, 300);

// 输入时调用
// debouncedSearch('JavaScript');
```

### 2. 实现节流函数

```javascript
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const context = this;
    const args = arguments;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// 使用示例
const throttledScroll = throttle(function() {
  console.log('Scroll event');
}, 100);

// 滚动时调用
// window.addEventListener('scroll', throttledScroll);
```

### 3. 实现深拷贝

```javascript
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  
  if (obj instanceof Map) {
    const clonedMap = new Map();
    hash.set(obj, clonedMap);
    obj.forEach((value, key) => {
      clonedMap.set(deepClone(key, hash), deepClone(value, hash));
    });
    return clonedMap;
  }
  
  if (obj instanceof Set) {
    const clonedSet = new Set();
    hash.set(obj, clonedSet);
    obj.forEach(value => {
      clonedSet.add(deepClone(value, hash));
    });
    return clonedSet;
  }
  
  if (obj instanceof Array) {
    const clonedArr = [];
    hash.set(obj, clonedArr);
    obj.forEach((item, index) => {
      clonedArr[index] = deepClone(item, hash);
    });
    return clonedArr;
  }
  
  const clonedObj = {};
  hash.set(obj, clonedObj);
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clonedObj[key] = deepClone(obj[key], hash);
    }
  }
  
  const symbolKeys = Object.getOwnPropertySymbols(obj);
  for (const symKey of symbolKeys) {
    clonedObj[symKey] = deepClone(obj[symKey], hash);
  }
  
  return clonedObj;
}

// 使用示例
const original = { 
  name: 'Alice', 
  age: 25, 
  address: { 
    city: 'New York', 
    zip: 10001 
  },
  hobbies: ['reading', 'coding']
};

const cloned = deepClone(original);
console.log(cloned);

// 测试循环引用
const obj = {};
obj.self = obj;
const clonedObj = deepClone(obj);
console.log(clonedObj.self === clonedObj); // true

// 测试其他类型
const complexObj = {
  date: new Date(),
  regex: /test/g,
  map: new Map([['key', 'value']]),
  set: new Set([1, 2, 3]),
  [Symbol('id')]: 'symbol value'
};
const clonedComplex = deepClone(complexObj);
console.log(clonedComplex);
```

## 学习建议

### 1. 学习顺序
1. **基础概念**：作用域、this、原型链
2. **异步编程**：回调、Promise、async/await
3. **ES6+特性**：let/const、箭头函数、解构等
4. **函数式编程**：纯函数、高阶函数
5. **性能优化**：内存管理、异步优化

### 2. 学习方法
- **理论结合实践**：理解概念后立即通过代码练习巩固
- **深入理解原理**：不仅要知道如何使用，还要理解底层原理
- **多做实战练习**：通过实际项目和练习题提高编程能力
- **阅读优秀代码**：学习开源项目中的代码风格和最佳实践
- **定期复习**：JavaScript核心概念需要反复理解和应用

### 3. 常见误区
- **混淆var、let、const的作用域**
- **对this指向理解不清**
- **异步编程中的回调地狱**
- **原型链继承的复杂性**
- **内存泄漏问题**

### 4. 进阶学习资源
- **书籍**：《JavaScript高级程序设计》、《你不知道的JavaScript》
- **在线课程**：MDN文档、前端进阶课程
- **实践项目**：通过小型项目练习JavaScript核心技能
- **开源贡献**：参与开源项目，提高代码质量

## 总结

JavaScript核心知识是前端开发的基础，掌握这些概念对于理解和使用现代前端框架至关重要。本模块涵盖了JavaScript的核心概念、高级特性和实战技巧，通过系统学习和实践，你将能够：

1. **理解JavaScript的执行机制**：作用域、闭包、原型链等核心概念
2. **掌握异步编程**：Promise、async/await等现代异步编程方式
3. **使用ES6+特性**：提高代码可读性和开发效率
4. **编写高质量代码**：函数式编程思想、错误处理、内存优化
5. **为框架学习打下基础**：Vue等前端框架的底层实现依赖于JavaScript核心概念

通过本模块的学习，你将建立起完整的JavaScript知识体系，为后续的前端开发和框架学习做好充分准备。