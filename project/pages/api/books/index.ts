import connect from '../../../lib/configure/database';
import request from '../../../utils/methods';
import { postBook } from '../../../lib/controllers/book';

const handler = async (req: any, res: any) => {
  if (req.method === request.POST) await postBook(req, res);
};

export default connect(handler);
