import { Request, Response } from 'express';
import Order from '../models/Order';
import Seed from '../models/Seed';
import { AsyncHandler } from '../utils/AsyncHundler';

interface CustomRequest extends Request {
  user: any;
}

export const createOrder = AsyncHandler(async (req: CustomRequest, res: Response) => {
  // Handle order creation logic here
  // Calculate fertilizers and seeds quantity based on the land size

  // Example: Creating a new order
  const { landSize, seed } = req.body;

  // Create the order
  const order = await Order.create({
    user: req.user._id,
    seeds: [seed],
    landSize,
    ferlitizer: [],
  });

  await order.save();

  return res.status(201).json({ status: 'ok', data: order, message: 'Order created' });
});

export const getOrders = AsyncHandler(async (req: CustomRequest, res: Response) => {
  let orders = [];
  if (req.user.role === 'farmer') {
    orders = await Order.find({ user: req.user._id }).populate('user seeds').sort({ createdAt: -1 });
  } else {
    orders = await Order.find({}).populate('user seeds').sort({ createdAt: -1 });
  }
  return res.status(200).json({ status: 'ok', data: orders });
});

export const updateOrderStatus = AsyncHandler(async (req: CustomRequest, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = await Order.findByIdAndUpdate(id, { status }, { new: false });

  if (!order) {
    return res.status(404).json({ status: 'error', message: 'Order not found' });
  }

  return res.json({ status: 'ok', data: order });
});
