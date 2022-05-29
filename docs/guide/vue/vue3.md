---
title: 'Vue3 学习(1)- Compositions API'
date: '2022-05-28'
sticky: 1
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

## toRef 与 toRefs

1. `toRef`作用： 创建一个 ref 对象，其 value 值指向另一个对象中某个属性
2. 语法：

```js
const obj = reactive({
  a: 1,
  b: 2
});
const a = toRef(obj, a);
```

3. 应用场景： 要将响应式中的某个属性单独提供给外部使用时
4. `toRefs` 和 `toRef` 功能一致，但是可以批量创建多个 ref 对象

```js
const obj = reactive({
  a: 1,
  b: 2
});
const { a, b } = toRefs(obj);
```

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

## shallowRef 与 shallowReactive

- `shallowReactive`： 只处理对象最外层属性的响应式（浅响应式）
- `shallowRef`：只处理基本数据类型的响应式
- 使用场景
  - 如果一个对象数据，数据结构比较深，但变化时，只是最外层属性变化，可以使用 shallowReactive
  - 如果一个对象数据，后续功能不会修改该对象中的属性，而是生成新的对象来替换，可以使用 shallowRef

## readonly 与 shallowReadonly

- readonly: 让一个响应式数据变为只读的（深只读）
- shallowReadonly: 让一个响应式数据变为只读的（浅只读）
- 应用场景： 不希望数据被修改时

## toRaw 与 markRaw

- **toRaw**

  - 将 reactive 生成响应式对象转换为普通对象
  - 用于读取响应式对象对象的普通对象，这个普通对象的所有操作不会引起页面更新

- **markRaw**
  - 标记一个对象，使其永远不会成为响应式对象
  - 有些值不应被设置成响应式，例如三方类库
  - 当渲染局部不可变数据源的大列表时，跳过响应式可以提高性能

## customRef

- 创建一个自定义 ref，并对其依赖项跟踪和更新触发进行显式控制

```js
// 实现一个延迟的 ref
const delayRef = (value.delay)=> {
  let timer = null;
  return customRef((track,trigger) => {
    return {
      get(){
        track();
        return value;
      },
      set(newValue){
        clearTimeout(timer);
        timer = setTimeout(() =>{
          value = newValue;
          trigger();
        }, delay);
      }
    }
  })
}

```

## provide 与 inject

- 适用于 跨级组件(祖孙组件通信)

- 父组件有一个 `provide` 选项提供数据，子组件通过 `inject` 选项获取并使用数据

```js
// 父组件

import { provide } from 'vue';

setup(){
  ....
  let person = {
    name: '张三',
    age: 18
  };
  provide('person', person);
  ....
}

// 后代组件

import { inject } from 'vue';

setup(){
  ....
  const student = inject('person');
  ....
  return{
    student
  }

}
```

## 响应式数据判断

- isRef: 判断一个值是否是 ref 对象
- isReactive: 判断一个值是否是 reactive 响应式代理
- isReadonly: 判断一个值是否是 readonly 创建的只读代理
- isProxy: 判断一个值是否是 reactive 或 readonly 方法创建的代理

## Composition API 的优势

- Options API 缺点

  新增或者修改一个需求，就需要分别在 data、methods、computed、watch 中添加对应的配置项

- Composition API 优势

  可以更加优雅的组织代码、函数，让相关功能更加有序的组织在一起
