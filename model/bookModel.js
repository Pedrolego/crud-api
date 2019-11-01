var mongoose = require ('mongoose');

var Schema = mongoose.Schema;

var BookSchema = new Schema({
    titulo : String,
    autor : String,
    
});

module.exports = mongoose.model('Livro',BookSchema);