const Product = require('../models/Product');
const logger = require('../utils/logger');

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.status(200).send('Product deleted');
    } else {
      res.status(404).send('Product not found');
    }
  } catch (error) {
    logger.error('Error deleting product', error);
    res.status(500).send('Server error');
  }
};

