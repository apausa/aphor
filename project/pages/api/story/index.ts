/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import connect from '../../../lib/configure/database';
import request from '../../../utils/methods';
import Story from '../../../lib/models/storyModel';
import handle from '../../../utils/error';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === request.POST) {
    const {
      body: {
        title, body, bookId, userId,
      },
    } = req;
    try {
      // Creates a story.
      const createdStory = await Story.create({ title, body });
      const { data } = await axios
        .get(`http://localhost:3000/api/book/${bookId}`);
      data.stories.unshift(createdStory._id.toString());
      const updatedBook = await axios
        .put(`http://localhost:3000/api/book/${bookId}`, { data });
      res.status(200);
      res.send(createdStory);
    } catch (error) { handle(error, res); }
  }
};

export default connect(handler);
