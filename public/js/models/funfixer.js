
var app = app || {};

app.Funfixer = Backbone.Model.extend({
	url: '/api/funfixers',
	idAttribute  : "_id",
	defaults: {
    	title: '',
    	description: '',
    	host: '',
    	img: ''
  	}
});