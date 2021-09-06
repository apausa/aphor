import type { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../lib/configure/database';
import request from '../../../utils/methods';
import Story from '../../../lib/models/storyModel';
import handle from '../../../utils/error';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Retrieves a story.
  if (req.method === request.GET) {
    const { query: { storyId } } = req;
    try {
      const story = await Story
        .findById(storyId);
      res.status(200);
      res.send(story);
    } catch (error) { handle(error, res); }
  }
  // Updates a story.
  if (req.method === request.PUT) {
    const { query: { storyId }, body } = req;
    try {
      const updatedStory = await Story
        .findByIdAndUpdate(storyId, body, { new: true });
      res.status(200);
      res.send(updatedStory);
    } catch (error) { handle(error, res); }
  }
  // Deletes a story.
  if (req.method === request.DELETE) {
    const { query: { storyId } } = req;
    try {
      const deletedStory = await Story
        .findByIdAndDelete(storyId);
      res.status(204);
      res.send(deletedStory);
    } catch (error) { handle(error, res); }
  }
};

export default connect(handler);
