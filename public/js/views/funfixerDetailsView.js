
var app = app || {};

app.FunfixerDetailsView = Backbone.View.extend({
    el: "#funfixers",
    template: _.template($('#funfixerDetailsTemplate').html()),
    events: {
        'click .remove': 'removeFunfixer'
    },
    initialize: function() {
	   this.listenTo(this.model, 'change', this.render);
	},
    render: function(eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    },
    removeFunfixer: function(e){
        e.preventDefault();
        var button = e.target;
        var id = button.id;
        console.log(id);
        var funfixers = new app.FunfixerList();
        var model = funfixers.get({'_id': id});
        console.log(model);
        
    }

});