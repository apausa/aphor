import type { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../lib/configure/database';
import request from '../../../utils/methods';
import login from '../../../lib/controllers/authController';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === request.POST) await login(req, res);
};

export default connect(handler);
