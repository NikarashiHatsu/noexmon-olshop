const mongoose = require('mongoose');

const ItemsSchema = mongoose.Schema({
  itemName: {
    type: String,
    required: true
  },
  itemDescription: {
    type: String,
    required: true
  },
  itemPrice: {
    type: mongoose.Types.Decimal128,
    required: true
  },
  itemStock: {
    type: mongoose.Types.Decimal128,
    required: true
  },
  itemPublisher: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Items', ItemsSchema);