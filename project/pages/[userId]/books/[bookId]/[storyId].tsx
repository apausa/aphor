/* eslint-disable no-underscore-dangle */
import React from 'react';
import axios from 'axios';
import { getSession } from 'next-auth/client';

export default function Story({ data, bookId, storyId }: any) {
  const { books, name, image } = data;
  const { stories } = books
    .filter((book: any) => book._id === bookId)[0];
  const { title, date, body } = stories
    .filter((story: any) => story._id === storyId)[0];
  return (
    <>
      <h1>
        {title}
        , story
      </h1>
      <ul>
        <li>{name}</li>
        <li>{image}</li>
        <li>{date}</li>
        <li>{body}</li>
      </ul>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  const { params: { userId, bookId, storyId } } = context;
  const { data } = await axios
    .get(`http://localhost:3000/api/user/${userId}`);
  return {
    props: {
      session, bookId, storyId, data,
    },
  };
}
