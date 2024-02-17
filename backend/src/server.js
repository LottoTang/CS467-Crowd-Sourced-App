require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use('/', require('./index'));
app.enable('trust proxy');

mongoose.connect(process.env.MONGODB_CONNECT_STRING, {useNewUrlParser: true});
const db = mongoose.connection;

db.once('open', () => {
  console.log('Successfully connected to MongoDB using Mongoose.');
});

// Listen to the specified port, or 3000 otherwise
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
