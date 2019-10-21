import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

const app = express();

mongoose.connect(process.env.MONGODB_URL as string, {
  useCreateIndex: true,
  useNewUrlParser: true,
});

export default app;
