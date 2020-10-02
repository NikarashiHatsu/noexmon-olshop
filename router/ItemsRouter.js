const express = require('express');
const router = express.Router();
const ItemsModel = require('../models/ItemsModel');

// Item router
router.get('/', async (req, res) => {
  try {
    const items = await ItemsModel.find();
    res.json( items );
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post('/', async (req, res) => {
  const item = new ItemsModel({
    itemName: req.body.itemName,
    itemDescription: req.body.itemDescription,
    itemPrice: req.body.itemPrice,
    itemStock: req.body.itemStock,
    itemPublisher: req.body.itemPublisher
  });

  try {
    const savedItem = await item.save();
    res.json( savedItem );
  } catch (err) {
    res.status(500).json({ message: err });
  }
})

router.get('/:itemId', async (req, res) => {
  try {
    const item = await ItemsModel.findById( req.params.itemId );
    res.json( item );
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.patch('/:itemId', async (req, res) => {
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

router.delete('/:itemId', async (req, res) => {
  try {
    const deletedItem = await ItemsModel.findByIdAndRemove( req.params.itemId );
    res.json( deletedItem );
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// Export the route
module.exports = router;