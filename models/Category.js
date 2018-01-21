var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
  name: {
  	type: String,
    trim: true,
  	required: true
  },
  region: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Region',
    index: true,
    required: true
  }
});

module.exports = mongoose.model('Category', CategorySchema);