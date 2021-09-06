/* eslint-disable no-underscore-dangle */
import React from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Books({ data, userId }: any) {
  return (
    <>
      <h1>User, books</h1>
      <ul>
        {data.books.map((book: any) => (
          <Link href={`/${userId}/books/${book._id}`}>
            <li>
              <ul>
                <li>{book.image}</li>
                <li>{book.name}</li>
                <li>{book.date}</li>
              </ul>
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { params: { userId } } = context;
  const { data } = await axios
    .get(`http://localhost:3000/api/user/${userId}`);
  return {
    props: { userId, data },
  };
}
