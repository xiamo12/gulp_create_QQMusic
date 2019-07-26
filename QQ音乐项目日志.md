QQ音乐项目

构建一个项目需要确定的事情：

需要用到什么技术、构建的目录包括什么内容、会涉及到哪些第三方依赖

编码完成业务块

语法检查、符合公司语法规范

文件合并

代码、图片的压缩



自动化构建工具：使用自动化构建工具可以自动配置好上述文件，由自动化构建工具完成上述任务

gulp是基于node.js。







淘宝镜像

gulp是一个任务运行器；

gulp的四个常用API：gulp.task，gulp.src, gulp.dest, gulp.watch

gulp前端自动化构建工具：可以压缩图片、将ES6语法转换成ES5语法，对js进行压缩、将less、sass转换为css语法。gulp是一个插件的集合，可以用大量的插件去做不同的事情

项目搭建步骤：

- mkdir 项目名称：创建一个项目文件夹

```
$ mkdir QQMusic
```

- sudo cnpm init：初始化项目文件

```
$ sudo cnpm init -y
```

- 搭建项目结构，src目录放置源代码，build放置自动化构建工具构建好的代码；

```
QQMusic --> node_modules / package.json / src / build / gulpfile.js /

src --> images / html / css / js

```



- 加载gulp

```
$ sudo cnpm install gulp -g
```

- 加载gulp开发依赖

```
$ sudo cnpm install gulp -D
```

- 加载jquery运行依赖

```
$ sudo cnpm install jquery -S
```

- 在项目根目录下创建gulpfile.js配置文件

```
QQMusic --> gulpfile.js
```

- 在gulpfile.js配置文件里require引入gulp

```javascript
var gulp = require("gulp");

var folder = { //文件夹
	src: "./src/", //指定src是当前文件夹下的src文件夹
	build: "./build/"//指定build是当前文件夹下的build文件夹
}	


//gulp.task注册一个任务，接收三个参数，1⃣️命名一个任务名字，2⃣️定义️要做的任务操作
gulp.task("images",function(){
	// 读取src文件夹里的文件，把它转换成文件流，转移到build文件夹下。src方法里传入路径
	gulp.src(folder.src+"images/*")//表示读取到folder指定的src文件夹下面的images里的所有文件
	.pipe(gulp.dest(folder.build + "images"))//pipe是node.js里的API，将文件流通过pipe传输，传输到build里；再用gulp.dest(folder.build + "images")将文件流转换成文件，该文件在build目录下，路径是folder.build + "images"
})
```

## 图片文件夹iamges处理：

- 安装gulp里的图片压缩工具，安装在开发依赖里: gulp-imagemin

```
$ sudo cnpm install gulp-imagemin -D
```

安装完开发依赖之后就可以在配置文件头部里面引入了，并用pipe()进行图片包压缩传输

```javascript
//引入包压缩插件,这个包插件是一个函数
var imagemin = require("imagemin");

var gulp = require("gulp");

var folder = { //文件夹
	src: "./src/", //指定src是当前文件夹下的src文件夹
	build: "./build/"//指定build是当前文件夹下的build文件夹
}	


//gulp.task注册一个任务，接收三个参数，1⃣️命名一个任务名字，2⃣️定义️要做的任务操作
gulp.task("images",function(){
	// 读取src文件夹里的文件，把它转换成文件流，转移到build文件夹下。src方法里传入路径
	gulp.src(folder.src+"images/*")//表示读取到folder指定的src文件夹下面的images里的所有文件
  .pipe(imagemin())
	
    .pipe(gulp.dest(folder.build + "images"))//pipe是node.js里的API，将文件流通过pipe传输，传输到build里；再用gulp.dest(folder.build + "images")将文件流转换成文件，该文件在build目录下，路径是folder.build + "images"
})
```

检测文件是否被处理的检测文件gulp-newer()，传入的参数是一个文件路径，指定检测该路径下的文件是否被压缩过:

