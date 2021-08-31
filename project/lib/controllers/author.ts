import type { NextApiRequest, NextApiResponse } from 'next';
import Author from '../models/author';
import handle from '../../utils/error';

export const postAuthor = async ( // Creates an author.
  req: NextApiRequest, res: NextApiResponse,
) => {
  const { body } = req;
  try {
    const createdAuthor = await Author.create(body);
    res.status(200);
    res.json(createdAuthor);
  } catch (error) { handle.call(this, res, error); }
};

export const getAuthor = async ( // Retrieves an author.
  req: NextApiRequest, res: NextApiResponse,
) => {
  const { query: { authorId } } = req;
  try {
    const author = await Author
      .findById(authorId)
      .populate({ path: 'authorStories' })
      .populate({ path: 'authorBooks' })
      .populate({ path: 'authorReaders' })
      .populate({ path: 'libraryStories' })
      .populate({ path: 'libraryBooks' })
      .populate({ path: 'libraryAuthors' });
    res.status(200);
    res.json(author);
  } catch (error) { handle.call(this, res, error); }
};

export const putAuthor = async ( // Updates an author.
  req: NextApiRequest, res: NextApiResponse,
) => {
  const { query: { authorId }, body } = req;
  try {
    const updatedAuthor = await Author
      .findByIdAndUpdate(authorId, body, { new: true })
      .populate({ path: 'authorStories' })
      .populate({ path: 'authorBooks' })
      .populate({ path: 'authorReaders' })
      .populate({ path: 'libraryStories' })
      .populate({ path: 'libraryBooks' })
      .populate({ path: 'libraryAuthors' });
    res.status(200);
    res.json(updatedAuthor);
  } catch (error) { handle.call(this, res, error); }
};

export const deleteAuthor = async ( // Deletes an author.
  req: NextApiRequest, res: NextApiResponse,
) => {
  const { query: { authorId } } = req;
  try {
    await Author.findByIdAndDelete(authorId);
    res.status(204);
  } catch (error) { handle.call(this, res, error); }
};
