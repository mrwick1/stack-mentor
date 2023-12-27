import mongoose from 'mongoose';

export const connectToMongoDB = async (): Promise<void> => {
  try {
    const MONGO_URI: string = process.env.MONGO_URI || '';
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};
