cmd regedit    


目录为`\HKEY_CLASSES_ROOT\*\shell`下建一个新的项(uuu)，再在刚刚建的上面右键再建一个项，文件名必现为`command`，然后聚焦uuu，双击“默认”填入uuu。    
icon：在 uuu 上点击右键 ->新建->字符串值，命名为icon（必须这个名），双击icon，在数值数据中填入应用程序的路径（用于获取右键菜单中的图标）    
url: 左键点击command，双击右边的“默认”，在数值数据中填入C:\xxx\xxx.exe %1（路径+空格+百分号+1）。    
可以填bat脚本，脚本里可以运行node

`D:\word_word\user_\Ptest\run.bat %1`

```
// run.bat

@echo off
start cmd /k "node D:\word_word\user_\Ptest\test.js %1"


// test.js

// HKEY_CLASSES_ROOT\shell 对文件弹出的菜单项

// HKEY_CLASSES_ROOT\folder\shell 对文件夹和驱动器弹出的菜单项

// HKEY_CLASSES_ROOT\directory\shell 对文件夹弹出的部分内容

// HKEY_CLASSES_ROOT\drive\shell 对驱动文件夹弹出的菜单项

// process.argv 获取node的调用参数
let p1 = process.argv
console.log(p1)

```

更新 仅仅靠 %1 ，当文件名中有空格就无法获得全部参数，遂在注册表中改为
```
D:\word_word\user_\Ptest\run.bat "%1"
```


D:\common_tools\Microsoft VS Code\Code.exe