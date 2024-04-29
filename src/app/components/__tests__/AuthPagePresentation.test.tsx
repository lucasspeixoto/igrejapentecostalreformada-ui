import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import Image from '@/components/Image';

import AuthPagePresentation from '../AuthPagePresentation';

describe('AuthPagePresentation', () => {
  it('should have some especific text', () => {
    const text = '(Rm 1.16,17)';
    render(<AuthPagePresentation />);

    const myTestElement = screen.getByText((_, element) => element!.textContent === text);

    expect(myTestElement).toBeInTheDocument();
  });

  it('should adds correct src and alt to the Logo Image', () => {
    const alt = 'Logo';
    const src = '/images/logo/logo.svg';
    render(<Image src={src} alt={alt} width={300} height={80} />);

    const img = screen.getByAltText(alt);

    expect(img).toHaveAttribute('src', src);
  });
});
