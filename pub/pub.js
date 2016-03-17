var pub = {
	substr: function(str, length, symbol) {
		var _str = str || '',
			_length = length || -1,
			_symbol = symbol || '...';
		if (_str && _str.length) {
			_str = _str.slice(0, _length) + _symbol;
		}
		return _str;
	},
	navList: [{
		url: '/',
		text: 'Home'
	}, {
		url: '',
		text: 'Docs'
	}, {
		url: '',
		text: 'Plugins'
	}, {
		url: '',
		text: 'Team'
	}, {
		url: '',
		text: 'Sources'
	}]
};
module.exports = pub;