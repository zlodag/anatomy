var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
  name: {
  	type: String,
  	required: true
  },
  category: {
    type: Number,
    min: 1,
    max: 3,
    required: true,
    validate : {
      validator : Number.isInteger,
      message   : '{VALUE} is not an integer value'
    }
  },
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section',
    index: true,
    required: true
  }
});

module.exports = mongoose.model('Item', ItemSchema);