(function(window, undefined) {

  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(obj) {
      var result = -1,
        length = this.length,
        i = length - 1;
      for (; i >= 0; i--) {
        if (this[i] == obj) {
          result = i;
          break;
        }
      }
      return result;
    }
  }
  if (!Array.prototype.contains) {
    Array.prototype.contains = function(obj) {
      return (this.indexOf(obj) >= 0)
    }
  }
  if (!Array.prototype.append) {
    Array.prototype.append = function(obj, nodup) {
      if (!(nodup && this.contains(obj))) {
        this[this.length] = obj;
      }
    }
  }
  if (!Array.prototype.remove) {
    Array.prototype.remove = function(obj) {
      var index = this.indexOf(obj);
      if (!index) return;
      return this.splice(index, 1);
    };
  }


  function addEvent(element, type, fun) {
    if (!element.events) element.events = {};
    var handlers = element.events[type];
    if (!handlers) {
      handlers = element.events[type] = [];
      if (element['on' + type]) {
        handlers[0] = element['on' + type];
      }
    }
    handlers.append(fun, true)
    element['on' + type] = handleEvent;
  }

  function removeEvent(element, type, fun) {
    if (element.events && element.events[type]) {
      element.events[type].remove(fun);
    }
  }

  function handleEvent(event) {
    var returnValue = true,
      i = 0;
    event = event || fixEvent(window.event);
    var handlers = this.events[event.type],
      length = handlers.length;
    for (; i < length; i++) {
      if (handlers[i].call(this, event) === false) {
        returnValue = false;
      }
    }
    return returnValue;
  }

  function fixEvent(event) {
    event.preventDefault = fixEvent.preventDefault;
    event.stopPropagation = fixEvent.stopPropagation;
    return event;
  }
  fixEvent.preventDefault = function() {
    this.returnValue = false;
  };
  fixEvent.stopPropagation = function() {
    this.cancelBubble = true;
  };


  var events = function() {

    var Events = function() {};
    Events.prototype = {
      addEvent: addEvent,
      removeEvent: removeEvent
    };
    Events.prototype.constructor = Events;
    return new Events();

  };
  window.events = events;

  if (typeof define === 'function' && define.amd) {
    define('events', [], function() {
      return events;
    });
  }
})(this);