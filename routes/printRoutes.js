const express = require('express');
const router = express.Router();
const { printBoleto } = require('../controllers/printController.js');

router.post('/', printBoleto);

module.exports = router;
