import mongoose, { Document, Schema } from 'mongoose';
const { ObjectId } = mongoose.Types;

interface ISeedFertilizer extends Document {
  seed: typeof ObjectId;
  fertilizer: typeof ObjectId;
  maxWeight: number;
}

const SeedFertilizerSchema: Schema = new Schema({
  seed: { type: Schema.Types.ObjectId, ref: 'Seed', required: true },
  fertilizer: { type: Schema.Types.ObjectId, ref: 'Fertilizer', required: true },
  maxWeight: { type: Number },
});

const SeedFertilizer = mongoose.model<ISeedFertilizer>('SeedFertilizer', SeedFertilizerSchema);

export default SeedFertilizer;
