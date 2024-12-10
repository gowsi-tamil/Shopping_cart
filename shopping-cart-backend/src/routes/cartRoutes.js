const express = require('express');
const {
  createCart,
  addItemToCart,
  removeItemFromCart,
  viewCart,
  clearCart,
} = require('../controllers/cartController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware); // Apply authentication middleware

router.post('/create', createCart); // Create a new cart
router.post('/add-item', addItemToCart); // Add item to the cart
router.delete('/remove-item', removeItemFromCart); // Remove item from the cart
router.get('/view', viewCart); // View cart items
router.delete('/clear', clearCart); // Clear the cart

module.exports = router;
