import type { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../lib/configure/database';
import request from '../../../utils/methods';
import User from '../../../lib/models/userModel';
import handle from '../../../utils/error';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === request.POST) {
    const { body } = req;
    try {
      const createdUser = await User.create(body);
      res.status(200);
      res.send(createdUser);
    } catch (error) { handle(error, res); }
  }
};

export default connect(handler);
