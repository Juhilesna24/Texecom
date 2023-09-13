const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const messageValidator = require('../validators/messageValidator');

router.post('/receiveMessage', messageValidator.validateMessage, messageController.receiveMessage);

module.exports = router;


