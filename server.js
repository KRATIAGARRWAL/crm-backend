import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import passport from './auth/googleStrategy.js';

import connectDB from './config/db.js';
import redisClient from './config/redisClient.js'; 
import customerRoutes from './routes/customerRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import segmentRoutes from './routes/segmentRoutes.js';
import vendorRoutes from './routes/vendorRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { authenticateJWT } from './auth/jwtMiddleware.js';

dotenv.config();
const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

app.use(session({
  secret: 'temp_session_secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Add Redis client to req object (optional but useful)
app.use((req, res, next) => {
  req.redis = redisClient;
  next();
});

// ROUTES
app.use('/auth', authRoutes);
app.use('/api/customers', authenticateJWT, customerRoutes);
app.use('/api/orders', authenticateJWT, orderRoutes);
app.use('/api/segments', authenticateJWT, segmentRoutes);
app.use('/api/vendor', vendorRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
