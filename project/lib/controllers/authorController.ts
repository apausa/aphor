import type { NextApiRequest, NextApiResponse } from 'next';
import Author from '../models/authorModels';
import handle from '../../utils/error';

export const postAuthor = async ( // Creates an author.
  req: NextApiRequest, res: NextApiResponse,
) => {
  const { body } = req;
  try {
    const createdAuthor = await Author.create(body);
    res.status(200).send(createdAuthor);
  } catch (error) { handle.call(this, res, error); }
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
    res.status(200).send(author);
  } catch (error) { handle.call(this, res, error); }
};

export const putAuthor = async ( // Updates an author.
  req: NextApiRequest, res: NextApiResponse,
) => {
  const { query: { authorId }, body } = req;
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(
      authorId, body, { new: true },
    );
    res.status(200).send(updatedAuthor);
  } catch (error) { handle.call(this, res, error); }
};

export const deleteAuthor = async ( // Deletes an author.
  req: NextApiRequest, res: NextApiResponse,
) => {
  const { query: { authorId } } = req;
  try {
    const deletedAuthor = await Author.findByIdAndDelete(authorId);
    res.status(204).send(deletedAuthor);
  } catch (error) { handle.call(this, res, error); }
};
