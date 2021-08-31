import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const author = new Schema({
  password: String,
  mail: String,
  authorName: String,
  authorImage: { type: String, default: 'http://placehold.it/32x32' },
  authorStories: { type: Schema.Types.ObjectId, ref: 'Story' },
  authorBooks: { type: Schema.Types.ObjectId, ref: 'Book' },
  authorReaders: { type: Schema.Types.ObjectId, ref: 'Author' },
  libraryStories: { type: Schema.Types.ObjectId, ref: 'Story' },
  libraryBooks: { type: Schema.Types.ObjectId, ref: 'Book' },
  libraryAuthors: { type: Schema.Types.ObjectId, ref: 'Author' },
});

const Author = model('Author', author);
export default Author;
