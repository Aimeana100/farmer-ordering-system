import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Fertilizer from '../models/Fertilizer';
import Seed from '../models/Seed';
import { AsyncHandler } from '../utils/AsyncHundler';

const { ObjectId } = mongoose.Types;

// Get all Fertilizers with associated fertilizer
export const all = AsyncHandler(async (req: Request, res: Response) => {
  const fertilizer = await Fertilizer.find().populate('seeds');
  return res.status(200).json({ status: 'OK', data: fertilizer });
});

// Create a fertilizer
export const create = AsyncHandler(async (req: Request, res: Response) => {
  // validate inputs

  const { name, kg_per_acre } = req.body;
  if (!name || !kg_per_acre) {
    return res.status(400).json({ status: 'error', message: 'Please provide all required fields' });
  }
  if (kg_per_acre > 3) return res.status(400).json({ status: 'error', message: "kg per acre shouldn't go beyond 3" });

  // Create the fertilizer
  const fertilizer = await Fertilizer.create({ name, kg_per_acre });

  return res.status(201).json({ status: 'ok', data: fertilizer, message: 'Fertilizer created successfully' });
});

export const destroy = AsyncHandler(async (req: Request, res: Response) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: ' _id required.' });
  }

  if (!ObjectId.isValid(req.params.id)) {
    return res.status(422).json({ message: 'Id should be a valid mongoose ObjectId' });
  }

  const fertilizer = await Fertilizer.findOne({ _id: req.params.id }).exec();
  if (!fertilizer) {
    return res.status(204).json({ message: `No fertilizer matches ID.` });
  }
  const result = await Fertilizer.deleteOne();
  res.status(200).json({ result, message: 'fertilizer deleted successfully' });
});
