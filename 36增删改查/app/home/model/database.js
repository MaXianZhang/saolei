'use strict';

exports.__esModule = true;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_think$model$base) {
	(0, _inherits3.default)(_class, _think$model$base);

	function _class() {
		(0, _classCallCheck3.default)(this, _class);
		return (0, _possibleConstructorReturn3.default)(this, _think$model$base.apply(this, arguments));
	}

	_class.prototype.getData = function getData() {
		return _fs2.default.readFileSync('www/static/data/datafile.json');
	};

	_class.prototype.writeData = function writeData(data) {
		data = (0, _stringify2.default)(data);
		_fs2.default.writeFileSync('www/static/data/datafile.json', data);
	};

	_class.prototype.handle = function handle(type, id, content) {
		var currentData = JSON.parse(this.getData());

		switch (type) {
			case "GET":
				if (id) {
					// console.log(currentData);
					return { id: id, data_sig: currentData[id] };
					break;
				} else {
					return currentData;
					break;
				}
			case "POST":
				if (id) currentData[id] = content;
				break;
			case "PUT":
				if (id && !currentData[id]) currentData[id] = content;
				break;
			case "DELETE":
				delete currentData[id];
				break;
		}

		this.writeData(currentData);
		return currentData;
	};

	return _class;
}(think.model.base);

exports.default = _class;
//# sourceMappingURL=database.js.map