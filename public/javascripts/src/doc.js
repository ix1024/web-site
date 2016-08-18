/** 
 * @description 产品试算功能 
 * @constructor Trial
 * @param {Object} options 产品试算页面渲染模块<br/>
 产品ID，计划ID必填 <br/>
 
 @see {@link http://github.com|查看后端接口}
 * @return {Object} 返回一个实例
 * @since 2016-08-17
 * @version 1.0.0
 */
function Trial() {

}
 

/** 
 
 * @description 获取URL参数 
 * @argument {String} 参数名 返回字符串
 * @return {String} result String
 
 
 * @since 2016-08-17
 * @author kingwell
 * @version 1.0.0 
 */
function getQueryValue(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = location.search.substr(1).match(reg);
	if (r !== null) {
		return unescape(r[2]);
	}
	return null;
}


/**
 * @constructor
 */
function Animal() {
	/** Is this animal alive? */
	this.alive = true;
}

/**
 * @constructor
 * @augments Animal
 */
function Duck() {}
Duck.prototype = new Animal();

/** What do ducks say? */
Duck.prototype.speak = function() {
	if (this.alive) {
		alert('Quack!');
	}
};
Duck.prototype.say = function(){
	/** Is this animal alive? */
	thia.name=arguments[0];
};
var d = new Duck();
d.speak(); // Quack!
d.alive = false;
d.speak(); // (nothing)


/**
 * Abstract class for things that can fly.
 * @class
 */
function Flyable() {
	this.canFly = true;
}

/** Take off. */
Flyable.prototype.takeOff = function() {
	// ...
};

/**
 * Abstract class representing a bird.
 * @class
 */
function Bird(canFly) {
	this.canFly = canFly;
}

/** Spread your wings and fly, if possible. */
Bird.prototype.takeOff = function() {
	if (this.canFly) {
		this._spreadWings()
			._run()
			._flapWings();
	}
};

/**
 * Class representing a duck.
 * @class
 * @augments Flyable
 * @augments Bird
 */
function Duck() {}

// Described in the docs as "Spread your wings and fly, if possible."
Duck.prototype.takeOff = function() {
	// ...
};