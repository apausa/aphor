/* eslint-disable no-underscore-dangle */
import type { NextApiRequest, NextApiResponse } from 'next';

import connect from '../../../lib/configure/connection';
import request from '../../../utils/methods';
import User from '../../../lib/models/userModel';
import handle from '../../../utils/error';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Retrieves an user.
  if (req.method === request.GET) {
    const { query: { userId } } = req;
    try {
      const user = await User
        .findById(userId)
        .populate({
          path: 'books',
          populate: {
            path: 'stories',
            model: 'Story',
          },
        })
        .populate({
          path: 'authors',
          select: ['_id', 'fullName', 'image'],
        });
      res.status(200);
      res.send(user);
    } catch (error) { handle(error, res); }
  }
  // Updates an user.
  if (req.method === request.PUT) {
    const { body: { data } } = req;
    try {
      const updatedUser = await User.findByIdAndUpdate(
        data._id, data, { new: true },
      );
      res.status(200);
      res.send(updatedUser);
    } catch (error) { handle(error, res); }
  }
  // Deletes an user.
  if (req.method === request.DELETE) {
    const { query: { userId } } = req;
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      res.status(204);
      res.send(deletedUser);
    } catch (error) { handle(error, res); }
  }
};

export default connect(handler);
