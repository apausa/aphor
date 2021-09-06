/* eslint-disable no-underscore-dangle */
import React from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Book({ data, userId, bookId }: any) {
  return (
    <>
      <h1>User, book</h1>
      <ul>
        {data.stories.map((story: any) => (
          <Link href={`/${userId}/books/${bookId}/${story._id}`}>
            <li>
              <ul>
                <li>{story.title}</li>
                <li>{story.date}</li>
                <li>{story.body}</li>
              </ul>
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { params: { userId, bookId } } = context;
  const { data } = await axios
    .get(`http://localhost:3000/api/book/${bookId}`);
  return { props: { userId, bookId, data } };
}
