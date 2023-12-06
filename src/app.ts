import express from 'express';
import cors from 'cors';
import { UserRoute } from './app/modules/users/user.routes';
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', UserRoute);

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to Our Next Level Assignment 2',
  });
});

export default app;
