var mongoose = require('mongoose');

var RegionSchema = new mongoose.Schema({
  name: {
  	type: String,
  	required: true
  }
});

module.exports = mongoose.model('Region', RegionSchema);