const express = require('express');
const app = express();

app.use('/', require('./index'));

app.enable('trust proxy');

// Listen to the specified port, or 3000 otherwise
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});