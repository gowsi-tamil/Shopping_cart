const express = require('express');
const {
    createProduct,
    getAllProducts,
    getProductById,
} = require('../controllers/productController');

const router = express.Router();

router.post('/create', createProduct);      // Create a new product
router.get('/', getAllProducts);            // Get all products
router.get('/:id', getProductById);         // Get a product by ID

module.exports = router;
