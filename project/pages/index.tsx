/* eslint-disable no-console */
import React from 'react';
import { getSession } from 'next-auth/client';
import axios from 'axios';
import redirect from '../utils/redirect';

export default function Dashboard() {
  return <h1>Dashboard</h1>;
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  // Secure pages server side.
  if (!session) return redirect;
  const { user: { id } } = session;
  // Retrieve followed authors.
  const { data: { authors } } = await axios
    .get(`http://localhost:3000/api/user/${id}`);
  const promises = authors.map(({ _id }: any) => axios
    .get(`http://localhost:3000/api/user/${_id}`));
  const keep: any = await Promise.allSettled(promises);
  const users = keep.map(({
    value: {
      data: {
        _id, image, books, name,
      },
    },
  }: any) => ({
    _id, image, books, name,
  }));
  return {
    props: {
      session,
      users,
    },
  };
}
