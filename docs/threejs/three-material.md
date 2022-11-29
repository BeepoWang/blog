---
title: ThreeJs Material
date: '2022-07-28'
tags:
  - Three
---

材质描述了对象的外观，他们定义的方式与渲染器无关，切换不同渲染器时，不必重写材质。
### 基础属性
- `ID`: 用来标识材质，在创建时赋值
- `name`: 通过这个属性赋予材质名称
- `opacity`: 定义物体有多透明，与属性transparent一起使用
- `transparent`: 定义材质是否透明
- `visible`: 定义材质是否可见
- `needUpdate`: 指定需要重新编译材质
- `side`: 定义将要渲染哪一面 - 正面，背面或两者。 默认为THREE.FrontSide。其他选项有THREE.BackSide和THREE.DoubleSide。

### 基础网格材质(MeshBasicMaterial)
- 基础材质不考虑光照影响

### 深度网格材质(MeshDepthMaterial)
- 一种按深度绘制几何体的材质。深度基于相机远近平面。白色最近，黑色最远。

### 法线网格材质(MeshNormalMaterial)

### Lambert网格材质(MeshLambertMaterial)
- 一种非光泽表面的材质，没有镜面高光
