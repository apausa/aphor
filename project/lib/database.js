import mongoose from 'mongoose';

// Retrieves MongoDB URL.
const uri = process.env.MONGO_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
let cached = global.mongoose;

// Caches my connection.
if (!cached) {
  global.mongoose = { conn: null, promise: null };
  cached = global.mongoose;
}

// Mantains it across hot reloads in development.
async function connect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, options)
      .then((conection) => conection);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connect;
