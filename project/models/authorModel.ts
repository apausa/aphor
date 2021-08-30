import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const authorSchema = new Schema({
  authorName: String,
  authorImage: String,
  books: [{
    book: { type: Schema.Types.ObjectId, ref: 'Book' },
    bookStatus: String,
  }],
  stories: [{
    story: { type: Schema.Types.ObjectId, ref: 'Story' },
    storyStatus: String,
  }],
});

const Author = model('Author', authorSchema);
export default Author;
