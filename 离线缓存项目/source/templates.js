//视图层，选择展示的部分，传入数据，进行展示

App.templates = (function() {
	//创建头标签和内容区
	function application() {
		return '<div id="window"><div id="header"><h1>FT Tech Blog</h1></div> <div id="body"></div></div>'
	}

	//创建刷新按钮 和 文章列表区域
	function home() { 
		return '<button id="refreshButton">刷新新闻</button> <div id="headLines"></div>'
	}

	//生成文章列表
	function articleList(data) {
		var outStr = '';
		for (var i = 0; i < data.length; i++) {
			outStr = outStr + 	'<li>\
									<h2><a href="#' + data[i].id +'">'+ data[i].headline +'</a></h2>\
									<span>作者：<strong>'+ data[i].author +'</strong></span>\
									发表日期： <span>'+ data[i].date +'</span>\
								</li>'
		}
		return '<ul>' + outStr + '</ul>';
	}

	//生成单页的详情信息
	function article(article) {
		return 	'<a href="#">回到首页</a>\
				<h2>'+ article[0].headline +'</h2>\
				<h3>作者：'+ article[0].author +'</h3>\
				<h3>发表日期：'+ article[0].date +'</h3\
				<h3>'+ article[0].body +'</h3>';
	}

	return {
		application: application,
		home: home,
		articleList: articleList,
		article: article
	}

} ())