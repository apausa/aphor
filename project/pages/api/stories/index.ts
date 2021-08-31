import type { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../lib/configure/database';
import request from '../../../utils/methods';
import { postStory } from '../../../lib/controllers/story';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === request.POST) await postStory(req, res);
};

export default connect(handler);
