var app = app || {};


app.AppView = Backbone.View.extend({
 
    el: 'body',

    events: {
        'click .new-fun': 'createFunfixer'
    },
 
    initialize:function () {
        this.render();
    },
 
    render:function (eventName) {
        $(this.el).html();
        return this;
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
    var funfixersListView = new app.FunfixerListView({model: funfixers});
    funfixer.save(data, {
      success: function(){ 
          // model was saved successfully, now add it to the collection
          funfixers.add(funfixer);
          funfixersListView.render();
          $('#title').val("");
          $('#description').val("");
          $('#host').val("");
          $('#img').val("");
          
      },
      error: function(){ 
          // handle app when saving to server fails
          alert('failed to save funfixer');
      }
    });
  
  }
});