import mongoose from 'mongoose';

const { model, models, Schema } = mongoose;

const book = new Schema({
  bookName: String,
  storyDate: { type: Date, default: new Date() },
  bookImage: { type: String, default: 'http://placehold.it/32x32' },
  bookStories: { type: Schema.Types.ObjectId, ref: 'Story' },
});

// Checks whether the model has already been compiled.
export default models.Book || model('Book', book);
