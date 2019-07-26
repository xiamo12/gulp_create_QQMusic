(function($, root){
	var $scope = $(document.body); 


//传进来data数据
	function renderList(info){
		for (var i = 0; i < info.length; i++) {
			// var links = document.createElement("a");
			// links.append(info[i].singer + '——' + info[i].song);
			// var name = document.createElement("p");
			// name.appendChild(links);


			var links = "<a>" + info[i].singer + '——' + info[i].song + "</a>";
			var name = "<p>" + links + "</p>";
			$scope.find(".info-list").append(name);
			links.href = info[i].audio;
		}
		var btn = "<div class='hide-button'>关闭</div>"
		$scope.find(".info-list").append(btn);
		console.log($scope.find(".info-list"))
	}


	//渲染到页面上
	root.list = function(data){
		renderList(data);
	}



})(window.Zepto, window.player || (window.player={}));