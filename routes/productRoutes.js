const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.delete('/:id', productController.deleteProduct);

module.exports = router;
