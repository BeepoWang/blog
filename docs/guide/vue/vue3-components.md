---
title: 'Vue3 学习(3) - components'
date: '2022-05-29'
sticky: 3
tags:
  - vue
---

## Fragment

- 在 Vue 2 中，组件必须有一个根标签
- 在 Vue 3 中，组件可以没有根标签，内部会将多个标签包含在一个 Fragment 虚拟元素中
- 减少标签嵌套层级、减少内存占用

## Teleport

- 能够将组件内部的某些内容渲染到外部的某个元素上

```html
<teleport to="targetDom">
  <div v-if="isShow">
    <p>这是内部的内容</p>
  </div>
</teleport>
```

## Suspense

- 等待异步组件时，渲染一些后备内容，获得更好的用户体验

```html
<!-- 
  // 父组件 
  // 使用suspense包裹,配置好default与fallback 
-->
<div>
  <Suspense>
    <template>
      <Child></Child>
    </template>
    <template v-slot:fallback>
      <div>loading...</div>
    </template>
  </Suspense>
</div>

<!-- 第一步 引入异步组件 -->
<script>
  import { defineComponent } from 'vue';
  const Child = defineComponent(() => import('../components/Child.vue'));

  export default {
    components: {
      Child
    }
  };
</script>
```

```js

// 子组件
// 方式一
setup(){
  let sum = ref(0)
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({sum})
    }, 1000)
  })
}
// 方式二
async setup(){
  let sum = ref(0)
  let p = new Promise(resolve => {
    setTimeout(() => {
      resolve({sum})
    }, 1000)
  })
  return await p
}
```

## Vue 3 中其他改变

### 1. 将全局的 API 调整到应用实例 app 上

|    2.x 全局 API(Vue)     |      3.x 实例 API(app)      |
| :----------------------: | :-------------------------: |
|      Vue.config.xxx      |       app.config.xxx        |
| Vue.config.productionTip |            移除             |
|      Vue.component       |        app.component        |
|      Vue.directive       |        app.directive        |
|        Vue.mixin         |          app.mixin          |
|         Vue.use          |           app.use           |
|      Vue.prototype       | app.config.globalProperties |

### 2. data 选项应始终声明为一个函数

### 3. 移除 keyCode 作为 v-on 的修饰符,同时也不再支持 config.keyCodes

### 4. 移除 v-on.native 修饰符

```js
//父组件
<child
  :click="handleClick"   // 未在子组件中定义认为原生事件
  :close="handleClose"   // 在子组件中定义过的自定义事件
></child>

// 子组件
<script>
  export default{
    emits:['close']
  }
</script>
```

### 5. 移除过滤器（filter）

在 3.x 中，过滤器已移除，且不再支持。取而代之的是，我们建议用方法调用或计算属性来替换它们。

```js
// 全局过滤器
const app = createApp(App)

app.config.globalProperties.$filters = {
  formateDate(value) {
    return value.toLocaleDateString()
  }
}

//  组件中使用

<p>{{ $filters.formateDate(new Date()) }}</p>

```

### 6. 移除$listeners

在 Vue 3 的虚拟 DOM 中，事件监听器现在只是以 on 为前缀的 attribute，这样它就成为了 $attrs 对象的一部分，因此 $listeners 被移除了,

```html
// 父组件
<child msg="hello word" @close="handleClose"></child>

// 子组件
<template>
  <div v-bind="$attrs">
    <h1>text</h1>
  </div>
  <div>hello</div>
</template>
<script>
  export default {
    ......
    setup(props: any, { emit, slots, attrs }: any) {
      console.log('props', props);
      console.log('emit', emit);
      console.log('slots', slots);
      console.log('attrs', attrs);  // Proxy {msg: 'Hello World', __vInternal: 1, onClose: ƒ}
    }
  };
</script>
```
