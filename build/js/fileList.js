(function($, root){
	var $scope = $(document.body); 


//传进来data数据
	function renderList(info){

		for (var i = 0; i < info.length; i++) {
			var name = "<p>" + info[i].singer + '-' + info[i].song + "</p>";
			// console.log(name);
			$scope.find(".info-list").append(name);
		}

		

		
	}

	root.list = function(data){
		renderList(data);
	}



})(window.Zepto, window.player || (window.player={}));