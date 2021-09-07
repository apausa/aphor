/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import { getSession } from 'next-auth/client';

export default function Books({ data }: any) {
  const { _id, name, image } = data;
  return (
    <main>
      <h1>
        {name}
        , books
      </h1>
      <ul>
        {data.books.map((book: any) => (
          <Link href={`/${_id}/books/${book._id}`}>
            <li>
              <ul>
                <li>{image}</li>
                <li>{name}</li>
                <li>{book.date}</li>
              </ul>
              <ul>
                <li>{book.image}</li>
                <li>{book.title}</li>
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
  const { params: { userId } } = context;
  const { data } = await axios
    .get(`http://localhost:3000/api/user/${userId}`);
  return { props: { session, userId, data } };
}
