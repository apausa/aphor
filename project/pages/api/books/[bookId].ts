import type { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../lib/configure/database';
import request from '../../../utils/methods';
import { postStory } from '../../../lib/controllers/story';
import {
  getBook, putBook, deleteBook,
} from '../../../lib/controllers/book';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === request.GET) await getBook(req, res);
  if (req.method === request.PUT) await putBook(req, res);
  if (req.method === request.DELETE) await deleteBook(req, res);
  if (req.method === request.POST) await postStory(req, res);
};

export default connect(handler);
