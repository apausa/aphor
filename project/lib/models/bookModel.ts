import mongoose from 'mongoose';

const { model, models, Schema } = mongoose;

const book = new Schema({
  name: String,
  date: { type: Date, default: new Date() },
  image: { type: String, default: 'http://placehold.it/32x32' },
  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }],
});

// Checks whether the model has already been compiled.
export default models.Book || model('Book', book);
