import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

interface ConnectionOptions {
  useUnifiedTopology: boolean;
  useNewUrlParser: boolean;
  autoIndex: boolean; // Optional property
}

const { DATABASE_URI, DATABASE_URI_TEST, NODE_ENV } = process.env;

interface ConnectionConfig {
  connectionString: string;
}

const resolveConnectionString = (): ConnectionConfig => {
  console.log(NODE_ENV);
  const connectionString: string = NODE_ENV === 'test' ? DATABASE_URI_TEST! : DATABASE_URI!;
  return { connectionString };
};

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    const options: ConnectionOptions = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      autoIndex: true, // Only for development environment
    };
    const { connectionString } = resolveConnectionString();

    await mongoose.connect(connectionString, options);
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

export default connectDB;
