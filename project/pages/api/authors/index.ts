import connect from '../../../lib/configure/database';
import request from '../../../utils/methods';
import { postAuthor } from '../../../lib/controllers/author';

const handler = async (req: any, res: any) => {
  if (req.method === request.POST) await postAuthor(req, res);
};

export default connect(handler);
