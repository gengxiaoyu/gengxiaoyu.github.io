---
title: Vue3 源码解析
createTime: 2026/02/04 15:26:13
permalink: /webDocView/40-source-code/02-vue3/
---
# Vue3 源码解析

## 模块概述

Vue3 是 Vue 框架的最新版本，相比 Vue2 进行了全面的升级和优化。Vue3 使用 TypeScript 重写，引入了 Composition API，使用 Proxy 实现响应式，优化了编译和运行时性能。本模块将详细解析 Vue3 的核心模块，包括响应式系统、Composition API、编译优化、运行时优化等，帮助你掌握 Vue3 的内部工作原理。

## 源码阅读路线

### 1. 整体架构
- **目录结构**：了解 Vue3 源码的目录结构和模块划分
- **初始化流程**：了解 Vue3 实例的创建和初始化过程
- **核心模块**：了解各个核心模块的职责和关系

### 2. 响应式系统
- **Proxy**：基于 Proxy 的响应式实现
- **ReactiveEffect**：副作用管理
- **Track & Trigger**：依赖收集和触发更新
- **响应式原理**：数据变化如何触发视图更新

### 3. Composition API
- **setup 函数**：组件初始化的入口
- **ref & reactive**：响应式数据的创建
- **computed & watch**：计算属性和监听器
- **生命周期钩子**：Composition API 中的生命周期

### 4. 编译优化
- **模板编译**：将模板转换为渲染函数
- **静态提升**：静态节点的优化
- **Patch Flags**：更新标记优化
- **Tree Shaking**：代码体积优化

### 5. 运行时优化
- **虚拟 DOM**：虚拟节点的实现
- **Diff 算法**：优化的节点比较算法
- **Patch 过程**：将虚拟 DOM 转换为真实 DOM

### 6. 与 Vue2 对比
- **响应式系统**：Proxy vs Object.defineProperty
- **API 设计**：Composition API vs Options API
- **性能优化**：编译优化和运行时优化
- **TypeScript 支持**：更好的类型推断

## 核心模块解析

### 1. 响应式系统

#### 核心概念

Vue3 的响应式系统基于 **Proxy** 实现，相比 Vue2 的 Object.defineProperty，Proxy 可以拦截更多操作，性能更好，支持更多数据类型。

#### 核心模块

##### reactive

**作用**：创建响应式对象，使用 Proxy 实现数据劫持。

**实现原理**：
- 使用 Proxy 拦截对象的读取、设置、删除等操作
- 在读取时收集依赖
- 在设置时触发更新
- 支持嵌套对象的响应式

**代码示例**：

```javascript
// packages/reactivity/src/reactive.ts
function createReactiveObject(
  target: Target,
  isReadonly: boolean,
  baseHandlers: ProxyHandler<any>,
  collectionHandlers: ProxyHandler<any>
) {
  if (!isObject(target)) {
    if (__DEV__) {
      console.warn(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }

  if (target[ReactiveFlags.RAW] && !(isReadonly && target[ReactiveFlags.IS_READONLY])) {
    return target;
  }

  const proxyMap = isReadonly ? readonlyMap : reactiveMap;
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }

  const targetType = getTargetType(target);
  const proxy = new Proxy(
    target,
    targetType === TargetType.COLLECTION ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}

export function reactive<T extends object>(target: T): UnwrapNestedRefs<T> {
  if (target && (target as Target)[ReactiveFlags.IS_READONLY]) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers
  );
}
```

##### ref

**作用**：创建响应式引用，用于基本数据类型的响应式。

**实现原理**：
- 使用 RefImpl 类封装值
- 通过 .value 访问和修改值
- 在 .value 的 getter 中收集依赖
- 在 .value 的 setter 中触发更新

**代码示例**：

```javascript
// packages/reactivity/src/ref.ts
class RefImpl<T> {
  private _value: T;
  public dep?: Dep = undefined;
  public readonly __v_isRef = true;
  public readonly [ReactiveFlags.IS_READONLY] = false;

  constructor(value: T, public readonly __v_isShallow: boolean) {
    this._value = __v_isShallow ? value : toReactive(value);
  }

  get value() {
    trackRefValue(this);
    return this._value;
  }

  set value(newVal) {
    const useDirectValue = this.__v_isShallow || isShallow(newVal) || !isObject(newVal);
    newVal = useDirectValue ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._value)) {
      this._value = newVal;
      triggerRefValue(this, newVal);
    }
  }
}

export function ref<T>(value: T): Ref<UnwrapRef<T>> {
  return createRef(value, false);
}

function createRef(rawValue: unknown, shallow: boolean) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
```

