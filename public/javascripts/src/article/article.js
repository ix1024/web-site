try {
	SyntaxHighlighter.all({
		brush: 'js',
		toolbar: false
	});
} catch (ev) {}
require(['jquery', 'comment'], function($) {
	$('#sendComment_')
		.on('click', function() {
			var $parent = $('.send-comment');
			var id = $('#articleId').val();
			var who = $parent.find('[name="who"]').val();
			var content = $parent.find('[name="content"]').val();
			var dataString = JSON.stringify({
				who: who,
				content: content
			});

			$.ajax({
				url: '/api/article/send-comment/' + id,
				type: 'POST',
				data: {
					id: id,
					who: who,
					content: content
				},
				success: function(data) {
					if ('00000' === data.status) {

					} else {

					}
					alert(data.message);
				},
				error: function() {

				}
			});
		});
});