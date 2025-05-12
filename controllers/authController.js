import jwt from 'jsonwebtoken';

export const generateTokenAndRedirect = async (req, res) => {
  if (!req.user) {
    return res.redirect(`${process.env.FRONTEND_URL}/login?error=unauthorized`);
  }

  const payload = {
    id: req.user.id,
    name: req.user.displayName,
    email: req.user.emails[0].value,
    picture: req.user.photos[0].value
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

  // Redirect to frontend with token as query param
  res.redirect(`${process.env.FRONTEND_URL}/auth-success?token=${token}`);
};
