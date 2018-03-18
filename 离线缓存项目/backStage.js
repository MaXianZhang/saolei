//这是一个最简单的后台，通用
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const home = "file:///Users/apple/Desktop/jasonshelby.github.io/离线缓存项目";
// file:///Users/apple/Desktop/MySinger/index.html
const server = http.createServer(function (req,res) {

	let Turl = '.' + req.url;

	// console.log(Turl);
	function sendStatic(req,res) {
		const pathname = url.parse(req.url,true).pathname;

		console.log('静态路径',path.join(__dirname, './', pathname));
		const rs = fs.createReadStream(path.join(__dirname, './', pathname),'utf-8');
		rs.pipe(res);
	}
	const reg = /(\.js|css|scss)$/;
	console.log('server请求了' + req.url);
	if (reg.test(url.parse(req.url,true).pathname)){  //如果是js或者css文件(静态文件)将其转发
		sendStatic(req,res);                          // 发送静态文件
		return;
	}
	const deleStr = /(\?__inline)$/;
	if(deleStr.test(Turl)){
		Turl = Turl.slice(0,-9);
		// console.log(31,Turl);
	}

	fs.readFile(Turl, function(err,data) {
		// console.log(29,Turl);
		// console.log(data);
		if(err){
			res.writeHeader(404,{
				'content-type': 'text/html;charset="utf-8"'
			});
			res.statusCode = 404;


			res.write('<h1>404错误</h1>');
			res.end();
		}else{
			res.writeHeader(200,{
				'content-type': 'text/html;charset="utf-8"'
			});
			res.end(data);
			// return;
		}
	})
}).listen(3000);

console.log('server is running');







