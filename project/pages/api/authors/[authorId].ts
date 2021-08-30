import connect from '../../../lib/configure/database';
import request from '../../../utils/methods';
import {
  getAuthor, postAuthor, deleteAuthor,
} from '../../../lib/controllers/author';

const handler = async (req: any, res: any) => {
  if (req.method === request.GET) await getAuthor(req, res);
  if (req.method === request.POST) await postAuthor(req, res);
  if (req.method === request.DELETE) await deleteAuthor(req, res);
};

// 1. Handler inside DB.
export default connect(handler);
