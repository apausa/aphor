import connect from '../../../lib/configure/database';
import request from '../../../utils/methods';
import {
  getStory, postStory, deleteStory,
} from '../../../lib/controllers/story';

const handler = async (req: any, res: any) => {
  if (req.method === request.GET) await getStory(req, res);
  if (req.method === request.POST) await postStory(req, res);
  if (req.method === request.DELETE) await deleteStory(req, res);
};

export default connect(handler);
