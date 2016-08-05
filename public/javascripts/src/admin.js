require(['jquery'], function($) {
	$('table').on('click', 'span', function() {
		var $tr = $(this).parents('tr');
		var id = $tr.attr('id');
		$.ajax({
			url: 'admin/delete',
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
});