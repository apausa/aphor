import connect from '../../../lib/configure/database';
import request from '../../../utils/methods';
import {
  getBook, postBook, deleteBook,
} from '../../../lib/controllers/book';

const handler = async (req: any, res: any) => {
  if (req.method === request.GET) await getBook(req, res);
  if (req.method === request.POST) await postBook(req, res);
  if (req.method === request.DELETE) await deleteBook(req, res);
};

export default connect(handler);
