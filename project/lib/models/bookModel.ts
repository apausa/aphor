import mongoose from 'mongoose';

const { model, models, Schema } = mongoose;

const book = new Schema({
  title: String,
  date: { type: Date, default: new Date() },
  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }],
});

// Checks whether the model has already been compiled.
export default models.Book || model('Book', book);
