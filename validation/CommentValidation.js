const Joi = require('joi');

/**
 * Validation to store a comment
 */
const storeCommentValidation = (data) => {
  const schema = Joi.object({
    comment: Joi.string().min(8).max(255).required()
  });

  return schema.validate(data);
}

/**
 * Validation to udpate a comment
 */
const updateCommentValidation = (data) => {
  const schema = Joi.object({
    comment: Joi.string().min(8).max(255).required()
  });

  return schema.validate(data);
}

module.exports.storeCommentValidation = storeCommentValidation;
module.exports.updateCommentValidation = updateCommentValidation;