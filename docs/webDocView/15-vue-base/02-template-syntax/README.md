---
title: Vue模板语法
createTime: 2026/02/04 15:24:07
permalink: /webDocView/15-vue-base/02-template-syntax/
---

# Vue模板语法

## 模块概述

本模块涵盖Vue框架的模板语法，是使用Vue进行开发的基础。通过学习本模块，你将掌握Vue的插值表达式、指令系统、过滤器、计算属性等核心模板语法，为构建动态、响应式的Vue应用打下坚实的基础。

## 知识点清单

### 1. 插值表达式
- **文本插值**：`{{ message }}`
- **原始HTML**：`v-html`
- **属性绑定**：`v-bind:` 或 `:`
- **表达式**：支持JavaScript表达式
- **计算属性**：`computed`
- **监听属性**：`watch`

### 2. 指令系统
- **内置指令**：`v-if`、`v-else`、`v-else-if`、`v-for`、`v-show`、`v-model`、`v-on`、`v-bind`、`v-pre`、`v-cloak`、`v-once`
- **自定义指令**：全局指令、局部指令
- **指令修饰符**：`.prevent`、`.stop`、`.capture`、`.self`、`.once`等
- **指令缩写**：`v-bind:` → `:`, `v-on:` → `@`

### 3. 模板语法进阶
- **模板表达式**：JavaScript表达式的使用
- **模板变量**：`v-for`中的作用域
- **模板引用**：`ref`属性
- **模板注释**：HTML注释和Vue注释
- **模板编译**：模板到渲染函数的转换

### 4. 表单处理
- **表单绑定**：`v-model`指令
- **表单修饰符**：`.lazy`、`.number`、`.trim`
- **表单类型**：文本框、复选框、单选框、下拉框
- **自定义表单控件**：`v-model`的自定义实现

### 5. 事件处理
- **事件监听**：`v-on`指令
- **事件修饰符**：`.stop`、`.prevent`、`.capture`、`.self`、`.once`、`.passive`
- **键盘事件**：`.enter`、`.tab`、`.delete`等
- **鼠标事件**：`.left`、`.right`、`.middle`
- **事件对象**：`$event`

## 核心概念详解

### 1. 插值表达式

#### 文本插值

```

#### 模板编译

#### 模板到渲染函数的转换

```vue
<!-- 模板 -->
<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <p v-if="showMessage">{{ message }}</p>
    <button @click="toggleMessage">Toggle Message</button>
  </div>
</template>

<!-- 编译后的渲染函数 -->
<script>
export default {
  data() {
    return {
      title: 'Vue Template Syntax',
      message: 'Hello Vue!',
      showMessage: true
    }
  },
  methods: {
    toggleMessage() {
      this.showMessage = !this.showMessage;
    }
  },
  render() {
    return Vue.h('div', {
      attrs: {
        id: 'app'
      }
    }, [
      Vue.h('h1', {}, this.title),
      this.showMessage ? Vue.h('p', {}, this.message) : undefined,
      Vue.h('button', {
        on: {
          click: this.toggleMessage
        }
      }, 'Toggle Message')
    ]);
  }
}
</script>
```

## 实战练习

### 1. 实现一个计数器

```vue
<template>
  <div>
    <h2>Counter: {{ count }}</h2>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
    <button @click="reset">Reset</button>
    <p>Doubled: {{ doubledCount }}</p>
    <p>Trippled: {{ trippledCount }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  computed: {
    doubledCount() {
      return this.count * 2;
    },
    trippledCount() {
      return this.count * 3;
    }
  },
  methods: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
    reset() {
      this.count = 0;
    }
  }
}
</script>
```

### 2. 实现一个待办事项列表

```vue
<template>
  <div>
    <h2>Todo List</h2>
    <input v-model="newTodo" @keyup.enter="addTodo" placeholder="Add a todo">
    <ul>
      <li v-for="(todo, index) in todos" :key="index">
        <input type="checkbox" v-model="todo.completed">
        <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
        <button @click="removeTodo(index)">Remove</button>
      </li>
    </ul>
    <p>Remaining: {{ remainingCount }}</p>
    <button @click="clearCompleted">Clear Completed</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTodo: '',
      todos: [
        { text: 'Learn Vue', completed: false },
        { text: 'Build an app', completed: false },
        { text: 'Deploy to production', completed: false }
      ]
    }
  },
  computed: {
    remainingCount() {
      return this.todos.filter(todo => !todo.completed).length;
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim()) {
        this.todos.push({ text: this.newTodo, completed: false });
        this.newTodo = '';
      }
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed);
    }
  }
}
</script>

