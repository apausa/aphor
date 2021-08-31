import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const story = new Schema({
  storyImage: String,
  storyBody: String,
  bookStatus: String,
  storyDate: Date,
  bookId: { type: Schema.Types.ObjectId, ref: 'Book' },
});

const Story = model('Story', story);
export default Story;
