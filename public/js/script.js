Backbone.Model.prototype.idAttribute = '_id';

// Backbone Model

var Funfixer = Backbone.Model.extend({
	defaults: {
    	title: '',
    	description: '',
    	host: '',
    	img: '',
    	address: '',
    	joined: [],
    	hasJoined: ''
  	}
});

// Backbone Collection

var Funfixers = Backbone.Collection.extend({
	url: '/api/funfixers'
});

// Backbone View for one funfixer

var FunfixerView = Backbone.View.extend({
	model: new Funfixer(),
	className: 'funfixer',
	initialize: function() {
		this.template = _.template($('#funfixerTemplate').html());
	},
	events: {
		'click .remove': 'delete',
		'click .join': 'join',
		'click .info': 'details'
	},
	delete: function(e) {
		e.stopPropagation();
		this.model.destroy({
			success: function(response) {
				console.log('Successfully DELETED funfixer with _id: ' + response.toJSON()._id);
			},
			error: function(err) {
				console.log('Failed to delete funfixer!');
			}
		});
	},
	join: function(e){
		e.stopPropagation();
		var arr = _.clone(this.model.get('joined'));
		
		if(this.model.get('hasJoined')){
			var index = arr.indexOf("Elise Ellerstedt");
			if(index != -1) {
				arr.splice(index, 1);
			}	
		}else{
			arr.push('Elise Ellerstedt');
		}

		this.model.set('joined', arr);
		this.model.set('hasJoined', !this.model.get('hasJoined'));
		this.model.save(null, {
			success: function(response) {
				console.log('Successfully UPDATED funfixer with _id: ' + response.toJSON()._id);
			},
			error: function(err) {
				console.log('Failed to update funfixer!');
			}
		});

	},
	details: function(e){
		
		var id = this.model.get('_id');
		app.navigate('/funfixers/' + id, {trigger: true});
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

// Backbone View for all funfixers
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
					console.log('Successfully GOT funfixer with _id: ' + item._id);
				})
			},
			error: function() {
				console.log('Failed to get funfixers!');
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

	var FunfixerDetailsView = Backbone.View.extend({
		model: new Funfixer(),
		className: 'details',
		template:_.template($('#funfixerDetailsTemplate').html()),
		initialize: function(){
			this.model.on('change', this.render, this);
		},
		
	    render:function (eventName) {
	        $(this.el).html(this.template(this.model.toJSON()));
	        return this;
	    },
		events: {
			'click .remove': 'delete',
			'click .edit': 'edit',
			'click .save': 'save',
			'click .cancel': 'cancel',
			'click .join': 'join'
		},
		delete: function() {
			
			this.model.destroy({
				success: function(response) {
					console.log('Successfully DELETED funfixer with _id: ' + response.toJSON()._id);
					app.navigate('', {trigger: true});
				},
				error: function(err) {
					console.log('Failed to delete funfixer!');
				}
			});
		},
		edit: function(){


			this.$('.remove').hide();
			this.$('.edit').hide();
			this.$('.save').show();
			this.$('.cancel').show();

			var host = this.model.get('host');
			var title = this.model.get('title');
			var description = this.model.get('description');
			var img = this.model.get('img');
			var address = this.model.get('address');

			$('.host').html('<input type="text" class="host-update" value="' + host + '">');
			$('.title').html('<input type="text" class="title-update" value="' + title + '">');
			$('.description').html('<input type="text" class="description-update" value="' + description + '">');
			$('.img-box').html('<input type="text" class="img-update" value="' + img + '">');
			$('.map').html('<input type="text" class="address-update" value="' + address + '">');
		},
		save: function(){
			this.model.set({
				'host': $('.host-update').val(),
				'title': $('.title-update').val(),
				'description': $('.description-update').val(),
				'img': $('.img-update').val(),
				'address': $('.address-update').val()
			});

			this.model.save(null, {
				success: function(response) {
					console.log('Successfully UPDATED funfixer with _id: ' + response.toJSON()._id);
				},
				error: function(err) {
					console.log('Failed to update funfixer!');
				}
			});
		},
		cancel: function(){
			funfixerDetailsView.render();
		},
		join: function(){
			var arr = _.clone(this.model.get('joined'));
			
			if(this.model.get('hasJoined')){
				var index = arr.indexOf("Elise Ellerstedt");
				if(index != -1) {
					arr.splice(index, 1);
				}	
			}else{
				
				arr.push('Elise Ellerstedt');
			}

			this.model.set('joined', arr);
			this.model.set('hasJoined', !this.model.get('hasJoined'));
			this.model.save(null, {
				success: function(response) {
					console.log('Successfully UPDATED funfixer with _id: ' + response.toJSON()._id);
				},
				error: function(err) {
					console.log('Failed to update funfixer!');
				}
			});

		}
	}); 


	// Router
	var AppRouter = Backbone.Router.extend({
	 
	    routes:{
	        "":"list",
	        "funfixers/:id":"funfixerDetails"
	    },
	 
	    list:function () {
	        funfixersView = new FunfixersView({model: funfixers});
	    },
	 
	    funfixerDetails:function (id) {
	    	
	    	funfixers.fetch({
				success: function(response) {
					var funfixer = funfixers.get(id);
					console.log('Successfully GOT funfixer with _id: ' + id);
					funfixerDetailsView = new FunfixerDetailsView({model:funfixer});
					$('.row').html(funfixerDetailsView.render().el);	
				},
				error: function() {
					console.log('Failed to get funfixers!');
				}
			});
	    }
	});

// instantiate app

	var funfixers = new Funfixers();
	var funfixersView;
	var funfixerDetailsView;
	var app = new AppRouter();
	Backbone.history.start();



$(document).ready(function() {
	$('.new-fun').on('click', function(e) {
		e.preventDefault();
		var funfixer = new Funfixer({
			title: $('#title').val(),
			description: $('#description').val(),
			host: $('#host').val(),
			img: $('#img').val(),
			address: $('#address').val()
		});
		$('#title').val("");
        $('#description').val("");
        $('#host').val("");
        $('#img').val("");
        $('#address').val("");
		funfixers.add(funfixer);
		funfixer.save(null, {
			success: function(response) {
				console.log('Successfully SAVED funfixer with _id: ' + response.toJSON()._id);
			},
			error: function() {
				console.log('Failed to save funfixer!');
			}
		});
	});


})