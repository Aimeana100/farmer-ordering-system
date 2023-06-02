import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Fertilizer from '../models/Fertilizer';
import Seed from '../models/Seed';
import { AsyncHandler } from '../utils/AsyncHundler';

const { ObjectId } = mongoose.Types;

// Get all Fertilizers with associated fertilizer
export const all = AsyncHandler(async (req: Request, res: Response) => {
  const fertilizer = await Fertilizer.find();
  return res.status(200).json({ status: 'OK', data: fertilizer });
});

// Create a fertilizer
export const create = AsyncHandler(async (req: Request, res: Response) => {
  const { name, kg_per_acre, status, seeds } = req.body;
  if (!name || !kg_per_acre || !status) {
    return res.status(400).json({ status: 'error', message: 'Please provide all required fields' });
  }

  // Create the fertilizer
  const fertilizer = await Fertilizer.create({ name, kg_per_acre, status });

  // Add seeds to the fertilizer
  if (seeds && seeds.length > 0) {
    const seedIds = await Seed.find({ _id: { $in: seeds } }, '_id');
    fertilizer.seeds.push(...seedIds.map((seed) => seed._id));
    await fertilizer.save();
  }

  return res.status(201).json({ status: 'ok', data: fertilizer });
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
