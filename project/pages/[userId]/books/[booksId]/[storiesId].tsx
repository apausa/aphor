import React from 'react';
import { useSession } from 'next-auth/client';

export default function Stories() {
  const [session, loading] = useSession();
  return <h1>Stories</h1>;
}
