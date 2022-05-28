---
title: 'Vue3 学习'
date: '2022-05-28'
tags:
  - vue
---

## setup 函数

### 定义

1. 理解：Vue3 中新增的一个配置项，值为一个函数

2. setup 是所有 <font color="red">Composition API(组合式 API)</font> 表演的舞台

3. 组件中所用到的数据、方法等均要匹配值在 setup 中，通过 setup 函数返回的对象中的属性来获取的

4. setup 函数的有两种返回值

- 如果返回值是一个对象，则该对象的属性、方法等,在模板中均可直接使用
- 如果返回值是一个渲染函数，则该渲染函数的返回值将作为组件的模板

5. 执行时机：beforeCreate 之前执行一次，this 是 undefined

### setup 接收到的参数

- props：值为对象，包含组件外部传递过来，且组件内部声明接收的属性
- context：上下文对象
  - attr: 值为对象，包含组件外部传递过来，但没有在组件内部声明接收的属性，相当于**this.$attr**
  - emit：分发自定义事件的函数，相当于**this.$emit**
  - slots：收到的插槽内容，相当于**this.$slots**

```js
// xxx.vue
<template>
  {{msg}}
</template>

<script>
export default {
  // setup(props,context) {
  setup(props,{emit, attr, slots}) {
    ......
    let msg = 'hello world'
    const setValue = () => {
      msg.value = 'hello'
    };
    return {
      msg,
      setValue
    }
  }
}
</script>
```

::: warning

- 尽量不要与 Vue2 配置混用

- setup 不能是一个 async 函数，也不能是一个箭头函数

:::

## ref 函数

1. 定义一个响应式数据
2. 语法

```js

<template>
  <div> {{ a }} </div>
  <div> {{ obj.msg }} </div>
</template>

<script>
export default {
  setup() {
    ....
    // 创建一个包含响应式数据的 引用对象`(reference 对象，称 ref 对象)
    let a = ref(1);
    let obj = {
      msg: 'hello',
      num: 2
    };
    const setValue = () => {
      // 取值 xxx.value
      console.log(a.value); // 1
      console.log(obj.value.msg); // hello
      // 设置值  xxx.value = newValue
      a.value = 2;
      obj.value.msg = 'world';
    };
    ....
    return {
      a,
      obj,
      setValue
    }
  }
}
</script>
```

:::tip

- 接收的数据: 基本数据类型、 对象类型
- 基本类型数据：响应式靠 `Object.defineProperty()` 的 `get` 与 `set` 实现
- 对象类型数据：内部使用 vue3.0 的新函数 `reactive()` 实现

:::

## reactive 函数

1.  定义一个<font color='red'>对象类型</font>的响应式数据 (基本类型数据要是用 ref 实现)

2.  语法: `const 代理对象 = reactive(原始对象)`接收一个对象(或数组)作为参数，返回一个<font color='red'>代理对象(Proxy 对象)</font>

```js
const obj = reactive({
  a: 1,
  b: 2
});
```

3. reactive 定义的响应式数据是‘深层次的’

4. 内部基于 ES6 Proxy 实现,通过代理对象操作原始对象内部数据

## reactive 与 ref

1. 从定义数据

- ref 用来定义： **基本类型数据**
- reactive 用来定义： **对象类型数据**

> ref 也可以用来定义对象类型数据，它内部会自动通过 reactive 转为代理对象

2. 从原理

- ref 通过 **object.defineProperty()** 的 **get** 与 **set** 来实现响应式(数据劫持)
- reactive 通过 **Proxy** 实现响应式(数据劫持)，并通过 **Reflect** 操作**原始对象**内部数据

3. 从使用

- ref 定义的数据：**操作数据**需要`.value`，读取数据时**模板中直接读取**不需要`.value`

- reactive 定义的数据：操作和读取数据 **均不需要`.value`**

## Vue3.0 中的响应式原理

### Vue 2.x 中的响应式原理

- 对象类型：通过 Object.defineProperty() 对属性的读取、修改进行拦截(数据劫持)

- 数组类型：通过重写更新数组的一系列方法来实现拦截（对数组的变更方法进行了包裹）

```js
let person = {
  name: '张三',
  age: 18
};

let p = {};

defineProperty(p, 'name', {
  get() {
    return person.name;
  },
  set(newValue) {
    person.name = newValue;
  }
});
```

### Vue 3.x 中的响应式原理

- 通过 **Proxy（代理）**：拦截对象中任意属性的变化，包括属性值的读写、属性的添加、属性的删除等

- 通过 **Reflect（反射）**：对源对象的属性进行操作，包括属性的读取、属性的添加、属性的删除等

```js
let person = {
  name: '张三',
  age: 18
};

const p = new Proxy(person, {
  // 读取某个属性时调用
  get(target, key) {
    return Reflect.get(target, key);
    // return target[key];
  },
  //  新增或修改属性时调用
  set(target, key, value) {
    return Reflect.set(target, key, value);
    // target[key] = value;
  },
  // 删除属性时调用
  deleteProperty(target, key) {
    return Reflect.deleteProperty(target, key);
    //  return delete target[key];
  }
});
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

- watch函数的套路，既要指明监听的属性，又要指明监听的回调  

- watchEffect的套路，不用指明监听哪个属性，监听的回调中用到哪个属性，就监听哪个属性，属性变化就触发监听  

- watchEffect有点像computed
  - computed注重计算出来的值（回调函数的返回值），必须写返回值
  - watchEffect更注重的是过程（回调函数的函数体），不用写返回值

```js


```js
watchEffect(() => {
  console.log('watchEffect');
});
```
```
