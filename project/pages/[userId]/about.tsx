/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';

export default function About({ data }: any) {
  console.log(data);
  return (
    <>
      <p>{data.about}</p>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { params: { userId } } = context;
  const { data } = await axios
    .get(`http://localhost:3000/api/user/${userId}`);
  console.log(data);
  return { props: { data, userId } };
}
