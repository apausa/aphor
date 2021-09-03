/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useSession, signIn } from 'next-auth/client';

export default function User() {
  const [session, loading] = useSession();

  if (!session) return signIn();
  return <h1>Profile</h1>;
}
