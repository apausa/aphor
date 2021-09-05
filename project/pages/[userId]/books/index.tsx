/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { getSession } from 'next-auth/client';
import axios from 'axios';
import Link from 'next/link';
import redirect from '../../../utils/redirect';

export default function Books({ data, userId }: any) {
  return (
    <>
      <h1>Books</h1>
      <ul>
        {data.books.map((book: any) => (
          <li>
            <Link href={`/${userId}/books/${book._id}`}>
              <ul>
                <li>{book.name}</li>
                <li>{book.date}</li>
                <li>{book.image}</li>
              </ul>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

// Secure pages server side.
export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  const { params: { userId } } = context;
  const { data } = await axios.get(
    `http://localhost:3000/api/user/${userId}`,
  );

  if (!session) return redirect;
  return {
    props: {
      session,
      data,
      userId,
    },
  };
}
