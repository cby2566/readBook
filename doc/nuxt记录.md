手动安装nuxt实例  
设置好package.json的scripts属性，然后直接npm安装nuxt。在根目录建名为pages的文件夹 和 index.vue的文件，然后启动被自动识别并读取。  

暂时选择静态资源打包。在nuxt.config.js中设置。命令为`npm run generate`。nuxt会将pages目录下的文件识别并转换成vue路由，即使是动态路由也可以通过文件名的不同来创建。  

`project3\nuxt_shou`