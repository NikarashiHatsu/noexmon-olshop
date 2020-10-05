const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config')

// Middleware
const AppMiddleware = require('./middleware/AppMiddleware');
app.use(AppMiddleware);

// Routes
const AuthRouter = require('./router/AuthRouter');
const ItemRouter = require('./router/ItemsRouter');
const CommentRouter = require('./router/CommentsRouter');
const FavouriteRouter = require('./router/FavouriteRouter');
app.use('/api/user', AuthRouter);
app.use('/api/items', ItemRouter);
app.use('/api/comments', CommentRouter);
app.use('/api/favourite', FavouriteRouter);

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}).catch((err) => { 
  console.log(err)
});

// Listener
app.listen(3000);