##### effect

**作用**：创建副作用函数，用于追踪依赖和执行更新。

**实现原理**：
- 创建一个响应式副作用函数
- 在函数执行时自动收集依赖
- 依赖变化时自动重新执行
- 支持调度器和停止功能

**代码示例**：

```javascript
// packages/reactivity/src/effect.ts
let activeEffect: ReactiveEffect | undefined;
let trackId = 0;

class ReactiveEffect<T = any> {
  active = true;
  deps: Dep[] = [];
  parent: ReactiveEffect | undefined = undefined;

  constructor(
    public fn: () => T,
    public scheduler: EffectScheduler | null = null,
    scope?: EffectScope
  ) {
    recordEffectScope(this, scope);
  }

  run() {
    if (!this.active) {
      return this.fn();
    }
    let parent: ReactiveEffect | undefined = activeEffect;
    try {
      this.parent = parent;
      activeEffect = this;
      cleanupEffect(this);
      return this.fn();
    } finally {
      activeEffect = parent;
    }
  }

  stop() {
    if (this.active) {
      cleanupEffect(this);
      this.active = false;
    }
  }
}

export function effect<T = any>(
  fn: () => T,
  options?: ReactiveEffectOptions
): ReactiveEffectRunner {
  if ((fn as ReactiveEffectRunner).effect) {
    fn = (fn as ReactiveEffectRunner).effect.fn;
  }

  const _effect = new ReactiveEffect(fn);
  if (options) {
    extend(_effect, options);
    if (options.scope) recordEffectScope(_effect, options.scope);
  }
  if (!options || !options.lazy) {
    _effect.run();
  }
  const runner = _effect.run.bind(_effect) as ReactiveEffectRunner;
  runner.effect = _effect;
  return runner;
}
```

##### track & trigger

**作用**：依赖收集和触发更新。

**实现原理**：
- **track**：在读取响应式数据时，收集当前副作用函数的依赖
- **trigger**：在修改响应式数据时，触发所有依赖的副作用函数

**代码示例**：

```javascript
// packages/reactivity/src/effect.ts
export function track(target: object, type: TrackOpTypes, key: unknown) {
  if (!isTracking()) {
    return;
  }
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = createDep()));
  }
  trackEffects(dep);
}

export function trigger(
  target: object,
  type: TriggerOpTypes,
  key?: unknown,
  newValue?: unknown,
  oldValue?: unknown
) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }

  let deps: (Dep | undefined)[] = [];
  if (type === TriggerOpTypes.CLEAR) {
    deps = [...depsMap.values()];
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case TriggerOpTypes.ADD:
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else {
          deps.push(depsMap.get('length'));
        }
        break;
      case TriggerOpTypes.DELETE:
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
    }
  }

  triggerEffects(createDepEffects(deps));
}
```

#### 响应式流程

1. **初始化**：使用 reactive 或 ref 创建响应式数据
2. **依赖收集**：在 effect 函数中读取响应式数据，触发 track 收集依赖
3. **数据更新**：修改响应式数据，触发 trigger 通知所有依赖
4. **视图更新**：effect 函数重新执行，更新视图

### 2. Composition API

#### 核心概念

Composition API 是 Vue3 引入的新 API，提供了一种更灵活的组件逻辑组织方式，解决了 Options API 在复杂组件中的局限性。

#### 核心模块

##### setup 函数

**作用**：组件的入口函数，用于定义组件的响应式状态、计算属性、方法等。

**实现原理**：
- 在组件实例创建时调用
- 提供组件的上下文（props、emit、slots 等）
- 返回的值会暴露给模板使用
- 支持 async/await

**代码示例**：

