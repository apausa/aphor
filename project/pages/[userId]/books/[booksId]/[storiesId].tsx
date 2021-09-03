/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useSession, getSession, signIn } from 'next-auth/client';

export default function Stories() {
  const [session] = useSession();

  return <h1>Stories</h1>;
}

// Secure pages server side.
export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: process.env.DASHBOARD,
        redirect: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}
