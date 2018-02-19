function UserManager() {
	this.userList = [{
		account: 'jason',
		password: '12223'	
	},{
		account: 'mango',
		password: '12223'
	}];
}

UserManager.prototype = {
	findUserByAccount: function (account) {
		// console.log(3,account)
		// delay(500).then(()=>{
			var ret = null;
			this.userList.forEach(function(item,index){
				if (item.account == account){
					ret = item;
				}
			})
			return ret;
		// })
	}
}


module.exports = new UserManager();