import { render, screen } from '@testing-library/react';
import React from 'react';

import LoaderProgress from '../LoaderProgress';

describe('LoaderProgress', () => {
  it('renders the loader progress with the given percentage', () => {
    const percent = 50;

    render(<LoaderProgress percent={percent} />);

    const percentText = screen.getByText(`${percent} %`);
    expect(percentText).toBeInTheDocument();

    const loaderElement = screen.getByRole('presentation');
    expect(loaderElement).toBeInTheDocument();
  });
});
