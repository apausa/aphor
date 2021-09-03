import React from 'react';
import { useSession, getSession, signIn } from 'next-auth/client';

export default function Dashboard({ data }: any) {
  const [session, loading] = useSession();
  // Secure client route.
  if (loading) return null;
  if (!session) return signIn();
  return (
    <h1>
      Dashboard -
      {' '}
      {data}
    </h1>
  );
}

// Authenthicate server side.
export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  return {
    props: {
      session,
      data: session ? 'Server side authenthicaed' : null,
    },
  };
}
