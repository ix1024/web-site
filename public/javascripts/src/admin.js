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
});