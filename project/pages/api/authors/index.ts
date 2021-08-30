import connect from '../../../lib/configure/database';
import request from '../../../utils/methods';
import { getAuthors, postAuthor } from '../../../lib/controllers/author';

const handler = async (req: any, res: any) => {
  if (req.method === request.GET) await getAuthors(req, res);
  if (req.method === request.POST) await postAuthor(req, res);
};

export default connect(handler);