```javascript
// packages/runtime-core/src/component.ts
export function setupComponent(
  instance: ComponentInternalInstance,
  isSSR: boolean
) {
  isSSR = isSSR || isInSSRComponentSetup;

  const { props, attrs, slots, emit, expose } = instance;

  const setupResult = callSetup(instance, props, setupContext);

  let setupState = EMPTY_OBJ;
  if (isFunction(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult as InternalRenderFunction;
    }
  } else if (isObject(setupResult)) {
    setupState = setupResult;
    if (__DEV__) {
      exposeSetupStateOnRenderContext(instance);
    }
  } else if (__DEV__ && setupResult !== undefined) {
    warn(
      `setup() should return an object. Received: ${
        setupResult === null ? 'null' : typeof setupResult
      }`
    );
  }

  instance.setupState = reactive(setupState);
  finishComponentSetup(instance, isSSR);
}

function callSetup(
  instance: ComponentInternalInstance,
  props: Data,
  setupContext: SetupContext
) {
  const reset = setCurrentInstance(instance);
  const res = instance.type.setup(props, setupContext);
  unsetCurrentInstance();
  reset();
  return res;
}
```

##### computed

**作用**：创建计算属性，自动追踪依赖并缓存结果。

**实现原理**：
- 创建一个懒执行的 effect
- 在依赖变化时重新计算
- 缓存计算结果，避免重复计算
- 支持只读和可写两种模式

**代码示例**：

```javascript
// packages/reactivity/src/computed.ts
class ComputedRefImpl<T> {
  public dep?: Dep = undefined;
  private _value!: T;
  public readonly effect: ReactiveEffect<T>;
  public readonly __v_isRef = true;
  public readonly [ReactiveFlags.IS_READONLY] = false;

  constructor(
    getter: () => T,
    private readonly _setter: (v: T) => void,
    isReadonly: boolean
  ) {
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });

    this.effect.computed = this;
    this.effect.active = true;
    this._dirty = true;
    this._value = this.effect.run()!;
  }

  get value() {
    const self = toRaw(this);
    trackRefValue(self);
    if (self._dirty || !self._cacheable) {
      self._dirty = false;
      self._value = self.effect.run()!;
    }
    return self._value;
  }

  set value(newValue: T) {
    this._setter(newValue);
  }
}

export function computed<T>(
  getterOrOptions: ComputedGetter<T> | WritableComputedOptions<T>
) {
  let getter: ComputedGetter<T>;
  let setter: ComputedSetter<T>;

  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = __DEV__
      ? () => {
          console.warn('Write operation failed: computed value is readonly');
        }
      : NOOP;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }

  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter);
  return cRef as any;
}
```

##### watch & watchEffect

**作用**：监听响应式数据的变化，执行回调函数。

**实现原理**：
- **watch**：监听特定的响应式数据或 getter 函数
- **watchEffect**：自动追踪函数内部使用的响应式数据
- 支持深度监听、立即执行、清理函数等选项

**代码示例**：

```javascript
// packages/runtime-core/src/apiWatch.ts
export function watch<T = any, Immediate extends Readonly<boolean> = false>(
  source: WatchSource<T> | WatchSource<T>[],
  cb: any,
  options?: WatchOptions<Immediate>
): WatchStopHandle {
  return doWatch(source as any, cb, options);
}

function doWatch(
  source: WatchSource | WatchSource[] | WatchEffect,
  cb: WatchCallback | null,
  { immediate, deep, flush, onTrack, onTrigger }: WatchOptions = EMPTY_OBJ
): WatchStopHandle {
  const instance = currentInstance;

  let getter: () => any;
  let forceTrigger = false;
  let isMultiSource = false;

  if (isFunction(source)) {
    getter = () => (source as () => any)();
  } else if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some(s => isShallow(s) || isRef(s));
    getter = () =>
      source.map(s => {
        if (isRef(s)) {
          return s.value;
        } else if (isReactive(s)) {
          return traverse(s);
        } else if (isFunction(s)) {
          return s();
        } else {
          __DEV__ && warnInvalidSource(s);
        }
      });
  } else {
    getter = () => traverse(source);
  }

  if (deep) {
    getter = () => traverse(getter());
  }

  let oldValue: any = isArray(source) ? [] : INITIAL_WATCHER_VALUE;
  const job: SchedulerJob = () => {
    if (!effect.active) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || hasChanged(newValue, oldValue)) {
        oldValue = newValue;
        cb(newValue, oldValue, onCleanup);
      }
    } else {
      effect.run();
    }
  };

  job.allowRecurse = !!cb;

  let scheduler: EffectScheduler;
  if (flush === 'sync') {
    scheduler = job as any;
  } else if (flush === 'post') {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    scheduler = () => {
      if (!instance || instance.isMounted) {
        queuePreFlushCb(job);
      } else {
        job();
      }
    };
  }

  const effect = new ReactiveEffect(getter, scheduler);

  const scope = getCurrentScope();
  const stop = () => {
    effect.stop();
    if (scope) {
      remove(scope.effects, effect);
    }
  };

  if (__DEV__) {
    effect.onTrack = onTrack;
    effect.onTrigger = onTrigger;
  }

  if (immediate) {
    job();
  } else {
    oldValue = effect.run();
  }

  return stop;
}
```

