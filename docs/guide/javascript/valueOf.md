---
title: valueOf 与 toString
date: 2022-05-09
categories:
  - Frontend
tags:
  - javascript
---

基本是所有的 JS 数据类型都拥有`valueOf`、`toString` 这两个方法，null 除外。它们俩是位于原型链上的方法，也是为了解决 javascript 值运算与显示的问题。

valueOf 和 toString 几乎都是在出现操作符`(+-\*/==><)`时被调用（隐式转换）。

## toString

返回一个表示该对象的字符串，当对象表示为文本值或以期望的字符串方式被引用时，toString 方法被自动调用

**转换规则**

|   对象   |      toString 返回值       |
| :------: | :------------------------: |
|  Array   |     以逗号分割的字符串     |
| Boolean  |           "True"           |
|   Date   |      可读的时间字符串      |
| Function | 声明函数的 JS 源代码字符串 |
|  Number  |          "数字值"          |
|  Object  |     "[object Object]"      |
|  String  |          "字符串"          |

```js
[1, 2, 3].toString(); // '1,2,3'
[1, 2, 3].valueOf(); // [1,2,3]

true.toString(); // 'true'
true.valueOf(); // true

let date = new Date();
date.toString(); // 'Wed May 11 2022 17:25:58 GMT+0800 (中国标准时间)'
date.valueOf(); // 1652261158005
Date().toString(); // 'Wed May 11 2022 17:08:21 GMT+0800 (中国标准时间)'
Date().valueOf(); // 'Wed May 11 2022 17:08:21 GMT+0800 (中国标准时间)'

function add() {
  console.log('toString');
}
add.toString(); // "function add(){console.log('toString')}"
add.valueOf(); // ƒ add(){console.log('toString')}

let num = 12345;
num.toString(); //'12345'
num.toString(); //12345

let obj = { a: 1231, b: true, c: 'obg' };
obj.toString(); // '[object Object]'
obj.valueOf(); //{a: 1231, b: true, c: 'obg'}

'string'.toString(); // 'string'
'string'.valueOf(); // 'string'
```

## valueOf

返回当前对象的原始值

**转换规则**

|   对象   |    valueOf 返回值    |
| :------: | :------------------: |
|  Array   |       数组本身       |
| Boolean  |        布尔值        |
|   Date   | 返回毫秒形式的时间戳 |
| Function |       函数本身       |
|  Number  |        数字值        |
|  Object  |       对象本身       |
|  String  |       字符串值       |
