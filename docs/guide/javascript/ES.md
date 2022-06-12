---
title: 'ES'
date: '2022-05-29'
tags:
  - 'ES'
---

## ES6

### let

```js
let a;
let b = 1;
let c = 2,
  d = 3;
```

- 变量不能重复声明
- 块级作用域
- 不存在变量提升
- 不影响作用域链

#### const

```js
const SIZE = 10;
```

- 一定要赋初始值
- 一般常量使用大写
- 常量值不能修改
- 块级作用域
- 对数组、对象的元素修改，不算做对常量的修改

### 解构赋值

1. 数组解构

```js
const list = [1, 2, 3];
const [a, b, c] = list;
```

2. 对象解构

```js
const person = {
  name: '张三',
  age: 18
};
let { name, age } = person;
```

### 模板字符串

```js
let str = `hello ${name}`;
let str = `
<ul>
  <li>123</li>
  <li>456</li>
  <li>789</li>
</ul>`;
```

- 变量拼接
- 内容中可以直接出现换行符

### 简化对象写法

- 允许在大括号里面，直接写入变量和函数，作为对象的属性和方法(当属性名和方法名相同时)

```js
let name = '张三';
let changeName = function () {
  console.log('changeName');
};

const obj = {
  name,
  changeName
};
```

### 箭头函数

```js
let add = (a, b) => a + b;

let add = (a, b) => {
  return a + b;
};
```

- this 是静态的，this 指向的是函数声明时所在的作用域下的 this 的值
- 不能作为构造函数
- 不能使用 arguments 变量
- 箭头函数的简写
  - 省略小括号，当形参有且只有一个时，可以省略
  - 省略花括号，当函数体只有一条语句时，可以省略
- 适合与 this 无关的回调，定时器、数组的方法回调
- 不适合与 this 有关的回调，比如 事件回调、对象的方法

### 函数参数默认值

```js
function add(a, b = 1) {
  return a + b;
}

function update({ id = 1, name = '张三' }) {
  console.log(id, name);
}
```

- 具有默认值的参数一般位置靠后
- 可以与解构赋值结合使用

### rest 参数

```js
function add(...args) {
  console.log(args);
}

add(1, 2, '3'); // [1,2,'3']
```

- rest 参数只能放在最后

### 拓展运算符

```js
const arr = [1, 2, 3];

function add() {
  console.log(arguments);
}

add(...arr); // 等价于 add(1,2,3)
```

- 数组合并

```js
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [...arr1, ...arr2];
```

- 数组克隆

```js
const arr1 = [1, 2, 3];
const arr2 = [...arr1];
```

- 将伪数组转为真正的数组

```js
const divList = document.querySelector('div');
const arr = [...divList];
console.log(arr); // [div, div, div]
```

### Symbol

- 值是唯一的
- 不能与其他类型的值进行运算
- Symbol 定义的对象不能使用 for in ,但是可以使用 Reflect.ownKeys()来获取对象所有的属性

```js
let s = Symbol('s');
let t = Symbol('s');
console.log(s); // Symbol(s)
console.log(s === t); // false

let a = Symbol.for('a');
let b = Symbol.for('a');
console.log(b === a); // true
```

- 给对象增加属性

```js
let games = {
  name: '王者荣耀',
  [Symbol('name')]: '王者荣耀',
  [Symbol('play')]: function () {
    console.log('游戏');
  }
};
console.log(games); // {name: "王者荣耀", Symbol(name): "王者荣耀", Symbol(play): function}
```

- Symbol 的内置值
  - Symbol.hasInstance : 实例的 Symbol.hasInstance 属性，指向一个内部方法。该方法的主要目的是判断一个实例是否为另一个实例的原型对象。
  - Symbol.isConcatSpreadable: 实例的 Symbol.isConcatSpreadable 属性，指向一个布尔值，表示该实例能否被当作普通数组的成员进行连接。
  - Symbol.unscopables: 实例的 Symbol.unscopables 属性，指向一个对象，该对象的属性名表示不能被 with 作用域收集。
  - Symbol.replace: 实例的 Symbol.replace 属性，指向一个内部方法。该方法的主要目的是把一个字符串转换为另一个字符串。
  - Symbol.search: 实例的 Symbol.search 属性，指向一个内部方法。该方法的主要目的是查找一个字符串中是否包含另一个字符串。

