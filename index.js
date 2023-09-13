const express = require('express');
const bodyParser = require('body-parser');
const messageRoutes = require('./routes/messageRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Use the messageRoutes for handling /receiveMessage endpoint
app.use('/api', messageRoutes);

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
