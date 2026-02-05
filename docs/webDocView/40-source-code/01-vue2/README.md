---
title: Vue2 源码解析
createTime: 2026/02/04 15:26:04
permalink: /webDocView/40-source-code/01-vue2/
---
# Vue2 源码解析

## 模块概述

Vue2 源码解析是前端进阶的重要环节，通过深入理解 Vue2 的实现原理，可以帮助我们更好地使用 Vue，解决开发中的问题，甚至为框架贡献代码。本模块将详细解析 Vue2 的核心模块，包括响应式系统、编译模块、虚拟 DOM、生命周期等，帮助你掌握 Vue2 的内部工作原理。

## 源码阅读路线

### 1. 整体架构
- **目录结构**：了解 Vue2 源码的目录结构和模块划分
- **初始化流程**：了解 Vue 实例的创建和初始化过程
- **核心模块**：了解各个核心模块的职责和关系

### 2. 响应式系统
- **Observer**：数据劫持的实现
- **Dep**：依赖收集器
- **Watcher**：观察者
- **响应式原理**：数据变化如何触发视图更新

### 3. 编译模块
- **模板解析**：将模板解析为 AST
- **AST 转换**：优化和转换 AST
- **代码生成**：将 AST 转换为渲染函数

### 4. 虚拟 DOM
- **VNode**：虚拟节点的实现
- **Diff 算法**：节点比较和更新策略
- **Patch 过程**：将虚拟 DOM 转换为真实 DOM

### 5. 生命周期
- **生命周期钩子**：各个生命周期阶段的触发时机
- **生命周期流程**：从创建到销毁的完整流程

### 6. 组件系统
- **组件注册**：全局和局部组件的注册
- **组件实例化**：组件实例的创建过程
- **组件通信**：父子组件之间的通信机制

### 7. 状态管理
- **Vuex 原理**：状态管理的实现
- **插件机制**：Vue 插件的开发和使用

## 核心模块解析

### 1. 响应式系统

#### 核心概念

Vue2 的响应式系统基于 **Object.defineProperty** 实现，通过数据劫持和依赖收集，实现数据变化时自动更新视图。

#### 核心模块

##### Observer

**作用**：负责将数据对象转换为响应式对象，对数据的每个属性进行劫持。

**实现原理**：
- 遍历数据对象的所有属性
- 使用 `Object.defineProperty` 重定义每个属性的 `getter` 和 `setter`
- 在 `getter` 中收集依赖
- 在 `setter` 中触发更新

**代码示例**：

```javascript
// src/core/observer/index.js
class Observer {
  constructor(value) {
    this.value = value;
    this.dep = new Dep();
    def(value, '__ob__', this);
    if (Array.isArray(value)) {
      // 处理数组
      const augment = hasProto
        ? protoAugment
        : copyAugment;
      augment(value, arrayMethods, arrayKeys);
      this.observeArray(value);
    } else {
      // 处理对象
      this.walk(value);
    }
  }

  walk(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i]);
    }
  }

  observeArray(items) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i]);
    }
  }
}

function defineReactive(obj, key, val) {
  const dep = new Dep();
  const property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return;
  }

  // 保存原始的 getter 和 setter
  const getter = property && property.get;
  const setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  // 递归观察子属性
  let childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      const value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        // 收集依赖
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value;
    },
    set: function reactiveSetter(newVal) {
      const value = getter ? getter.call(obj) : val;
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return;
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      // 观察新值
      childOb = !shallow && observe(newVal);
      // 触发更新
      dep.notify();
    }
  });
}
```

##### Dep

**作用**：依赖收集器，用于管理和通知观察者。

**实现原理**：
- 维护一个观察者列表
- 提供 `depend` 方法用于收集依赖
- 提供 `notify` 方法用于通知所有观察者更新

**代码示例**：

```javascript
// src/core/observer/dep.js
class Dep {
  constructor() {
    this.id = uid++;
    this.subs = [];
  }

  addSub(sub) {
    this.subs.push(sub);
  }

  removeSub(sub) {
    remove(this.subs, sub);
  }

  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }

  notify() {
    // 复制观察者列表，避免在更新过程中修改列表
    const subs = this.subs.slice();
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  }
}

// 全局唯一的 Dep.target
Dep.target = null;
const targetStack = [];

function pushTarget(target) {
  if (Dep.target) targetStack.push(Dep.target);
  Dep.target = target;
}

function popTarget() {
  Dep.target = targetStack.pop();
}
```

##### Watcher

**作用**：观察者，负责监听数据变化并执行相应的回调函数。

