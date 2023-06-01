import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  telphone: string;
  role: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: false },
  telphone: { type: String, required: true },
  role: { type: String, enum: ['store-keeper', 'farmer'], default: 'farmer', required: true },
});

export default mongoose.model<IUser>('User', UserSchema);
