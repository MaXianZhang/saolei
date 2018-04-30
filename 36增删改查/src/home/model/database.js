'use strict';
import fs from 'fs'

export default class extends think.model.base {
	getData() {
		return fs.readFileSync('www/static/data/datafile.json');
	}

	writeData(data) {
		data = JSON.stringify(data);
		fs.writeFileSync('www/static/data/datafile.json',data);
	}

	handle(type,id,content) {
		let currentData = JSON.parse(this.getData());

		switch (type) {
			case "GET":
				if(id){
					// console.log(currentData);
					return {id:id,data_sig:currentData[id]};
					break;
				}else {
					return currentData;
					break;
				}
			case "POST":
				if (id)
				currentData[id] = content;
				break;
			case "PUT":
				if (id && !currentData[id])
				currentData[id] = content;
				break;
			case "DELETE":
				delete currentData[id];
				break;
		}
		
		this.writeData(currentData);
		return currentData;
	}
}