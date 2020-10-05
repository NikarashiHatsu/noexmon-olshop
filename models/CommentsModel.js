const mongoose = require('mongoose');

const commentsSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Users"
  },
  post: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Items"
  },
  comment: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comments', commentsSchema);