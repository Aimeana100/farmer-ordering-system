import mongoose, { Document, Schema } from 'mongoose';

interface IOrder extends Document {
  user: typeof mongoose.Schema.Types.ObjectId;
  seeds: (typeof mongoose.Schema.Types.ObjectId)[];
  fertilizers: (typeof mongoose.Schema.Types.ObjectId)[];
  totalPrice: number;
}

const OrderSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  seeds: [{ type: Schema.Types.ObjectId, ref: 'Seed', required: true }],
  fertilizers: [{ type: Schema.Types.ObjectId, ref: 'Fertilizer', required: true }],
  totalPrice: { type: Number, required: true },
});

const Order = mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
