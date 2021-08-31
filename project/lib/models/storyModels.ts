import mongoose from 'mongoose';

const { model, models, Schema } = mongoose;

const story = new Schema({
  storyBody: String,
  storyDate: { type: Date, default: new Date() },
});

// Checks whether the model has already been compiled.
export default models.Story || model('Story', story);
