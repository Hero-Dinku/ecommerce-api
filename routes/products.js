const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/products');

// GET all products
router.get('/', getAllProducts);

// GET single product
router.get('/:id', getProductById);

// POST create product
router.post('/', createProduct);

// PUT update product
router.put('/:id', updateProduct);

// DELETE product
router.delete('/:id', deleteProduct);

module.exports = router;
