import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const book = new Schema({
  authorId: { type: Schema.Types.ObjectId, ref: 'Author' },
  bookName: String,
  bookImage: String,
  stories: [{
    story: { type: Schema.Types.ObjectId, ref: 'Story' },
    status: String,
  }],
});

const Book = model('Book', book);
export default Book;
