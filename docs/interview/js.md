---
title: 'Javascript'
date: '2022-05-17'
categories:
  - Interview
tags:
  - javascript
---

## 所有对象都有原型吗
1. 并不是所有对象都有原型，在 js中,除 null 和 Object.prototype之外，都有原型，null是空对象，所有什么都没有，Object.prototype是原型链的顶端,所以也没有

## Object.prototype.toString.call()中，同String方法是如何实现的


## 多维数组降维方式
1. 循环递归
```js
let arr = [ [1,2,3], [4,5,6], [7,8,9], 9]

// 方式一 循环递归
const arrayFlat = function (){
  let result = []
  for(let i = 0; i < arr.length; i++){
    if(Array.isArray(arr[i])){
      result = result.concat(arrayFlat(arr[i]))
    }else{
      result.push(arr[i])
    }
  }
  return result
}

// 方式二  reduce函数迭代
function flatten(ary) {
    return ary.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
    }, []);
}

```
