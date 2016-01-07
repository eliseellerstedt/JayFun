
var app = app || {};

app.FunfixerList = Backbone.Collection.extend({
    model: app.Funfixer,
    url: '/funfixers.json'
});  