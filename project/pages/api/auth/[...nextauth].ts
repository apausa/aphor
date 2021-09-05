/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */

import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import axios from 'axios';

const providers = [
  Providers.Credentials({
    name: 'Credentials',
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
      const res = await axios.post(
        'http://localhost:3000/api/auth/login', credentials,
      );
      const user = await res.data;
      if (user) return user;
      return null;
    },
  }),
];

const jwt = { secret: process.env.JWT_SECRET };

const callbacks = {
  // Assigns user's '_id' to its token.
  async jwt(token: any, user: any) {
    if (user) token.id = user._id;
    return token;
  },
  // Assigns user's '_id' to its session.
  async session(session: any, token: any) {
    session.user.id = token.id;
    return session;
  },
};

export default NextAuth({
  providers, jwt, callbacks,
});
