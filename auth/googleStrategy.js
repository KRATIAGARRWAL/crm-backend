import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';

dotenv.config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'https://crm-backend-d0ny.onrender.com/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  // I can store profile info in DB here
  done(null, profile);
}));

export default passport;
