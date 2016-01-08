var app = app || {};

app.Router = Backbone.Router.extend({
        routes: {
            '': 'funfixers',
            'funfixers/:id': 'details'
        },

        funfixers: function () {
        	console.log("View root requested.");
        
    		var funfixers = new app.FunfixerList(); 
    		var funfixerListView = new app.FunfixerListView({model:funfixers})
        	funfixers.fetch({
      			success: function() {
      				console.log("Success");
        			$('body').html(funfixerListView.render().el);
      			}
      		});
        	
        },

        details: function (id) {
            console.log("View funfixer requested.");
            //var funfixer = app.collection.get(id);
        	var detailView = new app.FunfixerDetailsView({model:funfixer});
        	$('#funfixer').html(detailView.render().el);
        }
    });