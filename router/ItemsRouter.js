const express = require('express');
const router = express.Router();
const ItemsModel = require('../models/ItemsModel');
const AuthMiddleware = require('../middleware/AuthMiddleware');

/**
 * Get all items
 */
router.get('/', async (req, res) => {
  try {
    const items = await ItemsModel.find().populate('itemPublisher');
    res.json( items );
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

/**
 * Store item to database
 */
router.post('/', AuthMiddleware, async (req, res) => {
  const item = new ItemsModel({
    itemName: req.body.itemName,
    itemDescription: req.body.itemDescription,
    itemPrice: req.body.itemPrice,
    itemStock: req.body.itemStock,
    itemPublisher: req.user._id,
  });

  try {
    const savedItem = await item.save();
    res.json( savedItem );
  } catch (err) {
    res.status(500).json({ message: err });
  }
})

/**
 * Get an item's detail
 */
router.get('/:itemId',  async (req, res) => {
  try {
    const item = await ItemsModel.findById( req.params.itemId );
    res.json({ product: item, publisher: req.publisher });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

/**
 * Update an item
 */
router.patch('/:itemId', AuthMiddleware, async (req, res) => {
  // Check belongings
  const itemData = await ItemsModel.findById(req.params.itemId).populate('itemPublisher');
  if(itemData.itemPublisher._id != req.user._id) res.status(401).json({ message: 'Access Denied' });

  try {
    const updatedItem = await ItemsModel.findByIdAndUpdate(
      req.params.itemId,
      req.body, 
      { 
        new: true, 
        useFindAndModify: true
      }
    );
    res.json( updatedItem );
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

/**
 * Delete an item
 */
router.delete('/:itemId', AuthMiddleware, async (req, res) => {
  // Check belongings
  const itemData = await ItemsModel.findById(req.params.itemId).populate('itemPublisher');
  if(itemData.itemPublisher._id != req.user._id) res.status(401).json({ message: 'Access Denied' });
  
  try {
    const deletedItem = await ItemsModel.findByIdAndRemove( req.params.itemId );

    if(deletedItem) {
      res.json({ message: 'Item has been successfully deleted.' });
    } else {
      res.json({ message: 'Item has already deleted.' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

/**
 * Export the Items' routes
 */
module.exports = router;