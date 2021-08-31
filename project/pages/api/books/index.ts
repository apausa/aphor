import type { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../lib/configure/database';
import request from '../../../utils/methods';
import { postBook } from '../../../lib/controllers/book';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === request.POST) await postBook(req, res);
};

export default connect(handler);
