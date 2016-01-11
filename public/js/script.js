Backbone.Model.prototype.idAttribute = '_id';

// Backbone Model

var Funfixer = Backbone.Model.extend({
	defaults: {
    	title: '',
    	description: '',
    	host: '',
    	img: ''
  	}
});

// Backbone Collection

var Funfixers = Backbone.Collection.extend({
	url: '/api/funfixers'
});

// instantiate a Collection

var funfixers = new Funfixers();

// Backbone View for one funfixer

var FunfixerView = Backbone.View.extend({
	model: new Funfixer(),
	className: 'funfixer',
	initialize: function() {
		this.template = _.template($('#funfixerTemplate').html());
	},
	events: {
		'click .remove': 'delete'
	},
	delete: function() {
		this.model.destroy({
			success: function(response) {
				console.log('Successfully DELETED blog with _id: ' + response.toJSON()._id);
			},
			error: function(err) {
				console.log('Failed to delete blog!');
			}
		});
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

// Backbone View for all blogs

var FunfixersView = Backbone.View.extend({
	model: funfixers,
	el: $('#funfixers'),
	initialize: function() {
		var self = this;
		this.model.on('add', this.render, this);
		this.model.on('change', function() {
			setTimeout(function() {
				self.render();
			}, 30);
		},this);
		this.model.on('remove', this.render, this);

		this.model.fetch({
			success: function(response) {
				_.each(response.toJSON(), function(item) {
					console.log('Successfully GOT blog with _id: ' + item._id);
				})
			},
			error: function() {
				console.log('Failed to get blogs!');
			}
		});
	},
	render: function() {
		var self = this;
		this.$el.html('');
		_.each(this.model.toArray(), function(funfixer) {
			self.$el.append((new FunfixerView({model: funfixer})).render().$el);
		});
		return this;
	}
});

var funfixersView = new FunfixersView();

$(document).ready(function() {
	$('.new-fun').on('click', function() {
		var funfixer = new Funfixer({
			title: $('#title').val(),
			description: $('#description').val(),
			host: $('#host').val(),
			img: $('#img').val()
		});
		$('#title').val("");
        $('#description').val("");
        $('#host').val("");
        $('#img').val("");
		funfixers.add(funfixer);
		funfixer.save(null, {
			success: function(response) {
				console.log('Successfully SAVED blog with _id: ' + response.toJSON()._id);
			},
			error: function() {
				console.log('Failed to save blog!');
			}
		});
	});
})