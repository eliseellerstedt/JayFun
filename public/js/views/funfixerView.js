
var app = app || {};

app.FunfixerView = Backbone.View.extend({
    el: "#funfixers",
    template: _.template($('#funfixerTemplate').html()),
    render: function(eventName) {
        _.each(this.model.models, function(funfixer){
            var funfixerTemplate = this.template(funfixer.toJSON());
            $(this.el).append(funfixerTemplate);
        }, this);

        return this;
    }
});