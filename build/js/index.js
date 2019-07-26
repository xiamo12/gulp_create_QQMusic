var $ = window.Zepto;
var root = window.player;
var $scope = $(document.body);

var index = 1;
var songList;
var audio = new root.audioControl();

function bindEvent(){ 
	$scope.on("play:change", function(event,index){  //自定义一个play:change事件
		audio.getAudio(songList[index].audio);
		if (audio.status == "play") {
			audio.play();
			root.process.start();
		}

		root.process.renderAllTime(songList[index].duration);
		root.render(songList[index]);
		root.process.update(0);
	});


	$scope.on("click", ".pre-btn", function(){
		var index = controlManager.prev();
		$scope.trigger("play:change",index);
		// root.render(songList[index]);
	});
	$scope.on("click", ".next-btn", function(){
		var index = controlManager.next();
		$scope.trigger("play:change",index); //点击“下一首”按钮时，触发play:change事件
		// root.render(songList[index]);
	});
	$scope.on("click",".play-btn",function(){
		if (audio.status == "play") {
			audio.pause();
			root.process.stop();
		}else{
			audio.play();
			root.process.start();
		}
		$(this).toggleClass("pause")
	});


	$scope.on("click", ".like-btn", function(){
		$(this).toggleClass("liking");
	});

	$scope.on("click",".list-btn",function(){
		$scope.find(".info-list").addClass("show");//点击菜单按钮显示菜单
	});
	$scope.on("click",".hide-button",function(){
		$scope.find(".info-list").removeClass("show").addClass("hide");
	}); //点击按钮隐藏菜单
}

function bindTouch(){

	var $slider = $scope.find(".slider-pointer");
	var offset = $scope.find(".pro-wrapper").offset();
	var left = offset.left;
	var width = offset.width;
	$slider.on("touchstart", function(){
		root.process.stop();
	}).on("touchmove", function(e){
		var x = e.changedTouches[0].clientX;
		var per = ( x-left ) / width; //求滑块移动的百分比
		if ( per < 0 || per > 1 ) {
			per = 0;
		}
		root.process.update(per);
	}).on("touchend",function(e){
		var x = e.changedTouches[0].clientX;
		var per = ( x-left ) / width; //求滑块移动的百分比
		if (per < 0 || per > 1) {
			per = 0;
		}
		var curDuration = songList[controlManager.index].duration;
		var curTime = per * curDuration;
		audio.playTo(curTime);
		root.process.start(per);
		$scope.find(".play-btn").addClass("pause");
	})
}

function getData(url){//ajax向外请求数据。成功获取数据之后进行success操作
	$.ajax({
		type: "GET",
		url: url,
		success:function(data){
			root.render(data[0]); //渲染歌曲图片、info、process、like信息
			root.list(data);
			songList = data;  //将data赋值给全局变量songList，这样ajax函数外面的数据也可以用到这个变量
			bindEvent(); //绑定事件
			controlManager = new root.controlManager(data.length); //控制前进和后退按钮
			$scope.trigger("play:change",0);  //trigger指的是在dom元素上触发指定事件
			bindTouch();
		},
		error:function(){
			console.log("error");
		}
	})
}

getData("../mock/data.json")