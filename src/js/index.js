var arrSoilder = document.getElementsByClassName('x-line');
var side = window.prompt('n * n的雷盘');
var num = window.prompt('雷数');
var arrUmine = [];

function createDom(){//动态创建雷盘,给每一个小兵编号
	var arrMine = [];

	for(i = 0; i < num; i++){//创建雷的数组
		var j = parseInt(Math.random() * side * side);
		if(arrMine.indexOf(j) < 0){
			arrMine.push(j);
		}else{
			i--;
		}
	}
	for (i = 0; i < side; i++) {
		var yLine = document.createElement('div');
		yLine.className = 'y-line';
		wrapper.appendChild(yLine);
		for(j = 0; j < side; j++){
			var xLine = document.createElement('div');
			xLine.x = j;
			xLine.y = i;
			xLine.flag = false;
			xLine.open = false;
			xLine.value = 0;		
			xLine.className = 'x-line';	
			yLine.appendChild(xLine);
		}
	}

	arrMine.forEach(function(num, index) {
		arrSoilder[num].value = -1;
	});
	wrapper.style.width = side * 22 + 'px';

	return arrMine;
}
arrMine = createDom();

function addEvent() {
	document.oncontextmenu = function (e) {
		e.returnValue = false;
	}
	wrapper.addEventListener('mousedown', handler , false)
	if (num >= side * side) {
		alert('Are you kidding me!!!');
		wrapper.removeEventListener('mousedown', handler, false);
	}
}
addEvent();

function handler(e) {
	var event = e || window.event;
	var target = event.target || event.srcElement;

	if(event.button == 0) {
		spread(target.x, target.y);
	}else if(event.button == 2) {
		if (target.open == false){
			if (target.flag == false) {
				target.flag = true;
				target.style.background = 'red';
			}else {
				target.flag = false;
				target.style.background = '#16af3a';
			}
		}
	}
	checkOut();
}
function fallOut(x,y) {
	if (x >= 0 && y >= 0 && x < side && y < side)
		return wrapper.children[y].children[x];
	else
		return {};
}
function probe(x, y) {
	var aroundPosition = [[x-1, y],[x+1, y],[x, y-1],[x, y+1],[x-1, y-1],[x+1, y+1],[x-1, y+1],[x+1, y-1]];
	var aroundNum = 0;
	if (fallOut(x, y).value != -1){
		aroundPosition.forEach(function (position, index){
			if (fallOut(position[0], position[1]).value === -1) aroundNum++;
		})
		return aroundNum;
	}
}
function spread(x, y) {
	var aroundPosition = [[x-1, y],[x+1, y],[x, y-1],[x, y+1],[x-1, y-1],[x+1, y+1],[x-1, y+1],[x+1, y-1]];
	var soilder = fallOut(x, y);

	if (soilder.value == -1){
		arrMine.forEach(function (mine) {
			arrSoilder[mine].style.background = 'red';
		});
		alert('Game over');
		wrapper.removeEventListener('mousedown', handler, false);
	}else {
		soilder.open = true;
		soilder.style.background = '#eee';
		soilder.value = probe(x, y);
		if(soilder.value == 0) {
			aroundPosition.forEach(function (position, index){
				if(fallOut(position[0], position[1]).open == false) spread(position[0], position[1]);
			})
		} else {
			soilder.innerText = soilder.value;
		}
	}
}
function checkOut() {
	var key1 = 0;
	var key2 = 0;
	for(i = 0; i < side * side; i++) {
		arrUmine.push(i);
	}
	arrMine.forEach(function (num) {
		arrUmine.splice(arrUmine.indexOf(num), 1);
	})
	arrUmine.forEach(function(num) {
		if(arrSoilder[num].open === false) {
			key1++;
		}
	})
	arrMine.forEach(function (num){
		if(arrSoilder[num].flag === false) {
			key2++;
		}	
	})
	if (key1 == 0 || key2 == 0){
		alert('You win');
		wrapper.removeEventListener('mousedown', handler, false);
	}
}