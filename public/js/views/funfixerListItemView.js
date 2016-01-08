
var app = app || {};

app.FunfixerListItemView = Backbone.View.extend({
    className: "funfixer",
    template: _.template($('#funfixerTemplate').html()),
    events: {
        'click .remove': 'removeFunfixer'
    },
    initialize: function() {
	   this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
	},
    render: function(eventName) {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    removeFunfixer: function(e){
        e.preventDefault();
        
        
    }

});