import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import RedirectLink from '../RedirectLink';

describe('RedirectLink', () => {
  it('should adds correct text, textLink and route to the RedirectLink', () => {
    const text = 'Ja possui uma conta?';
    const textLink = 'Logar';
    const route = '/login';

    render(
      <RedirectLink
        data-testid="redirect-link"
        text={text}
        textLink={textLink}
        route={route}
      />
    );

    const redirectLinkElement = screen.getByText(text);

    expect(redirectLinkElement).toBeInTheDocument();
    expect(redirectLinkElement).toHaveTextContent(text);
  });
});
