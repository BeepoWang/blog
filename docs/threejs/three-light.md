## ThreeJS 光源

### 环境光(AmbientLight)
 - 构造函数 `new THREE.AmbientLight(color, intensity)`
 - 环境光会均匀的照亮场景中的所有物体，没有方向性，不能产生阴影。
 - 环境光只是简单的将材质的颜色和光照颜色进行叠加，再乘以光照强度。
 - 环境光通常的作用是提亮场景，让暗部不要太暗。

 ```js
  const color  = 0xffffff; // 颜色rgb值
  const intensity = 0.5; // 光照强度
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 环境光

  scene.add(ambientLight); // 场景中添加环境光
 ```

### 点光源(PointLight)
  - 构造函数 `new THREE.PointLight(color, intensity, distance, decay)`
  - 从一个点向各个方向发射的光源，常用来模拟灯泡发出的光
  - 可以投射阴影
  - 点光源有一个额外的范围，如果distance设置为0，光线可以照射无限远。如果 大于0，则光线只能照射在范围内，关照强度在这个过程中也会逐渐衰减。
  ```js
  const color = 0xffffff; // 颜色rgb值
  const intensity = 1; // 光照强度
  const distance = 0 // 表示从光源到光照强度为0的位置的距离，当设置为0时。光永远不会消失，默认值为0
  const decay = 1; // 表示光照强度随距离消失的速度，默认值为1,在 physically correct 模式下，decay 设置为等于2将实现现实世界的光衰减。

  const pointLight = new THREE.PointLight(color, intensity, distance, decay); // 点光源
  ```
  - 点光源辅助对象 `new THREE.PointLightHelper(light)`
  - 在光源的位置绘制了一个小小的线框宝石体来代表点光源。也可以使用其他形状来表示点光源，只要给点光源添加一个自定义的 Mesh 子节点即可。
  ```js
  const pointLightHelper = new THREE.PointLightHelper(pointLight); // 点光源辅助对象

  scene.add(pointLightHelper); // 场景中添加点光源辅助对象
  ```

### 聚光灯(SpotLight)
  - 构造函数 `new THREE.SpotLight(color, intensity, distance, angle, penumbra, decay)`
  - 可以投射阴影
  - 光线从一个点沿一个方向射出，随着光线照射的变远，光线圆锥体的尺寸也逐渐增大，可以看成是一个点光源被一个圆锥体限制住了光照的范围
  ```js
  const color = 0xffffff; // 颜色rgb值
  const intensity = 1; // 光照强度
  const distance = 0 // 从光源发出光的最大距离,其强度根据光源的距离线性衰减
  const angle = Math.PI / 3; // 光照范围的角度，默认值为Math.PI / 3，即30度角。应该不超过Math.PI / 2。
  const penumbra = 0; // 聚光锥的半影衰减百分比，默认值为0，即光照范围内没有阴影。
  const decay = 1; // 沿着光照距离的衰减量，默认值为1,
  const spotLight = new THREE.SpotLight(color, intensity, distance, angle, penumbra, decay); // 聚光灯
  
  scene.add(spotLight); // 场景中添加聚光灯
  ```
  - 聚光灯的方向是从它的位置到目标位置.默认的目标位置为原点 (0,0,0)，也可以设置target为场景中的其他对象(任意拥有 position 属性的对象)
  ```js
  spotLight.target.position.set(-5,0,0); // 设置聚光灯的目标位置
  scene.add( light.target );
  ```

### 半球光(HemisphereLight)
  - 构造函数 `new THREE.HemisphereLight(color, groundColor, intensity)`
  - 半球光的颜色从天空到地面两个颜色之间的渐变，与物体材质的颜色作叠加后得到最终的颜色效果。
  - 半球光不能投射阴影
  - 一个点收到的光照颜色由所在平面的朝向(法向量)决定的
  - 半球光通常和其他光照一起使用，或者作为环境光的替代方案
  ```js
  const skyColor =  ; // 天天空中发出光线颜色rgb值
  const groundColor = 0xb97a20; // 地面发出光线颜色rgb值
  const intensity = 1 // 光照强度

  const hemiLight = new THREE.HemisphereLight(skyColor, groundColor, intensity); // 半球光
  scene.add(hemiLight); // 场景中添加半球光
  ```

### 方向光(DirectionalLight)
  - 构造函数 `new THREE.DirectionalLight(color, intensity)`
  - 方向光沿着特定方向发射的光,从它发出的光线都是平行的,常用来表现太阳光照效果
  - 可以投射阴影
  - 平行光的方向是从它的位置到目标位置，默认的目标位置为原点 (0,0,0)，它也可以设置target为场景中的其他对象(任意拥有 position 属性的对象)

  ```js
  const color = 0xffffff; // 颜色rgb值
  const intensity = .8; // 光照强度
  const directionalLight = new THREE.DirectionalLight(color, intensity); // 方向光+

  directionalLight.position.set(0,10,0); // 设置方向光的位置
  directionalLight.target.position.set(-5,0,0); // 设置方向光的目标位置

  scene.add(directionalLight); // 场景中添加方向光
  scene.add(directionalLight.target); // 场景中添加方向光的目标位置
  ```
  - 方向光辅助对象 `new THREE.DirectionalLightHelper(light)`
  - 当辅助对象所表示的不可见对象有所改变的时候，我们必须调用辅助对象的`update`方法来更新辅助对象本身的状态。

 ```js
  const lightHelper = new THREE.DirectionalLightHelper(directionalLight); // 方向光辅助对象
  scene.add(lightHelper); // 场景中添加方向光辅助对象
 ```

### 创建灯光

```ts
import { AmbientLight, DirectionalLight } from 'three'

function createLights(){
  const ambientLight = new AmbientLight(
    'white',
    .6
  )

  const dirLight = new DirectionalLight(
   'white',
    .5
  )

  return {
    ambientLight,
    dirLight
  }
}
```