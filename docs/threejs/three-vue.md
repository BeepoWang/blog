## ThreeJs 项目中的代码组织
### 安装与基础使用
1. 项目中安装three，使用包管理工具`yarn`、`npm`、`pnpm`等

```bash
yarn add three
# or
npm install three
```
2. 项目中的基础使用
```ts
import * as THREE from 'three'
// or
import {Scene,WebGlRenderer,PerspectiveCamera} from 'three'

const scene = new Scene()
const renderer = new WebGlRenderer()
const camera = new PerspectiveCamera(45, 2, 0.1, 1000)
// or
const scene = new THREE.Scene()
const renderer = new THREE.WebGlRenderer()
const camera = new THREE.PerspectiveCamera(45, 2, 0.1, 1000)
```

### vue 项目中three的封装
使用class封装three
```ts
// ThreeWorld.ts
class ThreeWorld{
  constructor(){

  }
}
```