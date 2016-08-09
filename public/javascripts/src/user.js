define(['jquery'], function($) {
	$('#loginSubmit').on('click', function() {
		$.ajax({
			url: 'get-login',
			data: {
				userName: $('[name="userName"]').val(),
				password: $('[name="password"]').val()
			},
			success: function() {

			},
			error: function() {

			}
		});
	});
});