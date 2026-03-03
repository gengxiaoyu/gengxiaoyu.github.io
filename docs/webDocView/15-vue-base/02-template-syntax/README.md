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

```vue
<template>
  <div>
    <p>{{ message }}</p> <!-- 基本文本插值 -->
    <p>{{ message + ' World' }}</p> <!-- 表达式 -->
    <p>{{ isTrue ? 'Yes' : 'No' }}</p> <!-- 三元表达式 -->
    <p>{{ message.split('').reverse().join('') }}</p> <!-- 方法调用 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello',
      isTrue: true
    }
  }
}
</script>
```

#### 原始HTML

```vue
<template>
  <div>
    <p>{{ rawHtml }}</p> <!-- 会显示为纯文本 -->
    <p v-html="rawHtml"></p> <!-- 会渲染为HTML -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      rawHtml: '<span style="color: red;">This is red</span>'
    }
  }
}
</script>
```

#### 属性绑定

```vue
<template>
  <div>
    <div v-bind:id="dynamicId"></div> <!-- 完整语法 -->
    <div :id="dynamicId"></div> <!-- 缩写语法 -->
    <div :class="{ active: isActive, 'text-danger': hasError }"></div> <!-- 类绑定 -->
    <div :style="{ color: textColor, fontSize: fontSize + 'px' }"></div> <!-- 样式绑定 -->
    <a :href="url">Link</a> <!-- 链接绑定 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicId: 'container',
      isActive: true,
      hasError: false,
      textColor: 'blue',
      fontSize: 16,
      url: 'https://vuejs.org'
    }
  }
}
</script>
```

### 2. 指令系统

#### 条件渲染

```vue
<template>
  <div>
    <p v-if="seen">Now you see me</p> <!-- 条件渲染 -->
    <p v-else>Now you don't</p> <!--  else分支 -->
    
    <div v-if="type === 'A'">Type A</div>
    <div v-else-if="type === 'B'">Type B</div>
    <div v-else>Other Type</div>
    
    <p v-show="isVisible">Hello</p> <!-- 条件显示（通过CSS） -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      seen: true,
      type: 'A',
      isVisible: true
    }
  }
}
</script>
```

#### 特殊指令

```vue
<template>
  <div>
    <!-- v-pre: 跳过编译过程，直接输出原始内容 -->
    <div v-pre>{{ this will not be compiled }}</div>
    
    <!-- v-cloak: 在Vue实例编译完成前隐藏元素，编译完成后移除 -->
    <style>
      [v-cloak] {
        display: none;
      }
    </style>
    <div v-cloak>
      {{ message }}
    </div>
    
    <!-- v-once: 只渲染元素和组件一次，之后的更新将被忽略 -->
    <div v-once>
      <h1>{{ message }}</h1>
      <p>{{ timestamp }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello Vue!',
      timestamp: Date.now()
    }
  },
  mounted() {
    // 修改message和timestamp
    setTimeout(() => {
      this.message = 'Updated!';
      this.timestamp = Date.now();
    }, 2000);
  }
}
</script>

<!-- v-pre应用场景 -->
<!-- 1. 显示原始模板语法 -->
<div v-pre>
  <p>{{ this is raw text }}</p>
  <p>v-if="condition"</p>
</div>

<!-- 2. 避免编译大型静态内容 -->
<div v-pre>
  <pre>
    {{ large static content }}
  </pre>
</div>

<!-- v-cloak应用场景 -->
<!-- 1. 防止未编译的模板闪烁 -->
<style>
  [v-cloak] {
    display: none;
  }
</style>
<div id="app" v-cloak>
  {{ message }}
</div>

<!-- 2. 配合CSS实现加载动画 -->
<style>
  [v-cloak] {
    display: none;
  }
  
  .loading {
    display: block;
    text-align: center;
    padding: 20px;
  }
</style>
<div id="app">
  <div v-cloak>
    {{ message }}
  </div>
  <div v-if="!isLoaded" class="loading">
    Loading...
  </div>
</div>

<!-- v-once应用场景 -->
<!-- 1. 静态内容优化 -->
<div v-once>
  <h1>{{ staticTitle }}</h1>
  <p>{{ staticDescription }}</p>
</div>

<!-- 2. 初始值显示 -->
<div>
  <p>Initial value: <span v-once>{{ initialValue }}</span></p>
  <p>Current value: {{ currentValue }}</p>
</div>

<!-- 3. 组件优化 -->
<static-component v-once></static-component>

<!-- 4. 列表初始值 -->
<ul>
  <li v-for="item in initialItems" v-once :key="item.id">
    {{ item.text }}
  </li>
</ul>
```

