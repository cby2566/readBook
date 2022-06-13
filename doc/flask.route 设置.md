在`Python3.9.0`环境下，假设已经顺利安装了`flask`。

```
# main.py

from flask import Flask

app = Flask(__name__)

@app.route('/', methods=['get'])
def home():
  return 'home'

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=9998)
    # app.run(host='0.0.0.0', port=9998, debug=True)
    ## app.run(host, port, debug, options)
```
- 起一个简单的服务，可以将配置当做参数写在入参里，也可以设置app的属性 `app.debug = True` 实现同样的效果。

```
# main.py
from flask import request
@app.route('/postparam/<int:qqq>', methods=['POST'])
def post_param(qqq):
    # 限制请求类型
    # 405 Method Not Allowed
    print('values---', request.values)
    # multipart/form-data | application/x-www-from-urlencoded
    print('form---',  request.form)
    print('form---',  dict(request.form))
    # raw
    print('data---', request.data)
    # - Text 
    print('data---', request.data)
    # - JSON 
    print('json---', request.json)

    #print('args---', request.args)
    # 形参的变量名要注意
    print(qqq)
    # return '888 %s' %qqq #直接输出时也要注意字符占位符 
    # 返回值必须是字符串，字典，元组，不能是整数和列表
    return 'postA'
```
 - 可以引入flask里的request模块（对其作用域还不是很了解），对请求信息进行读取。请求类型可以通过`methods=['POST']`限制，`<int:qqq>`获取模糊的路由传参，并且限制数据类型。关于请求值，可以通过`request.values`获取。`get`可以用`request.args`获取？后面的值，`post`根据请求格式不同有所不同。


```
# main.py
#  错误和重定向
from flask import redirect, url_for, abort
@app.errorhandler(404)
def page_not_found(error):
    
    print(error)
    # return 'error'
    return redirect(url_for('redirect_page', xxx='ok')) 
    # 第一个参数填方法名

@app.route('/xxx')
def redirect_page():
    # 要给客户端返回的code码
    # abort(403)
    # abort(401)
    return 'xxx'

# # 静态文件 和 模板
from flask import render_template
@app.route('/initHtml')
@app.route('/initHtml/<name>')
def init_css(name=None):
    # 需要手动创建templates文件夹
    return render_template('html/index.html', name=name)
```
 - `redirect`可以将页面重定向到指定的路由方法，需要通过`url_for`设置方法名，并且可以带参数跳转。`app.errorhandler`和`abort`，前者是可以捕获浏览器的错误码交给我们的逻辑，而不是显示默认的错误界面。后者是可以设置期望的错误码给浏览器，让它显示对应的默认错误界面。
 - `app.route`可以设置复数路由指向同一个处理方法。需要注意的是，`render_template`只认`templates`文件夹，需要手动在根目录新建。同样的返回模板的时候也可以传递参数(多个，从第二个开始都是自定义参数)。获取的时候`{{ name }}`。
 - 然后是静态文件，官方文档描述可以通过`url_for('static', filename='style.css')`获取相应的 `URL` 。需要和模板一样根目录的`static`文件夹不能少。但是没法直接通过函数跳转，可以写在模板里。非要直接访问只能通过`http://127.0.0.1:9998/static/css/style.css`去访问。此外`static`文件夹以外的路径被限制。