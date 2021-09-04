import React from 'react';
import { getSession } from 'next-auth/client';

export default function Dashboard() {
  return <h1>Dashboard</h1>;
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