```javascript
.pipe(newer(folder.build+"images")) //检测folder.build+"images"文件夹下面的文件是不是新的。
```



- 图片处理工具：
  - gulp.src()：表示读取括号里的路径下的文件。
    - 示例：`gulp.src(folder.src + "images/*")`
  - gulp.dest()：将原始文件流转换成指定路径下的新文件，传入一个路径参数；
    - 示例：`.pipe(gulp.dest(folder.build + "images"))`
  - gulp-imagemin：图片压缩工具，使用时将它传入pipe里面：
    - 示例：`.pipe(imagemin())`
  - gulp-newer：检测文件是否是新文件，有没有被处理过。.pipe(newer())，传入要检测的路径参数。
    - 示例：`.pipe(newer(folder.build + "images"))`

## html文件夹处理

将src文件夹里的html文件转移到build文件夹下：

- 在gulpfile.js文件夹下编写任务：

  ```javascript
  gulp.task("html",function(){
    gulp.src(folder.src + "html/*") //读取folder.src + "html/*"下的所有html文件
    .pipe(gulp.dest(folder.build + "html")) //将html文件流传输到build文件夹下，转换成html文件
  })
  ```

- gulp里压缩html的插件：`gulp-htmlclean`

```
$ sudo cnpm install gulp-htmlclean -D
```

- gulpfile.js文件里引入该插件

  ```javascript
  var htmlClean = require("gulp-htmlclean");
  
  gulp.task("html",function(){
    gulp.src(folder.src + "html/*") //读取folder.src + "html/*"下的所有html文件
    .pipe(htmlClean())
      .pipe(gulp.dest(folder.build + "html")) //将html文件流传输到build文件夹下，转换成html文件
  })
  ```

- 在gulp3及其之前版本里，gulp.task可以接收三个参数：

  第一个参数是任务名称；

  第二个参数是一个依赖数组，可以省略；

  第三个参数是回调函数。

  第二个参数是任务的依赖，加入要同时执行几个任务，假如html任务依赖于images、js、css等任务，那么就将这些任务作为第二个参数传入，告诉当前任务，在加载当前任务之前，要先加载这些任务依赖：

  ```javascript
  gulp.task("html", ["images"], function(){  //此处第二个参数["images"]表示加载"html"任务之前，要先加载"images"任务
    gulp.src(folder.src + "html/*") //读取folder.src + "html/*"下的所有html文件
    .pipe(htmlClean())
      .pipe(gulp.dest(folder.build + "html")) //将html文件流传输到build文件夹下，转换成html文件
  })
  ```

- gulp4的版本不允许像以前那样通过第二个数组参数来传递项目依赖，否则会报错：

  ```
  assert.js:350
      throw err;
      ^
  
  AssertionError [ERR_ASSERTION]: Task function must be specified
      at Gulp.set [as _setTask] (/Users/luofei/QQMusic/node_modules/_undertaker@1.2.1@undertaker/lib/set-task.js:10:3)
      at Gulp.task (/Users/luofei/QQMusic/node_modules/_undertaker@1.2.1@undertaker/lib/task.js:13:8)
      at Object.<anonymous> (/Users/luofei/QQMusic/gulpfile.js:21:6)
      at Module._compile (internal/modules/cjs/loader.js:701:30)
      at Object.Module._extensions..js (internal/modules/cjs/loader.js:712:10)
      at Module.load (internal/modules/cjs/loader.js:600:32)
      at tryModuleLoad (internal/modules/cjs/loader.js:539:12)
      at Function.Module._load (internal/modules/cjs/loader.js:531:3)
      at Module.require (internal/modules/cjs/loader.js:637:17)
      at require (internal/modules/cjs/helpers.js:22:18)
  ```