**实现原理**：
- 在构造函数中获取初始值并收集依赖
- 提供 `update` 方法用于更新值
- 提供 `run` 方法用于执行回调函数

**代码示例**：

```javascript
// src/core/observer/watcher.js
class Watcher {
  constructor(vm, expOrFn, cb, options) {
    this.vm = vm;
    this.cb = cb;
    this.id = ++uid;
    this.active = true;
    this.deps = [];
    this.newDeps = [];
    this.depIds = new Set();
    this.newDepIds = new Set();
    
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn;
    } else {
      this.getter = parsePath(expOrFn);
    }
    
    this.value = this.get();
  }

  get() {
    pushTarget(this);
    let value;
    const vm = this.vm;
    try {
      value = this.getter.call(vm, vm);
    } catch (e) {
      if (this.user) {
        handleError(e, vm, `getter for watcher "${this.expression}"`);
      } else {
        throw e;
      }
    } finally {
      popTarget();
      this.cleanupDeps();
    }
    return value;
  }

  addDep(dep) {
    const id = dep.id;
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id);
      this.newDeps.push(dep);
      if (!this.depIds.has(id)) {
        dep.addSub(this);
      }
    }
  }

  cleanupDeps() {
    let i = this.deps.length;
    while (i--) {
      const dep = this.deps[i];
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this);
      }
    }
    let tmp = this.depIds;
    this.depIds = this.newDepIds;
    this.newDepIds = tmp;
    this.newDepIds.clear();
    tmp = this.deps;
    this.deps = this.newDeps;
    this.newDeps = tmp;
    this.newDeps.length = 0;
  }

  update() {
    if (this.lazy) {
      this.dirty = true;
    } else if (this.sync) {
      this.run();
    } else {
      queueWatcher(this);
    }
  }

  run() {
    if (this.active) {
      const value = this.get();
      if (value !== this.value || isObject(value) || this.deep) {
        const oldValue = this.value;
        this.value = value;
        if (this.user) {
          try {
            this.cb.call(this.vm, value, oldValue);
          } catch (e) {
            handleError(e, this.vm, `callback for watcher "${this.expression}"`);
          }
        } else {
          this.cb.call(this.vm, value, oldValue);
        }
      }
    }
  }

  teardown() {
    if (this.active) {
      if (!this.vm._isBeingDestroyed) {
        remove(this.vm._watchers, this);
      }
      let i = this.deps.length;
      while (i--) {
        this.deps[i].removeSub(this);
      }
      this.active = false;
    }
  }
}
```

#### 响应式流程

1. **初始化**：创建 Vue 实例时，通过 `Observer` 将数据对象转换为响应式对象
2. **依赖收集**：当组件渲染时，会创建 `Watcher` 实例，触发数据的 `getter`，收集依赖
3. **数据更新**：当数据变化时，触发数据的 `setter`，通知所有依赖的 `Watcher` 更新
4. **视图更新**：`Watcher` 执行更新，重新渲染组件，更新视图

### 2. 编译模块

#### 核心概念

编译模块负责将模板转换为渲染函数，是 Vue 模板语法的核心实现。

#### 编译流程

1. **模板解析**：将模板字符串解析为 AST（抽象语法树）
2. **AST 转换**：优化和转换 AST，处理指令、过滤器等
3. **代码生成**：将 AST 转换为渲染函数代码

#### 核心模块

##### 模板解析器

**作用**：将模板字符串解析为 AST。

**实现原理**：
- 使用正则表达式解析模板中的标签、属性、文本等
- 构建嵌套的 AST 节点
- 处理各种指令和表达式

**代码示例**：

