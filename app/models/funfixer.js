var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FunfixerSchema   = new Schema({
    title: String
});

module.exports = mongoose.model('Funfixer', FunfixerSchema);


