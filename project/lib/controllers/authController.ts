import type { NextApiRequest, NextApiResponse } from 'next';
import User from '../models/userModel';

export default async function signIn(
  req: NextApiRequest, res: NextApiResponse,
) {
  try {
    const { body: { email } } = req;
    const user = await User.findOne({ email });
    res.status(200);
    res.send(user);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
}
