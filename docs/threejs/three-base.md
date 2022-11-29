### ThreeJs 初识
> The aim of the project is to create an easy to use, lightweight, cross-browser, general purpose 3D library. 
> 一个易于使用、轻量级、跨浏览器的通用 3D 库

### 目录

- web3D 发展简介
- ThreeJs 基础概念
- 创建第一个3D场景


#### 前端3D发展  

1. Web 3d  

泛指经由网页浏览器去显示三维计算机图形的各种方法。 例如虚拟现实经由Web使用。一般网络三维支持通过安装浏览器插件来实现。该技术的出现最早可追溯到VRML,VRML（Virtual Reality Modeling Language）即虚拟现实建模语言。 VRML开始于20世纪90年代初期。
![web3D](https://persongitbook.oss-cn-beijing.aliyuncs.com/web3D.png?versionId=CAEQExiBgICppdWclxgiIDFjNTFlOGRkNWQ1NjQ3MWI5Y2Q0NmY2MDQ1NjRlYzQx)  

2. WebGL

WebGL（全写Web Graphics Library）是一种3D绘图协议，这种绘图技术标准允许把JavaScript和OpenGL ES 2.0结合在一起，通过增加OpenGL ES 2.0的一个JavaScript绑定，WebGL可以为HTML5 Canvas提供硬件3D加速渲染，这样Web开发人员就可以借助系统显卡来在浏览器里更流畅地展示3D场景和模型了，还能创建复杂的导航和数据视觉化。显然，WebGL技术标准免去了开发网页专用渲染插件的麻烦，可被用于创建具有复杂3D结构的网站页面，甚至可以用来设计3D网页游戏等等。  

WebGL起源于Mozilla员工弗拉基米尔·弗基西维奇的一项称为Canvas 3D实验项目。2006年，弗基西维奇首次展示了Canvas 3D的原型。2007年底在Firefox和Opera被实现。

在2009年初，非营利技术联盟Khronos Group启动了WebGL的工作组，最初的工作成员包括Apple、Google、Mozilla、Opera等。2011年3月发布WebGL 1.0规范。截至2012年3月，工作组的主席由肯·罗素（Ken Russell，全名“Kenneth Bradley Russell”）担任。

WebGL 2规范的发展始于2013年，并于2017年1月完成。该规范基于OpenGL ES 3.0。首度实现在Firefox 51、Chrome 56和Opera 43中。

![support](https://persongitbook.oss-cn-beijing.aliyuncs.com/canUseWEbGL.png?versionId=CAEQFBiBgIDe7Y.xlxgiIGYzYzA5Y2RjNDM2YjQ0NzliNmZlYjllOGI5MDM1YWNl)

#### ThreeJS 知识点
- 渲染器(Renderer)
- 场景(Scene)
- 摄像机(Camera)
- 网格(Mesh)
- 材质(Material)
- 几何体(Geometry)
- 灯光(Light)
- 纹理(Texture)
......
<!-- https://threejs.org/manual/resources/frustum-3d.svg -->
![基础的three.js应用结构](https://persongitbook.oss-cn-beijing.aliyuncs.com/three-structure.png?versionId=CAEQEhiBgMCB3KWOkhgiIDBhYjYzYjYyZmNjNTRkM2VhNmNlZjRkMzNiZDViNWU0 "基础的three.js应用结构")



##### 场景(Scene)
- 构造函数 **`new THREE.Scene()`**
- 场景能够让你在什么地方、摆放什么东西来交给three.js来渲染，这是你放置物体、灯光和摄像机的地方。
```js
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff); // 设置场景背景色
  const near = 0.1; // 设置场景雾的近平面
  const far = 1000; // 设置场景雾的远平面
  scene.fog=new THREE.Fog(scene.background,near,far); // 设置雾化效果
```
##### 渲染器(Renderer)
- 绘制图像，并向外部表达图像的系统，含二维图像引擎和三维图像引擎
##### 相机(Camera)
1. **透视摄像机(PerspectiveCamera)** 
- 构造函数 **`new THREE.PerspectiveCamera(fov,aspect,near,far)`**
- 定义了一个 视锥(frustum)，可以提供一个近大远小的3D视觉效果
![透视摄像机](https://persongitbook.oss-cn-beijing.aliyuncs.com/three-camera.png)
```js
  const fov = 45 // 视野
  const aspect = window.innerWidth / window.innerHeight
  const near = 0.1 // 定义视锥的前端
  const far = 1000 // 定义视锥的后端
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)

  scene.add(camera)
```
2. **正交摄像机(OrthographicCamera)**
- 构造函数 **`new THREE.OrthographicCamera(left,right,top,bottom,near,far)`**
- 定义了一个正交视锥(frustum)，可以提供一个2D视觉效果
- 无论物体距离相机距离远或者近，在最终渲染的图片中物体的大小都保持不变
##### 光源(Light)
1. **环境光(AmbientLight)**
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

2. **半球光(HemisphereLight)**
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

3. **方向光(DirectionalLight)**
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

4. **点光源(PointLight**)**
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
5. **聚光灯(SpotLight)**
  - 构造函数 `new THREE.SpotLight(color, intensity, distance, angle, penumbra, decay)`
  - 可以投射阴影
  - 光线从一个点沿一个方向射出，随着光线照射的变远，光线圆锥体的尺寸也逐渐增大，可以看成是一个点光源被一个圆锥体限制住了光照的范围
  ```js
  const color = 0xffffff; // 颜色rgb值
  const intensity = 1; // 光照强度
  const distance = 0 // 从光源发出光的最大距离,其强度根据光源的距离线性衰减
  const angle = Math.PI / 3; // 光照范围的角度，默认值为Math.PI / 3，即30度角。应该不超过Math.PI / 2。
  const penumbra = 0; // 聚光锥的半影衰减百分比，默认值为0，即光照范围内没有阴影。
  const decay = 1; // 沿着光照距离的衰减量
  const spotLight = new THREE.SpotLight(color, intensity, distance, angle, penumbra, decay); // 聚光灯
  
  scene.add(spotLight); // 场景中添加聚光灯
  ```
  - 聚光灯的方向是从它的位置到目标位置.默认的目标位置为原点 (0,0,0)，也可以设置target为场景中的其他对象(任意拥有 position 属性的对象)
  ```js
  spotLight.target.position.set(-5,0,0); // 设置聚光灯的目标位置
  scene.add( light.target );
  ```

### ThreeJS配套插件
1. lil-gui