import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { Timestamp } from 'firebase/firestore';
import React from 'react';

import FinanceNoteUpdateModal from '../FinanceNoteUpdateModal';

const MOCKED_FINANCE_NOTE = {
  id: 'cfa7fa7D7ahdU876',
  photoUrl:
    'https://firebasestorage.googleapis.com/v0/b/ipr-master.appspot.com/o/photos%2FU6tkvy5k7dfmGNlIYvKWv79Ssen1.jpg?alt=media&token=13114439-e212-4819-a510-a379c820ef9e',
  description: 'Dízimo Pessoa B',
  owner: 'Lucas',
  category: 'Dízimo',
  date: Timestamp.fromDate(new Date('2023-12-05T00:00:00')),
  type: 'C',
  value: 150.0,
};

// Mock useRouter:
jest.mock('next/navigation', () => ({
  useRouter() {
    return { prefetch: () => null };
  },
}));

// Mock useFinanceNotesContext:
/* jest.mock('../../../../../lib/firebase/get-finance-notes', () => ({
  getFinanceNote() {
    return { prefetch: () => MOCKED_FINANCE_NOTE };
  },
})); */

jest.mock('../../FinanceNoteUpdateModal', () => ({
  setSelectedFinanceNote() {
    return { prefetch: () => MOCKED_FINANCE_NOTE };
  },
}));

jest.mock('../../../../../../providers/FinanceNotesProvider', () => ({
  useFinanceNotesContext() {
    return { prefetch: () => null };
  },
}));

describe('LoginForm', () => {
  const updateFinanceNoteHandler = jest.fn();
  const onCancelDetailNoteUpdate = jest.fn();

  beforeEach(() => {});

  describe('Render', () => {
    render(
      <FinanceNoteUpdateModal
        noteId="Dwr4sas2CmsrxnBC0at7"
        onCancelDetailNoteUpdate={onCancelDetailNoteUpdate}
      />
    );

    it('should render heading (h3) title', () => {
      const heading = screen.getByTestId('heading-title');

      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Editar notaa');
    });

    /* it('should render E-mail input and label', () => {
      const myEmailLabelElement = screen.getByTestId('email');
      const emailInput = screen.getByLabelText('email'); // ? screen.getByRole('textbox', { name: /email/i });

      expect(emailInput).toBeVisible();
      expect(myEmailLabelElement).toBeInTheDocument();
      expect(myEmailLabelElement).toHaveTextContent('E-mail');
    });

    it('should render Password input and label', () => {
      const myPasswordLabelElement = screen.getByTestId('password');
      const passwordInput = screen.getByLabelText('password');

      expect(passwordInput).toBeVisible();
      expect(myPasswordLabelElement).toBeInTheDocument();
      expect(myPasswordLabelElement).toHaveTextContent('Senha');
    });

    it('should have login buttons (with email and password and with google)', () => {
      const button = screen.getByTestId('login-button');

      expect(button).toBeInTheDocument();
    });

    it('should have a login with google button', () => {
      const button = screen.getByTestId('login-with-google-button');

      expect(button).toBeInTheDocument();
    }); */
  });

  /* describe('Behavior', () => {
    it('should display two alerts error when email and password are invalid', async () => {
      const loginButton = screen.getByTestId('login-button');

      fireEvent.submit(loginButton);

      const spanErrorElements = await screen.findAllByRole('alert');

      expect(spanErrorElements).toHaveLength(2);
    });

    it('should display matching error when email is invalid', async () => {
      const emailInput = screen.getByLabelText('email'); // ? screen.getByRole('textbox', { name: /email/i });
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
        expect(updateFinanceNoteHandler).not.toHaveBeenCalledTimes(1)
      );
    });

    it('should display matching error when password is invalid', async () => {
      const emailInput = screen.getByLabelText('email'); // ? screen.getByRole('textbox', { name: /email/i });
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
        expect(updateFinanceNoteHandler).not.toHaveBeenCalledTimes(1)
      );
    });

    it('should not display error when email and password are valid', async () => {
      const emailInput = screen.getByLabelText('email'); // ? screen.getByRole('textbox', { name: /email/i });
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
        expect(updateFinanceNoteHandler).toHaveBeenCalledTimes(1)
      );
    });
  }); */
});
