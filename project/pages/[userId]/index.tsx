import React from 'react';
import { useSession } from 'next-auth/client';

export default function User() {
  const [session, loading] = useSession();
  return <h1>User</h1>;
}
