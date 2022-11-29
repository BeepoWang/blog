---
title: 骨骼动画
date: '2022-07-28'
tags:
  - Three
---

### 动画相关理论

1. 骨架

- 由一系列具有层次关系的关节(骨骼)和关节链组成，是一种树结构，选择其中一个作为根关节，其他关节是光根关节的子孙，可以通过平移和旋转根关节移动并确定整个骨架在世界空间中的位置和方向。

- 父关节运动能影响子关节的运动，子关节运动对父关节不产生影响。平移或者旋转父关节时，也是会同时平移、旋转其所有子关节。

2. 骨骼

- 通常会将关节进行编号\(0\sim N-1\),编号也称关节索引，通过索引查找关节比关节名查找高效的多。

- 通常一个关节包含以下信息:关节名、父关节索引（根关节的父关节索引为-1，为无效索引）、关节绑定姿势的逆变换矩阵（offset 矩阵）
  > 绑定姿势，是指蒙皮网格顶点绑定至骨骼时，关节的位置、朝向、及缩放，通常会存储关节变换的逆矩阵。

3. 姿势

- 把关节旋转、平移、缩放就能为骨架出各种姿势，关节的姿势被定义为关节相对于某坐标系的位置、朝向、缩放。通常骨架存在绑定姿势、局部姿势、全局姿势

> - 绑定姿势: 网格绑定到谷歌之前的姿势，也就是网格当做正常、没有蒙皮、完全不涉及骨骼三角形网格来渲染的姿势，通常是设计师绑定模型是的预设
> - 局部姿势: 局部姿势是关节相对于父关节来指定的，是一种常见的姿势。局部姿势存储为\(TQS\)的格式，表示相对与父关节的位置、朝向、缩放,根关节的父节点可以认为是世界坐标系原点。
> - 全局姿势: 全局姿势是相对于局部姿势而言的，它是关节相对于模型空间或者世界空间的姿势（局部姿势是相对于父关节的姿势）。

### ThreeJs 骨骼动画

ThreeJs 骨骼动画需要通过骨骼网格模型类 SkinnedMesh 来实现，一般来说骨骼动画模型都是 3D 美术创建，然后通过 ThreeJs 引擎加载解析。

#### 基本骨骼类及相关知识点

1. 骨骼 Bone
   骨骼是 Skeleton（骨架）的一部分，可以通过 add 方法给一个骨关节添加子骨关节

```ts
const root = new THREE.Bone();
const child = new THREE.Bone();

root.add(child);
```

2. 骨架 Skeleton
   使用一个 bones 数组来创建一个可以由 SkinnedMesh 使用的骨架

```ts
const bones = [];

const shoulder = new THREE.Bone();
const elbow = new THREE.Bone();
const hand = new THREE.Bone();
shoulder.add(elbow);
elbow.add(hand);

bones.push(shoulder);
bones.push(elbow);
bones.push(hand);

shoulder.position.y = -5;
elbow.position.y = 0;
hand.position.y = -5;

const armSkeleton = new THREE.Skeleton(bones);
```

3. 骨骼网络 SkinnedMesh
   具有 Skeleton（骨架）和 bones（骨骼）的网格，可用于给几何体上的顶点添加动画。

4. 皮肤顶点权重属性.skinWeights

- skinWeights 表示的是几何体顶点权重数据，当使用骨骼动画网格模型 SkinnedMesh 的时候, 每个顶点最多可以有 4 个骨关节 Bone 影响它.
- skinWeights 属性是一个权重值数组，对应于几何体中顶点的顺序。 例如，第一个 skinWeight 将对应于几何体中的第一个顶点. 由于每个顶点可以被 4 个骨关节 Bone 修改，因此使用四维向量对象 Vector4 表示一个顶点的权重.
