import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;
const MONGOURL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.x3hwc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

// Routes imports
import markerRouter from './app/routers/marker.router';
app.use('/api', markerRouter);

mongoose
  .connect(MONGOURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`DB connected and running at port ${PORT}`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
