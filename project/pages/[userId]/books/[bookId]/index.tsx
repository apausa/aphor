/* eslint-disable no-underscore-dangle */
import React from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Book({ data, userId, bookId }: any) {
  const { books, name, image } = data;
  const { stories, title } = books
    .filter((book: any) => book._id === bookId)[0];
  return (
    <>
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
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { params: { userId, bookId } } = context;
  const { data } = await axios
    .get(`http://localhost:3000/api/user/${userId}`);
  return { props: { userId, bookId, data } };
}
