const express = require('express');
const app = express();

// Router
app.get('/', (req, res) => {
  res.send("Index");
});

// Listener
app.listen(3000, () => {
  console.log('App listened at http://localhost:3000');
});