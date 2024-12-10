const { Cart, CartProducts } = require('../models/cartModel');
const Product = require('../models/productModel');
const User = require('../models/userModel'); // Ensure User model is available if needed

// Controller to create a cart for the user
exports.createCart = async (req, res) => {
  try {
    const userId = req.user.id; // Retrieved from authenticated user
    const [cart] = await Cart.findOrCreate({ where: { user_id: userId } }); // Ensures one cart per user

    res.status(201).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller to add an item to the cart
exports.addItemToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body; // Default quantity is 1
    const userId = 1; // Retrieved from authenticated user

    // Ensure the product exists
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Find or create the user's cart
    let [cart] = await Cart.findOrCreate({ where: { user_id: userId } });

    // Check if the product is already in the cart
    const existingCartProduct = await CartProducts.findOne({
      where: { CartId: cart.id, ProductId: productId },
    });

    if (existingCartProduct) {
      // Increment quantity if product already exists in the cart
      existingCartProduct.quantity += quantity;
      await existingCartProduct.save();
      return res.status(200).json({ success: true, message: 'Product quantity updated', cart });
    }

    // Add product to the cart if not already present
    await cart.addProduct(product, { through: { quantity } });

    res.status(200).json({ success: true, message: 'Item added to cart', cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller to remove an item from the cart
exports.removeItemFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = 1;

    // Find the user's cart
    const cart = await Cart.findOne({ where: { user_id: userId } });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    // Remove the product from the cart
    await CartProducts.destroy({ where: { CartId: cart.id, ProductId: productId } });

    res.status(200).json({ success: true, message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller to view the user's cart
exports.viewCart = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the user's cart and include associated products
    const cart = await Cart.findOne({
      where: { user_id: userId },
      include: { model: Product, through: { attributes: ['quantity'] } },
    });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller to clear the user's cart
exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the user's cart
    const cart = await Cart.findOne({ where: { user_id: userId } });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    // Remove all products from the cart
    await CartProducts.destroy({ where: { CartId: cart.id } });

    res.status(200).json({ success: true, message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
