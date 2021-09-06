/* This is the example of a protected API route to use in the future.

import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

import connect from '../../../lib/configure/database';
import request from '../../../utils/methods';
import {
  getUser, putUser, deleteUser,
} from '../../../lib/controllers/userController';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (session) {
    if (req.method === request.GET) await getUser(req, res);
    if (req.method === request.PUT) await putUser(req, res);
    if (req.method === request.DELETE) await deleteUser(req, res);
  } else { res.status(200).json({ error: 'unathenthicated' }); }
};

export default connect(handler);
*/
