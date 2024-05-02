import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import Image from '@/components/Image';

import AuthPagePresentation from '../AuthPagePresentation';

describe('AuthPagePresentation', () => {
  it('should render heading (h1) title with correct text', async () => {
    render(<AuthPagePresentation />);
    const headingElement = screen.getByRole('heading', { level: 1 });

    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent('Plataforma Igreja pentecostal refomada');
  });

  it('should adds correct src and alt to the Logo Image', () => {
    const alt = 'Logo';
    const src = '/images/logo/logo.svg';
    render(<Image src={src} alt={alt} width={300} height={80} />);

    const img = screen.getByAltText(alt);

    expect(img).toHaveAttribute('src', src);
  });
});
