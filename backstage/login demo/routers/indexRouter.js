const render = require('../lib/render.js');

function parseCookie(cookie){
	return cookie? cookie.split(';').reduce(function (ret, tmp){
		var arr = tmp.split('=');
		ret[arr[0].trim()] = arr[1].trim();
		return ret;
	},{}) : {};
}


function indexRouter(req, res) {
	var cookie = parseCookie(req.headers['cookie']);
	if (cookie['boss']) {
		console.log("yes")
		res.end("hello "+cookie['boss']);
		render('index.html',res);
	} else{
		res.statusCode = 302;
		res.setHeader('Location', '/login');
		res.end();
	}

// Hm_lvt_652f84236c4c73e10377e2dd54891ff3=1517407452

}

module.exports = indexRouter;
