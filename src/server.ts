import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import bodyParser from 'body-parser';
import multer from 'multer';
import upload from './config/multer';

dotenv.config();

const app = express();

connectDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static('uploads'))

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('file-upload');
});


app.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
      console.log(req.file);
      res.send('File uploaded successfully!');
  } else {
      res.send('Error: No file selected.');
  }
});


app.use('/api', userRoutes);
app.use('/api', postRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});