const url = require('url');
const fs = require('fs');
const path = require('path');


function sendStatic(req,res) {
	const pathname = url.parse(req.url,true).pathname;
	const rs = fs.createReadStream(path.join(__dirname, '../','read', pathname),'utf-8');
	rs.pipe(res);
}

module.exports = sendStatic;
