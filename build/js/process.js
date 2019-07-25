//渲染进度条
(function($ ,root){
	var $scope = $(document.body); 
	var curDuration;
	var frameId;
	var lastPer=0;
	var startTime;
	
	//将歌曲时间由秒转换成分钟
	function formatTime(time){
		time = Math.round(time); //将传入的时间取整。
		var minute = Math.floor(time / 60);
		var second = time - minute*60;
		if (minute < 10) {
			minute = "0" + minute;
		}
		if (second < 10) {
			second = "0" + second;
		}
		return minute + ":" + second;
	}

	//渲染当前总时间
	function renderAllTime(duration){
		lastPer = 0
		curDuration = duration;
		var alltime = formatTime(duration);
		$scope.find(".all-time").html(alltime);
	}


	//渲染进度条
	function update(percent){
		var curTime = formatTime(percent * curDuration); //当前时间进度 = 总时长乘以百分比
		//将当前时间进度转换为分钟数
		$scope.find(".cur-time").html(curTime);
		//渲染进度条到页面上
		var percentage = (percent - 1)*100 + "%"; //点击播放按钮之后开始算的当前进度
		$scope.find(".pro-top").css({
			"transform": "translateX"+"("+ percentage +")"
		})

	}


	//时间和进度条改变
	function start(per){
		// lastPer = 0; 这样写是错误的
		lastPer = per === undefined ? lastPer : per;
		cancelAnimationFrame(frameId);
		startTime = new Date().getTime();
		function frame(){
			var curTime = new Date().getTime();
			var percent = lastPer + ( curTime - startTime) / (curDuration*1000);
			frameId = requestAnimationFrame(frame); //动画
			update(percent);//调用update函数
		}
		frame();
	}

	//暂停播放
	function stop(){
		var stopTime = new Date().getTime();
		lastPer = lastPer + (stopTime - startTime) / (curDuration * 1000);
		cancelAnimationFrame(frameId); //取消动画
	}

	//向外暴露模块
	root.process = {
		renderAllTime: renderAllTime,
		start: start,
		stop:stop,
		update:update
	}

})(window.Zepto, window.player || (window.player = {}))