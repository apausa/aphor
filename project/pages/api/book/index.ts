/* eslint-disable no-useless-return */
import type { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../lib/configure/database';
import request from '../../../utils/methods';
import Book from '../../../lib/models/bookModel';
import handle from '../../../utils/error';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Creates a book.
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
