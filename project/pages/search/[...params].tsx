/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';
import axios from 'axios';
import redirect from '../../utils/redirect';

export default function Search({ data }: any) {
  const router = useRouter();
  useEffect(() => {
    if (data[0] === undefined) router.push('/404');
  }, []);
  return (
    <>
      <h1>Search</h1>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (!session) return redirect;
  const { params: { params } } = context;
  const query = params[0];
  const { data } = await axios
    .post('http://localhost:3000/api/search', { query });
  return {
    props: { data },
  };
}
