import mongoose, { Document, Schema } from 'mongoose';

export interface IFertilizer extends Document {
  name: string;
  kg_per_acre: number;
  status: string;
  seeds: (typeof mongoose.Schema.Types.ObjectId)[]; // Reference to Seed model
}

const FertilizerSchema: Schema = new Schema({
  name: { type: String, required: true },
  kg_per_acre: { type: Number, default: 3, required: true },
  status: { type: String, default: 'AVAILABLE', required: true },
  seeds: [{ type: Schema.Types.ObjectId, ref: 'Seed' }], // Reference to Seed model
});

const Fertilizer = mongoose.model<IFertilizer>('Fertilizer', FertilizerSchema);

export default Fertilizer;
