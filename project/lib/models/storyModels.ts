import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const story = new Schema({
  storyImage: String,
  storyBody: String,
  storyDate: Date,
  bookId: String,
  userId: String,
});

const Story = model('Story', story);
export default Story;
