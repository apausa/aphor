import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const storySchema = Schema({
  authorId: { type: Schema.Types.ObjectId, ref: 'Author' },
  bookId: { type: Schema.Types.ObjectId, ref: 'Book' },
  storyImage: String,
  storyBody: String,
  storyDate: Date,
});

const Story = model('Story', storySchema);
export default Story;
