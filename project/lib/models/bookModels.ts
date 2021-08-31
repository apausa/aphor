import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const book = new Schema({
  bookName: String,
  storyDate: { type: Date, default: new Date() },
  bookImage: { type: String, default: 'http://placehold.it/32x32' },
  bookStories: { type: Schema.Types.ObjectId, ref: 'Story' },
});

const Book = model('Book', book);
export default Book;
