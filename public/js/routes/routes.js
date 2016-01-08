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
        			$('.row').html(funfixerListView.render().el);
      			}
      		});
        	
        },

        details: function (id) {
            console.log("View funfixer requested.");
            var funfixers = new app.FunfixerList(); 
        	funfixers.fetch({
      			success: function() {
      				console.log("Success");
      				var funfixer = funfixers.get(id);
      				var funfixerDetailsView = new app.FunfixerDetailsView({model:funfixer})
      				console.log(funfixer);
        			$('.row').html(funfixerDetailsView.render().el);
      			}
      		});
            
            
            
        	/*var detailView = new app.FunfixerDetailsView({model:funfixer});
        	$('#funfixer').html(detailView.render().el);*/
        }
    });