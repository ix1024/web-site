define([
	'jquery',
	'backbone',
	'underscore'
], function(
	$,
	Backbone,
	_
) {

	/**
	 **	@description 
	 ** @param {}
	 ** @since 2016-08-17
	 ** @author kingwell leng
	 ** @example
	 **/
	var $parent = $('.send-comment');
	var id = $('#articleId').val();

	var Comment = Backbone.Model.extend({
		urlRoot: '/api/article/send-comment/' + id,
		initialize: function() {
			this.on('invalid', function(model, err) {
				alert(err);
			});
		},
		validate: function(attributes) {

			for (var key in attributes) {
				if (attributes[key] === '') {
					return key + '不能为空';
				}
			}
		}
	});

	var CommentList = Backbone.Collection.extend({
		model: Comment,
		url: '/api/article/get-comment/' + id
	});

	var Comments = new CommentList();


	var CommentView = Backbone.View.extend({
		template: _.template($('#template').html()),
		initialize: function() {
			this.model.bind('change', this.render, this);
		},
		render: function() {
			$(this.el).html(this.template(this.model.toJSON()));
			return this;
		}
	});

	var AppView = Backbone.View.extend({
		el: $('body'),
		initialize: function() {
			Comments.bind('add', this.addOne, this);
			// 调用fetch的时候触发reset  
			Comments.bind('reset', this.addAll, this);
			Comments.fetch();
		},
		events: {
			'click #sendComment': 'createOnEnter'
		},
		createOnEnter: function() {
			var comment = new Comment({
				url: '/api/article/send-comment/' + id
			});
			var attr = {
				date: new Date(),
				who: $('[name="who"]').val(),
				content: $('[name="content"]').val()
			};

			comment.bind('error', function(model, error) {
				console.log(error);
			});
			// set方法中会自动调用model的validate方法进行校验，如果不通过则返回false  			 
			if (comment.set(attr, {
					validate: true
				})) {
				Comments.create(comment);
			}

		},
		addOne: function(comment) {
			var view = new CommentView({
				model: comment
			});
			$('#commentBox').after(view.render().el);
		},
		addAll: function() {
			Comments.each(this.addOne);
		}
	});
	new AppView();

});