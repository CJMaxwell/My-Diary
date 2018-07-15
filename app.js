import express from 'express';
import authRoutes from './routes/authRoutes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(4000);
