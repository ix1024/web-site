var obj = {
	slice: function(str, length, symbol) {
		var result = '',
			sym = symbol || '...';
		if (!str || typeof str !== 'string' || !length) {
			result = str;
		} else {
			result = str.slice(0, length) + sym;
		}

		return result;
	},
	fixNumber: function(num) {
		if (num < 10) {
			return '0' + num;
		} else {
			return num;
		}
	},
	getDateString: function(str) {
		var DATE = str ? new Date(str) : new Date(),
			resultDate = [],
			resultTime = [];
		resultDate.push(DATE.getFullYear());
		resultDate.push(this.fixNumber(DATE.getMonth()));
		resultDate.push(this.fixNumber(DATE.getDate()));
		resultTime.push(this.fixNumber(DATE.getHours()));
		resultTime.push(this.fixNumber(DATE.getMinutes()));
		resultTime.push(this.fixNumber(DATE.getSeconds()));
		return resultDate.join('-') + ' ' + resultTime.join(':');
	}
};
module.exports = obj;