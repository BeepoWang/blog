---
title: 'Vue3 学习(2) - 生命周期'
date: '2022-05-29'
sticky: 2
tags:
 - 'Vue'
---

## Vue3.0 生命周期

1. Vue3.0 中可以继续使用 Vue2.x 的生命周期钩子，但是有两个被更名

- `beforeDestroy` 改名为 `beforeUnmount`
- `destroyed` 改名为 `unmounted`

2. Vue3.0 提供了 Composition API 形式的生命周期钩子

- `beforeCreate` ===> `setup`
- `created` ===> `setup`
- `beforeMount` ===> `onBeforeMount`
- `mounted` ===> `onMounted`
- `beforeUpdate` ===> `onBeforeUpdate`
- `updated` ===> `onUpdated`
- `beforeUnmount` ===> `onBeforeUnmount`
- `unmounted` ===> `onUnmounted`

:::tip
因为 `setup` 是围绕 `beforeCreate` 和 `created` 生命周期钩子运行的，所以不需要显式地定义它们。换句话说，在这些钩子中编写的任何代码都应该直接在 setup 函数中编写。

:::

## 自定义 Hook

- 什么是 hook？-- 本质就是一个函数，把 setup 函数中使用的 Composition API 进行封装，使其可以在其他地方被调用

- 类似于 vue2.x 中的 `mixins`

- 自定义 hook 的优势，复用代码，提高开发效率，让 setup 中的逻辑更加清楚易懂

```js
// hooks/useMousePosition.js
import { reactive, onMounted, onUnmounted } from 'vue';

export default function () {
  let point = reactive({
    x: 0,
    y: 0
  });

  let useMousePosition = function () {
    document.addEventListener('click', function (e) {
      point.x = e.pageX;
      point.y = e.pageY;
    });
  };

  onMounted(() => {
    useMousePosition(el);
  });

  onUnmounted(() => {
    document.removeEventListener('mousemove', useMousePosition);
  });

  return point;
}

// xxx.vue
<div>
  <p>{{ point.x }}</p>
  <p>{{ point.y }}</p>
</div>
......
import useMousePosition from './hooks/useMousePosition';

const point = useMousePosition();

......
```

## 计算属性 computed

```js
<template>
  <div>
    <p>{{name}}</p>
</template>
import { computed } from 'vue';
.....
setup() {
  let firstName = ref('张');
  let lastName = ref('三');

  // 计算属性 -- 简写
  let fullName = computed(() => {
    return firstName.value + ' ' +lastName.value;
  });

  // 计算属性 -- 完整写法
  let fullName = computed({
    get() {
      return firstName.value + '-' + lastName.value;
    },
    set(newValue) {
      let names = newValue.split('-');
      firstName.value = names[0];
      lastName.value = names[1];
    }
  });

  return {
    name
  };
}
```

## watch 函数

```js
import { watch } from 'vue';
.....
let sum = ref(0);
let msg = ref('hello');
let obj = ref({
  a: 1,
  b: 2
});

// 监听ref数据变化
watch(sum, (newValue, oldValue) => {
  console.log(newValue, oldValue);
},{immediate: true});

// 监听ref定义的对象 -- 方法一
watch(obj.value, (newValue, oldValue) => {
  console.log(newValue, oldValue);
});

// 监听ref定义的对象 -- 方法二
watch(obj, (newValue, oldValue) => {
  console.log(newValue, oldValue);
},{deep: true});

// 监听多个ref属性变化
watch([sum, msg],(newVal,oldVal)=>{
  console.log('sum发生变化了',newVal[0],oldVal[0]); // sum发生变化了 1 0
  console.log('msg发生变化了',newVal[1],oldVal[1]); // msg发生变化了 hello hello
});


let person =reactive({
  name: '张三',
  age: 18,
  job:{
    jodOne:{
      name: '前端开发'
    },
  }
});

new

// 监听reactive所定义的响应式对象
// 注意：无法正确的获取到oldValue
// 注意：默认开启了深度监听
watch(person, (newVal, oldVal) => {
  console.log('person发生变化了', newVal, oldVal);
});

// 监听reactive所定义的响应式对象的某个属性
watch(()=>person.age, (newVal, oldVal) => {
  console.log('person.age发生变化了', newVal, oldVal);
});

// 监听reactive所定义的响应式对象的某个属性(该属性值为对象时)，deep配置有效
watch(()=>person.job, (newVal, oldVal) => {
  console.log('person.job发生变化了', newVal, oldVal);
},{deep: true});
```

## watchEffect 函数

- watch 函数的套路，既要指明监听的属性，又要指明监听的回调

- watchEffect 的套路，不用指明监听哪个属性，监听的回调中用到哪个属性，就监听哪个属性，属性变化就触发监听

- watchEffect 有点像 computed
  - computed 注重计算出来的值（回调函数的返回值），必须写返回值
  - watchEffect 更注重的是过程（回调函数的函数体），不用写返回值

```js
watchEffect(() => {
  console.log('watchEffect');
});
```


