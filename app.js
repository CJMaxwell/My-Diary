import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './server/routes/authRoutes';
import diaryRoutes from './server/routes/diaryRoutes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', authRoutes);
app.use('/api/v1', diaryRoutes);


app.get('/', (req, res) => {
  res.send('Dear Diary!');
});


app.listen(process.env.PORT || 4000);

export default app;
