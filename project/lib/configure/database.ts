/* eslint-disable no-console */
import mongoose from 'mongoose';

// 3. Check if it works. Atlas > Terminal > Postman.
const uri: any = process.env.MONGODB_URI;
const cached: any = mongoose.connections[0].readyState;
const options: any = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

// Maintains a cached connection across hot reloads.
const connection = (handler: any) => async (req: any, res: any) => {
  if (!cached) {
    await mongoose.connect(uri, options);
  }
  return handler(req, res);
};

export default connection;
