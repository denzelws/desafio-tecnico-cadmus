import mongoose from 'mongoose';

export const connect = async (): Promise<void> => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/contacts';
  
  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB');
};
