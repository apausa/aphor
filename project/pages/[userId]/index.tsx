import React from 'react';
import { useSession, getSession, signIn } from 'next-auth/client';

// Client side page secured.
export default function User() {
  const [session, loading] = useSession();

  if (loading) return null;
  if (!session) return signIn();
  return <h1>Profile</h1>;
}

// Server side page secured.
export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  return { props: { session } };
}
