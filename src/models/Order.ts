import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderSchema = new Schema({
  order_date: {
    type: Date,
    required: true,
  },
  land_size: {
    type: Number,
    required: true,
  },
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('Order', orderSchema);
