/* eslint-disable no-underscore-dangle */
import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import { getSession } from 'next-auth/client';

export default function Book({ data, userId, bookId }: any) {
  const { books, name, image } = data;
  const { stories, title } = books
    .filter((book: any) => book._id === bookId)[0];
  return (
    <main>
      <h1>
        {title}
        , Book
      </h1>
      <ul>
        {stories.map((story: any) => (
          <Link href={`/${userId}/books/${bookId}/${story._id}`}>
            <li>
              {story.title}
              <ul>
                <li>{name}</li>
                <li>{image}</li>
                <li>{story.date}</li>
                <li>{story.body}</li>
              </ul>
            </li>
          </Link>
        ))}
      </ul>
    </main>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  const { params: { userId, bookId } } = context;
  const { data } = await axios
    .get(`http://localhost:3000/api/user/${userId}`);
  return {
    props: {
      session, userId, bookId, data,
    },
  };
}
