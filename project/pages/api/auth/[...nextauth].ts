import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const providers = [
  Providers.Credentials({
    name: 'Credentials',
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' },
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async authorize(credentials, req) {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      const user = await res.json();
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
