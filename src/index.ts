import express from 'express';
import dotenv from 'dotenv';
import swaggerRouter from './docs';
dotenv.config();

const app = express();
app.use(swaggerRouter);

app.get('/', (req, res) => {
  res.send('Hello BK, we want to work from you and we may make it, that is good');
});

const { APP_PORT } = process.env;

app.listen(APP_PORT, () => {
  console.log(`app running on port ${APP_PORT}`);
});
export default app;
