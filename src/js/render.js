//实现渲染

//立即执行函数表达式
// var $ = window.Zepto;


(function($, root){
	var $scope = $(document.body);
	function renderInfo(info){
		var html = '<div class="song-name">'+ info.song +'</div>'+
			'<div class="singer-name">'+ info.singer + '</div>'+
			'<div class="album-name">' + info.album + '</div>';
		$scope.find(".song-info").html(html); //将此段代码渲染到html文档上
	}

	function renderImg(src){
		var img = new Image();
		img.src = src;
		img.onload = function(){
			//此处加载高斯模糊组件
			$(".song-img img").attr("src",src);
		}

	}

	function renderIsLike(islike){
		if (islike) {
			$scope.find(".like-btn").addClass("liking");
		}else{
			$scope.find(".like-btn").removeClass("liking");
		}

	}


	root.render = function(data){
		renderInfo(data);
		renderImg(data.image);
		renderIsLike(data.isLike);
	}

})(window.Zepto, window.player || (window.player={}));




