---
title: Javascript 基础知识
date: 202-05-16
categories:
  - Frontend
tags:
  - javascript
---

1. 基础数据类型

- Number
- String
- Boolean
- Object
- null
- undefined
- Symbol
- Bigint

2. 引用类型 和 基础类型

- 引用类型： 数据存储在`堆`中
- 基础类型： 数据存储在`栈`中

3. 浅拷贝与深拷贝

- 浅拷贝：只拷贝一层，如果是引用类型数据，会指向同一个内存地址
- 深拷贝：层层拷贝，如果是引用类型数据，新对象会和原始对象指向不同到的内存地址

4. 如何判断数据类型

- `Object.prototype.call.toString()`方法
- `typeOf` 不能区分 null 和 Object
- `instanceOf`

5. 数组去重

- 使用 ES6 `Set`方法去重

6. 阻止冒泡

- `e.stopPropagation()`

7. 阻止默认事件

- `e.preventDefault()`