#### 列表渲染

```vue
<template>
  <div>
    <!-- 基本列表渲染 -->
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.text }}
      </li>
    </ul>
    
    <!-- 带索引的列表渲染 -->
    <ul>
      <li v-for="(item, index) in items" :key="item.id">
        {{ index }}: {{ item.text }}
      </li>
    </ul>
    
    <!-- 对象遍历 -->
    <ul>
      <li v-for="(value, key) in object" :key="key">
        {{ key }}: {{ value }}
      </li>
    </ul>
    
    <!-- 数字遍历 -->
    <ul>
      <li v-for="n in 10" :key="n">
        {{ n }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { id: 1, text: 'Item 1' },
        { id: 2, text: 'Item 2' },
        { id: 3, text: 'Item 3' }
      ],
      object: {
        name: 'Vue',
        version: '3.0',
        author: 'Evan You'
      }
    }
  }
}
</script>
```

#### 事件处理

```vue
<template>
  <div>
    <!-- 基本事件监听 -->
    <button v-on:click="greet">Greet</button>
    <button @click="greet">Greet (缩写)</button>
    
    <!-- 带参数的事件处理 -->
    <button @click="say('hello')">Say Hello</button>
    
    <!-- 带事件对象的事件处理 -->
    <button @click="warn('Form cannot be submitted yet.', $event)">Submit</button>
    
    <!-- 事件修饰符 -->
    <a @click.stop="doThis">Stop propagation</a>
    <form @submit.prevent="onSubmit">Submit</form>
    <div @click.capture="doThis">Capture</div>
    <div @click.self="doThat">Only self</div>
    <button @click.once="doOnce">Once</button>
    
    <!-- 键盘事件修饰符 -->
    <input @keyup.enter="submit">
    <input @keyup.page-down="onPageDown">
    
    <!-- 鼠标事件修饰符 -->
    <button @click.left="leftClick">Left Click</button>
    <button @click.right="rightClick">Right Click</button>
    
    <!-- .passive修饰符 -->
    <div @scroll.passive="onScroll" class="scroll-container">
      <div class="scroll-content">
        <p v-for="n in 100" :key="n">Scroll item {{ n }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    greet() {
      alert('Hello!');
    },
    say(message) {
      alert(message);
    },
    warn(message, event) {
      if (event) {
        event.preventDefault();
      }
      alert(message);
    },
    doThis() {
      console.log('doThis');
    },
    onSubmit() {
      console.log('Submitted');
    },
    doThat() {
      console.log('doThat');
    },
    doOnce() {
      console.log('Do once');
    },
    submit() {
      console.log('Submit form');
    },
    onPageDown() {
      console.log('Page down');
    },
    leftClick() {
      console.log('Left click');
    },
    rightClick() {
      console.log('Right click');
    },
    onScroll(event) {
      console.log('Scrolling...', event.target.scrollTop);
    }
  }
}
</script>

<style>
.scroll-container {
  height: 200px;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 10px;
}

.scroll-content {
  height: 1000px;
}
</style>

<!-- .passive修饰符应用场景 -->

<!-- 1. 滚动事件优化 -->
<div @scroll.passive="handleScroll" class="scroll-container">
  <!-- 内容 -->
</div>

<!-- 2. 触摸事件优化（移动端） -->
<div @touchmove.passive="handleTouchMove" class="touch-container">
  <!-- 内容 -->
</div>

<!-- 3. 鼠标滚轮事件优化 -->
<div @wheel.passive="handleWheel" class="wheel-container">
  <!-- 内容 -->
</div>

<!-- passive修饰符原理 -->
<!-- 传统事件监听器 -->
<!-- element.addEventListener('scroll', handler, { passive: false }); -->
<!-- 浏览器会等待handler执行完成，可能影响滚动性能 -->

<!-- passive事件监听器 -->
<!-- element.addEventListener('scroll', handler, { passive: true }); -->
<!-- 浏览器不会等待handler执行完成，立即执行默认行为，提升性能 -->

<!-- Vue中的passive修饰符 -->
<!-- <div @scroll.passive="handleScroll"> -->
<!-- 等同于 -->
<!-- element.addEventListener('scroll', handler, { passive: true }); -->

<!-- 注意：passive与prevent不能同时使用 -->
<!-- 错误示例 -->
<!-- <div @scroll.passive.prevent="onScroll"></div> -->

<!-- 正确示例：如果需要prevent，不要使用passive -->
<!-- <div @scroll="onScroll"></div> -->
```

