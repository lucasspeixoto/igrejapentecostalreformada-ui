import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import LoginForm from '../LoginForm';

// Mock useRouter:
jest.mock('next/navigation', () => ({
  useRouter() {
    return { prefetch: () => null };
  },
}));

describe('LoginForm', () => {
  const singInWithEmailAndPasswordHandler = jest.fn();
  const singInWithGoogleHandler = jest.fn();

  beforeEach(() => {
    render(
      <LoginForm
        singInWithGoogleHandler={singInWithGoogleHandler}
        singInWithEmailAndPasswordHandler={singInWithEmailAndPasswordHandler}
      />
    );
  });

  describe('Render', () => {
    it('should render E-mail input label', () => {
      const myEmailLabelElement = screen.getByTestId('email');

      expect(myEmailLabelElement).toBeInTheDocument();
      expect(myEmailLabelElement).toHaveTextContent('E-mail');
    });

    it('should render Password input label', () => {
      const myPasswordLabelElement = screen.getByTestId('password');
      expect(myPasswordLabelElement).toBeInTheDocument();
      expect(myPasswordLabelElement).toHaveTextContent('Senha');
    });

    it('should have a submit button', () => {
      const loginButton = screen.getByTestId('login-button');

      expect(loginButton).toBeInTheDocument();
    });
  });

  describe('Behaviour', () => {
    it('should display required error when value is invalid', async () => {
      const loginButton = screen.getByTestId('login-button');

      fireEvent.submit(loginButton);

      const spanErrorElements = await screen.findAllByRole('alert');

      expect(spanErrorElements).toHaveLength(2);
    });

    it('should display matching error when email is invalid', async () => {
      const emailInput = screen.getByRole('textbox', { name: /email/i });
      fireEvent.input(emailInput, { target: { value: 'test' } });

      const passwordInput = screen.getByLabelText('password');
      fireEvent.input(passwordInput, { target: { value: 'password' } });

      const loginButton = screen.getByTestId('login-button');
      fireEvent.submit(loginButton);

      //! Mensagem de erro
      const emaiLErrorMessage = 'E-mail em formato inválido!';
      const spanErrorElements = await screen.findAllByRole('alert');
      expect(spanErrorElements).toHaveLength(1);
      expect(spanErrorElements[0]).toHaveTextContent(emaiLErrorMessage);

      //! Textos inseridos nos elementos de input
      expect(emailInput).toHaveValue('test');
      expect(passwordInput).toHaveValue('password');

      await waitFor(() =>
        expect(singInWithEmailAndPasswordHandler).not.toHaveBeenCalledTimes(1)
      );
    });

    it('should display matching error when password is invalid', async () => {
      const emailInput = screen.getByRole('textbox', { name: /email/i });
      fireEvent.input(emailInput, { target: { value: 'lucas@gmail.com' } });

      const passwordInput = screen.getByLabelText('password');
      fireEvent.input(passwordInput, { target: { value: '123' } });

      const loginButton = screen.getByTestId('login-button');
      fireEvent.submit(loginButton);

      //! Mensagem de erro
      const passwordErrorMessage =
        'A senha precisa conter no mínimo 6 caracteres!';
      const spanErrorElements = await screen.findAllByRole('alert');
      expect(spanErrorElements).toHaveLength(1);
      expect(spanErrorElements[0]).toHaveTextContent(passwordErrorMessage);

      //! Textos inseridos nos elementos de input
      expect(emailInput).toHaveValue('lucas@gmail.com');
      expect(passwordInput).toHaveValue('123');

      await waitFor(() =>
        expect(singInWithEmailAndPasswordHandler).not.toHaveBeenCalledTimes(1)
      );
    });

    it('should not display error when value is valid', async () => {
      const emailInput = screen.getByRole('textbox', { name: /email/i });
      fireEvent.input(emailInput, { target: { value: 'lucas@gmail.com' } });

      const passwordInput = screen.getByLabelText('password');
      fireEvent.input(passwordInput, {
        target: { value: 'minhasenhacorreta' },
      });

      const loginButton = screen.getByTestId('login-button');
      fireEvent.submit(loginButton);

      await waitFor(() =>
        expect(screen.queryAllByRole('alert')).toHaveLength(0)
      );

      await waitFor(() =>
        expect(singInWithEmailAndPasswordHandler).toHaveBeenCalledTimes(1)
      );

      // const data = { email: 'lucas@gmail.com', senha: 'minhasenhacorreta' };
      // expect(mocksingInWithEmailAndPasswordHandler).toHaveBeenCalledWith(data);
      // expect(screen.getByRole('textbox', { name: /email/i })).toHaveValue('');
      // expect(screen.getByLabelText('password')).toHaveValue('');
    });
  });
});
