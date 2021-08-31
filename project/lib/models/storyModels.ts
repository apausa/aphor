import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const story = new Schema({
  storyBody: String,
  storyDate: { type: Date, default: new Date() },
});

const Story = model('Story', story);
export default Story;
