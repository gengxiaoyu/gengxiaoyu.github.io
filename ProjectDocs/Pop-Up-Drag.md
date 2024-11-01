
## 弹窗拖拽
要在 Vue 2 和 Vue 3 中都使用拖拽指令，你可以创建一个兼容两个版本的指令。以下是兼容 Vue 2 和 Vue 3 的拖拽指令的实现：

### 创建一个兼容的拖拽指令

```js
// dragDirective.js
const isVue2 = typeof Vue === 'function' && !this.$;

function updatePosition(e, el, disX, disY) {
  e.preventDefault();
  el.style.left = `${e.clientX - disX}px`;
  el.style.top = `${e.clientY - disY}px`;
}

function enableDrag(e, el) {
  const disX = e.clientX - el.offsetLeft;
  const disY = e.clientY - el.offsetTop;
  const onMouseMove = (e) => updatePosition(e, el, disX, disY);
  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

const vDrag = isVue2
  ? {
      inserted: function (el) {
          if (el.firstChild && el.firstChild.id.indexOf('title') > -1) {
              el.firstChild.onmousedown = (e) => enableDrag(e, el);
          } else {
              el.onmousedown = (e) => enableDrag(e, el);
          }
      },
  }
  : {
      beforeMount(el, binding, vnode) {
          if (el.firstChild && el.firstChild.id.includes('title')) {
              el.firstChild.onmousedown = (e) => enableDrag(e, el);
          } else {
              el.onmousedown = (e) => enableDrag(e, el);
          }
      },
  };

export default vDrag;
```

### 在 Vue 2 的 `main.js` 中引用指令

```js
import Vue from 'vue';
import App from './App.vue';
import vDrag from './directives/dragDirective';

Vue.directive('drag', vDrag);

new Vue({
  el: '#app',
  render: h => h(App),
});
```

### 在 Vue 3 的 `main.js` 中引用指令

```js
import { createApp } from 'vue';
import App from './App.vue';
import vDrag from './directives/dragDirective';

const app = createApp(App);
app.directive('drag', vDrag);
app.mount('#app');
```

### 在组件中使用指令

```vue
<template>
  <div v-drag></div>
</template>
```

### 注意事项

- 指令中的 `inserted` 在 Vue 2 中使用，`beforeMount` 在 Vue 3 中使用。
- 指令兼容性通过检测 `isVue2` 来决定使用 Vue 2 还是 Vue 3 的指令定义方式。
- 确保在 Vue 2 和 Vue 3 项目中都正确地引入和注册了指令。

以上代码实现了一个可以在 Vue 2 和 Vue 3 中都使用的拖拽指令。