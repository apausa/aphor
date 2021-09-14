/* eslint-disable no-console */
import mongoose from 'mongoose';

const uri: any = 'mongodb+srv://pabloapausa:zbueBPehLW3FShv@cluster0.6ddxh.mongodb.net/project';
const cached: any = mongoose.connections[0].readyState;
const options: any = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

// Maintains a cached connection across hot reloads.
const connection = (handler: any) => async (req: any, res: any) => {
  if (!cached) mongoose.connect(uri, options);
  return handler(req, res);
};

export default connection;
