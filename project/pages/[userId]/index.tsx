import React from 'react';
import { useSession, signIn } from 'next-auth/client';

export default function User() {
  // Sets loading initial state.
  const [session, loading] = useSession();
  const secure = async () => {
    // Returns a promise with an user object.
    const session = await getSession();
    // Sets loading state to false.
    if (session) return setLoading(false);
    return signIn();
  };

  // Runs once for every page reload.
  useEffect(() => { secure(); }, []);
  if (loading) return <h1>Loading</h1>;
  return <h1>Profile</h1>;
}
