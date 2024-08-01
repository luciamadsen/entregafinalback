const Cart = require('../models/Cart');
const Product = require('../models/Product');
const logger = require('../utils/logger');

exports.purchaseCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid).populate('products');
    if (!cart) return res.status(404).send('Cart not found');

    const purchasedProducts = [];
    const unavailableProducts = [];

    for (const product of cart.products) {
      if (product.stock >= product.quantity) {
        product.stock -= product.quantity;
        await product.save();
        purchasedProducts.push(product._id);
      } else {
        unavailableProducts.push(product._id);
      }
    }

    cart.products = unavailableProducts;
    await cart.save();

    res.status(200).json({
      purchasedProducts,
      unavailableProducts
    });
  } catch (error) {
    logger.error('Error purchasing cart', error);
    res.status(500).send('Server error');
  }
};
