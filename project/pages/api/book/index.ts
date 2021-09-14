import type { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../lib/configure/connection';
import request from '../../../utils/methods';
import Book from '../../../lib/models/bookModel';
import handle from '../../../utils/error';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === request.POST) {
    const { body } = req;
    try {
      const createdBook = await Book.create(body);
      res.status(200);
      res.send(createdBook);
    } catch (error) { handle(error, res); }
  }
};

export default connect(handler);
