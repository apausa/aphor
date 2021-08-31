import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const book = new Schema({
  bookName: String,
  bookImage: String,
  authorId: { type: Schema.Types.ObjectId, ref: 'Author' },
  bookStories: { type: Schema.Types.ObjectId, ref: 'Story' },
});

const Book = model('Book', book);
export default Book;
