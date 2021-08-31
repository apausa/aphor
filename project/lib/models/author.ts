import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const author = new Schema({
  authorStories: { type: Schema.Types.ObjectId, ref: 'Story' },
  authorBooks: { type: Schema.Types.ObjectId, ref: 'Book' },
  authorReaders: { type: Schema.Types.ObjectId, ref: 'Author' },
  libraryStories: { type: Schema.Types.ObjectId, ref: 'Story' },
  libraryBooks: { type: Schema.Types.ObjectId, ref: 'Book' },
  libraryAuthors: { type: Schema.Types.ObjectId, ref: 'Author' },
  password: String,
  mail: String,
  authorName: String,
  authorImage: String,
});

const Author = model('Author', author);
export default Author;
