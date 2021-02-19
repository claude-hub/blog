# Webpack配置核⼼概念

![](https://raw.githubusercontent.com/claude-hub/cloud-img/main/2021/20210219111524.jpg)

## 流程

- 接收webpack配置 进⾏读取
- ⼊⼝：从哪个⽂件开始
  - 读取⼊⼝模块的内容，分析内容
  - 哪些是依赖
  - 哪些是源码
    - es6,jsx，处理 需要编译 ->浏览器能够执⾏
  - 递归处理其他依赖模块
- 拿到对象数据结构
  - 模块路径
  - 处理好的内容
- 创建bundle.js
  - 启动器函数，来补充代码⾥有可能出现的module exports require，让浏览器能够顺利的执⾏
- 出⼝：⽣成资源⽂件的名称和位置



## webpack.config.js

```javascript
module.exports = {
  entry: "./src/index.js", //打包⼊⼝⽂件
  output: "./dist", //输出结构
  mode: "production", //打包环境
  module: {
    rules: [
      //loader模块处理
      {
        test: /\.css$/,
        use: "style-loader"
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin()] //插件配置
};
```

## entry

指定webpack打包⼊⼝⽂件:Webpack 执⾏构建的第⼀步将从 Entry 开始，可抽象成输⼊

```javascript
//单⼊⼝ SPA，本质是个字符串
entry:{
 main: './src/index.js'
}
==相当于简写===
entry:"./src/index.js"
//多⼊⼝ entry是个对象
entry:{
 index:"./src/index.js",
 login:"./src/login.js"
}
```

## output

打包转换后的⽂件输出到磁盘位置:输出结果，在 Webpack 经过⼀系列处理并得出最终想要的代码后输 出结果。

```javascript
output: {
 filename: "bundle.js",//输出⽂件的名称
 path: path.resolve(__dirname, "dist")//输出⽂件到磁盘的⽬录，必须是绝对路径
},

//多⼊⼝的处理
output: {
 filename: "[name][chunkhash:8].js",//利⽤占位符，⽂件名称不要重复
 path: path.resolve(__dirname, "dist")//输出⽂件到磁盘的⽬录，必须是绝对路径
},
```

## mode

Mode⽤来指定当前的构建环境 

- production
- development
- none 

设置mode可以⾃动触发webpack内置的函数，达到优化的效果

开发阶段的开启会有利于热更新的处理，识别哪个模块变化

⽣产阶段的开启会有帮助模块压缩，处理副作⽤等⼀些功能

## loader

模块解析，模块转换器，⽤于把模块原内容按照需求转换成新内容。

webpack是模块打包⼯具，⽽模块不仅仅是js，还可以是css，图⽚或者其他格式 。

但是webpack默认只知道如何处理js和JSON模块，那么其他格式的模块处理，和处理⽅式就需要 loader了。

常见的loader

```javascript
style-loader
css-loader
less-loader
sass-loader
ts-loader //将Ts转换成js
babel-loader//转换ES6、7等js新特性语法
file-loader//处理图⽚⼦图
eslint-loader
```

### 自己编写loader

```javascript
//webpack.config.js
module: {
  rules: [{
    test: /\.js$/,
    use: [{
      loader: path.resolve(__dirname, "./loader/replaceLoader.js"),
      options: {
        name: "hello"
      }
    }]
  }]
}

//replaceLoader.js
//const loaderUtils = require("loader-utils");//官⽅推荐处理loader,query的⼯具
module.exports = function(source) {
 //this.query 通过this.query来接受配置⽂件传递进来的参数
 const options = loaderUtils.getOptions(this);
 const result = source.replace("name", options.name);
 return source.replace("name", options.name);
}
```

异步调用

```javascript
const loaderUtils = require("loader-utils");
module.exports = function (source) {
  const options = loaderUtils.getOptions(this);
  //定义⼀个异步处理，告诉webpack,这个loader⾥有异步事件,在⾥⾯调⽤下这个异步
  //callback 就是 this.callback 注意参数的使⽤
  const callback = this.async();
  setTimeout(() => {
    const result = source.replace("name", options.name);
    callback(null, result);
  }, 3000);
};
```



### 多个loader的使用

顺序，⾃下⽽上，⾃右到左

## moudle

模块，在 Webpack ⾥⼀切皆模块，⼀个模块对应着⼀个⽂件。Webpack 会从配置的 Entry 开始递归找 出所有依赖的模块。 当webpack处理到不认识的模块时，需要在webpack中的module处进⾏配置，当检测到是什么格式的 模块，使⽤什么loader来处理。

```javascript
module: {
  rules: [{
    test: /\.xxx$/, //指定匹配规则
    use: {
      loader: 'xxx-load' //指定使⽤的loader
    }
  }]
}
```

loader: file-loader：处理静态资源模块 

原理是把打包⼊⼝中识别出的资源模块，移动到输出⽬录，并且返回⼀个地址名称 所以我们什么时候⽤file-loader呢？ 场景：就是当我们需要模块，仅仅是从源代码挪移到打包⽬录，就可以使⽤file-loader来处理， txt，svg，csv，excel，图⽚资源啦等等

## Plugins

plugin 可以在webpack运⾏到某个阶段的时候，帮你做⼀些事情，类似于⽣命周期的概念 扩展插件，在 Webpack 构建流程中的特定时机注⼊扩展逻辑来改变构建结果或做你想要的事情。 作⽤于整个构建过程。

Plugin: 开始打包，在某个时刻，帮助我们处理⼀些什么事情的机制

plugin要⽐loader稍微复杂⼀些，在webpack的源码中，⽤plugin的机制还是占有⾮常⼤的场景，可以 说plugin是webpack的灵魂 

设计模式

事件驱动

发布订阅

plugin是⼀个类，⾥⾯包含⼀个apply函数，接受⼀个参数，compiler

案例：

```javascript
//webpack配置⽂件
const CopyrightWebpackPlugin = require("./plugin/copyright-webpack-plugin");
plugins: [
  new CopyrightWebpackPlugin({
    name: "hello"
  })
]

//copyright-webpack-plugin.js
class CopyrightWebpackPlugin {
  constructor(options) {
    //接受参数
    console.log(options);
  }
  apply(compiler) {}
}
module.exports = CopyrightWebpackPlugin;
```

### 配置plugin在什么时刻进⾏

Webpack 在编译代码过程中，会触发⼀系列 Tapable 钩⼦事件，插件所做的，就是找到相应的钩⼦，往 上⾯挂上⾃⼰的任务，也就是注册事件，这样，当 webpack 构建的时候，插件注册的事件就会随着钩⼦ 的触发⽽执⾏了。

```javascript
const compiler =  webpack(config);
Objet.keys(compiler.hooks).forEach(hookName => {
    compiler.hooks[hookName].tap(('xxx', () => {
        console.log(`run====> ${hookName}`)
    }))
})
```

![](https://raw.githubusercontent.com/claude-hub/cloud-img/main/2021/20210219114031.jpg)

```javascript
class CopyrightWebpackPlugin {
  constructor(options) {
    // console.log(options);
  }
  apply(compiler) {
    //hooks.emit 定义在某个时刻
    compiler.hooks.emit.tapAsync(
      "CopyrightWebpackPlugin",
      (compilation, cb) => {
        compilation.assets["copyright.txt"] = {
          source: function () {
            return "hello copy";
          },
          size: function () {
            return 20;
          }
        };
        cb();
      }
    );

    //同步的写法
    //compiler.hooks.compile.tap("CopyrightWebpackPlugin", compilation => {
    // console.log("开始了");
    //});
  }
}
module.exports = CopyrightWebpackPlugin;
```

### HtmlWebpackPlugin

htmlwebpackplugin会在打包结束后，⾃动⽣成⼀个html⽂件，并把打包⽣成的js模块引⼊到该html 中。

配置：

```javascript
title: ⽤来⽣成⻚⾯的 title 元素
filename: 输出的 HTML ⽂件名，默认是 index.html, 也可以直接配置带有⼦⽬录。
template: 模板⽂件路径，⽀持加载器，⽐如 html!./index.html
inject: true | 'head' | 'body' | false ,注⼊所有的资源到特定的 template 或者
templateContent 中，如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body
元素的底部，'head' 将放置到 head 元素中。
favicon: 添加特定的 favicon 路径到输出的 HTML ⽂件中。
minify: {} | false , 传递 html-minifier 选项给 minify 输出
hash: true | false, 如果为 true, 将添加⼀个唯⼀的 webpack 编译 hash 到所有包含的脚本和
CSS ⽂件，对于解除 cache 很有⽤。
cache: true | false，如果为 true, 这是默认值，仅仅在⽂件修改之后才会发布⽂件。
showErrors: true | false, 如果为 true, 这是默认值，错误信息会写⼊到 HTML ⻚⾯中
chunks: 允许只添加某些块 (⽐如，仅仅 unit test 块)
chunksSortMode: 允许控制块在添加到⻚⾯之前的排序⽅式，⽀持的值：'none' | 'default' |
{function}-default:'auto'
excludeChunks: 允许跳过某些块，(⽐如，跳过单元测试的块)
```

案例

```javascript
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  ...
  plugins: [
    new htmlWebpackPlugin({
      clean - webpack - plugin
      title: "My App",
      filename: "app.html",
      template: "./src/index.html"
    })
  ]
};
```

```html
<!DOCTYPE html>
<html lang="en">
 <head>
 <meta charset="UTF-8" />
 <meta name="viewport" content="width=device-width, initial-scale=1.0" />
 <meta http-equiv="X-UA-Compatible" content="ie=edge" />
 <title><%= htmlWebpackPlugin.options.title %></title>
 </head>
 <body>
 <div id="root"></div>
 </body>
</html>
```

### clean-webpack-plugin

清除打包后的dist