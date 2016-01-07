
var app = app || {};

app.AppView = Backbone.View.extend({
  el: "body",

  events: {
    'click .new-fun': 'createFunfixer'
  },

  initialize: function() {
    var funfixers = new app.FunfixerList();    
    var funfixersView = new app.FunfixerView({model: funfixers});
    funfixers.fetch({
      success: function() {
        funfixersView.render();
      }
    });

  },

  createFunfixer: function(e){
    e.preventDefault();
    var title = $('#title').val();
    var description = $('#description').val();
    var host = $('#host').val();
    var img = $('#img').val();

    var data = {
      title: title,
      description: description,
      host: host,
      img: img
    }

    console.log(data);
    var funfixers = new app.FunfixerList();
    var funfixer = new app.Funfixer();
    var funfixersView = new app.FunfixerView({model: funfixers});
    funfixer.save(data, {
      success: function(){ 
          // model was saved successfully, now add it to the collection
          funfixers.add(funfixer);
          funfixersView.render();
          // if you can't access your wine list from this context, you might want to raise an event, and pass the wine, to catch it somewhere else:
          //obj.trigger('myWineAdded', wine); // this can be raised on a global event aggregator
      },
      error: function(){ 
          // handle app when saving to server fails
          alert('failed to save funfixer');
      }
    });
  
  }
});