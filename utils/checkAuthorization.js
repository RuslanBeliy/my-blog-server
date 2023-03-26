import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

export const checkAuthorization = (req, res, next) => {
  const token = (req.headers.authorization || '').replace('Bearer', '').trim();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (e) {
    res.status(403).json({ message: 'Вы не авторизованы' });
  }
};
