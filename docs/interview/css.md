---
title: 'css'
date: '2022-05-17'
categories:
  - Interview
tags:
  - css
---
## flex 布局
1. 实现flex布局  `display:flex`
2. 设置布局方向 `flex-direction` : `row` `column`
3. 设置水平对齐方式 `justify-content` : `flex-start` `flex-end` `center` 
`space-between`: 两端对齐，项目之间的间隔相等
 `space-around`: 每个项目两侧的间隔相等，所有项目之间的间隔比项目与边框的间隔大一倍
4. 设置垂直对齐方式 `align-items` : `flex-start` `flex-end` `center` `baseline` `stretch`
5. `flex-grow`、 `flex-shrink`、 `flex-basis`

## 动画/动效
- animation
1. 创建动画 
  ```css
  @keyframes 动画名称 {
      0% {
          transform: translateX(0);
      }
      100% {
          transform: translateX(100px);
      }
  }
  ```
  2. 使用动画
  animation配置属性
  `name`  动画名称
  `duration`  动画耗时
  `timing-function`  速度曲线
  `delay` 开始之前延迟
  `iteration-count` 播放次数
  `direction` 是否轮流反向播放

  ```css
  .box {
      animation: 动画名称 1s linear infinite;
  }
  ```
- transition 过渡
  `property` 设置过渡的元素属性
  `duration` 过渡耗时
  `function` 过渡速度曲线
  `delay` 过度开始前的延迟

  ```css
  .box{
    transition: all 1s linear;
  }
  ```

- transform 变形