import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConn from './config/dbConn';
import swaggerRouter from './docs';
import routes from './routes';

const { NODE_ENV, APP_PORT } = process.env;

dotenv.config();
dbConn();

const app = express();

app.use(cors());
app.use(express.json());

app.use(swaggerRouter);
app.use(routes);

// Set `strictQuery` to `false` to prepare for the change
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  const PORT = NODE_ENV === 'test' ? 4000 : APP_PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
export default app;
