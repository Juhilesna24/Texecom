const express = require('express');
const bodyParser = require('body-parser');
const deviceRoutes = require('./src/routes/deviceRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/api', deviceRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
