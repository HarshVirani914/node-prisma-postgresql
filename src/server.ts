import { createUser, login } from './handlers/user';
import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', protect, router);
app.post('/signup', createUser);
app.post('/signin', login)

app.get('/', (req, res, next) => {
  res.json({ message: 'hello' });
})

app.use((err: any, req: any, res: any, next: any) => {
  if (err.type === 'auth')
    res.status(401).json({ message: "unauthorized" })
  else if (err.type === 'input')
    res.status(400).json({ message: "invalid input" })
  else
    res.status(500).json({ message: "internal server error" })
})


export default app;
