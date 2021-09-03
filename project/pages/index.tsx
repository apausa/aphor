import React from 'react';
import { useSession, signIn } from 'next-auth/client';

export default function Dashboard() {
  const [session, loading] = useSession();

  if (loading) return null;
  if (!session) return signIn();
  return <h1>Dashboard</h1>;
}
