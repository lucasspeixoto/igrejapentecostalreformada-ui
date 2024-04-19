import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import EmptyDataPage from '../EmptyDataPage';

describe('EmptyDataPage Render Tests', () => {
  it('should have correct description text', () => {
    const text = 'Sem dados';
    render(<EmptyDataPage description="Sem dados" />);

    const myTestElement = screen.getByTestId('description-id');

    expect(myTestElement).toBeInTheDocument();
    expect(myTestElement).toHaveTextContent(text);
  });

  it('should have correct title text', () => {
    const text = 'Título';
    render(<EmptyDataPage title="Título" description="Sem dados" />);

    const myTestElement = screen.getByTestId('title-id');

    expect(myTestElement).toBeInTheDocument();
    expect(myTestElement).toHaveTextContent(text);
  });
});
