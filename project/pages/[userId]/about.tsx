import React from 'react';
import axios from 'axios';

export default function About({ data }: any) {
  const { about, image, name } = data;
  return (
    <>
      <h1>
        {name}
        , About
      </h1>
      <ul>
        <li>{about}</li>
        <li>{image}</li>
      </ul>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { params: { userId } } = context;
  const { data } = await axios
    .get(`http://localhost:3000/api/user/${userId}`);
  return { props: { data, userId } };
}
