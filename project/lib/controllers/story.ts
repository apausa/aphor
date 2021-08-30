import Story from '../models/story';
import handle from '../../utils/error';

export const getStories = async (req: any, res: any) => {
  try {
    res.status(200);
  } catch (error) { handle.call(this, res, error); }
};

export const getStory = async (req: any, res: any) => {
  try {
    res.status(200);
  } catch (error) { handle.call(this, res, error); }
};

export const postStory = async (req: any, res: any) => {
  try {
    res.status(200);
  } catch (error) { handle.call(this, res, error); }
};

export const putStory = async (req: any, res: any) => {
  try {
    res.status(200);
  } catch (error) { handle.call(this, res, error); }
};

export const deleteStory = async (req: any, res: any) => {
  try {
    res.status(200);
  } catch (error) { handle.call(this, res, error); }
};
