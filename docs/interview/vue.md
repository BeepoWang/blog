---
title: 'Vue面试题'
date: '2022-05-16'
categories:
  - Interview
tags:
  - vue
---

## 1. vue 中 data 数据在那个生命周期中声明

在 created 中实现对数据的劫持和监听

## 2. vue 如何处理视图层的变化通知到数据的变化

1. 通过对数据的劫持和 发布订阅者模式，实现数据的双向绑定
2. 使用 Object.defineProperty 劫持 data 中的数据，同时，在 getter 中实现依赖的收集`dep.addDep`，在 setter 中通知依赖的更新`dep.notify()`,调用 watcher 中的`update`方法

## 3. vue 中的 diff 算法

## 4. vue2 中与 vue3 中的入口文件配置区别

1. vue2 中使用的时 new Vue() 构造函数
2. vue3 中使用的时 createApp() 工厂函数

## 5. vue 项目中的优化

1. 路由使用 import 方式，实现组件的异步加载
2. 使用 keep-alive 实现组件缓存
3. 页面中合理使用 `v-show`
4. 避免`v-for`与`v-if`的混用
5. 使用`v-once`,页面数据展示一次后不再变化的数据
6. 组件卸载时，将事件销毁处理
7. 图片懒加载、组件库懒加载
8. 合理分割组件
9. SSR 服务端渲染

## 6. 自定义指令

1. Vue.directive('',{}),创建全局自定义指令
```js
Vue.directive('lazy',{})
```
2. 单文件组件中，通过`directives`属性中定义自定义指令

```js
......
directives:{
  'lazy':{
    // 指令绑定元素
    bind(el,{name,value,arg}){},
    // 指令插入元素
    inserted(el,binding){},
    // 指令所在模块更新
    update(el,binding){},
  }
}
......
```
3. 指令配置，第一个参数为指令名称，第二参数为指令对象(回调)，包含三个回调`bind\inserted\update`,回调都接收两个参数 `el`，`binding`


## 全局组件
1. 使用 Vue.component() 创建全局组件,接受两个参数，组件名 和 组件对像
```js
Vue.component('Dialogs',{
  template:`
    <div>
      <div>
        <slot name="header">
          <h3>{{title}}</h3>
        </slot>
      </div>
      <div>
        <slot name="body">
          <p>{{body}}</p>
        </slot>
      </div>
      <div>
        <slot name="footer">
          <button @click="$emit('close')">关闭</button>
        </slot>
      </div>
    </div>  
  `,
  data(){
    return {
      title:'提示',
      body:'这是一个提示框'
    }
  },
  methods:{
    close(){
      this.$emit('close')
    }
  }
})
```