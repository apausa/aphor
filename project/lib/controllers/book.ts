import type { NextApiRequest, NextApiResponse } from 'next';
import Book from '../models/book';
import handle from '../../utils/error';

export const postBook = async ( // Creates a book.
  req: nextApiRequest, res: NextApiResponse,
) => {
  try {
    res.status(200);
  } catch (error) { handle.call(this, res, error); }
};

export const getBook = async ( // Retrieves a book.
  req: nextApiRequest, res: NextApiResponse,
) => {
  try {
    res.status(200);
  } catch (error) { handle.call(this, res, error); }
};

export const putBook = async ( // Updates a book.
  req: nextApiRequest, res: NextApiResponse,
) => {
  try {
    res.status(200);
  } catch (error) { handle.call(this, res, error); }
};

export const deleteBook = async ( // Deletes a book.
  req: nextApiRequest, res: NextApiResponse,
) => {
  try {
    res.status(200);
  } catch (error) { handle.call(this, res, error); }
};
