/* eslint-disable no-underscore-dangle */
import React from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function User({ data, userId }: any) {
  const { books } = data;
  return (
    <>
      <h1>User, dashboard</h1>
      <ul>
        {books.map((book: any) => book.stories.map((story: any) => (
          <li>
            <Link href={`/${userId}/books/${book._id}`}>
              {book.name}
            </Link>
            <Link href={`/${userId}/books/${book._id}/${story._id}`}>
              <ul>
                <li>{story.title}</li>
                <li>{story.date}</li>
                <li>{story.body}</li>
              </ul>
            </Link>
          </li>
        )))}
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
