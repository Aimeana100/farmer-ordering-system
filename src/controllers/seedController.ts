import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Seed from '../models/Seed';
import Fertilizer from '../models/Fertilizer';
import { AsyncHandler } from '../utils/AsyncHundler';

const { ObjectId } = mongoose.Types;

// Get all seeds with associated fertilizer
export const all = AsyncHandler(async (req: Request, res: Response) => {
  //   const seed = await Seed.find();

  const seeds = await Seed.find().populate('fertilizers');

  return res.status(200).json({ status: 'OK', data: seeds });
});

// Create a seed
export const create = AsyncHandler(async (req: Request, res: Response) => {
  const { name, kg_per_acre, fertilizers } = req.body;

  if (!name || !kg_per_acre) {
    return res.status(400).json({ status: 'error', message: 'Please provide all required fields' });
  }

  if (kg_per_acre > 1) return res.status(204).json({ status: 'error', message: 'kg per acre should be 1 max.' });
  const seedExist = await Seed.findOne({ name });

  if (seedExist) {
    return res.status(409).json({ status: 'error', message: 'seed already exists' });
  }
  const seed = await Seed.create({ name, kg_per_acre });

  // Add fertilizers to the seed
  if (fertilizers && fertilizers.length > 0) {
    const fertilizerIds = await Fertilizer.find({ _id: { $in: fertilizers } });
    seed.fertilizers.push(...fertilizerIds.map((fertilizer) => fertilizer._id));
    // eslint-disable-next-line prefer-const
    for (let fertilizer of fertilizerIds) {
      fertilizer.seeds.push(seed._id);
      await fertilizer.save();
    }
    await seed.save();
  }
});

export const destroy = AsyncHandler(async (req: Request, res: Response) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: ' _id required.' });
  }

  if (!ObjectId.isValid(req.params.id)) {
    return res.status(422).json({ message: 'Id should be a valid mongoose ObjectId' });
  }

  const seed = await Seed.findOne({ _id: req.params.id }).exec();
  if (!seed) {
    return res.status(204).json({ message: `No seed matches ID.` });
  }
  const result = await Seed.deleteOne();
  res.status(200).json({ result, message: 'seed deleted successfully' });
});
