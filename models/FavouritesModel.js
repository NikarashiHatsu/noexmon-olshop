const mongoose = require('mongoose');

const favouritesSchema = mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Items",
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true
  }
});

module.exports = mongoose.model('Favourites', favouritesSchema);