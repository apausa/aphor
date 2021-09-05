import type { NextApiRequest, NextApiResponse } from 'next';
import User from '../models/userModel';

export default async function signIn(
  req: NextApiRequest, res: NextApiResponse,
) {
  try {
    const { body: { email, password } } = req;
    const user = await User.findOne({ email, password });
    res.status(200);
    res.send(user);
  } catch (error) {
    res.status(401);
    res.send(error);
  }
}
