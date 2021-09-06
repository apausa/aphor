import React from 'react';
import axios from 'axios';

export default function Story({ data }: any) {
  return (
    <>
      <h1>User, story</h1>
      <ul>
        <li>{data.title}</li>
        <li>{data.date}</li>
        <li>{data.body}</li>
      </ul>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { params: { userId, bookId, storyId } } = context;
  const { data } = await axios
    .get(`http://localhost:3000/api/user/${userId}`);
  return {
    props: {
      userId, bookId, storyId, data,
    },
  };
}
