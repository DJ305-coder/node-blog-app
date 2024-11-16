// src/config/db.ts
import mongoose from 'mongoose';
import { Logger } from '../utils/logger';

const logger = new Logger();

const connectDB = async () => {
  try {
    const dbUri = process.env.MONGO_URI || 'mongodb://localhost:27017/blog-app';
    
    await mongoose.connect(dbUri);
    logger.info('MongoDB connected successfully');
  } catch (err:any) {
    logger.error('MongoDB connected failed', err);
    process.exit(1); 
  }
};

export default connectDB;
