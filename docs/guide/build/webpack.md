---
title: 构建工具 - webpack
date: '2022-06-01'
tags:
  - 'webpack'
---

## webpack 基础知识

1. 什么是 webpack

- 模块打包器（构建工具），将源代码加工成浏览器可以 高效、 稳定运行的，兼容性较好的代码
- 在 webpack 中回家前端所有的资源牛文件（js/json/html/img/css/..）都作为模块处理

2. 核心概念

- 【入口(entry)】: 指定打包的入口文件,作为构建其内部依赖的开始
- 【出口(output)】： 指定打包后的输出文件
- 【loader】：处理非 js 文件(webpack 自身只能解析 js 和 json 文件)
- 【插件(plugins)】：执行范围更管得业务，从打包到优化都可以实现
- 【模式(mode)】：指定打包的模式，开发模式 development，生产模式 production

  - loader 的理解
    - webpack 本身只能处理 js、json 模块，如果需要加载其他类型的文件，就需要使用对应的 loader
    - 他本是是一个函数，接收一个文件，转换成一个新的文件，返回一个新的文件
    - loader 一般以 xxxx-loader 的方式命名，其中 xxx 一般代表这个 loader 的功能
  - plugins 的理解

    - plugins 完成 loader 不能完成功能

3. webpack 打包 基本流程

- **连接**：webpack 从入口 js 开始，递归查找出所有相关的模块，并连接起来组成一个网的结构
- **编译**：将 js 模块中的模块化语法编译成浏览器可以直接运行的模块语法（其他资源也会同步处理）
- **合并**：将网结构中的所有编译过的模块合并成一个或几个文件，并且进行压缩，浏览器最终运行的就是打包后的文件

4. live-reload（自动刷新） 与 HMR（模块热替换）

- 相同点
  代码修改后，都会自动重新编译打包
- 不同点
  - live-reload：刷新整个页面，页面状态全新
  - HMR： 没有刷新整个页面，模块热替换，只加载修改的模块

5. webpack 的 tree-shaking

- 一个模块向外暴露了 n 个函数、对象、或其他数据，但是在使用的时候，只需要使用这些数据，其他的不需要使用，那么在最终打包的时候，这些数据就会被抛弃，这样就可以减少打包文件的大小
- 同时满足两个条件，webpack 会自动开始 tree-sharing
  1. 使用 ES6 的模块化
  2. 开启 production 模式

## webpack 配置文件

```js
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    publicPath: '/dist/',
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: []
  },
  plugins: [],
  devServer: {
    port: 3000,
    host: true,
    open: true
  }
};
```

## 常用 loader

### js 语法转换 babel-loader

```sh
npm install babel-loader @babel/core @babel/preset-env -D
```

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
```

### js 兼容性处理 @babel/poyfill

```sh
npm install @babel/polyfill -D
```

- 方式一

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/polyfill']
          }
        }
      }
    ]
  }
};
```

- 方式二 在入口文件(index.js)中引入即可

`import '@babel/polyfill';`

### 打包样式文件 css-loader 和 style-loader

```sh
npm install --save-dev style-loader css-loader
```

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
```

### 打包图片文件 url-loader

```sh
npm install url-loader --save-dev
```

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]_[hash].[ext]', // [name] 原文件名 [ext] 原文件后缀 [hash] 文件内容的 hash 值
              outputPath: 'imgs/', // 图片加工后目录位置
              limit: 8 * 1024 // 图片大小限制,小于8kb转成base64   url-loader 可以设置限制
            }
          }
        ]
      }
    ]
  }
};
```

### 解析 html 中图片 html-loader

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src', 'img:data-src']
            }
          }
        ]
      }
    ]
  }
};
```

### 打包其他资源 file-loader

```js
module.exports = {
  module: {
    rules: [
      {
        // exclude: /\.(html|css|json|js|png|jpg|gif)$/, 取反
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  }
};
```

### webpack 语法检查 eslint-loader

```sh
npm install --save-dev eslint-loader
```

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre', // 优先执行
        use: [
          {
            loader: 'eslint-loader',
            options: {
              fix: true
            }
          }
        ]
      }
    ]
  }
};
```

- 配置 eslint 检查规则

```json
{
  "eslintConfig": {
    "extends": ["eslint:recommended", "plugin:vue/essential"]
  }
}
```

## 常用插件 plugins

### 打包 html 文件 html-loader

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: true // 压缩
    })
  ]
};
```

### 提取 css 文件 mini-css-extract-plugin

```sh
npm install --save-dev mini-css-extract-plugin
```

```js
const miniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [miniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new miniCssExtractPlugin({
      filename: 'css/[name]_[hash].css'
    })
  ]
};
```

### 解决 css 兼容性问题 postcss-loader

```sh
npm install --save-dev postcss-loader postcss postcss-preset-env
```

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [require('postcss-preset-env')()]
            }
          }
        ]
      }
    ]
  }
};
```

### 压缩 css 文件 optimize-css-assets-webpack-plugin

```sh
npm install --save-dev optimize-css-assets-webpack-plugin
```

```js
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  plugins: [
    new optimizeCssAssetsWebpackPlugin({
      preset: ['default', { discardComments: { removeAll: true } }]
    })
  ]
};
```

## webpack-dev-server

```sh
npm install webpack-dev-server --save-dev
```

```js
module.exports = {
  devServer: {
    port: 3000, // 开启服务器端口号
    host: true, //
    open: true, // 自动打开浏览器
    hot: true // 开启热更新
  }
};
```

- 生成的打包文件不会被打包到 dist 目录下，而是在内存中

## 配置 webpack 启动命令

```json
// package.json
{
  "scripts": {
    "dev": "webpack-dev-server --open --config ./webpack.dev.js",
    "build": "webpack --config ./webpack.prod.js"
  }
}
```
