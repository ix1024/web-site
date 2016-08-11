require(['jquery', 'tab'], function($, tab) {
	$('body').win();
	//删除文章
	$('table').on('click', 'span', function() {
		var $tr = $(this).parents('tr');
		var id = $tr.attr('id');
		$.ajax({
			url: 'delete',
			data: {
				id: id
			},
			success: function(data) {
				console.log(data);
				if (data.status === '00000') {
					$tr.remove();
				}
			},
			error: function() {}
		});
	});

	//设置 大小 

	$('.add-list')
		.on('click', 'button', function() {
			var type = $(this).data('type'),
				id = $(this).data('id'),
				$classification = $('.form-group-list').find('[name="classification"]'),
				$title = $('.form-group-list').find('[name="title"]'),
				$body = $('.form-group-list').find('[name="body"]'),
				$tag = $('.form-group-list').find('[name="tag"]'),
				data = {
					id: id,
					type: type,
					classification: $classification.val(),
					title: $title.val(),
					body: editor.html(),
					tag: $tag.val(),
				};

			$.ajax({
				url: '/admin/add',
				type: 'post',
				data: data,
				success: function(data) {
					//console.log(data);
					alert(data && data.message);
				},
				error: function() {}
			});
		});

	var editor;
	editor = KindEditor.create('textarea[name="body"]', {
		allowFileManager: true
	});
	KindEditor.ready(function(K) {

		// K('input[name=getHtml]').click(function(e) {
		// 	alert(editor.html());
		// });
		// K('input[name=isEmpty]').click(function(e) {
		// 	alert(editor.isEmpty());
		// });
		// K('input[name=getText]').click(function(e) {
		// 	alert(editor.text());
		// });
		// K('input[name=selectedHtml]').click(function(e) {
		// 	alert(editor.selectedHtml());
		// });
		// K('input[name=setHtml]').click(function(e) {
		// 	editor.html('<h3>Hello KindEditor</h3>');
		// });
		// K('input[name=setText]').click(function(e) {
		// 	editor.text('<h3>Hello KindEditor</h3>');
		// });
		// K('input[name=insertHtml]').click(function(e) {
		// 	editor.insertHtml('<strong>插入HTML</strong>');
		// });
		// K('input[name=appendHtml]').click(function(e) {
		// 	editor.appendHtml('<strong>添加HTML</strong>');
		// });
		// K('input[name=clear]').click(function(e) {
		// 	editor.html('');
		// });
	});
});