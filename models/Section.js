var mongoose = require('mongoose');

var SectionSchema = new mongoose.Schema({
  name: {
  	type: String,
  	required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    index: true,
    required: true
  }
});

module.exports = mongoose.model('Section', SectionSchema);