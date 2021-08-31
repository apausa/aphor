import mongoose from 'mongoose';

const { model, models, Schema } = mongoose;

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

// Checks whether the model has already been compiled.
export default models.Author || model('Author', author);
