define(['jquery', 'my-utils'], function($, myUtils) {
	// if (top !== window) {
	// 	top.location.reload();
	// }

	$('#loginSubmit').on('click', function() {
		$.ajax({
			url: 'get-login',
			data: {
				userName: $('[name="userName"]').val(),
				password: $('[name="password"]').val()
			},
			success: function(data) {
				if (data && data.status === '00000') {
					window.location.href = myUtils.getQueryValue('backUrl') || '/';
				} else {

				}
			},
			error: function() {

			}
		});
	});
});