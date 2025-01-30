const express = require('express');
const { printBoleto } = require('../controllers/printController.js');

const router = express.Router();

router.post('/', printBoleto);


export default router;
