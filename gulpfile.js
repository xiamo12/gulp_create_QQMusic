var gulp = require("gulp");
var imagemin = require("gulp-imagemin");//引入图片压缩工具
var newer = require("gulp-newer");//引入检测文件是否被压缩过的工具
var htmlClean = require("gulp-htmlclean");//引入html压缩工具，通过管道传输进行压缩
var uglify = require("gulp-uglify");//引入js文件压缩工具
var stripDebug = require("gulp-strip-debug");//去掉js里面的调试语句的工具
var Concat = require("gulp-concat"); //将多个js文件拼接成一个js文件
var less = require("gulp-less");//由less转换为css文件
var postcss = require("gulp-postcss");
var autoprefixer = require("gulp-autoprefixer")//自动添加css代码的前缀
// var cssnano = require("gulp-cssnano")//压缩css代码
var minifycss = require("gulp-minify-css");
//自动为添加css前缀压缩代码
var connect = require("gulp-connect");

var devMode = process.env.NODE_ENV == "development";

//gulp.src() 读文件
//gulp.dest() 写文件
//gulp.task() 创建任务
//gulp.watch() 监听任务

var folder = { //文件夹
	src: "./src/", //指定src是当前文件夹下的src文件夹
	build: "./build/"//指定build是当前文件夹下的build文件夹
}	


//gulp.task注册一个任务，接收三个参数，1⃣️命名一个任务名字，2⃣️定义️要做的任务操作
gulp.task("images",async()=>{
	// 读取src文件夹里的文件，把它转换成文件流，转移到build文件夹下。src方法里传入路径
	await gulp.src(folder.src+"images/*")//表示读取到folder指定的src文件夹下面的images里的所有文件
	.pipe(newer(folder.build + "images"))//监听这个文件夹下面的文件是否被压缩过
	.pipe(imagemin())  //压缩图片
	.pipe(gulp.dest(folder.build + "images"))//pipe是node.js里的API，将文件流通过pipe传输，传输到build里；再用gulp.dest(folder.build + "images")将文件流转换成文件，该文件在build目录下，路径是folder.build + "images"
});

gulp.task("html",async()=>{
	var page = gulp.src(folder.src + "html/*").pipe(connect.reload());
	if (!devMode) {
		page.pipe(htmlClean())
	}
	await page.pipe(gulp.dest(folder.build + "html"))
});

gulp.task("js",async()=>{//注册一个处理js文件的任务
	var page = gulp.src(folder.src + "js/*").pipe(connect.reload());
	if (!devMode) {
		page.pipe(stripDebug())
			  .pipe(uglify())
			}
		await page.pipe(gulp.dest(folder.build + "js")) //写入文件
});

gulp.task("css",async()=>{
	var page = gulp.src(folder.src + "css/*").pipe(less()).pipe(connect.reload());
	if (!devMode) {
			page.pipe(autoprefixer())
			.pipe(minifycss())
		}
		await page.pipe(gulp.dest(folder.build + "css"))	
});

gulp.task("watch",async()=>{ //创建一个监听任务，监听代码编码。一旦源码发生变化了，gulp执行自动打包
	gulp.watch(folder.src + "html/*", gulp.parallel("html")); 
	gulp.watch(folder.src + "images/*", gulp.parallel("images"));
	gulp.watch(folder.src + "js/*", gulp.parallel("js"));
	gulp.watch(folder.src + "css/*", gulp.parallel("css"));
});

gulp.task("server",async()=>{
	connect.server({
		port: "8090", //更改端口号
		livereload : true
	});
});

gulp.task("default",gulp.series("html","images","js","css","watch","server"));//想让两个任务都一起执行，就调用默认任务default。task依然只接收两个参数，第一个参数是任务名，第二个参数包含了任务依赖和回调函数。
//调用默认任务，在终端输入：gulp