#### 表单处理

```vue
<template>
  <div>
    <!-- 文本框 -->
    <input v-model="message" placeholder="Enter a message">
    <p>Message is: {{ message }}</p>
    
    <!-- 多行文本 -->
    <textarea v-model="message2" placeholder="Enter some text"></textarea>
    <p>Message is: {{ message2 }}</p>
    
    <!-- 复选框 -->
    <input type="checkbox" id="checkbox" v-model="checked">
    <label for="checkbox">{{ checked }}</label>
    
    <!-- 多个复选框 -->
    <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
    <label for="jack">Jack</label>
    <input type="checkbox" id="john" value="John" v-model="checkedNames">
    <label for="john">John</label>
    <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
    <label for="mike">Mike</label>
    <p>Checked names: {{ checkedNames }}</p>
    
    <!-- 单选框 -->
    <input type="radio" id="one" value="One" v-model="picked">
    <label for="one">One</label>
    <input type="radio" id="two" value="Two" v-model="picked">
    <label for="two">Two</label>
    <p>Picked: {{ picked }}</p>
    
    <!-- 下拉框 -->
    <select v-model="selected">
      <option disabled value="">Please select one</option>
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>
    <p>Selected: {{ selected }}</p>
    
    <!-- 多选下拉框 -->
    <select v-model="selectedMulti" multiple>
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>
    <p>Selected: {{ selectedMulti }}</p>
    
    <!-- 表单修饰符 -->
    <input v-model.lazy="lazyMessage" placeholder="Lazy update">
    <p>Lazy message: {{ lazyMessage }}</p>
    
    <input v-model.number="age" type="number" placeholder="Number">
    <p>Age: {{ age }} (type: {{ typeof age }})</p>
    
    <input v-model.trim="trimmedMessage" placeholder="Trim whitespace">
    <p>Trimmed message: "{{ trimmedMessage }}"</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      message2: '',
      checked: false,
      checkedNames: [],
      picked: '',
      selected: '',
      selectedMulti: [],
      lazyMessage: '',
      age: '',
      trimmedMessage: ''
    }
  }
}
</script>
```

#### 自定义表单控件

