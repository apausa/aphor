import React, { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/client';

export default function About() {
  // Sets loading initial state to true.
  const [loading, setLoading] = useState(true);
  const secure = async () => {
    // Returns a promise with an user object.
    const session = await useSession();
    // Sets loading state to false.
    if (session) return setLoading(false);
    return signIn;
  };

  // Runs once for every page reload.
  useEffect(() => { secure(); }, []);
  if (loading) return <h1>Loading</h1>;
  return <h1>About</h1>;
}
