/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import type { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../lib/configure/database';
import request from '../../../utils/methods';
import Book from '../../../lib/models/bookModel';
import handle from '../../../utils/error';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Retrieves a book.
  if (req.method === request.GET) {
    const { query: { bookId } } = req;
    try {
      const book = await Book
        .findById(bookId)
        .populate('stories');
      res.status(200);
      res.send(book);
    } catch { res.send(null); }
  }
  // Updates a book.
  if (req.method === request.PUT) {
    const { body: { data } } = req;
    try {
      const updatedBook = await Book.findByIdAndUpdate(
        data._id, data, { new: true },
      );
      res.status(200);
      res.send(updatedBook);
    } catch (error) { handle(error, res); }
  }
  // Deletes a book.
  if (req.method === request.DELETE) {
    const { query: { bookId } } = req;
    try {
      const deletedBook = await Book.findByIdAndDelete(bookId);
      res.status(204);
      res.send(deletedBook);
    } catch (error) { handle(error, res); }
  }
};

export default connect(handler);
