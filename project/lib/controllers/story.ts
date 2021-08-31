import type { NextApiRequest, NextApiResponse } from 'next';
import Story from '../models/story';
import handle from '../../utils/error';

export const getStory = async (
  req: NextApiRequest, res: NextApiResponse,
) => {
  try {
    res.status(200);
  } catch (error) { handle.call(this, res, error); }
};

export const postStory = async (
  req: NextApiRequest, res: NextApiResponse,
) => {
  try {
    res.status(200);
  } catch (error) { handle.call(this, res, error); }
};

export const putStory = async (
  req: NextApiRequest, res: NextApiResponse,
) => {
  try {
    res.status(200);
  } catch (error) { handle.call(this, res, error); }
};

export const deleteStory = async (
  req: NextApiRequest, res: NextApiResponse,
) => {
  try {
    res.status(200);
  } catch (error) { handle.call(this, res, error); }
};
