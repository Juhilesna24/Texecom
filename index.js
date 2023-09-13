const express = require('express');
const bodyParser = require('body-parser');
const messageRoutes = require('./src/routes/messageRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/api', messageRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
