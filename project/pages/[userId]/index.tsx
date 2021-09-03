import React, { useEffect, useState } from 'react';
import { getSession, signIn } from 'next-auth/client';

export default function User() {
  const [loading, setLoading] = useState(true);
  const secure = async () => {
    // Returns a promise with an user object.
    const session = await getSession();
    if (session) return setLoading(false);
    return signIn();
  };

  useEffect(() => { secure(); }, []);
  if (loading) return <h1>Loading</h1>;
  return <h1>Profile</h1>;
}
