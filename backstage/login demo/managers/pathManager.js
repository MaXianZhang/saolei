const url = require('url');

function PathManager() {
	this.pathList = [];
}

PathManager.prototype = {
	addpath: function (path,callback) {
		this.pathList.push({
			path: path,
			callback: callback
		})
	},
	handel:function (req,res) {
		const urlObj = url.parse(req.url,true);
		let key = false;

		this.pathList.forEach(function(item){
			if (item.path == urlObj.pathname) {
				key = true;
				item.callback(req,res);
			}
		})
		return key;
	}
}

module.exports = new PathManager();


//App的类可移植文件



// const delay = (ms) => {
// 	return new Promise(function (resolve,reject){
// 		if(ms>1000){
// 			setTimeout(function(){
// 				resolve();
// 			},ms)		
// 		}else{
// 			reject();
// 		}
	
// 	})
// }