const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');
const deviceValidator = require('../validators/deviceValidator');

router.post('/receiveMessage', deviceValidator.validateMessage, deviceController.receiveMessage);

module.exports = router;


