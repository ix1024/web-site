## Classes

<dl>
<dt><a href="#Trial">Trial</a></dt>
<dd></dd>
<dt><a href="#Animal">Animal</a></dt>
<dd></dd>
<dt><a href="#Duck">Duck</a> ⇐ <code><a href="#Animal">Animal</a></code></dt>
<dd></dd>
<dt><a href="#Flyable">Flyable</a></dt>
<dd></dd>
<dt><a href="#Bird">Bird</a></dt>
<dd></dd>
<dt><a href="#Duck">Duck</a> ⇐ <code><a href="#Flyable">Flyable</a></code></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#getQueryValue">getQueryValue(参数名)</a> ⇒ <code>String</code></dt>
<dd><p>获取URL参数</p>
</dd>
</dl>

<a name="Trial"></a>

## Trial
**Kind**: global class  
**See**: [查看后端接口](http://github.com)  
**Since**: 2016-08-17  
**Version**: 1.0.0  
<a name="new_Trial_new"></a>

### new Trial(options)
产品试算功能

**Returns**: <code>Object</code> - 返回一个实例  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | 产品试算页面渲染模块<br/>  产品ID，计划ID必填 <br/> |

<a name="Animal"></a>

## Animal
**Kind**: global class  
<a name="Animal+alive"></a>

### animal.alive
Is this animal alive?

**Kind**: instance property of <code>[Animal](#Animal)</code>  
<a name="Duck"></a>

## Duck ⇐ <code>[Animal](#Animal)</code>
**Kind**: global class  
**Extends:** <code>[Animal](#Animal)</code>  

* [Duck](#Duck) ⇐ <code>[Animal](#Animal)</code>
    * [new Duck()](#new_Duck_new)
    * [.alive](#Animal+alive)
    * [.speak()](#Duck+speak)
    * [.takeOff()](#Flyable+takeOff)

<a name="new_Duck_new"></a>

### new Duck()
Class representing a duck.

<a name="Animal+alive"></a>

### duck.alive
Is this animal alive?

**Kind**: instance property of <code>[Duck](#Duck)</code>  
<a name="Duck+speak"></a>

### duck.speak()
What do ducks say?

**Kind**: instance method of <code>[Duck](#Duck)</code>  
<a name="Flyable+takeOff"></a>

### duck.takeOff()
Take off.

**Kind**: instance method of <code>[Duck](#Duck)</code>  
**Overrides:** <code>[takeOff](#Bird+takeOff)</code>  
<a name="Flyable"></a>

## Flyable
**Kind**: global class  

* [Flyable](#Flyable)
    * [new Flyable()](#new_Flyable_new)
    * [.takeOff()](#Flyable+takeOff)

<a name="new_Flyable_new"></a>

### new Flyable()
Abstract class for things that can fly.

<a name="Flyable+takeOff"></a>

### flyable.takeOff()
Take off.

**Kind**: instance method of <code>[Flyable](#Flyable)</code>  
<a name="Bird"></a>

## Bird
**Kind**: global class  

* [Bird](#Bird)
    * [new Bird()](#new_Bird_new)
    * [.takeOff()](#Bird+takeOff)

<a name="new_Bird_new"></a>

### new Bird()
Abstract class representing a bird.

<a name="Bird+takeOff"></a>

### bird.takeOff()
Spread your wings and fly, if possible.

**Kind**: instance method of <code>[Bird](#Bird)</code>  
<a name="Duck"></a>

## Duck ⇐ <code>[Flyable](#Flyable)</code>
**Kind**: global class  
**Extends:** <code>[Flyable](#Flyable)</code>, <code>[Bird](#Bird)</code>  

* [Duck](#Duck) ⇐ <code>[Flyable](#Flyable)</code>
    * [new Duck()](#new_Duck_new)
    * [.alive](#Animal+alive)
    * [.speak()](#Duck+speak)
    * [.takeOff()](#Flyable+takeOff)

<a name="new_Duck_new"></a>

### new Duck()
Class representing a duck.

<a name="Animal+alive"></a>

### duck.alive
Is this animal alive?

**Kind**: instance property of <code>[Duck](#Duck)</code>  
<a name="Duck+speak"></a>

### duck.speak()
What do ducks say?

**Kind**: instance method of <code>[Duck](#Duck)</code>  
<a name="Flyable+takeOff"></a>

### duck.takeOff()
Take off.

**Kind**: instance method of <code>[Duck](#Duck)</code>  
**Overrides:** <code>[takeOff](#Bird+takeOff)</code>  
<a name="getQueryValue"></a>

## getQueryValue(参数名) ⇒ <code>String</code>
获取URL参数

**Kind**: global function  
**Returns**: <code>String</code> - result String  
**Since**: 2016-08-17  
**Version**: 1.0.0  
**Author:** kingwell  

| Param | Type | Description |
| --- | --- | --- |
| 参数名 | <code>String</code> | 返回字符串 |