### 3. 编译优化

#### 核心概念

Vue3 的编译器进行了大量优化，包括静态提升、Patch Flags、Tree Shaking 等，显著提高了运行时性能。

#### 核心优化

##### 静态提升

**作用**：将静态节点提升到渲染函数外部，避免每次渲染都创建新的虚拟节点。

**实现原理**：
- 在编译阶段识别静态节点
- 将静态节点提取到渲染函数外部
- 减少虚拟节点的创建和比较

**代码示例**：

```javascript
// 编译前
function render() {
  return _createElement('div', [
    _createElement('h1', 'Hello'),
    _createElement('p', 'World')
  ]);
}

// 编译后（静态提升）
const _hoisted_1 = _createElement('h1', 'Hello');
const _hoisted_2 = _createElement('p', 'World');

function render() {
  return _createElement('div', [_hoisted_1, _hoisted_2]);
}
```

##### Patch Flags

**作用**：标记虚拟节点的更新类型，在 diff 时只检查必要的属性。

**实现原理**：
- 在编译阶段为每个节点生成 Patch Flags
- 在运行时根据 Patch Flags 选择性地更新节点
- 避免不必要的属性比较

**代码示例**：

```javascript
// Patch Flags 定义
export const enum PatchFlags {
  TEXT = 1,
  CLASS = 2,
  STYLE = 4,
  PROPS = 8,
  FULL_PROPS = 16,
  HYDRATE_EVENTS = 32,
  STABLE_FRAGMENT = 64,
  KEYED_FRAGMENT = 128,
  UNKEYED_FRAGMENT = 256,
  NEED_PATCH = 512,
  DYNAMIC_SLOTS = 1024,
  HOISTED = -1,
  BAIL = -2
}

// 使用示例
function patchElement(n1, n2) {
  const el = (n2.el = n1.el!);
  const oldProps = n1.dynamicProps;
  const newProps = n2.dynamicProps;

  if (oldProps !== newProps) {
    for (const key in newProps) {
      if (n2.patchFlag & PatchFlags.FULL_PROPS || key !== 'value') {
        patchProp(el, key, oldProps[key], newProps[key]);
      }
    }
  }
}
```

##### Tree Shaking

**作用**：通过编译优化，减少运行时代码体积。

**实现原理**：
- 将编译时和运行时代码分离
- 只打包使用到的功能
- 减少最终打包体积

### 4. 运行时优化

#### 核心概念

Vue3 的运行时进行了大量优化，包括虚拟 DOM 的优化、Diff 算法的优化等。

#### 核心优化

##### 虚拟 DOM 优化

**作用**：优化虚拟节点的创建和更新。

**实现原理**：
- 使用 Block Tree 减少遍历
- 静态节点不参与 diff
- 使用 Patch Flags 优化更新

##### Diff 算法优化

**作用**：优化虚拟 DOM 的比较算法。

**实现原理**：
- 使用最长递增子序列算法
- 减少节点的移动次数
- 提高列表更新的性能

**代码示例**：

