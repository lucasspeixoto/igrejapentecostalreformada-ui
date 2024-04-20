import '@testing-library/jest-dom';

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
  value: 150.0,
};

// Mock useRouter:
jest.mock('next/navigation', () => ({
  useRouter() {
    return { prefetch: () => null };
  },
}));

jest.mock('../../../../../../providers/FinanceNotesProvider', () => ({
  useFinanceNotesContext() {
    return { prefetch: () => null };
  },
}));

describe('FinanceNoteUpdateModal', () => {
  // const updateFinanceNoteHandler = jest.fn();
  const onCancelDetailNoteUpdate = jest.fn();

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

    it('should render Update button with correct text', async () => {
      const buttonElement = screen.getByRole('button');

      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveTextContent('Editar');
    });
  });

  describe('Behavior', () => {
    it('should display two alerts error when value and description are invalid', async () => {
      const buttonElement = screen.getByRole('button');

      fireEvent.submit(buttonElement);

      const spanErrorElements = await screen.findAllByRole('alert');

      expect(spanErrorElements).toHaveLength(2);
    });
  });
});
