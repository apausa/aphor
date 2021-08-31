import type { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../lib/configure/database';
import request from '../../../utils/methods';
import {
  getStory, postStory, deleteStory,
} from '../../../lib/controllers/story';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === request.GET) await getStory(req, res);
  if (req.method === request.POST) await postStory(req, res);
  if (req.method === request.DELETE) await deleteStory(req, res);
};

export default connect(handler);