```javascript
// src/compiler/parser/index.js
function parse(template, options) {
  const stack = [];
  const errors = [];
  let root = null;
  let currentParent = null;
  let inVPre = false;
  let inPre = false;
  let warned = false;

  function warnOnce(msg) {
    if (!warned) {
      warned = true;
      warn(msg, options.source);
    }
  }

  function advance(n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag() {
    const start = html.match(startTagOpen);
    if (start) {
      const match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      let end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(dynamicArgAttribute) || html.match(attribute))) {
        attr.start = index;
        advance(attr[0].length);
        attr.end = index;
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match;
      }
    }
  }

  function processStartTag(match) {
    const tagName = match.tagName;
    const unarySlash = match.unarySlash;

    if (expectHTML) {
      if (tagName === 'p' && lastTag === 'p') {
        parseEndTag(lastTag);
      }
      if (isNonPhrasingTag(tagName) && lastTag === 'p') {
        parseEndTag('p');
      }
    }

    const unary = isUnaryTag(tagName) || !!unarySlash;

    const l = match.attrs.length;
    const attrs = new Array(l);
    for (let i = 0; i < l; i++) {
      const args = match.attrs[i];
      const value = args[3] || args[4] || args[5] || '';
      const shouldDecodeNewlines = tagName === 'textarea' || tagName === 'pre';
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      };
      if (options.outputSourceRange) {
        attrs[i].start = args.start;
        attrs[i].end = args.end;
      }
    }

    if (!unary) {
      stack.push({
        tag: tagName,
        lowerCasedTag: tagName.toLowerCase(),
        attrs: attrs,
        start: match.start,
        end: match.end
      });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag(tagName, start, end) {
    let pos, lowerCasedTagName;
    if (start == null) start = index;
    if (end == null) end = index;

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    let i = stack.length - 1;
    let j = i;
    while (i >= 0 && stack[i].lowerCasedTag !== lowerCasedTagName) {
      i--;
    }

    if (i >= 0) {
      // Close all the open elements, up the stack
      for (let k = j; k >= i; k--) {
        if (options.end) {
          options.end(stack[k].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = i;
      lastTag = stack.length ? stack[stack.length - 1].tag : undefined;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }

  while (html) {
    last = html;
    // Make sure we're not in a plain text content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      let textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (html.match(comment)) {
          const commentEnd = html.indexOf('-->');
          if (commentEnd >= 0) {
            if (options.comment) {
              options.comment(html.substring(4, commentEnd), index, index + commentEnd + 3);
            }
            advance(commentEnd + 3);
            continue;
          }
        }

        // Doctype:
        if (html.match(doctype)) {
          const doctypeEnd = html.indexOf('>');
          if (doctypeEnd >= 0) {
            advance(doctypeEnd + 1);
            continue;
          }
        }

        // Start tag:
        const startTagMatch = parseStartTag();
        if (startTagMatch) {
          processStartTag(startTagMatch);
          continue;
        }

        // End tag:
        const endTagMatch = html.match(endTag);
        if (endTagMatch) {
          const curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue;
        }
      }

      let text, rest, next;
      if (textEnd >= 0) {
        rest = html.substring(textEnd);
        while (
          !endTagOpen.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) break;
          textEnd += next;
          rest = html.substring(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text, index - text.length, index);
      }
    } else {
      let endTagLength = 0;
      const stackedTag = lastTag.toLowerCase();
      const isStackedTagClosed = stackedTag === 'script' && html.match(scriptStyleRe) ||
                                stackedTag === 'style' && html.match(styleRe) ||
                                stackedTag === 'textarea' && html.match(textareaRe);
      if (isStackedTagClosed) {
        if (stackedTag === 'script' && !inPre) {
          inPre = true;
        }
        endTagLength = stackedTag.length + 3;
      }

      if (html) {
        if (options.chars) {
          options.chars(html, index, index + html.length);
        }
        html = '';
      }
    }

    if (html === last) {
      options.chars && options.chars(html);
      warnOnce(
        'Template compilation error: template may not be valid HTML.'
      );
      break;
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  return root;
}
```

##### AST 转换器

**作用**：优化和转换 AST，处理指令、过滤器等。

**实现原理**：
- 遍历 AST 节点
- 处理各种指令（v-if、v-for、v-model 等）
- 优化静态节点
- 转换表达式

##### 代码生成器

**作用**：将 AST 转换为渲染函数代码。

**实现原理**：
- 遍历 AST 节点
- 生成对应的渲染函数代码
- 处理各种表达式和指令

**代码示例**：

```javascript
// src/compiler/codegen/index.js
function generate(ast, options) {
  const state = new CodegenState(options);
  const code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: `with(this){return ${code}}`,
    staticRenderFns: state.staticRenderFns
  };
}

function genElement(el, state) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state);
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state);
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state);
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state);
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el, state) || 'void 0';
  } else if (el.tag === 'slot') {
    return genSlot(el, state);
  } else {
    // component or element
    let code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      const data = el.plain ? undefined : genData(el, state);

      const children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = `_c('${el.tag}'${
        data ? `,${data}` : '' // data
      }${
        children ? `,${children}` : '' // children
      })`;
    }
    return code;
  }
}
```

### 3. 虚拟 DOM

#### 核心概念

虚拟 DOM 是 Vue 性能优化的重要手段，通过在内存中构建虚拟节点树，减少直接操作 DOM 的次数，提高渲染性能。

#### 核心模块

##### VNode

**作用**：虚拟节点，用于描述真实 DOM 节点的结构。

**实现原理**：
- 使用 JavaScript 对象模拟 DOM 节点
- 包含标签名、属性、子节点等信息
- 提供创建不同类型虚拟节点的方法

