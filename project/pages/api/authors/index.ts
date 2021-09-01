import type { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../lib/configure/database';
import request from '../../../utils/methods';
import { postAuthor } from '../../../lib/controllers/authorController';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === request.POST) await postAuthor(req, res);
};

export default connect(handler);
