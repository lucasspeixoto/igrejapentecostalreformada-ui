import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import SignIn from '../page';

// Mock useRouter:
jest.mock('next/navigation', () => ({
  useRouter() {
    return { prefetch: () => null };
  },
}));

describe('SignIn', () => {
  it('should have and heading(h2) test', () => {
    const text = 'Login';
    render(<SignIn />);

    const myTestElement = screen.getByRole('heading', {
      name: text,
    });

    expect(myTestElement).toBeInTheDocument();
  });
});