**代码示例**：

```javascript
// src/core/vdom/vnode.js
class VNode {
  constructor(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
    this.tag = tag;
    this.data = data;
    this.children = children;
    this.text = text;
    this.elm = elm;
    this.ns = undefined;
    this.context = context;
    this.fnContext = undefined;
    this.fnOptions = undefined;
    this.fnScopeId = undefined;
    this.key = data && data.key;
    this.componentOptions = componentOptions;
    this.componentInstance = undefined;
    this.parent = undefined;
    this.raw = false;
    this.isStatic = false;
    this.isRootInsert = true;
    this.isComment = false;
    this.isCloned = false;
    this.isOnce = false;
    this.asyncFactory = asyncFactory;
    this.asyncMeta = undefined;
    this.isAsyncPlaceholder = false;
  }

  get child() {
    return this.componentInstance;
  }
}

function createEmptyVNode(text) {
  const node = new VNode();
  node.text = text;
  node.isComment = true;
  return node;
}

function createTextVNode(val) {
  return new VNode(undefined, undefined, undefined, String(val));
}

function cloneVNode(vnode, deep) {
  const cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  if (deep && vnode.children) {
    cloned.children = cloneChildren(vnode.children);
  }
  return cloned;
}
```

##### Diff 算法

**作用**：比较新旧虚拟节点树的差异，确定需要更新的节点。

**实现原理**：
- 同级比较，不跨层级比较
- 先比较节点类型
- 再比较节点属性
- 最后比较子节点
- 使用 key 来优化列表比较

**代码示例**：

```javascript
// src/core/vdom/patch.js
function patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly) {
  if (oldVnode === vnode) {
    return;
  }

  const elm = vnode.elm = oldVnode.elm;

  if (isTrue(oldVnode.isAsyncPlaceholder)) {
    if (isDef(vnode.asyncFactory.resolved)) {
      hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
    } else {
      vnode.isAsyncPlaceholder = true;
    }
    return;
  }

  if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
  ) {
    vnode.componentInstance = oldVnode.componentInstance;
    return;
  }

  let i;
  const data = vnode.data;
  if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
    i(oldVnode, vnode);
  }

  const oldCh = oldVnode.children;
  const ch = vnode.children;
  if (isDef(data) && isPatchable(vnode)) {
    for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);
    if (isDef(i = data.hook) && isDef(i = i.update)) i(oldVnode, vnode);
  }
  if (isUndef(vnode.text)) {
    if (isDef(oldCh) && isDef(ch)) {
      if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
    } else if (isDef(ch)) {
      if (process.env.NODE_ENV !== 'production') {
        checkDuplicateKeys(ch);
      }
      if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, '');
      addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
    } else if (isDef(oldCh)) {
      removeVnodes(oldCh, 0, oldCh.length - 1);
    } else if (isDef(oldVnode.text)) {
      nodeOps.setTextContent(elm, '');
    }
  } else if (oldVnode.text !== vnode.text) {
    nodeOps.setTextContent(elm, vnode.text);
  }
  if (isDef(data)) {
    if (isDef(i = data.hook) && isDef(i = i.postpatch)) i(oldVnode, vnode);
  }
}

function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
  let oldStartIdx = 0;
  let newStartIdx = 0;
  let oldEndIdx = oldCh.length - 1;
  let oldStartVnode = oldCh[0];
  let oldEndVnode = oldCh[oldEndIdx];
  let newEndIdx = newCh.length - 1;
  let newStartVnode = newCh[0];
  let newEndVnode = newCh[newEndIdx];
  let oldKeyToIdx, idxInOld, vnodeToMove, refElm;

  // removeOnly is a special flag used only by <transition-group>
  // to ensure removed elements stay in correct relative positions
  // during leaving transitions
  const canMove = !removeOnly;

  if (process.env.NODE_ENV !== 'production') {
    checkDuplicateKeys(newCh);
  }

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (isUndef(oldStartVnode)) {
      oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
    } else if (isUndef(oldEndVnode)) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
      patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
      canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
      patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
      canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
      idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
      if (isUndef(idxInOld)) { // New element
        createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
        newStartVnode = newCh[++newStartIdx];
      } else {
        vnodeToMove = oldCh[idxInOld];
        if (sameVnode(vnodeToMove, newStartVnode)) {
          patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
          oldCh[idxInOld] = undefined;
          canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          // same key but different element. treat as new element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        }
      }
    }
  }
  if (oldStartIdx > oldEndIdx) {
    refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
    addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
  } else if (newStartIdx > newEndIdx) {
    removeVnodes(oldCh, oldStartIdx, oldEndIdx);
  }
}
```

