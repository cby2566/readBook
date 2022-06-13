### 搭建webpack遇到的问题-vue
hit_bag    
Commit: 2dd12fea25055e2b19877ccc9247a8975b3e762d    
- 首先，在webpack已经可以打包js，但没有配置单文件组件形式的情况下。  
我使用`npm install vue`安装vue 2.x，建立html并创建节点绑定id。
```
// index.html
<div id="vue"></div>
```
```
// index.js
import Vue from "vue"

new Vue({
  data: ()=>{
    return {
      message: 'simple vue!',
    }
  },
  template:'<div>{{ message }}</div>'
}).$mount('#vue')
```
- 结果出现了报错
```
[Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.

(found in <Root>)
```
- 大概意思是这种写法需要编译器（使用编译器会使构建的应用体积增加10kb左右），而这里没有。
查阅资料有几种解决方案，参考
```
https://cli.vuejs.org/zh/config/#runtimecompiler
https://cn.vuejs.org/v2/api/#el
https://cn.vuejs.org/v2/guide/installation.html#%E8%BF%90%E8%A1%8C%E6%97%B6-%E7%BC%96%E8%AF%91%E5%99%A8-vs-%E5%8F%AA%E5%8C%85%E5%90%AB%E8%BF%90%E8%A1%8C%E6%97%B6
```


1、 使用render函数编译App.vue就可以了，这种就是脚手架里集成的操作。需要使用单文件组件的插件。

2、 在引入vue的时候，直接引入含有编译器的vue包。有两种方式。
- 修改 import Vue from "vue" ， 解析为 import Vue from "vue/dist/vue.esm.js"
- 或在webpack.config中修改resolve属性配置
```
resolve: {
    alias: {
        'vue$': 'vue/dist/vue.esm.js' //内部为正则表达式  vue结尾的
    }
  }
```
2、 类似于render函数，用JSX来编写vue文件。

------
Vue的编译渲染过程    
template --> ast --> render函数 --> VDom --> 真实DOM


- 先将template解析(parse)成抽象语法树(ast)
- 将ast编译(compiler)成render函数
- 将render函数渲染(render)成虚拟DOM
- 最后将虚拟DOM渲染成真实DOM


(1) runtime-compiler的步骤
template --> ast --> render函数 --> VDom --> 真实DOM


(2) runtime-only的步骤
render函数 --> VDom --> 真实DOM
