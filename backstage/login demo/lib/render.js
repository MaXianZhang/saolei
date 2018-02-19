const fs = require('fs');

function render(viewfile, res) {
	fs.readFile('./view/' + viewfile,'utf-8',function (err,page) {
		if (err){ 
			console.log(err);
			res.statusCode = 500;
			res.end("500");
			return;
		}
		res.end(page);
	})
}

module.exports = render;
