## ThreeJS 场景

### 创建场景
使用`new THREE.Scene()`创建场景。一个场景想要显示人何东西，都需要三种类型的组件
 - 相机:决定哪些东西将要在屏幕上渲染
 - 光源:对材质如何显示，生成阴影时，材质如何使用产生影响
 - 物体:在相机透视图中主要的渲染对象：方块、球体等等
场景就是所有这些对象的容器
### 场景功能
1. `scene.add()` 在场景中增加物体
2. `scene.remove()`从场景中移除物体
3. `scene.getChildByName()` 利用name属性，获取场景中的特定物体
4. `scene.children()` 获取场景中的所有子对象列表
5. `scene.traverser(() => {})` traverser()函数接收的函数会在场景中的每一个子对象调用一次

### 场景雾化
1. `scene.fog = new THREE.Fog(color,near,far)` color属性设置雾的颜色，near、far决定雾从什么地方开始，以及浓度的加深程度
2. `scene.fog = new THREE.FogExp2(color,thickness)`此种方式，我们只需要给出颜色和浓度

### 材质覆盖
`scene.overrideMaterial = new THREE.MeshBaseMaterial({color: 0xffffff})`设置场景的`overrideMaterial`属性，所有添加到场景的物体都会使用同样的材质

### 场景天空盒效果
使用 `CubeTexture`创建材质，赋予scene的background属性，使场景具有类空间背景

```ts
const cubeLoader = new THREE.CubeTextureLoader()

const skyTexture = cubeLoader.load([
  'resources/images/pos-x.jpg',
  'resources/images/neg-x.jpg',
  'resources/images/pos-y.jpg',
  'resources/images/neg-y.jpg',
  'resources/images/pos-z.jpg',
  'resources/images/neg-z.jpg',
])

scene.background  = skyTexture
```


### 创建场景代码
```ts
import { Scene, Color } from 'three'

function createScene(){
  const scene = new Scene()
  scene.background = new Color('0xffffff')
  scene.fog = new Fog(scene.background, 1, 100)

  return scene
}
```