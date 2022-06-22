20220527 am 02:44
`npm run server`  
界面样式无，出现报错，遂查看。  
node-sass版本不对。尝试使用nvm切换  

####nvm   
安装其他版本之前去这个目录`C:\Users\Administrator\AppData\Roaming\nvm\settings.txt`配置镜像  
然后
```
nvm list
nvm install 10.24.1
```
顺利运行

####补充
下载地址：`http://nvm.uihtm.com/`
当前电脑有node 14安装时会提示，点击“是”。直接安装就行。

设置node_mirro与npm_mirror为国内镜像地址

node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/