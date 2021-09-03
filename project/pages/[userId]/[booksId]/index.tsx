import React from 'react';
import { useSession } from 'next-auth/client';

export default function Book() {
  const [session, loading] = useSession();
  return <h1>Book</h1>;
}
