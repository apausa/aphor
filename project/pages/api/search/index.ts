import type { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../lib/configure/database';
import request from '../../../utils/methods';
import User from '../../../lib/models/userModel';
import handle from '../../../utils/error';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === request.POST) {
    const { body: { query } } = req;
    try {
      const user = await User.find({
        $or: [
          { fullName: { $regex: query, $options: 'i' } },
          { userName: { $regex: query, $options: 'i' } },
        ],
      });
      res.status(200);
      res.send(user);
    } catch (error) { handle(error, res); }
  }
};

export default connect(handler);
