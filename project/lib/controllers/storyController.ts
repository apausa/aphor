import type { NextApiRequest, NextApiResponse } from 'next';
import Story from '../models/storyModels';
import handle from '../../utils/error';

export const postStory = async ( // Create a story, (from book).
  req: NextApiRequest, res: NextApiResponse,
) => {
  try {
    res.status(200);
  } catch (error) { handle.call(this, res, error); }
};

export const getStory = async ( // Retrieves a story.
  req: NextApiRequest, res: NextApiResponse,
) => {
  try {
    res.status(200);
  } catch (error) { handle.call(this, res, error); }
};

export const putStory = async ( // Updates an story.
  req: NextApiRequest, res: NextApiResponse,
) => {
  try {
    res.status(200);
  } catch (error) { handle.call(this, res, error); }
};

export const deleteStory = async ( // Deletes an story.
  req: NextApiRequest, res: NextApiResponse,
) => {
  try {
    res.status(200);
  } catch (error) { handle.call(this, res, error); }
};
