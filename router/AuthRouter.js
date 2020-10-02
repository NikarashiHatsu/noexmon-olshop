const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UsersModel = require('../models/UsersModel');
const { registerValidation, loginValidation } = require('../validation/UserValidation');

router.post('/register', async (req, res) => {
  // Validate before create a user
  const { error } = registerValidation(req.body);
  if(error) return res.status(400).json( error.details );

  // Check if the user is already in the database
  const emailExist = await UsersModel.findOne({ email: req.body.email });
  if(emailExist) return res.status(400).json({ error: 'Email already exists' });

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // Create new user
  const user = new UsersModel({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  });

  try {
    const savedUser = await user.save();
    res.json({ user: user._id });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post('/login', async (req, res) => {
  // Validation
  const { error } = loginValidation(req.body);
  if(error) return res.status(400).json( error.details );

  // Check if email exist
  const user = await UsersModel.findOne({ email: req.body.email });
  if(!user) return res.status(400).json({ error: 'Email or password mismatched' });

  // Check if the password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if(!validPass) return res.status(400).json({ error: 'Email or password mismatched'});

  // Create and assign a token
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
  res.json({
    message: 'User logged in',
    token: token,
  });
});

module.exports = router;