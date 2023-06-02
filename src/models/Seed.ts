import mongoose, { Document, Schema } from 'mongoose';

interface ISeed extends Document {
  name: string;
  kg_per_acre: number;
  status: string;
  fertilizers: (typeof mongoose.Schema.Types.ObjectId)[]; // Reference to Fertilizer model
}

const SeedSchema: Schema = new Schema({
  name: { type: String, required: true },
  kg_per_acre: { type: Number, default: 1, required: true },
  status: { type: String, default: 'AVAILABLE', required: true },
  fertilizers: [{ type: Schema.Types.ObjectId, ref: 'Fertilizer' }], // Reference to Fertilizer model
});

const Seed = mongoose.model<ISeed>('Seed', SeedSchema);

export default Seed;
