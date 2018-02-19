//注册登陆模块
const url = require('url');
const fs = require('fs');
const render = require('../lib/render.js');
const userManager = require('../managers/userManager.js');

function loginRouter(req, res) {
	const urlObj = url.parse(req.url,true);
	const pathname = urlObj.pathname;
	const query = urlObj.query;
	const userInfor = userManager.findUserByAccount(query.user);
	if (req.url == '/login'){
		render('login.html',res)	
	}else{
		if(userInfor){
			if(query.pw == userInfor.password){
				res.setHeader('Set-Cookie', ['boss='+userInfor.account]);
				res.statusCode = 302;
				res.setHeader("location", "/");
				res.end();
			}else{
				res.end('password is wrong');
			}
		}else{
			res.end('user does not exist')
		}
	}
}

module.exports = loginRouter;
