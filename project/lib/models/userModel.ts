import mongoose from 'mongoose';

const { model, models, Schema } = mongoose;

const user = new Schema({
  userName: String,
  fullName: String,
  password: String,
  email: String,
  image: { type: String, default: 'http://placehold.it/32x32' },
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
  authors: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

// Checks whether the model has already been compiled.
export default models.User || model('User', user);
