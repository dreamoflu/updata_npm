# 上传npm包的项目示例

###1.使用vue-cli初始化一个项目
>vue init webpack vue-flag-list
>cd vue-flag-list
>cnpm install
>npm run dev
###2. 在src下的components文件夹中新建文件夹写自己的vue模板文件我的示例模板在myComponent文件里面

2.1、myComponent.vue
```
<style scoped>

</style>
<template>
    <div>
这是我自己写的组件
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        props: {},
        mounted() {

        },
        methods: {},
        computed: {},

    }
</script>

```
2.2、index.js
```js
import myComponent from './myComponent.vue'

const VueComponent = {
  install: function (Vue) {
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue
    }
    Vue.component('VueFlagList', myComponent)
  }
}

export default VueComponent
```
###3.修改配置文件
3.1、package.json
```json
{
  "name": "my-personal-modal",
  "version": "1.0.3",
  "description": "A Vue.js project",
  "author": "jun <dreamoflu@163.com>",



  "private": false,
  "main": "dist/myComponent.min.js",
   // 指定打包之后，包中存在的文件夹
  "files": [
    "dist",
    "src"
  ],
    // 指定代码所在的仓库地址
  "repository": {
    "type": "git",
    "url": "https://github.com/lyj-js/updata_npm.git"
  },

  "keywords": [ // 指定关键字
    "vue",
    "flag",
    "code",
    "flag code"
  ],
  "license": "MIT",//开源协议

  "scripts": {
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    "start": "npm run dev",
    "build": "node build/build.js"
  },
  "dependencies": {...},
  "devDependencies": {...},
  "engines": {
    "node": ">= 6.0.0",
    "npm": ">= 3.0.0"
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
}
```
3.2 .gitignore 文件
```json
因为要用dist文件夹，所以在.gitignore文件中把dist/去掉。
```
###4、修改webpack.prod.conf.js
######把vue-cli生成的webpack.prod.conf.js整体替换为本次项目中的webpack.prod.conf.js
4.1修改细节
4..1.1、webpack.prod.conf.js 中 output 设置
```js
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '',
    filename: 'myComponent.min.js',
    library: 'myComponent',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
```
>Vue 是组件库的外部依赖。组件库的使用者会自行导入  Vue，打包的时候，不应该将 Vue 打包进组件库。但是，如>果你将打包后的组件库以 \<script\>标签形式直接引入，你>会发现并不能正常执行，提示 vue 未定义。
以 \<script\> 标签形式使用组件时，会同样使用 \<script\>
标签导入 Vue。Vue 导入的变量是 “window.Vue” 而不是 “window.vue”，因此会出现 vue 未定义的错误。

```js
externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
```
4.1.2、另外，为了将css打包成一个文件，所以需要将 webpack.prod.conf.js 中的
plugins 选项的
```js
new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
```
改为
```js
new ExtractTextPlugin({
      filename: 'vue-flag-list.min.css'
    }),
    }),
```
4.2修改webpack.base.conf.js

```js
entry: {
    app: './src/index.js'
  },
```
5.项目目录展示
> vue-flag-list
  \+ build
  \+ config
  \+ dist
  \- src
     \ - components
               \ - myComponent
			          index.js
			           myComponent.vue
 >

### 6、发布npm包
6.1、打包到本地测试
>npm build
>npm pack

npm pack 之后，就会在当前目录下生成 my-personal-modal-1.0.0.tgz 的文件。
>my-personal-modal的文件名和package.json中的name相同

打开一个新的vue项目，在当前路径下执行('路径' 表示文件所在的位置)
>cnpm install 路径/my-personal-modal-1.0.0.tgz

在新项目的入口文件（main.js）中引入

>import myComponent from 'my-personal-modal'
>import 'myComponent /dist/myComponent .min.css'
>Vue.use(myComponent )

###7、正式发布到npm
1、在 npm官网 注册一个npm账号

2、切换到需要发包的项目根目录下，登录npm账号，输入用户名、密码、邮箱
>npm login
>执行npm publish即可

上传可能会有bug，不能使用已经有的包名，先在npm上搜索一下自己的包名，如果没有就可以上传
