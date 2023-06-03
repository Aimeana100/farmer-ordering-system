import express from 'express';
import { createOrder, getOrders } from '../controllers/orderController';

const router = express.Router();

// create order
router.post('/create', createOrder);

// list orders
router.post('/all', getOrders);

export default router;
