define(['jquery'], function($) {
	
	$('#loginSubmit').on('click', function() {
		$.ajax({
			url: 'get-login',
			data: {
				userName: $('[name="userName"]').val(),
				password: $('[name="password"]').val()
			},
			success: function(data) {
				if (data && data.status === '00000') {
					window.location.href = '/admin';
				} else {

				}
			},
			error: function() {

			}
		});
	});
});