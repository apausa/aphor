import type { NextApiRequest, NextApiResponse } from 'next';
import Book from '../models/bookModels';
import handle from '../../utils/error';

export const postBook = async ( // Creates a book.
  req: NextApiRequest, res: NextApiResponse,
) => {
  const { body } = req;
  try {
    const createdBook = await Book.create(body)
      .populate({ path: 'authorId', select: ['_id'] })
      .populate({ path: 'bookStories' });
    res.status(200);
    res.json(createdBook);
  } catch (error) { handle.call(this, res, error); }
};

export const getBook = async ( // Retrieves a book.
  req: NextApiRequest, res: NextApiResponse,
) => {
  try {
    res.status(200);
  } catch (error) { handle.call(this, res, error); }
};

export const putBook = async ( // Updates a book.
  req: NextApiRequest, res: NextApiResponse,
) => {
  try {
    res.status(200);
  } catch (error) { handle.call(this, res, error); }
};

export const deleteBook = async ( // Deletes a book.
  req: NextApiRequest, res: NextApiResponse,
) => {
  try {
    res.status(200);
  } catch (error) { handle.call(this, res, error); }
};
