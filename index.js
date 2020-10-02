const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config')

// Middleware
const AppMiddleware = require('./middleware/AppMiddleware');
app.use(AppMiddleware);

// Routes
const ItemRouter = require('./router/ItemsRouter');
app.use('/items', ItemRouter);

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

// Listener
app.listen(3000);