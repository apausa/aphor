/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function User({ data, userId }: any) {
  const { books, name, image } = data;
  return (
    <>
      <h1>
        {name}
        , Dashboard
      </h1>
      <ul>
        {books.map((book: any) => book.stories.map((story: any) => (
          <li>
            <Link href={`/${userId}/books/${book._id}`}>
              {book.title}
            </Link>
            <Link href={`/${userId}/books/${book._id}/${story._id}`}>
              <ul>
                <li>
                  {story.title}
                  <ul>
                    <li>{name}</li>
                    <li>{image}</li>
                    <li>{story.date}</li>
                    <li>{story.body}</li>
                  </ul>
                </li>
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
