import { Request, Response } from 'express';
import Order from '../models/Order';
import SeedOrderDetails from '../models/SeedOrderDetails';
import FertilizerOrderDetails from '../models/FertilizerOrderDetails';

interface CustomRequest extends Request {
  user: any;
}

export const createOrder = async (req: CustomRequest, res: Response) => {
  try {
    // Handle order creation logic here
    // Calculate fertilizers and seeds quantity based on the land size

    // Example: Creating a new order
    const { landSize, fertilizers, seeds } = req.body;

    // Create the order
    const order = await Order.create({
      farmer: req.user._id,
      landSize,
      totalPrice: 0, // Calculate the total price
    });

    // Create SeedOrderDetails
    for (const seed of seeds) {
      await SeedOrderDetails.create({
        order: order._id,
        seed: seed.seedId,
        quantity: seed.quantity,
      });
    }

    // Create FertilizerOrderDetails
    for (const fertilizer of fertilizers) {
      await FertilizerOrderDetails.create({
        order: order._id,
        fertilizer: fertilizer.fertilizerId,
        quantity: fertilizer.quantity,
      });
    }

    res.status(201).json({ status: 'ok', data: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Failed to create order' });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().populate('farmer').sort({ createdAt: -1 }).limit(5);
    res.json({ status: 'ok', data: orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Failed to retrieve orders' });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

    if (!order) {
      return res.status(404).json({ status: 'error', message: 'Order not found' });
    }

    res.json({ status: 'ok', data: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Failed to update order status' });
  }
};
