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

## valueOf

返回当前对象的原始值
