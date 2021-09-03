/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse } from 'next';
import User from '../models/userModel';

export default async function signIn(
  req: NextApiRequest, res: NextApiResponse,
) {
  try {
    console.log('FUNCIÓN DEL CONTROLADOR');
  } catch (error) {
    res.send(error);
  }
}
