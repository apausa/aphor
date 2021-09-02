/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/naming-convention */
import type { NextApiRequest, NextApiResponse } from 'next';
import User from '../models/userModel';
import handle from '../../utils/error';

export const postUser = async ( // Creates an author.
  req: NextApiRequest, res: NextApiResponse,
) => {
  const { body } = req;
  try {
    const createdUser = await User.create(body);
    res.status(200);
    res.send(createdUser);
  } catch (error) { handle(error, res); }
};

export const getUser = async ( // Retrieves an user.
  req: NextApiRequest, res: NextApiResponse,
) => {
  const { query: { userId } } = req;
  try {
    const user = await User
      .findById(userId);
    res.status(200);
    res.send(user);
  } catch (error) { handle(error, res); }
};

export const putUser = async ( // Updates an author.
  req: NextApiRequest, res: NextApiResponse,
) => {
  const { query: { userId }, body } = req;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId, body, { new: true },
    );
    res.status(200);
    res.send(updatedUser);
  } catch (error) { handle(error, res); }
};

export const deleteUser = async ( // Deletes an author.
  req: NextApiRequest, res: NextApiResponse,
) => {
  const { query: { userId } } = req;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    res.status(204);
    res.send(deletedUser);
  } catch (error) { handle(error, res); }
};
