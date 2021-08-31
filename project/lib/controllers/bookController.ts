import type { NextApiRequest, NextApiResponse } from 'next';
import Book from '../models/bookModel';
import handle from '../../utils/error';

export const postBook = async ( // Creates a book.
  req: NextApiRequest, res: NextApiResponse,
) => {
  const { body } = req;
  try {
    const createdBook = await Book.create(body);
    res.status(200);
    res.send(createdBook);
  } catch (error) { handle(error, res); }
};

export const getBook = async ( // Retrieves a book.
  req: NextApiRequest, res: NextApiResponse,
) => {
  const { query: { bookId } } = req;
  try {
    const book = await Book
      .findById(bookId)
      .populate('bookStories');
    res.status(200);
    res.send(book);
  } catch (error) { handle(error, res); }
};

export const putBook = async ( // Updates a book.
  req: NextApiRequest, res: NextApiResponse,
) => {
  const { query: { bookId }, body } = req;
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      bookId, body, { new: true },
    );
    res.status(200);
    res.send(updatedBook);
  } catch (error) { handle(error, res); }
};

export const deleteBook = async ( // Deletes a book.
  req: NextApiRequest, res: NextApiResponse,
) => {
  const { query: { bookId } } = req;
  try {
    const deletedBook = await Book.findByIdAndDelete(bookId);
    res.status(204);
    res.send(deletedBook);
  } catch (error) { handle(error, res); }
};