```javascript
// packages/runtime-core/src/renderer.ts
function patchKeyedChildren(
  c1: VNode[],
  c2: VNodeArrayChildren,
  container: RendererElement,
  parentAnchor: RendererNode | null,
  parentComponent: ComponentInternalInstance | null,
  parentSuspense: SuspenseBoundary | null,
  isSVG: boolean,
  slotScopeIds: string | null,
  optimized: boolean
) {
  let i = 0;
  const l2 = c2.length;
  let e1 = c1.length - 1;
  let e2 = l2 - 1;

  while (i <= e1 && i <= e2) {
    const n1 = c1[i];
    const n2 = c2[i] = optimized
      ? cloneIfMounted(c2[i])
      : normalizeVNode(c2[i]);
    if (isSameVNodeType(n1, n2)) {
      patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      break;
    }
    i++;
  }

  while (i <= e1 && i <= e2) {
    const n1 = c1[e1];
    const n2 = c2[e2] = optimized
      ? cloneIfMounted(c2[e2])
      : normalizeVNode(c2[e2]);
    if (isSameVNodeType(n1, n2)) {
      patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
    } else {
      break;
    }
    e1--;
    e2--;
  }

  if (i > e1) {
    if (i <= e2) {
      const nextPos = e2 + 1;
      const anchor = nextPos < l2 ? (c2[nextPos] as VNode).el : parentAnchor;
      while (i <= e2) {
        patch(
          null,
          (c2[i] = optimized
            ? cloneIfMounted(c2[i])
            : normalizeVNode(c2[i])),
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
        i++;
      }
    }
  } else if (i > e2) {
    while (i <= e1) {
      unmount(c1[i], parentComponent, parentSuspense, true);
      i++;
    }
  } else {
    const s1 = i;
    const s2 = i;
    const keyToNewIndexMap: Map<string | number, number> = new Map();
    for (i = s2; i <= e2; i++) {
      const nextChild = (c2[i] = optimized
        ? cloneIfMounted(c2[i])
        : normalizeVNode(c2[i])) as VNode;
      if (nextChild.key != null) {
        keyToNewIndexMap.set(nextChild.key, i);
      }
    }

    let j;
    let patched = 0;
    const toBePatched = e2 - s2 + 1;
    let moved = false;
    let maxNewIndexSoFar = 0;
    const newIndexToOldIndexMap = new Array(toBePatched);
    for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0;

    for (i = s1; i <= e1; i++) {
      const prevChild = c1[i];
      if (patched >= toBePatched) {
        unmount(prevChild, parentComponent, parentSuspense, true);
        continue;
      }
      let newIndex;
      if (prevChild.key != null) {
        newIndex = keyToNewIndexMap.get(prevChild.key);
      } else {
        for (j = s2; j <= e2; j++) {
          if (
            newIndexToOldIndexMap[j - s2] === 0 &&
            isSameVNodeType(prevChild, c2[j] as VNode)
          ) {
            newIndex = j;
            break;
          }
        }
      }
      if (newIndex === undefined) {
        unmount(prevChild, parentComponent, parentSuspense, true);
      } else {
        newIndexToOldIndexMap[newIndex - s2] = i + 1;
        if (newIndex >= maxNewIndexSoFar) {
          maxNewIndexSoFar = newIndex;
        } else {
          moved = true;
        }
        patch(
          prevChild,
          c2[newIndex] as VNode,
          container,
          null,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
        patched++;
      }
    }

    const increasingNewIndexSequence = getSequence(newIndexToOldIndexMap);
    j = increasingNewIndexSequence.length - 1;
    for (i = toBePatched - 1; i >= 0; i--) {
      const nextIndex = s2 + i;
      const nextChild = c2[nextIndex] as VNode;
      const anchor =
        nextIndex + 1 < l2 ? (c2[nextIndex + 1] as VNode).el : parentAnchor;
      if (newIndexToOldIndexMap[i] === 0) {
        patch(
          null,
          nextChild,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
      } else if (moved) {
        if (j < 0 || i !== increasingNewIndexSequence[j]) {
          move(nextChild, container, anchor, MoveType.REORDER);
        } else {
          j--;
        }
      } else if (!optimized) {
        move(nextChild, container, anchor, MoveType.REORDER);
      }
    }
  }
}
```

### 5. 与 Vue2 对比

#### 响应式系统

