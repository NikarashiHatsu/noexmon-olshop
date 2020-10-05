const express = require('express');
const router = express.Router();

const AuthMiddleware = require('../middleware/AuthMiddleware');

const CartsModel = require('../models/CartsModel');

/**
 * Get the user's cart list
 */
router.get('/', AuthMiddleware, async (req, res) => {
  try {
    const cartData = await CartsModel.find({ userId: req.user._id });
    res.json( cartData );
  } catch (err) {
    res.status(500).json({ err });
  }
});

/**
 * Put an item to cart
 */
router.post('/:itemId', AuthMiddleware, async (req, res) => {
  try {
    const cartData = new CartsModel({
      itemId: req.params.itemId,
      userId: req.user._id,
      quantity: req.body.quantity
    });

    const itemSavedToCart = await cartData.save();
    res.json( itemSavedToCart );
  } catch (err) {
    res.status(500).json({ err });
  }
});

/**
 * Get a cart's detail
 */
router.get('/:cartId', AuthMiddleware, async (req, res) => {
  try {
    // Check belonging
    const cartData = await CartsModel.findById( req.params.cartId ).populate('userId').populate('itemId');
    if(cartData.userId._id != req.user._id) return res.status(401).json({ message: 'Access denied' });

    res.json( cartData );
  } catch (err) {
    res.status(500).json({ err });
  }
});

/**
 * Update a cart
 */
router.patch('/:cartId', AuthMiddleware, async (req, res) => {
  try {
    // Check belonging
    const cartData = await CartsModel.findById( req.params.cartId );
    if(cartData.userId != req.user._id) return res.status(401).json({ message: 'Access denied' });

    const updatedCart = await CartsModel.findByIdAndUpdate(
      req.params.cartId,
      req.body,
      {
        new: true,
        useFindAndModify: true
      }
    );
    res.json( updatedCart );
  } catch (err) {
    res.status(500).json({ err });
  }
});

/**
 * Delete a cart
 */
router.delete('/:cartId', AuthMiddleware, async (req, res) => {
  try {
    // Check belonging
    const cartData = await CartsModel.findById( req.params.cartId );
    if(cartData.userId != req.user._id) return res.status(401).json({ message: 'Access denied' });

    const deletedItemFromCart = await CartsModel.findByIdAndRemove( req.params.cartId );
    if(!deletedItemFromCart.$isDeleted) return res.json({ message: 'Item has already deleted' });

    res.json({ message: 'Item has been deleted from cart' });
  } catch (err) {
    res.json({ err });
  }
});

module.exports = router;