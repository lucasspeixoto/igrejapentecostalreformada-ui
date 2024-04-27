import '@testing-library/jest-dom';

import { financeParameters } from '@lancamentos/constants/form-parameters';
import { MEMBERS } from '@lancamentos/constants/members-list';
import { fireEvent, render, screen } from '@testing-library/react';
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
  member: 'LUCAS',
  value: 150.0,
};

// Mock useRouter:
jest.mock('next/navigation', () => ({
  useRouter() {
    return { prefetch: () => null };
  },
}));

jest.mock('../../../../../providers/FinanceNotesProvider', () => ({
  useFinanceNotesContext() {
    return { prefetch: () => null };
  },
}));

describe('FinanceNoteUpdateModal', () => {
  // const updateFinanceNoteHandler = jest.fn();
  const onCancelDetailNoteUpdate = jest.fn();

  const { financeNoteCategories } = financeParameters;

  beforeEach(() => {
    render(
      <FinanceNoteUpdateModal
        noteId={MOCKED_FINANCE_NOTE.id}
        onCancelDetailNoteUpdate={onCancelDetailNoteUpdate}
      />
    );
  });

  describe('Render', () => {
    it('should render heading (h3) title with correct text', async () => {
      const headingElement = screen.getByRole('heading', { level: 3 });

      expect(headingElement).toBeInTheDocument();
      expect(headingElement).toHaveTextContent('Editar nota');
    });

    it('should render Cancel button with correct text', () => {
      const buttonElement = screen.getByTestId('cancel-button');

      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveTextContent('Cancelar');
    });

    it('should render Update button with correct text', () => {
      const buttonElement = screen.getByTestId('update-button');

      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveTextContent('Editar');
    });

    it('should render Type select and label', () => {
      const labelElement = screen.getByTestId('type');
      const selectElement = screen.getByLabelText('type') as HTMLOptionElement;
      const options = selectElement.getElementsByTagName('option');

      expect(options.length).toEqual(3);
      expect(selectElement).toBeVisible();
      expect(labelElement).toBeInTheDocument();
      expect(labelElement).toHaveTextContent('Tipo *');
    });

    it('should render Category select and label', () => {
      const labelElement = screen.getByTestId('member');
      const selectElement = screen.getByLabelText('member');
      const options = selectElement.getElementsByTagName('option');

      // Options + Disabled info value
      expect(options.length).toEqual(MEMBERS.length + 2);

      expect(selectElement).toBeVisible();
      expect(labelElement).toBeInTheDocument();
      expect(labelElement).toHaveTextContent('Membro associado');
    });

    it('should render Member select and label', () => {
      const labelElement = screen.getByTestId('category');
      const selectElement = screen.getByLabelText('category');
      const options = selectElement.getElementsByTagName('option');

      // Options + Disabled info value
      expect(options.length).toEqual(financeNoteCategories.length + 1);

      expect(selectElement).toBeVisible();
      expect(labelElement).toBeInTheDocument();
      expect(labelElement).toHaveTextContent('Categoria *');
    });

    it('should render value select and label', () => {
      const labelElement = screen.getByTestId('value');
      const inputElement = screen.getByLabelText('value');

      expect(inputElement).toBeVisible();
      expect(labelElement).toBeInTheDocument();
      expect(labelElement).toHaveTextContent('Valor *');
    });

    it('should render description select and label', () => {
      const labelElement = screen.getByTestId('description');
      const inputElement = screen.getByLabelText('description');

      expect(inputElement).toBeVisible();
      expect(labelElement).toBeInTheDocument();
      expect(labelElement).toHaveTextContent('Descrição *');
    });
  });

  describe('Behavior', () => {
    it('should display two alerts error when value and description are invalid', async () => {
      const buttonElement = screen.getByTestId('update-button');

      fireEvent.submit(buttonElement);

      const spanErrorElements = await screen.findAllByRole('alert');

      expect(spanErrorElements).toHaveLength(2);
    });
  });
});
