import mongoose from 'mongoose';

const { Schema } = mongoose;

const seedSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Seed', seedSchema);