### 3. 生命周期

#### 生命周期钩子

Vue2 提供了以下生命周期钩子：

1. **beforeCreate**：实例创建前
2. **created**：实例创建后
3. **beforeMount**：挂载前
4. **mounted**：挂载后
5. **beforeUpdate**：更新前
6. **updated**：更新后
7. **beforeDestroy**：销毁前
8. **destroyed**：销毁后

#### 生命周期流程

**实现原理**：
- 在 Vue 实例的不同阶段触发相应的钩子函数
- 使用调用栈管理钩子函数的执行
- 确保钩子函数按照正确的顺序执行

**代码示例**：

```javascript
// src/core/instance/lifecycle.js
function callHook(vm, hook) {
  const handlers = vm.$options[hook];
  if (handlers) {
    for (let i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, `${hook} hook`);
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

function mountComponent(vm, el, hydrating) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
          vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        )
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        )
      }
    }
  }
  callHook(vm, 'beforeMount');

  let updateComponent;
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = () => {
      const name = vm._name;
      const id = vm._uid;
      const startTag = `vue-perf-start:${id}`;
      const endTag = `vue-perf-end:${id}`;

      mark(startTag);
      const vnode = vm._render();
      mark(endTag);
      measure(`vue ${name} render`, startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(`vue ${name} patch`, startTag, endTag);
    }
  } else {
    updateComponent = () => {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before() {
      if (vm._isMounted) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm;
}
```

## 源码阅读建议

### 1. 阅读顺序

1. **先整体后局部**：先了解 Vue 的整体架构和模块划分，再深入各个模块的实现
2. **从核心到周边**：先学习响应式系统、编译模块、虚拟 DOM 等核心模块，再学习周边功能
3. **从简单到复杂**：先学习基础概念和简单实现，再学习复杂的优化和边缘情况

### 2. 学习方法

- **调试源码**：在浏览器中调试 Vue 源码，观察代码的执行流程
- **运行示例**：创建简单的 Vue 应用，观察源码的执行过程
- **查阅文档**：参考 Vue 官方文档和源码注释
- **做笔记**：记录重要的概念和实现细节
- **实践应用**：将学到的原理应用到实际项目中

### 3. 常见问题

#### 响应式系统
- **问题**：为什么对象新增属性不会触发更新？
  **原因**：Vue2 的响应式系统基于 Object.defineProperty，只能劫持已存在的属性
  **解决方案**：使用 Vue.set 或 this.$set 方法

- **问题**：为什么数组的某些方法不会触发更新？
  **原因**：Vue2 重写了数组的 7 个方法，其他方法不会触发更新
  **解决方案**：使用重写的方法（push、pop、shift、unshift、splice、sort、reverse）

#### 编译模块
- **问题**：模板编译的性能如何？
  **解决方案**：Vue2 会缓存编译结果，避免重复编译

#### 虚拟 DOM
- **问题**：Diff 算法的时间复杂度是多少？
  **答案**：O(n)，Vue2 使用了优化策略，只比较同级节点

### 4. 性能优化

- **响应式优化**：
  - 使用 Object.freeze 冻结不需要响应式的数据
  - 合理使用 computed 和 watch
  - 避免在模板中使用复杂表达式

- **编译优化**：
  - 使用单文件组件
  - 预编译模板
  - 使用函数式组件

- **渲染优化**：
  - 使用 key 优化列表渲染
  - 合理使用 v-if 和 v-show
  - 使用虚拟滚动处理长列表

- **内存优化**：
  - 及时清理定时器和事件监听器
  - 避免循环引用
  - 使用 keep-alive 缓存组件

## 总结

Vue2 源码解析是前端进阶的重要环节，通过深入理解 Vue2 的实现原理，可以帮助我们更好地使用 Vue，解决开发中的问题，甚至为框架贡献代码。

本模块详细解析了 Vue2 的核心模块，包括：

1. **响应式系统**：基于 Object.defineProperty 实现的数据劫持和依赖收集
2. **编译模块**：将模板转换为渲染函数的完整流程
3. **虚拟 DOM**：虚拟节点的实现和 Diff 算法
4. **生命周期**：Vue 实例从创建到销毁的完整流程
5. **组件系统**：组件的注册、实例化和通信机制

通过学习这些核心模块的实现，你可以：

- 掌握 Vue2 的内部工作原理
- 提高解决 Vue 相关问题的能力
- 学习优秀的前端架构设计
- 为学习 Vue3 和其他框架打下基础

记住，源码阅读是一个循序渐进的过程，不要急于求成，要耐心学习和实践。祝你在前端学习的道路上越走越远！