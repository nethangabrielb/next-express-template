import express from 'express';

import cors from 'cors';

import authRouter from './routes/guest/authRoutes';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/guest', authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening at port ${PORT}`));
