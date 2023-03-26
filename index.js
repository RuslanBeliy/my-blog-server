import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import multer from 'multer';
import { authRouter } from './routes/auth.js';
import { postsRouter } from './routes/posts.js';
import { checkAuthorization } from './utils/checkAuthorization.js';
import cors from 'cors';
config();

const PORT = process.env.PORT || 8000;
const DB_URL = process.env.DB_URL;

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/uploads', express.static('uploads'));

app.post('/api/upload', upload.single('image'), (req, res) => {
  res.json({ url: `/uploads/${req.file?.originalname}` });
});

app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);

mongoose
  .connect(DB_URL)
  .then(() => app.listen(PORT, () => console.log(`Server ok`)))
  .catch((e) => console.log(e));
