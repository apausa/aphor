import connect from '../../../lib/configure/database';
import request from '../../../utils/methods';
import { getStories, postStory } from '../../../lib/controllers/story';

const handler = async (req: any, res: any) => {
  if (req.method === request.GET) await getStories(req, res);
  if (req.method === request.POST) await postStory(req, res);
};

export default connect(handler);