- 不要使用第二个参数来传递任务依赖，因为gulp4的版本gulp.task()只接收两个参数，我们需要使用`gulp.series`和`gulp.parallel`

  ```javascript
  //gulp.series : 按照顺序执行
  //gulp.parallel: 可以并行执行
  
  gulp.task("html",gulp.series("a","b","c",function(){
    //do something after a,b,c are finished
  }));
  //在a、b、c任务完成之后再执行html任务。
  ```

  如果想让几个任务一起执行，可以调用默认任务：

  ```javascript
  gulp.task("default",gulp.parallel("images","html"))
  ```

## js文件夹处理

js代码压缩插件：gulp-uglify

⚠️：gulp-uglify压缩js代码时，遇到ES6语法会报错

```
$ sudo cnpm install gulp-uglify --save-dev
```

```javascript
var uglify = require("uglify");

gulp.task("js",async()=>{
  await gulp.src(folder.src + "js/*")//读取文件
            .pipe(uglify())//压缩文件
            .pipe(folder.build + "js")//写入文件到build文件夹下
})
```

压缩之前去掉js代码里的调试语句，可以用gulp-strip-debug插件

```
$ sudo cnpm install gulp-strip-debug -D
```

```javascript
var uglify = require("uglify");
var stripDebug = require("gulp-strip-debug")

gulp.task("js",async()=>{
  await gulp.src(folder.src + "js/*")//读取文件
            .pipe(stripDebug())
            .pipe(uglify())//压缩文件
            .pipe(folder.build + "js")//写入文件到build文件夹下
})
```

- gulp-concat: 将js文件进行拼接，将多个js文件合并成一个js文件，较少http向外发送请求的次数

```
$ sudo cnpm install gulp-concat -D
```

```javascript
var uglify = require("uglify");
var stripDebug = require("gulp-strip-debug");
var concat =require("gulp-concat");

gulp.task("js",async()=>{
  await gulp.src(folder.src + "js/*")//读取文件
            .pipe(stripDebug())//去除js文件里的调试代码
            .pipe(concat("main.js"))//将多个js文件拼接成一个main.js文件
            .pipe(uglify())//压缩文件
            .pipe(folder.build + "js")//写入文件到build文件夹下
})
```

## CSS文件处理

- gulp-less：将less文件转换为CSS文件

```
$ sudo cnpm install gulp-less -D
```

```javascript
var less = require("gulp-less");

gulp.task("css",async()=>{
  await gulp.src(folder.src + "css/*")
  .pipe(less())//将less文件转换为css文件
  .pipe(gulp.dest(folder.build + "css"))
});
```

- gulp-postcss: 

```
$ sudo cnpm install gulp-postcss -D
```

- gulp-minify-css：压缩CSS文件

```javascript
var minifyCSS = require("gulp-minify-css");

gulp.task("css",async()=>{
  await gulp.src(folder.src + "css/*")
  .pipe(less())
  .pipe(minifyCSS())
  .pipe(gulp.build + "css")
});
```

- gulp-autoprefixer : 自动添加css3的前缀

**⚠️出现问题：打包后的css文件没有被自动添加前缀**

```
$ sudo cnpm install gulp-autoprefixer -D
```

```javascript
var minifyCSS = require("gulp-minify-css");
var autoprefixer = require("autoprefixer");

gulp.task("css",async()=>{
  await gulp.src(folder.src + "css/*")
  .pipe(less()) //编译less文件，转换成css文件
  .pipe(autoprefixer()) //添加css3前缀
  .pipe(minifyCSS()) //压缩代码
  .pipe(gulp.build + "css") //写入转换后的css文件到build->css文件夹下
});
```

## 监听源码变化，进行自动打包

- gulp.watch()监听源代码文件的变化。一旦代码发生变化，自动执行打包操作。

- gulp.watch()接收两个参数：一是被监听的源文件；二是对应的打包任务，是一个gulp.series()或者gulp.parallel()函数。

```javascript
gulp.task("watch",async()=>{
  gulp.watch(folder.src + "html/*", gulp.parallel("html"))
})

gulp.task("default",gulp.series("images","html","js","css","watch",function(){})//执行任务
```

