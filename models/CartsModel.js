const mongoose = require('mongoose');

const cartsModel = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  itemId: {
    type: mongoose.Types.ObjectId,
    ref: 'Items',
    required: true
  },
  quantity: {
    type: mongoose.Types.Decimal128,
    required: true
  }
});

module.exports = mongoose.model('Carts', cartsModel);