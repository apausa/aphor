import type { NextApiRequest, NextApiResponse } from 'next';
import Book from '../models/bookModels';
import handle from '../../utils/error';

export const postBook = async ( // Creates a book.
  req: NextApiRequest, res: NextApiResponse,
) => {
  const { body } = req;
  try {
    const createdBook = await Book.create(body);
    res.status(200).json(createdBook);
  } catch (error) { handle.call(this, res, error); }
};

export const getBook = async ( // Retrieves a book.
  req: NextApiRequest, res: NextApiResponse,
) => {
  const { query: { bookId } } = req;
  try {
    const book = await Book
      .findById(bookId)
      .populate('bookStories');
    res.status(200).json(book);
  } catch (error) { handle.call(this, res, error); }
};

export const putBook = async ( // Updates a book.
  req: NextApiRequest, res: NextApiResponse,
) => {
  const { query: { bookId }, body } = req;
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      bookId, body, { new: true },
    );
    res.status(200).json(updatedBook);
  } catch (error) { handle.call(this, res, error); }
};

export const deleteBook = async ( // Deletes a book.
  req: NextApiRequest, res: NextApiResponse,
) => {
  const { query: { bookId } } = req;
  try {
    const deletedBook = await Book.findByIdAndDelete(bookId);
    res.status(204).send(deletedBook);
  } catch (error) { handle.call(this, res, error); }
};
