/* eslint-disable no-debugger */
/* eslint-disable no-console */
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async authorize(credentials, req) {
      const res = await axios.post(
        'http://localhost:3000/api/auth/login', credentials,
      );
      const user = await res.data;
      if (user) return user;
      return null;
    },
  }),
];

const session = { jwt: true };
const jwt = { secret: process.env.JWT_SECRET };

export default NextAuth({
  providers, session, jwt,
});

/*
const callbacks = {
  async jwt(token: any, user: any) {
    if (user) token.id = user.id;
    return token;
  },
  async session(session: any, token: any) {
    session.user.id = token.id;
    return session;
  },
}; */
