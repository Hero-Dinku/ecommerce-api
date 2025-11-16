const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
} = require('../controllers/orders');

// GET all orders
router.get('/', getAllOrders);

// GET single order
router.get('/:id', getOrderById);

// POST create order
router.post('/', createOrder);

// PUT update order
router.put('/:id', updateOrder);

// DELETE order
router.delete('/:id', deleteOrder);

module.exports = router;