```vue
<template>
  <div>
    <!-- 自定义复选框组件 -->
    <custom-checkbox v-model="checked">Check me</custom-checkbox>
    <p>Checked: {{ checked }}</p>
    
    <!-- 自定义单选框组件 -->
    <custom-radio v-model="selected" value="option1">Option 1</custom-radio>
    <custom-radio v-model="selected" value="option2">Option 2</custom-radio>
    <p>Selected: {{ selected }}</p>
    
    <!-- 自定义输入框组件 -->
    <custom-input v-model="text" placeholder="Enter text"></custom-input>
    <p>Text: {{ text }}</p>
    
    <!-- 自定义选择框组件 -->
    <custom-select v-model="option" :options="options"></custom-select>
    <p>Selected: {{ option }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      selected: 'option1',
      text: '',
      option: '',
      options: [
        { value: 'a', label: 'Option A' },
        { value: 'b', label: 'Option B' },
        { value: 'c', label: 'Option C' }
      ]
    }
  }
}
</script>

<!-- 自定义复选框组件 CustomCheckbox.vue -->
<template>
  <label class="custom-checkbox">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    >
    <span class="checkbox-box"></span>
    <slot></slot>
  </label>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue']
}
</script>

<style>
.custom-checkbox {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.custom-checkbox input {
  display: none;
}

.checkbox-box {
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-radius: 4px;
  margin-right: 8px;
  position: relative;
}

.custom-checkbox input:checked + .checkbox-box {
  background-color: #4CAF50;
  border-color: #4CAF50;
}

.custom-checkbox input:checked + .checkbox-box::after {
  content: '✓';
  position: absolute;
  color: white;
  font-size: 14px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>

<!-- 自定义单选框组件 CustomRadio.vue -->
<template>
  <label class="custom-radio">
    <input
      type="radio"
      :value="value"
      :checked="modelValue === value"
      @change="$emit('update:modelValue', value)"
    >
    <span class="radio-box"></span>
    <slot></slot>
  </label>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    value: {
      type: [String, Number],
      required: true
    }
  },
  emits: ['update:modelValue']
}
</script>

<style>
.custom-radio {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  margin-right: 16px;
}

.custom-radio input {
  display: none;
}

.radio-box {
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-radius: 50%;
  margin-right: 8px;
  position: relative;
}

.custom-radio input:checked + .radio-box {
  border-color: #4CAF50;
}

.custom-radio input:checked + .radio-box::after {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #4CAF50;
  border-radius: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>

<!-- 自定义输入框组件 CustomInput.vue -->
<template>
  <div class="custom-input">
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
    >
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue', 'focus', 'blur']
}
</script>

<style>
.custom-input input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
}

.custom-input input:focus {
  border-color: #4CAF50;
}
</style>

<!-- 自定义选择框组件 CustomSelect.vue -->
<template>
  <div class="custom-select">
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:modelValue']
}
</script>

<style>
.custom-select select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
  min-width: 200px;
}

.custom-select select:focus {
  border-color: #4CAF50;
}
</style>

<!-- 自定义表单控件最佳实践 -->

<!-- 1. 使用v-model的props和emits -->
<template>
  <custom-input v-model="message"></custom-input>
</template>

<!-- CustomInput.vue -->
<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue']
}
</script>

<!-- 2. 支持v-model修饰符 -->
<template>
  <custom-input v-model.lazy="message"></custom-input>
  <custom-input v-model.trim="message"></custom-input>
  <custom-input v-model.number="age"></custom-input>
</template>

<!-- CustomInput.vue -->
<script>
export default {
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    modelModifiers: {
      default: () => ({})
    }
  },
  emits: ['update:modelValue'],
  methods: {
    emitValue(event) {
      let value = event.target.value;
      
      if (this.modelModifiers.trim) {
        value = value.trim();
      }
      
      if (this.modelModifiers.number) {
        value = Number(value);
      }
      
      if (!this.modelModifiers.lazy) {
        this.$emit('update:modelValue', value);
      }
    }
  }
}
</script>

<!-- 3. 支持多个v-model -->
<template>
  <user-name
    v-model:first-name="firstName"
    v-model:last-name="lastName"
  ></user-name>
</template>

<!-- UserName.vue -->
<script>
export default {
  props: {
    firstName: String,
    lastName: String
  },
  emits: ['update:firstName', 'update:lastName']
}
</script>

<!-- 4. 自定义表单验证 -->
<template>
  <custom-input
    v-model="email"
    :error="emailError"
    @blur="validateEmail"
  ></custom-input>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      emailError: ''
    }
  },
  methods: {
    validateEmail() {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(this.email)) {
        this.emailError = 'Invalid email';
      } else {
        this.emailError = '';
      }
    }
  }
}
</script>
```

### 3. 模板语法进阶

#### 计算属性

```vue
<template>
  <div>
    <p>Original message: {{ message }}</p>
    <p>Computed reversed message: {{ reversedMessage }}</p>
    <p>Computed with getter/setter: {{ fullName }}</p>
    <button @click="updateName">Update Full Name</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello',
      firstName: 'John',
      lastName: 'Doe'
    }
  },
  computed: {
    // 计算属性的 getter
    reversedMessage() {
      return this.message.split('').reverse().join('');
    },
    // 计算属性的 getter 和 setter
    fullName: {
      get() {
        return this.firstName + ' ' + this.lastName;
      },
      set(newValue) {
        const names = newValue.split(' ');
        this.firstName = names[0];
        this.lastName = names[names.length - 1];
      }
    }
  },
  methods: {
    updateName() {
      this.fullName = 'Jane Smith';
    }
  }
}
</script>
```

#### 监听属性

```vue
<template>
  <div>
    <p>First name: <input v-model="firstName"></p>
    <p>Last name: <input v-model="lastName"></p>
    <p>Full name: {{ fullName }}</p>
    <p>Message: <input v-model="message"></p>
    <p>Watched message: {{ watchedMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe',
      fullName: 'John Doe',
      message: '',
      watchedMessage: ''
    }
  },
  watch: {
    // 监听单个属性
    firstName(newVal, oldVal) {
      this.fullName = newVal + ' ' + this.lastName;
    },
    lastName(newVal, oldVal) {
      this.fullName = this.firstName + ' ' + newVal;
    },
    // 监听对象
    message: {
      handler(newVal, oldVal) {
        this.watchedMessage = newVal;
      },
      immediate: true, // 立即执行
      deep: true // 深度监听
    }
  }
}
</script>
```

