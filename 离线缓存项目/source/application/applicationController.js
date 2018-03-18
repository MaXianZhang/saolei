//控制层  控制提取哪部分数据  添加哪部分视图
App.applicationController = (function () {
	function showArticle(page) {
		App.articlesController.showArticle(page);
	}
	function showHome() {
		App.articlesController.showArticleList();
		$('#refreshButton').click(function () {
			if (navigator && navigator.online === false) {
				alert('没网');
			}else{
				App.articlesController.asynchronizeServer(function () {
					console.log('获取数据失败');
				});
			}
		})

	};

	function pageNotFound() {
		alert('没有找到该页');
	}

	function route() {
		var page = window.location.hash;
		$('#body').html(App.templates.home());

		//判断哈希值
		// page = '#1';
		if(page) {//如果有hash值，进入到文章详情页
			page = page.substring(1);
			if (parseInt(page) > 0) {
				showArticle(page);
			} else{
				pageNotFound();
			}
		} else {//没有，进入文章列表
			showHome();
 			

		}
	};

	function start(resources, bool) {

		App.database.open(function(){
			var node = document.createElement('style');
			node.innerHTML = resources.css;
			document.head.appendChild(node);
			$(window).bind('hashchange', route);
			$('body').html(App.templates.application());
			$('.load').remove();
			route();
		});
		if (bool) { //有网存，没网不存
			localStorage.resources = JSON.stringify(resources); //把json格式的数据改成字符串储存起来
		}
	}
	return {
		start:start
	}

} ());