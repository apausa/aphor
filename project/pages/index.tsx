/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useSession, getSession, signIn } from 'next-auth/client';

export default function Dashboard() {
  const [session] = useSession();

  return <h1>Dashboard</h1>;
}

// Client and server side page secured.
export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin?callbackUrl=http://localhost:3000/',
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}
