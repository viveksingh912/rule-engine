import mongoose from 'mongoose';

const MONGODB_URI = `mongodb+srv://rahulviveks80:${process.env.MONGODB_PASSWORD}@cluster0.4q9sv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`; 

let isConnected;

export const connectToDatabase = async () => {
  if (isConnected) {
    return; // Already connected
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
};
