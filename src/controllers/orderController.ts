import { Request, Response } from 'express';
import Order from '../models/Order';
import Seed from '../models/Seed';
import SeedOrderDetails from '../models/SeedOrderDetails';
import FertilizerOrderDetails from '../models/FertilizerOrderDetails';
import { AsyncHandler } from '../utils/AsyncHundler';

interface CustomRequest extends Request {
  user: any;
}

export const createOrder = AsyncHandler(async (req: CustomRequest, res: Response) => {
  // Handle order creation logic here
  // Calculate fertilizers and seeds quantity based on the land size

  // Example: Creating a new order
  const { landSize, seed } = req.body;

  const seedOrdered = await Seed.find({ _id: seed }).populate('fertilizers');
  console.log(seedOrdered);
  // Create the order
  const order = await Order.create({
    farmer: req.user._id,
    seeds: [seed],
    landSize,
    ferlitizer: [],
  });

  res.status(201).json({ status: 'ok', data: order, message: 'Order created' });
});

export const getOrders = AsyncHandler(async (req: Request, res: Response) => {
  const orders = await Order.find().populate('farmer').sort({ createdAt: -1 }).limit(5);
  res.json({ status: 'ok', data: orders });
});

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(id, { status }, { new: false });

    if (!order) {
      return res.status(404).json({ status: 'error', message: 'Order not found' });
    }

    res.json({ status: 'ok', data: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Failed to update order status' });
  }
};
