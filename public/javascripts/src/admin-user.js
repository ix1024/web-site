/**
 * @description 
 * @author kingwell
 */
define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {

	//模型
	var Employee = Backbone.Model.extend({
		urlRoot: '/api/user/user',
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
	var employee = new Employee();

	//集合
	var EmployeeList = Backbone.Collection.extend({
		model: Employee,
		url: '/api/user/get-user-list'
	});
	var Employees = new EmployeeList();

	//视图
	var EmployeeView = Backbone.View.extend({
		tagName: 'tr',
		template: _.template($('#item-template').html()),
		events: {
			"dblclick td": "edit",
			"blur input,select": "close",
			"click .del": "clear"
		},
		initialize: function() {
			// 每次更新模型后重新渲染  
			this.model.bind('change', this.render, this);
			// 每次删除模型之后自动移除UI  
			this.model.bind('destroy', this.remove, this);
		},
		setText: function() {
			var model = this.model;
			this.input = $(this.el).find('input[type!=hidden],select');
			this.input.each(function() {
				var input = $(this);
				input.val(model.get(input.attr("name")));
			});
		},
		close: function(e) {
			var input = $(e.currentTarget);
			var id = input.parents('tr').find('[name="id"]').val();

			var obj = {
				id: id
			};
			obj[input.attr('name')] = input.val();

			this.model.save(obj, {
				validate: true
			});
			$(e.currentTarget).parent().parent().removeClass("editing");
		},
		edit: function(e) {
			// 给td加上editing样式  
			$(e.currentTarget).addClass('editing').find('input,select').focus();
		},
		render: function() {
			$(this.el).html(this.template(this.model.toJSON()));
			// 把每个单元格的值赋予隐藏的输入框  
			this.setText();
			return this;
		},
		remove: function() {
			$(this.el).remove();
		},
		clear: function(ev) {

			this.model.set({
				id: $(ev.currentTarget).data('id')
			});
			this.model.destroy({
				success: function(model, response) {
					console.log(response);
				},
				error: function() {
					//alert('err');
				}
			});
		}
	});

	var AppView = Backbone.View.extend({
		el: $('body'),
		events: {
			'click #add-btn': 'createOnEnter'
		},
		// 绑定collection的相关事件  
		initialize: function() {
			Employees.bind('add', this.addOne, this);
			// 调用fetch的时候触发reset  
			Employees.bind('reset', this.addAll, this);
			Employees.fetch();
		},
		createOnEnter: function(e) {

			var employee = new Employee({
				url: '/api/user/user'
			});
			var attr = {
				_id: null,
				lastLoginTime: null
			};
			$('#emp-form input[type!=hidden],#emp-form select').each(function() {
				var input = $(this);
				attr[input.attr('name')] = input.val();
			});
			employee.bind('error', function(model, error) {
				console.log(error);
			});
			// set方法中会自动调用model的validate方法进行校验，如果不通过则返回false  			 
			if (employee.set(attr, {
					validate: true
				})) {
				Employees.create(employee);

			}
		},
		addOne: function(employee) {

			employee.bind('error', function(model, error) {
				alert(error);
			});
			var view = new EmployeeView({
				model: employee
			});

			$(".emp-table tbody").append(view.render().el);
		},
		addAll: function() {
			Employees.each(this.addOne);
		}
	});
	window.App = new AppView();
});