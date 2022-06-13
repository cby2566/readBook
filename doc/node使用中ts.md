###node 中使用 TypeScript 的实例
首先用命令初始化ts项目
```
tsc --init
```
要全局装 TypeScript 才行，在项目根目录下自动创建`tsconfig.json`文件。  
在项目目录，直接运行`tsc`才会使用`tsconfig.json`文件之中的配置。

官方文档 https://www.typescriptlang.org/tsconfig

然后看看翻译的注释，和配置项。  
例如：`"incremental": true` 将模式设置为增量编译。然后编译后会在目录下生成`tsconfig.tsbuildinfo`缓存，下次会对比缓存后只编译新增的内容。

###枚举
安装依赖 `npm install ts-node -D`   
在`package.json`中配置启动命令`"dev": "ts-node ./src/study.ts"`。就相当于开发模式仅编译运行，但是不打包出来。 

###泛型
在定义时使用`<T>`来代指，在调用时在设置变量或返回值的类型。

使用命令`tsc -w`可以监听变化的同时编译