const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 255,
    min: 6
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6
  },
  items: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Items",
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Users', usersSchema);