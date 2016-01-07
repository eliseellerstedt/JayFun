
var app = app || {};

app.AppView = Backbone.View.extend({
  el: "body",
  initialize: function() {

    var funfixers = new app.FunfixerList();    
    var funfixersView = new app.FunfixerView({model: funfixers});
    funfixers.fetch({
      success: function() {
        funfixersView.render();
      }
    });
  }
});