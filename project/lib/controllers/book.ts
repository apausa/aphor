import Book from '../models/book';
import handle from '../../utils/error';

export const getBooks = async (req: any, res: any) => {
  try {
    res.status(200);
  } catch (error) { handle.call(this, res, error); }
};

export const getBook = async (req: any, res: any) => {
  try {
    res.status(200);
  } catch (error) { handle.call(this, res, error); }
};

export const postBook = async (req: any, res: any) => {
  try {
    res.status(200);
  } catch (error) { handle.call(this, res, error); }
};

export const putBook = async (req: any, res: any) => {
  try {
    res.status(200);
  } catch (error) { handle.call(this, res, error); }
};

export const deleteBook = async (req: any, res: any) => {
  try {
    res.status(200);
  } catch (error) { handle.call(this, res, error); }
};
