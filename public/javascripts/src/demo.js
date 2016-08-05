require([
	'ajax',
	'dom',
	'events'
], function(
	ajax,
	dom,
	ev
) {

	var myForm = document.getElementById('myForm');
	var button = document.getElementById('button');
	var progress = document.getElementById('progress');
	var progressText = document.getElementById('progressText');


	button.onclick = function(event) {
		var ev = event || window.event;
		var formData = new FormData(myForm);

		//formData.append('aa', 'kingwell');
		//formData.append('bb', '30');
		// var str = JSON.stringify({
		// 	name: 'kingwell',
		// 	age: 30
		// });


		var ajaxSetting = {
			url: '/demo/xhr',
			type: 'post',
			data: formData,
			//headers: {},
			timeout: 0,
			progress: function(result) {
				progressText.innerHTML = (result.toFixed(2) * 100) + '%';
				progress.value = result.toFixed(2) * 100
			},
			success: function(data) {
				//console.log(data);
			},
			error: function(error) {
				//console.log(error);
				alert('出错');
			}
		};

		ajax(ajaxSetting);

		try {
			ev.preventDefault();
		} catch (event) {
			ev.returnValue = false;
		}


	};
});



// function addEvent(obj, type, fn) {
// 	if (obj.attachEvent) {
// 		obj['e' + type + fn] = fn;
// 		obj[type + fn] = function() {
// 			obj['e' + type + fn](window.event);
// 		}
// 		obj.attachEvent('on' + type, obj[type + fn]);
// 	} else {
// 		obj.addEventListener(type, fn, false);
// 	}
// }

// function removeEvent(obj, type, fn) {
// 	if (obj.detachEvent) {
// 		obj.detachEvent('on' + type, obj[type + fn]);
// 		obj[type + fn] = null;
// 	} else {
// 		obj.removeEventListener(type, fn, false);
// 	}

// }
// function test(){
// 	alert();
// 	removeEvent(document.body,'click',test);
// }
// addEvent(document.body,'click',test); 
// addEvent(document.body,'click',test); 
// function selectFrom(iFirstValue, iLastValue) {
// 	var iChoise = iLastValue - iFirstValue + 1;
// 	return Math.floor(Math.random() * iChoise + iFirstValue);
// }
// for (var i = 0; i < 200; i++) {
// 	console.log(selectFrom(1,5));
// }