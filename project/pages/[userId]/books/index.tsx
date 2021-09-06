/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Books({ data }: any) {
  const { _id, name, image } = data;
  return (
    <>
      <h1>
        {name}
        , books
      </h1>
      <ul>
        {data.books.map((book: any) => (
          <Link href={`/${_id}/books/${book._id}`}>
            <li>
              <ul>
                <li>{name}</li>
                <li>{image}</li>
                <li>{book.image}</li>
                <li>{book.title}</li>
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
  return { props: { data } };
}
