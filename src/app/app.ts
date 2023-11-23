import express from 'express';
import cors from 'cors';
import { UserRoute } from './app/modules/users/user.routes';
const app = express();

app.use(express.json());
app.use(cors());

app.use('/', UserRoute);

app.get('/', (req, res) => {
  res.send('Hello Bro');
});

export default app;
