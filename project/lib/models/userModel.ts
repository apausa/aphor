import mongoose from 'mongoose';

const { model, models, Schema } = mongoose;

const user = new Schema({
  about: String,
  password: String,
  email: String,
  image: { type: String, default: 'http://placehold.it/32x32' },
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
});

// Checks whether the model has already been compiled.
export default models.User || model('User', user);
