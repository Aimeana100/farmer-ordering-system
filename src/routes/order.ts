import express from 'express';
import { createOrder, getOrders, updateOrderStatus } from '../controllers/orderController';
import verifyJWT from '../middleware/verifyAuth';

const router = express.Router();

// create order
router.post('/create', verifyJWT, createOrder);

// list orders
router.get('/all', verifyJWT, getOrders);
router.put('/update/:id', verifyJWT, updateOrderStatus);

export default router;
