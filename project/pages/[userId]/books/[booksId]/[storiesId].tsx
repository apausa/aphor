import React, { useEffect, useState } from 'react';
import { getSession, signIn } from 'next-auth/client';

export default function Stories() {
  const [loading, setLoading] = useState(true);
  const secure = async () => {
    const session = await getSession();
    if (session) return setLoading(false);
    return signIn;
  };

  useEffect(() => { secure(); }, []);
  if (loading) return <h1>Loading</h1>;
  return <h1>Stories</h1>;
}
