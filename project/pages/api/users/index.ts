import type { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../lib/configure/database';
import request from '../../../utils/methods';
import { postUser } from '../../../lib/controllers/userController';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === request.POST) await postUser(req, res);
};

export default connect(handler);
