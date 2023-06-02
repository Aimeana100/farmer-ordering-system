import mongoose, { Document, Schema } from 'mongoose';

interface IFertilizerOrderDetails extends Document {
  order: typeof mongoose.Schema.Types.ObjectId;
  fertilizer: typeof mongoose.Schema.Types.ObjectId;
  quantity: number;
}

const FertilizerOrderDetailsSchema: Schema = new Schema({
  order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  fertilizer: { type: Schema.Types.ObjectId, ref: 'Fertilizer', required: true },
  quantity: { type: Number, required: true },
});

const FertilizerOrderDetails = mongoose.model<IFertilizerOrderDetails>(
  'FertilizerOrderDetails',
  FertilizerOrderDetailsSchema,
);

export default FertilizerOrderDetails;
