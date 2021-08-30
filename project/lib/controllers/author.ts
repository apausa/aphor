import Author from '../models/author';
import handle from '../../utils/error';

// 2. 'req' and 'res' with TypeScript.
export const getAuthors = async (req: any, res: any) => {
  try {
    res.status(200);
  } catch (error) { handle.call(this, res, error); }
};

export const getAuthor = async (req: any, res: any) => {
  try {
    res.status(200);
  } catch (error) { handle.call(this, res, error); }
};

export const postAuthor = async (req: any, res: any) => {
  try {
    res.status(200);
  } catch (error) { handle.call(this, res, error); }
};

export const putAuthor = async (req: any, res: any) => {
  try {
    res.status(200);
  } catch (error) { handle.call(this, res, error); }
};

export const deleteAuthor = async (req: any, res: any) => {
  try {
    res.status(200);
  } catch (error) { handle.call(this, res, error); }
};
