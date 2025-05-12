import express from 'express';
import passport from '../auth/googleStrategy.js';
import { generateTokenAndRedirect } from '../controllers/authController.js';

const router = express.Router();

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  generateTokenAndRedirect
);

export default router;
