/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/client';

export default function Write() {
  const [session, loading] = useSession();
  console.log(session);
  return (
    <>
      <form>
        <ul>
          <li>
            <ul>
              <li>
                <Link href={`/${session?.user.id}`}>
                  <a>
                    <Image
                      src={`${session?.user.image}`}
                      width="16"
                      height="16"
                    />
                  </a>
                </Link>
              </li>
              <li>
                <input type="text" placeholder="Write your story." />
              </li>
            </ul>
          </li>
          <li>
            <ul>
              <li>
                <ul>
                  <li />
                </ul>
              </li>
              <li>
                <input
                  type="submit"
                  value="Publish."
                />
              </li>
            </ul>
          </li>
        </ul>
      </form>
    </>
  );
}

// Renderizar los libros existentes.
