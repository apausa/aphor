/**
 * @jest-environment jsdom
*/

import React from 'react';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
// import { useSession } from 'next-auth/client';
import Header from '../../components/header';

jest.mock('next/router');
useRouter.mockReturnValue({ route: '', query: { userId: '' } });

describe('Given a Header component', () => {
  describe(' When is rendered', () => {
    beforeEach(() => { render(<Header />); });
    test('Then icon should be in the document', () => {
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });
  });
});
