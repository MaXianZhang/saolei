'use strict';
const http = require('http');
const url = require('url');

const sendStatic = require('./lib/sendStatic.js');
const pathManager = require('./managers/pathManager.js');
const loginRouter = require('./routers/loginRouter.js');
const indexRouter = require('./routers/indexRouter.js');


//为不同的地址注册router
pathManager.addpath('/',indexRouter);
pathManager.addpath('/login',loginRouter);

const server = http.createServer(function (req,res){
	const reg = /(\.js|css)$/;
	console.log('server请求了' + req.url);
	if (reg.test(url.parse(req.url,true).pathname)){  //如果是js或者css文件(静态文件)将其转发
		sendStatic(req,res);                          // 发送静态文件
		return;
	}
	if (pathManager.handel(req,res)){
		return;
	}
	res.statusCode = 404;
	res.end("page no found 404");
});

server.listen(3000);
console.log('server is running');