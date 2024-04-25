import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import Image from '@/components/Image';

import EmptyDataPage from '../EmptyDataPage';

describe('EmptyDataPage Render Tests', () => {
  it('should adds correct src and alt to the Image', () => {
    const alt = 'Imagem Sem resultados';
    const src = '/no-data.svg';
    render(<Image src={src} alt={alt} width={300} height={80} />);

    const img = screen.getByAltText(alt);

    expect(img).toHaveAttribute('src', src);
  });

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
