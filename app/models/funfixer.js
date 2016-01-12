var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FunfixerSchema   = new Schema({
    title: String,
    description: String,
    host: String,
    img: String,
    joined: [String]
});

module.exports = mongoose.model('Funfixer', FunfixerSchema);


