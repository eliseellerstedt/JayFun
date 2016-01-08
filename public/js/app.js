  var app = app || {};

  $(function() {

    // Kick things off by creating the **App**.
    new app.AppView();

    new app.Router();
    Backbone.history.start();


  });