#### 自定义指令

```vue
<template>
  <div>
    <!-- 全局自定义指令 -->
    <input v-focus>
    
    <!-- 局部自定义指令 -->
    <div v-highlight="{ color: 'red', backgroundColor: 'yellow' }">
      Highlighted text
    </div>
  </div>
</template>

<script>
export default {
  directives: {
    // 局部自定义指令
    highlight: {
      // 指令的定义
      bind(el, binding) {
        el.style.color = binding.value.color;
        el.style.backgroundColor = binding.value.backgroundColor;
      },
      // 当绑定值更新时
      update(el, binding) {
        el.style.color = binding.value.color;
        el.style.backgroundColor = binding.value.backgroundColor;
      }
    }
  }
}
</script>

<script>
// 全局自定义指令
Vue.directive('focus', {
  // 当被绑定的元素插入到DOM中时
  inserted(el) {
    // 聚焦元素
    el.focus();
  }
});
</script>
```

#### 模板引用

```vue
<template>
  <div>
    <!-- 基本用法 -->
    <input ref="inputRef" placeholder="Focus me">
    <button @click="focusInput">Focus Input</button>
    
    <!-- 访问DOM元素 -->
    <div ref="containerRef" class="container">
      <p>Container content</p>
    </div>
    <button @click="logContainer">Log Container</button>
    
    <!-- 访问子组件 -->
    <child-component ref="childRef"></child-component>
    <button @click="callChildMethod">Call Child Method</button>
    
    <!-- v-for中的ref -->
    <ul>
      <li v-for="item in items" :key="item.id" :ref="el => setItemRef(el, item.id)">
        {{ item.text }}
      </li>
    </ul>
    <button @click="logItemRefs">Log Item Refs</button>
    
    <!-- 动态ref -->
    <div :ref="dynamicRef">Dynamic Ref</div>
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
      message: 'Hello Vue!',
      dynamicRef: 'containerRef',
      items: [
        { id: 1, text: 'Item 1' },
        { id: 2, text: 'Item 2' },
        { id: 3, text: 'Item 3' }
      ],
      itemRefs: {}
    }
  },
  mounted() {
    // 在mounted之后才能访问ref
    console.log('Input ref:', this.$refs.inputRef);
    console.log('Container ref:', this.$refs.containerRef);
    console.log('Child ref:', this.$refs.childRef);
    
    // 自动聚焦输入框
    this.$refs.inputRef.focus();
  },
  methods: {
    focusInput() {
      this.$refs.inputRef.focus();
    },
    logContainer() {
      console.log('Container:', this.$refs.containerRef);
      console.log('Container height:', this.$refs.containerRef.offsetHeight);
    },
    callChildMethod() {
      this.$refs.childRef.childMethod();
    },
    setItemRef(el, id) {
      if (el) {
        this.itemRefs[id] = el;
      }
    },
    logItemRefs() {
      console.log('Item refs:', this.itemRefs);
    }
  }
}
</script>

<!-- 子组件 ChildComponent.vue -->
<template>
  <div>
    <h3>Child Component</h3>
    <p>{{ childMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      childMessage: 'Hello from child!'
    }
  },
  methods: {
    childMethod() {
      console.log('Child method called!');
      alert('Child method called!');
    }
  }
}
</script>

<!-- 模板引用ref详细说明 -->

<!-- 1. ref的基本用法 -->
<input ref="myInput">
<button @click="$refs.myInput.focus()">Focus</button>

<!-- 2. 在v-for中使用ref -->
<ul>
  <li v-for="item in items" :key="item.id" :ref="setItemRef">
    {{ item.text }}
  </li>
</ul>

<script>
export default {
  data() {
    return {
      items: [...],
      itemRefs: []
    }
  },
  methods: {
    setItemRef(el) {
      if (el) {
        this.itemRefs.push(el);
      }
    }
  }
}
</script>

<!-- 3. 访问子组件 -->
<child-component ref="myChild"></child-component>

<script>
export default {
  methods: {
    callChildMethod() {
      this.$refs.myChild.childMethod();
    }
  }
}
</script>

<!-- 4. ref的注意事项 -->
<!-- ref只在组件渲染完成后才能访问 -->
<!-- 不要在模板中直接使用$refs -->
<!-- 不要在computed中使用$refs -->
<!-- ref是响应式的，但ref指向的元素不是响应式的 -->
```

#### 模板注释