## 环境监听,进行当前环境是开发环境还是生产环境的判断

当环境是生产环境production是执行对应操作，开发环境development时执行相应操作。先在终端将当前环境设置成开发环境development

```
$ export NODE_ENV=development
```

此时在gulpfile.js文件里检测当前环境，会显示当前环境为开发环境development

```
console.log( process.env.NODE_ENV == "development") //true
```

在html、js、css的gulp.task()任务里，判断当前环境是否是开发环境。如果是开发环境，就不压缩代码，如果不是开发环境就压缩代码：

```javascript
var devMode = process.env.NODE_ENV == "development";

gulp.task("html",async()=>{
  var page = gulp.src(folder.src + "html/*");
  if(!devMode){
    page.pipe(htmlClean())
  }
  await page.pipe(gulp.dest(folder.build + "html"))
})

//⚠️：async、await的使用；devMode环境的反向判断。当不是开发环境的时候执行代码压缩。
```

## 模拟数据请求，开启本地服务器

gulp-connect插件

```
$ sudo cnpm install gulp-connect -D
```

```javascript
var connect = require("gulp-connect")

gulp.task("server",async()=>{
  connect.server();
});
gulp.task("default",gulp.parallel("html","images","js","css","watch","server"));
```

终端运行`gulp`成功后会出现一个8080端口。表示本地服务器配置成功。

开启自动刷新页面功能：

```javascript
//html任务： css、js任务相同。都是在gulp.src()读取文件之后用.pipe(connect.reload())方法自动刷新
gulp.task("html", async()=>{
  var page = gulp.src(folder.src + "html/*").pipe(connect.reload());
  if(!devMode){
    page.pipe(htmlClean())
  }
  await page.pipe(gulp.dest(folder.src + "html"))
});

//server任务：
gulp.task("server",async()=>{
  connect.server({
    port: "8090" //把默认端口号改为8090
    livereload: true
  })
})
```

# QQ音乐播放器代码编写

less：css预编译，可以实现样式的嵌套结构



js代码：

Zepto: 移动端的jquery，轻量级的jquery。用<script>标签引入zepto。

```javascript
//js源文件代码：
var $ = window.Zepto;
```

如果console.log()等调试代码经过gulp打包之后失效了，就在终端重新定义为开发环境，使调试代码不被删除。

```
$ export NODE_ENV=development
```

定义一个ajax函数，向外请求资源；

定义模块，用立即执行函数表达式封装模块，root暴露出来。

```javascript
(function($,root){
  
})(window.Zepto)
```



把要向外请求的内容放到build输出文件夹下的mock文件夹里面。

### ❌：ajax发送请求，出现错误304

一、当ajax请求的方式是GET，同时请求的参数、路径相同时，ajax会优先从本地缓存中获取资源。

### 错误304的解决办法

- 检查html头部信息

  - 前端页面禁止缓存：

  ```html
  <meta http-equiv="pragma" content="no-cache" />
  <meta http-equiv="cache-control" content="no-cache">
  ```

  - 前端ajax禁止缓存：ajax参数cache设为false。（默认为true，当dataType为script时默认为false）

### ❌状态码为200，但是ajax请求走error函数

- 解决办法：如果请求的资源是json格式文件，检查json文件格式是否正确。[json格式校验工具](http://www.bejson.com) 上检测json文件格式是不是正确。

❌  js.trigger()函数触发事件，传递了参数，但是控制台输出结果都为undefined.原因是要在第二个参数内传入event

```javascript
$scope.on("play:change", function(event,index){  
  //自定义一个play:change事件，注意function的第一个参数为event，第二个才是我们传入的参数。
		audio.getAudio(songList[index].audio);
		if (audio.status == "play") {
			audio.play();
			root.process.start();
		}
  
  
  
  $scope.on.trigger("play:change",0) //表示在dom元素上激发事件，并未该事件传入参数0
```

