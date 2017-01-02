var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;

var BrewSchema = new Schema({
  type: String
});

module.exports = mongoose.model('Brew', BrewSchema);