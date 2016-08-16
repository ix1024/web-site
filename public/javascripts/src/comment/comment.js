define([
	'jquery',
	'backbone',
	'underscore'
], function(
	$,
	Backbone,
	_
) {


	var $parent = $('.send-comment');
	var id = $('#articleId').val();


	var Comment = Backbone.Model.extend({
		url: '/api/article/send-comment/' + id,
		initialize: function() {
			console.info('model initialize');
			this.bind('invalid', function(model, error) {
				console.error(error);
			});
		},
		validate: function(attributes) {
			var result = '';
			if (attributes.who === '') {
				result = '名字不能为空';
			}
			if (attributes.content === '') {
				result = '内容不能为空';
			}
			return result;
		}
	});
	var CommentList = Backbone.Collection.extend({
		model: Comment,
		url: '/api/article/get-comment/' + id,
		initialize: function(module, options) {
			//this.bidn('add', options.view.addOneWorld);
		}
	});
	var Comments = new CommentList;

	var CommentView = Backbone.View.extend({
		//tagName: 'div',
		template: _.template($('#template').html()),
		initialize: function() {
			this.model.bind('change', this.render, this);
			this.model.bind('destroy', this.remove, this);
		},
		render: function() {
			console.log(this.template(this.model.toJSON()));
			$(this.el).html(this.template(this.model.toJSON()));
			return this;
		},
		remove: function() {}
	});

	var AppView = Backbone.View.extend({
		el: $('body'),
		events: {
			"click #sendComment": "createOnEnter"
		},
		initialize: function() {
			Comments.bind('add', this.addOne, this);
			// 调用fetch的时候触发reset
			Comments.bind('reset', this.addAll, this);
			Comments.fetch();

		},
		createOnEnter: function() {
			var comment = new Comment;

			var $parent = $('.send-comment');
			var id = $('#articleId').val();
			var who = $parent.find('[name="who"]').val();
			var content = $parent.find('[name="content"]').val();
			if (comment.set({
					who: who,
					content: content,
					date: Date.now()
				})) {
				Comments.create(comment);
			}
		},
		addOne: function(comment) {
			comment.set({
				"eid": comment.get("eid") || Comments.length
			});
			comment.bind('error', function(model, error) {
				alert(error);
			});
			var view = new CommentView({
				model: comment
			});
			$(".comment-title").append(view.render().el);
		},

		addAll: function() {
			console.log(Comments.length);
			Comments.each(this.addOne);
		}
	});
	new AppView();
	// $('#sendComment_')
	// 	.on('click', function() {
	// 		var $parent = $('.send-comment');
	// 		var id = $('#articleId').val();
	// 		var who = $parent.find('[name="who"]').val();
	// 		var content = $parent.find('[name="content"]').val();
	// 		var dataString = JSON.stringify({
	// 			who: who,
	// 			content: content
	// 		});

	// 		$.ajax({
	// 			url: '/api/article/send-comment/' + id,
	// 			type: 'POST',
	// 			data: {
	// 				id: id,
	// 				who: who,
	// 				content: content
	// 			},
	// 			success: function(data) {
	// 				if ('00000' === data.status) {

	// 				} else {

	// 				}
	// 				alert(data.message);
	// 			},
	// 			error: function() {

	// 			}
	// 		});
	// 	});

});