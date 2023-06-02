import mongoose, { Document, Schema } from 'mongoose';

interface ISeedOrderDetails extends Document {
  order: typeof mongoose.Schema.Types.ObjectId;
  seed: typeof mongoose.Schema.Types.ObjectId;
  quantity: number;
}

const SeedOrderDetailsSchema: Schema = new Schema({
  order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  seed: { type: Schema.Types.ObjectId, ref: 'Seed', required: true },
  quantity: { type: Number, required: true },
});

const SeedOrderDetails = mongoose.model<ISeedOrderDetails>('SeedOrderDetails', SeedOrderDetailsSchema);

export default SeedOrderDetails;