| 特性 | Vue2 | Vue3 |
|------|-------|-------|
| 实现方式 | Object.defineProperty | Proxy |
| 性能 | 较慢 | 更快 |
| 支持的数据类型 | 对象、数组 | 对象、数组、Map、Set、WeakMap、WeakSet |
| 新增属性 | 需要 Vue.set | 自动响应式 |
| 数组索引修改 | 需要特殊处理 | 自动响应式 |

#### API 设计

| 特性 | Vue2 | Vue3 |
|------|-------|-------|
| API 风格 | Options API | Composition API + Options API |
| 逻辑复用 | Mixins | Composables |
| TypeScript 支持 | 较弱 | 强类型支持 |
| 代码组织 | 按选项组织 | 按功能组织 |

#### 性能优化

| 特性 | Vue2 | Vue3 |
|------|-------|-------|
| 打包体积 | 较大 | 更小（Tree Shaking） |
| 初始化速度 | 较慢 | 更快 |
| 更新性能 | 较慢 | 更快（静态提升、Patch Flags） |
| 内存占用 | 较大 | 更小 |

## 源码阅读建议

### 1. 阅读顺序

1. **先整体后局部**：先了解 Vue3 的整体架构和模块划分，再深入各个模块的实现
2. **从核心到周边**：先学习响应式系统、Composition API、编译优化等核心模块，再学习周边功能
3. **从简单到复杂**：先学习基础概念和简单实现，再学习复杂的优化和边缘情况

### 2. 学习方法

- **调试源码**：在浏览器中调试 Vue3 源码，观察代码的执行流程
- **运行示例**：创建简单的 Vue3 应用，观察源码的执行过程
- **查阅文档**：参考 Vue3 官方文档和源码注释
- **做笔记**：记录重要的概念和实现细节
- **实践应用**：将学到的原理应用到实际项目中

### 3. 常见问题

#### 响应式系统
- **问题**：为什么 Vue3 使用 Proxy 而不是 Object.defineProperty？
  **答案**：Proxy 性能更好，支持更多数据类型，可以拦截更多操作

- **问题**：如何解包 ref？
  **答案**：在模板中自动解包，在 JavaScript 中需要通过 .value 访问

#### Composition API
- **问题**：setup 函数什么时候执行？
  **答案**：在组件实例创建时执行，只执行一次

- **问题**：如何访问 this？
  **答案**：在 setup 中不能访问 this，需要通过参数访问 props、emit 等

#### 编译优化
- **问题**：静态提升有什么好处？
  **答案**：减少虚拟节点的创建和比较，提高性能

- **问题**：Patch Flags 如何工作？
  **答案**：标记节点的更新类型，在 diff 时只检查必要的属性

### 4. 性能优化

- **响应式优化**：
  - 使用 shallowRef 和 shallowReactive 减少深度响应式
  - 使用 markRaw 标记不需要响应式的数据
  - 合理使用 computed 和 watch

- **编译优化**：
  - 使用 v-once 标记静态内容
  - 使用 v-memo 缓存计算结果
  - 合理使用 v-if 和 v-show

- **渲染优化**：
  - 使用 key 优化列表渲染
  - 使用虚拟滚动处理长列表
  - 使用 Suspense 处理异步组件

- **内存优化**：
  - 及时清理 effect
  - 使用 onScopeDispose 清理副作用
  - 避免不必要的响应式

## 总结

Vue3 源码解析是前端进阶的重要环节，通过深入理解 Vue3 的实现原理，可以帮助我们更好地使用 Vue3，解决开发中的问题，甚至为框架贡献代码。

本模块详细解析了 Vue3 的核心模块，包括：

1. **响应式系统**：基于 Proxy 实现的数据劫持和依赖收集
2. **Composition API**：setup 函数、ref、reactive、computed、watch 等
3. **编译优化**：静态提升、Patch Flags、Tree Shaking
4. **运行时优化**：虚拟 DOM 优化、Diff 算法优化
5. **与 Vue2 对比**：响应式系统、API 设计、性能优化

通过学习这些核心模块的实现，你可以：

- 掌握 Vue3 的内部工作原理
- 提高解决 Vue3 相关问题的能力
- 学习优秀的前端架构设计
- 更好地使用 Composition API
- 理解 Vue3 的性能优化策略

记住，源码阅读是一个循序渐进的过程，不要急于求成，要耐心学习和实践。祝你在前端学习的道路上越走越远！