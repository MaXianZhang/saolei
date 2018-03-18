//模型层

App.articles = (function () {

	function deleteArticles(successCallback) {//删操作
		App.database.runQuery('DELETE FROM articles', [], successCallback);
	}

	function insertArticles(articles,successCallback) {//增操作
		var len = articles.length;
		var data = [];

		if (len === 0) {
			successCallback();
		}

		for (var i = 0; i < len; i++) {
			data[i] = [articles[i].id,articles[i].date,articles[i].headline,articles[i].author,articles[i].body];
		}
		App.database.runQuery('INSERT INTO articles (id, date, headline, author, body) VALUES (?,?,?,?,?)', data, successCallback);
	}

	function selectFullArticle(id, successCallback) {//查操作
		App.database.runQuery("SELECT id, headline, date, author, body FROM articles WHERE id = ?", [id], successCallback);
	}

	function selectBasicArticles(successCallback) {
		App.database.runQuery("SELECT id, headline, date, author FROM articles",[],successCallback)
	}

	return {
		deleteArticles:deleteArticles,
		insertArticles: insertArticles,
		selectFullArticle:selectFullArticle,
		selectBasicArticles:selectBasicArticles
	}

} ())