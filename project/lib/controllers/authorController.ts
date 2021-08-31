import type { NextApiRequest, NextApiResponse } from 'next';
import Author from '../models/authorModel';
import handle from '../../utils/error';

export const postAuthor = async ( // Creates an author.
  req: NextApiRequest, res: NextApiResponse,
) => {
  const { body } = req;
  try {
    const createdAuthor = await Author.create(body);
    res.status(200);
    res.send(createdAuthor);
  } catch (error) { handle(error, res); }
};

export const getAuthor = async ( // Retrieves an author.
  req: NextApiRequest, res: NextApiResponse,
) => {
  const { query: { authorId } } = req;
  try {
    const author = await Author
      .findById(authorId)
      .populate('authorStories')
      .populate('authorBooks')
      .populate('authorReaders')
      .populate('libraryStories')
      .populate('libraryBooks')
      .populate('libraryAuthors');
    res.status(200);
    res.send(author);
  } catch (error) { handle(error, res); }
};

export const putAuthor = async ( // Updates an author.
  req: NextApiRequest, res: NextApiResponse,
) => {
  const { query: { authorId }, body } = req;
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(
      authorId, body, { new: true },
    );
    res.status(200);
    res.send(updatedAuthor);
  } catch (error) { handle(error, res); }
};

export const deleteAuthor = async ( // Deletes an author.
  req: NextApiRequest, res: NextApiResponse,
) => {
  const { query: { authorId } } = req;
  try {
    const deletedAuthor = await Author.findByIdAndDelete(authorId);
    res.status(204);
    res.send(deletedAuthor);
  } catch (error) { handle(error, res); }
};
