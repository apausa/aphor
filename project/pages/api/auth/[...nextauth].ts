/* eslint-disable no-param-reassign */
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  jwt: { secret: process.env.JWT_SECRET },
  callbacks: {
    async jwt(token: any, user: any) {
      if (user) token.id = user.id;
      return token;
    },
    async session(session: any, token: any) {
      session.user.id = token.id;
      return session;
    },
  },
});
