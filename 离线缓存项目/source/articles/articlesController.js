App.articlesController = (function () {

	function showArticle(id, successCallback) {

		App.articles.selectFullArticle(id, function (articles) {
			$('#body').html(App.templates.article(articles));
		})
	}

	function showArticleList(successCallback) {
		App.articles.selectBasicArticles(function (articles) {
			$("#headLines").html(App.templates.articleList(articles))
		});
	}

	function asynchronizeServer(failureCallback) {
		$.ajax({
			dataType: 'json',
			url: './api/articles',
			type:'GET',
			success: function (articles) {
				App.articles.deleteArticles(function () {//控制模型层清空数据库
					App.articles.insertArticles(articles, function () {//控制模型层添加数据库
						$('#headLines').html(App.templates.articleList(articles));//控制模型层添加数据到html
					})
				})
			},
			error: function () {
				if (failureCallback) {
					failureCallback();
				}
			}
		});
	}

	return {
		asynchronizeServer:asynchronizeServer,
		showArticle:showArticle,
		showArticleList:showArticleList
	}

} ())