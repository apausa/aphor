import mongoose from 'mongoose';

const { model, models, Schema } = mongoose;

const user = new Schema({
  password: String,
  mail: String,
  name: String,
  image: { type: String, default: 'http://placehold.it/32x32' },
  userStories: { type: Schema.Types.ObjectId, ref: 'Story' },
  userBooks: { type: Schema.Types.ObjectId, ref: 'Book' },
  userReaders: { type: Schema.Types.ObjectId, ref: 'User' },
  libraryStories: { type: Schema.Types.ObjectId, ref: 'Story' },
  libraryBooks: { type: Schema.Types.ObjectId, ref: 'Book' },
  libraryAuthors: { type: Schema.Types.ObjectId, ref: 'User' },
});

// Checks whether the model has already been compiled.
export default models.User || model('User', user);
