import type { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../lib/configure/database';
import request from '../../../utils/methods';
import User from '../../../lib/models/userModel';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === request.POST) {
    try {
      const { body: { email, password } } = req;
      const user = await User.findOne({ email, password });
      res.status(200);
      res.send(user);
    } catch (error) {
      res.status(401);
      res.send(error);
    }
  }
};

export default connect(handler);
