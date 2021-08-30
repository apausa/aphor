import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const authorSchema = Schema({
  name: String,
  image: String,
  books: [{
    book: { type: Schema.Types.ObjectId, ref: 'Book' },
    status: String,
  }],
  stories: [{
    story: { type: Schema.Types.ObjectId, ref: 'Story' },
    status: String,
  }],
});

const Author = model('Author', authorSchema);
export default Author;