```vue
<template>
  <div>
    <!-- HTML注释：会被保留在DOM中 -->
    <!-- 这是一个HTML注释 -->
    <p>Content</p>
    
    <!-- Vue注释：会被编译器移除 -->
    <!-- {{ 这个注释不会被渲染 }} -->
    <p>Content</p>
    
    <!-- 条件注释 -->
    <!-- <div v-if="false">这个div不会被渲染</div> -->
    <p>Content</p>
    
    <!-- 多行注释 -->
    <!--
      这是一个多行注释
      可以包含多行内容
      不会被渲染到DOM中
    -->
    <p>Content</p>
  </div>
</template>

<!-- 模板注释详细说明 -->

<!-- 1. HTML注释 -->
<!-- 这个注释会保留在DOM中 -->
<div>Content</div>

<!-- 2. Vue注释 -->
<!-- {{ 这个注释会被编译器移除 }} -->
<div>Content</div>

<!-- 3. 条件注释 -->
<!-- <div v-if="false">这个div不会被渲染</div> -->
<div>Content</div>

<!-- 4. 多行注释 -->
<!--
  这是一个多行注释
  可以包含多行内容
-->
<div>Content</div>
```

#### 模板表达式限制

```vue
<template>
  <div>
    <!-- ✅ 正确：使用表达式 -->
    <p>{{ message + ' World' }}</p>
    <p>{{ isTrue ? 'Yes' : 'No' }}</p>
    <p>{{ message.split('').reverse().join('') }}</p>
    
    <!-- ❌ 错误：使用语句 -->
    <!-- <p>{{ var a = 1 }}</p> -->
    <!-- <p>{{ if (true) { return 'yes' } } }</p> -->
    <!-- <p>{{ for (let i = 0; i < 10; i++) { } }}</p> -->
    
    <!-- ✅ 正确：访问组件实例属性 -->
    <p>{{ this.message }}</p>
    <p>{{ this.greet() }}</p>
    
    <!-- ❌ 错误：访问全局对象 -->
    <!-- <p>{{ window.location.href }}</p> -->
    <!-- <p>{{ document.title }}</p> -->
    <!-- <p>{{ console.log('hello') }}</p> -->
    
    <!-- ✅ 推荐：使用计算属性 -->
    <p>{{ reversedMessage }}</p>
    <p>{{ fullName }}</p>
    
    <!-- ❌ 不推荐：在模板中使用复杂逻辑 -->
    <!-- <p>{{ message.split('').reverse().join('').toUpperCase() }}</p> -->
    <!-- <p>{{ firstName + ' ' + lastName }}</p> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello Vue!',
      isTrue: true,
      firstName: 'John',
      lastName: 'Doe'
    }
  },
  computed: {
    reversedMessage() {
      return this.message.split('').reverse().join('');
    },
    fullName() {
      return this.firstName + ' ' + this.lastName;
    }
  },
  methods: {
    greet() {
      return 'Hello!';
    }
  }
}
</script>

<!-- 模板表达式限制详细说明 -->

<!-- 1. 只能使用表达式，不能使用语句 -->
<!-- ✅ 正确 -->
{{ message + ' World' }}
{{ isTrue ? 'Yes' : 'No' }}
{{ message.split('').reverse().join('') }}

<!-- ❌ 错误 -->
{{ var a = 1 }}
{{ if (true) { return 'yes' } } }
{{ for (let i = 0; i < 10; i++) { } }}

<!-- 2. 不能访问全局对象 -->
<!-- ✅ 正确 -->
{{ this.message }}
{{ this.greet() }}

<!-- ❌ 错误 -->
{{ window.location.href }}
{{ document.title }}
{{ console.log('hello') }}

<!-- 3. 表达式应该保持简单 -->
<!-- ✅ 推荐：将复杂逻辑移到计算属性 -->
{{ reversedMessage }}

<!-- ❌ 不推荐：在模板中使用复杂表达式 -->
{{ message.split('').reverse().join('').toUpperCase() }}

<!-- 4. 模板表达式的最佳实践 -->
<!-- ✅ 推荐：使用计算属性 -->
<p>{{ fullName }}</p>

<!-- ✅ 推荐：使用方法 -->
<p>{{ formatDate(date) }}</p>

<!-- ❌ 不推荐：在模板中使用复杂逻辑 -->
<p>{{ firstName + ' ' + lastName }}</p>
<p>{{ new Date(date).toLocaleDateString() }}</p>
```

### 4. 模板编译

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