### 迭代器 Iterator

是一种接口，为各种不同的数据结构提供统一的访问机制。for...of 循环遍历的就是迭代器。

- 工作原理
  1. 创建一个指针对象，指向当前数据结构的起始位置。
  2. 第一次调用对象的 next 方法，指针自动指向数据结构的第一个成员
  3. 接下来不断调用 next 方法，指针一直指向下一个成员，直到它指向数据结构的结束位置。
  4. 每次调用 next 方法时，返回一个包含 value 和 done 两个属性的对象。value 属性是当前成员的值，done 属性是一个布尔值，表示是否已经走到数据结构的结束位置。

```js
let school = {
  name: '清华大学',
  age: 4,
  address: '北京市海淀区',
  students: [
    { name: '张三', age: 18 },
    { name: '李四', age: 19 },
    { name: '王五', age: 20 }
  ],
  // 创建自定义的迭代器
  [Symbol.iterator]() {
    let index = 0;
    let _this = this;
    return {
      next() {
        if (index < _this.students.length) {
          return { value: _this.students[index++], done: false };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
};
for (val of school) {
  console.log(val);
}
```

### 生成器 Generator

生成器函数是一个特殊的函数，它使用 yield 语句输出数据，并且暂停执行以保存状态。

```js
// 声明生成器函数
function* gen() {
  console.log('111');
  yield 'test1';
  console.log('222');
  yield 'test2';
  console.log('333');
}

let ite = gen();
ite.next(); // 111 {value: "test1", done: false}
ite.next(); // 222 {value: "test1", done: false}
ite.next(); // 333 {value: "undefined", done: true}
ite.next(); //  {value: "undefined", done: true}
```

![](https://persongitbook.oss-cn-beijing.aliyuncs.com/generator.png?versionId=CAEQJBiBgIDOo8fLiBgiIDg4MTM1MWI4OTFhODQ0M2JhYjhhNThhNGJjMmU0ZjQ0)

- 传递参数
  1. 如果没有指定参数，则默认传递上一次的返回值。
  2. 如果指定了参数，则传递指定的参数。

```js
function getUser(...arg) {
  console.log('getUser 开始获取用户信息', ...arg);
  setTimeout(() => {
    let user = {
      name: '张三',
      age: 18
    };
    ite.next(user);
  }, 1000);
}
function getOrder(...arg) {
  console.log('getOrder', arg);
  setTimeout(() => {
    let order = {
      name: '订单1',
      price: 100
    };
    ite.next(order);
  }, 1000);
}
function getGoods(...arg) {
  console.log('getGoods', arg);
  setTimeout(() => {
    let goods = {
      name: '商品1',
      price: 200
    };
    ite.next(goods);
  }, 1000);
}

function* gen() {
  let user = yield getUser();
  let order = yield getOrder(user);
  let god = yield getGoods(order);
  return god;
}

let ite = gen();
ite.next();
```

![](https://persongitbook.oss-cn-beijing.aliyuncs.com/generator-demo.png?versionId=CAEQJBiBgMC5lezLiBgiIGUwNDY1YTc4NmYxYzQwYzE5MDc2MTNlMWM4YTQzNzFm)

### Promise

Promise 是一个异步编程的解决方案，它是一个对象，他有三个状态：pending、fulfilled、rejected。

```js
// 简易ajax接口请求封装
const request({url,method}){

   return new Promise((resolve,reject) => {
    // 创建一个 XMLHttpRequest 对象
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);
    // xhr.open('GET', 'https://api.github.com/users/github');

    // 发送请求
    xhr.send();

    // 监听state变化，处理响应结果
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 ){
        if (xhr.status === 200) {
          console.log(xhr.response);
          resolve(xhr.response);
        } else {
          console.error('出错了');
          reject(new Error('请求失败',xhr.status));
        }
      }
    };
  })
}

request({
  url: 'https://api.github.com/users/github',
  method: 'GET'
}).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
});
```

```

```
