import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import customerRoutes from './routes/customerRoutes.js';


dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/customers', customerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
