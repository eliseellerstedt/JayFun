
var app = app || {};

app.FunfixerListView = Backbone.View.extend({
  el: "#funfixers",

  initialize:function () {
        /*this.model.bind("reset", this.render, this);
        var self = this;
        this.model.bind("add", function (wine) {
            $(self.el).append(new WineListItemView({model:wine}).render().el);
        });*/
  },
 
  render:function (eventName) {
      _.each(this.model.models, function (funfixer) {
        $(this.el).append(new app.FunfixerListItemView({model:funfixer}).render().el);
      }, this);
      return this;
  }
});