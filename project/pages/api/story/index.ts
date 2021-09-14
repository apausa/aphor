import type { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../lib/configure/connection';
import request from '../../../utils/methods';
import Story from '../../../lib/models/storyModel';
import handle from '../../../utils/error';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === request.POST) {
    const { body: { storyTitle, storyBody } } = req;
    try {
      const createdStory = await Story
        .create({ title: storyTitle, body: storyBody });
      res.status(200);
      res.send(createdStory);
    } catch (error) { handle(error, res); }
  }
};

export default connect(handler);
