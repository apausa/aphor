import type { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../lib/configure/database';
import request from '../../../utils/methods';
import {
  getUser, putUser, deleteUser,
} from '../../../lib/controllers/userController';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === request.GET) await getUser(req, res);
  if (req.method === request.PUT) await putUser(req, res);
  if (req.method === request.DELETE) await deleteUser(req, res);
};

export default connect(handler);