<style>
.completed {
  text-decoration: line-through;
  color: #999;
}
</style>
```

### 3. 实现一个表单验证

```vue
<template>
  <div>
    <h2>Form Validation</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="form.name" placeholder="Enter your name">
        <p v-if="errors.name" class="error">{{ errors.name }}</p>
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.email" placeholder="Enter your email">
        <p v-if="errors.email" class="error">{{ errors.email }}</p>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="form.password" placeholder="Enter your password">
        <p v-if="errors.password" class="error">{{ errors.password }}</p>
      </div>
      <button type="submit">Submit</button>
    </form>
    <div v-if="submitted" class="success">
      <h3>Form submitted successfully!</h3>
      <p>Name: {{ form.name }}</p>
      <p>Email: {{ form.email }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: ''
      },
      errors: {},
      submitted: false
    }
  },
  methods: {
    validateForm() {
      this.errors = {};
      
      if (!this.form.name) {
        this.errors.name = 'Name is required';
      }
      
      if (!this.form.email) {
        this.errors.email = 'Email is required';
      } else if (!this.isValidEmail(this.form.email)) {
        this.errors.email = 'Email is not valid';
      }
      
      if (!this.form.password) {
        this.errors.password = 'Password is required';
      } else if (this.form.password.length < 6) {
        this.errors.password = 'Password must be at least 6 characters';
      }
      
      return Object.keys(this.errors).length === 0;
    },
    isValidEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },
    submitForm() {
      if (this.validateForm()) {
        this.submitted = true;
        console.log('Form submitted:', this.form);
      }
    }
  }
}
</script>

<style>
.error {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
.success {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid green;
  background-color: #f0fff0;
}
</style>
```

## 学习建议

### 1. 学习顺序
1. **插值表达式**：掌握基本的文本插值和属性绑定
2. **指令系统**：学习内置指令的使用
3. **事件处理**：掌握事件监听和修饰符
4. **表单处理**：学习表单绑定和验证
5. **计算属性**：理解计算属性的缓存机制
6. **监听属性**：掌握深度监听和立即执行
7. **自定义指令**：学习自定义指令的创建和使用

### 2. 学习方法
- **理论结合实践**：理解语法后通过代码练习巩固
- **官方文档**：参考Vue官方文档的模板语法部分
- **项目实践**：在实际项目中应用所学知识
- **调试技巧**：使用Vue DevTools调试模板

### 3. 常见误区
- **混淆v-if和v-show**：v-if是条件渲染，v-show是条件显示
- **在模板中使用复杂逻辑**：应该将复杂逻辑移到计算属性或方法中
- **忽略key的作用**：在v-for中必须添加key属性
- **滥用watch**：优先使用计算属性而非watch
- **模板表达式过于复杂**：模板表达式应该保持简单

### 4. 进阶学习资源
- **书籍**：《Vue.js实战》、《深入理解Vue.js》
- **文档**：Vue官方文档 - 模板语法
- **课程**：Vue进阶课程
- **源码**：Vue模板编译相关源码

## 总结

Vue模板语法是使用Vue进行开发的基础，掌握这些语法对于构建动态、响应式的Vue应用至关重要。本模块涵盖了Vue的插值表达式、指令系统、过滤器、计算属性等核心模板语法，通过系统学习和实践，你将能够：

1. **构建动态界面**：使用插值表达式和指令创建动态内容
2. **处理用户交互**：使用事件处理和表单绑定
3. **优化性能**：合理使用计算属性和v-show
4. **提高代码可读性**：将复杂逻辑移到计算属性或方法中
5. **扩展功能**：创建自定义指令

通过本模块的学习，你将对Vue模板语法有更深入的理解，为构建复杂的Vue应用打下坚实的基础。