const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middleware/AuthMiddleware');
const FavouriteModel = require('../models/FavouritesModel');

/**
 * Favourite an item
 */
router.post('/:itemId', AuthMiddleware, async (req, res) => {
  try {
    const favouriteData = new FavouriteModel({
      itemId: req.params.itemId,
      userId: req.user._id
    });

    const favouritedItem = await favouriteData.save();
    return res.json({ favouritedItem });
  } catch (err) {
    return res.status(500).json({ err });
  }
});

/**
 * Remove favourite from an item
 */
router.delete('/:favouriteId', AuthMiddleware, async (req, res) => {
  try {
    const deletedFavourite = await FavouriteModel.findByIdAndDelete( req.params.favouriteId );
    if(!deletedFavourite.$isDeleted) return res.status(500).json({ message: 'Failed to remove item from your favourite list' });

    return res.json({ message: 'Item removed from your favourite list' });
  } catch (err) {
    return res.json({ err }); 
  }
});

module.exports = router;