import React from 'react';
import axios from 'axios';
import { getSession } from 'next-auth/client';

export default function About({ data }: any) {
  const { about, image, name } = data;
  return (
    <main>
      <h1>
        {name}
        , About
      </h1>
      <ul>
        <li>{about}</li>
        <li>{image}</li>
      </ul>
    </main>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  const { params: { userId } } = context;
  const { data } = await axios
    .get(`http://localhost:3000/api/user/${userId}`);
  return { props: { session, data } };
}
