import React from 'react';
// import Link from 'next/link';
import axios from 'axios';
import { getSession } from 'next-auth/client';
import redirect from '../../utils/redirect';

export default function Authors({ authors }: any) {
  return (
    <>

    </>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (!session) return redirect;
  const { user: { id } } = session;
  const { data: { authors } } = await axios
    .get(`http://localhost:3000/api/user/${id}`);
  return { props: { authors } };
}
