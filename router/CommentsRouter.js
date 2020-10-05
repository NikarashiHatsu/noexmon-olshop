const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middleware/AuthMiddleware');
const CommentsModel = require('../models/CommentsModel');
const { storeCommentValidation, updateCommentValidation } = require('../validation/CommentValidation');

/**
 * Store a comment
 */
router.post('/:itemId', AuthMiddleware, async (req, res) => {
  // Validation
  const { error } = storeCommentValidation(req.body);
  if(error) return res.status(401).json( error.details );

  // Store the comment
  try {
    const comment = new CommentsModel({
      user: req.user._id,
      post: req.params.itemId,
      comment: req.body.comment
    });

    const commentData = await comment.save();
    res.json({ commentData });
  } catch (err) {
    res.status(500).json({ err });
  }
});

/**
 * Update a comment
 */
router.patch('/:commentId', AuthMiddleware, async (req, res) => {
  // Validation
  const { error } = updateCommentValidation(req.body);
  if(error) return res.status(401).json( error.details );

  // Check belongings
  const commentData = await CommentsModel.findById( req.params.commentId ).populate('Users');
  if(commentData.user != req.user._id) res.status(401).json({ message: 'Access Denied' });

  try {
    const updatedComment = await CommentsModel.findByIdAndUpdate(
      req.params.commentId,
      req.body,
      {
        new: true,
        useFindAndModify: true
      }
    );
    res.json( updatedComment );
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

/**
 * Delete a comment
 */
router.delete('/:commentId', AuthMiddleware, async (req, res) => {
  // Check belongings
  const commentData = await CommentsModel.findById( req.params.commentId ).populate('Users');
  if(commentData.user != req.user._id) res.status(401).json({ message: 'Access Denied' });

  try {
    const deletedComment = await CommentsModel.findByIdAndDelete( req.params.commentId );
    if(!deletedComment.$isDeleted) return res.json({ message: 'Failed to delete comment' });

    res.json({ message: 'Comment has been deleted' });
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;