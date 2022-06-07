---
title: webpack (高级)优化
date: '2022-06-03'
tags:
  - 'webpack'
---

## webpack (高级)优化

### 提升开发体验 -- SourceMap

1. 是什么

   SourceMap 用来生成源代码到构建后代码的映射关系，方便调试，会生成一个 xxx.map 文件

2. 怎么用

- 开发模式 `cheap-module-eval-source-map`

```js
module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map'
};
```

- 生产模式 `source-map`

```js
module.exports = {
  mode: 'production',
  devtool: 'source-map'
};
```

### 提升打包构建速度

- HotModuleReplacement

1. 是什么

   HotModuleReplacement 用来替换更新的模块，更新模块的时候不会刷新页面，而是更新模块，更新完成后会自动刷新页面

2. 怎么用

```js
{
  ...
  devServer: {
    hot: true, // 开启热更新
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
  ...
}

```

- oneOf

1. 是什么

   oneOf 用来匹配多个规则，只要有一个匹配上就会走这个规则

2. 怎么用

```js
{
  ...
  module:{
    rules:[{
      oneOf:[{
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },{
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }]
    }]
  }
}
```

- Include / Exclude

1. 是什么

   Include 和 Exclude 用来匹配文件，只要匹配上就会走这个规则，不能同时设置 include 和 exclude

   - Include 匹配
   - Exclude 排除

2. 怎么用

```js
{
  ...
  module:{
    rules:[{
      test: /\.css$/,
      include: /src/, // 只处理src下文件
      use: [
        'style-loader',
        'css-loader'
      ]
    }，{
      test: /\.css$/,
      exclude: /src/, // 不处理src下文件
      use: [
        'style-loader',
        'css-loader'
      ]
    }]
  }
}
```

- Cache

1. 是什么

   Cache 对 Eslint 检查和 Babel 编译进行了缓存，避免每次都重新编译，提升第二次及以后的打包速度

2. 怎么用

```js
{
  ...
  module:{
    rules:[{
      test: /\.js$/,
      enforce: 'pre',
      use: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true, // 开启缓存
            cacheCompression: false // 关闭缓存文件压缩
          }
        }
      ]
    }]
  }
}
```

- 多进程打包 -- Thread

1. 是什么

   多进程打包，开启多个进程同时干一件事，可以提高打包速度，但是会占用更多的内存

2. 怎么用

- 下载包

```js
  npm install thread-loader -D
```

- 配置

```js
const os = require('os');

const threads = os.cpus().length; // 获取CPU核心数量

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'thread-loader', // 开启多进程打包
          options: {
            workers: threads
          },{
            loader: 'babel-loader',
            options: {
              cacheDirectory: true, // 开启缓存
              cacheCompression: false // 关闭缓存文件压缩
            }
          }
        }
      }
    ]
  },
  plugins: [
    new ESLintPlugin({
      context: path.resolve(__dirname, 'src'),
      exclude: /node_modules/,
      cache: true, // 开启缓存
      threads // 开启多进程打包
    })
  ]
};
```

### 减少代码体积

- Tree Shaking

1. 是什么

   Tree Shaking 移除 js 中没有使用的代码, 可以减少代码体积，依赖 ES module

2. 怎么用

   webpack 5 中默认开始 tree shaking，无需其他配置

- Babel

1. 是什么
   @babel/plugin-transform-runtime: 禁用了 babel 自动对每个文件的 runtime 注入，而是引入 @babel/plugin-transform-runtime 插件，使所有的辅助代码从这里引用
2. 怎么用

- 安装依赖

```bash
  npm install @babel/plugin-transform-runtime -D
```

- 配置

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [['@babel/plugin-transform-runtime']]
          }
        }
      }
    ]
  }
};
```

- 图片压缩 -- [Image-minimizer-webpack-plugin](https://webpack.js.org/plugins/image-minimizer-webpack-plugin/#root)

1. 是什么
   Image-minimizer-webpack-plugin 项目中图片使用较多，压缩图片，提升打包速度
2. 怎么用

- 安装依赖

  ```bash
    npm install image-minimizer-webpack-plugin -D
    # 无损压缩依赖包
    npm install imagemin-gifsicle imagemin-optipng imagemin-svgo -D
    # 有损压缩依赖包
    npm install imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant  imagemin-svgo -D
  ```

- 配置

```js
const imageMinimizerPlugin = require('image-minimizer-webpack-plugin');
...
{
  plugins: [
    new imageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminMinify,
        options: {
          plugins: [
            ["gifsicle", { interlaced: true }],
            ["jpegtran", { progressive: true }],
            ["optipng", { optimizationLevel: 5 }],
            [
              "svgo",
              {
                plugins: extendDefaultPlugins([
                  "prefixIds",
                  "preset-default",
                  {
                    name:'sortAttrs',
                    params:{
                      xmlns: 'alphabetically'
                    }
                  }
                ]),
              },
            ],
          ],
        },
      }
    })
  ]
}
```
