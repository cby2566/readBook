## POST请求 
### Content-type的类型:
___
text/html ： HTML格式  
**text/plain ：纯文本格式**  
text/xml ：  XML格式  
image/gif ：gif图片格式  
image/jpeg ：jpg图片格式  
image/png：png图片格式  

**application/json    ： JSON数据格式**  
application/xhtml+xml ：XHTML格式  
application/xml     ： XML数据格式  
application/atom+xml  ：Atom XML聚合格式  
application/pdf       ：pdf格式  
application/javascript ：js格式  
application/msword  ： Word文档格式  
application/octet-stream ： 二进制流数据（如常见的文件下载）  
application/x-www-form-urlencoded ：form表单默认的数据格式类型，form表单数据被编码为key/value格式发送到服务器。  
___
#### 表单提交
 - 默认的`<from>`标签提交，`Content-type：application/x-www-form-urlencoded`，发送的数据在`from-data`里被编码，如`user=123&img=05.jpg`。 
 - 如果需要发送其他格式如图片、文本文件，音频等，则需要在`<from>`标签中设置enctype属性 `enctype="multipart/form-data"`。它会将请求body中的数据当做为二进制类型来传输。用`boundary=----WebKitFormBoundaryy***`来分割每一项数据。  

#### AJAX提交
 - 默认的`AJAX`发送的`post`请求，`Content-Type: text/plain;charset=UTF-8`是以文本形式发送，所以在`Request Payload`的值会被转换成`data=1&age=1`以连接符拼接的字符串文本格式。
 - 一些引用类型作为参数传递，则需要先设置`Content-Type: application/json`，然后再转成`JSON`字符串进行发送`JSON.stringify([{"data": 1}])`。
 - 传输文件的时候，可以通过`new FormData()`来模拟`<from>`标签提交，格式同样也会被编码成二进制来传输。需要**特别注意**的是千万不要手动设置请求头` contentType: "multipart/form-data"`，当你使用`new FormData()`来发送`ajax`请求时，会自动选择`contentType`类型并帮你分割数据。而当手动指定请求头时则会出错。
### Other
 - 其他封装框架如`jQuery`、`axios`、`fetch`等发请求时，他们会优先使用`JSON`格式进行传输，有些也会帮你编译请求`body`和默认选择请求头（当你传输文件的时候）。
 - 虽然框架默认的配置`JSON`格式足以应对大多数场景，但是当接口和你所使用框架有出入的时候还是需要根据默认的`ajax`的一下配置特性来进行修改。

