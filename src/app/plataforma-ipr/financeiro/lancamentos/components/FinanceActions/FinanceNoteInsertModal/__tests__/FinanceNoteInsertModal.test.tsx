import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { financeParameters } from '@/app/plataforma-ipr/financeiro/lancamentos/constants/form-parameters';

import FinanceNoteInsertModal from '..';

// Mock useRouter:
jest.mock('next/navigation', () => ({
  useRouter() {
    return { prefetch: () => null };
  },
}));

describe('FinanceNoteInsertModal', () => {
  const onCancelInsertNote = jest.fn();
  const insertNoteHandler = jest.fn();

  const { financeNoteCategories } = financeParameters;

  beforeEach(() => {
    render(
      <FinanceNoteInsertModal
        onCancelInsertNote={onCancelInsertNote}
        insertNoteHandler={insertNoteHandler}
      />
    );
  });

  describe('Render', () => {
    it('should render heading (h3) title with correct text', async () => {
      const headingElement = screen.getByRole('heading', { level: 3 });

      expect(headingElement).toBeInTheDocument();
      expect(headingElement).toHaveTextContent('Nova nota');
    });

    it('should render Cancel button with correct text', () => {
      const buttonElement = screen.getByTestId('cancel-button');

      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveTextContent('Cancelar');
    });

    it('should render Update button with correct text', () => {
      const buttonElement = screen.getByTestId('update-button');

      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveTextContent('Adicionar');
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
      const labelElement = screen.getByTestId('category');
      const selectElement = screen.getByLabelText('category');
      const options = selectElement.getElementsByTagName('option');

      // Options + Disabled info value
      expect(options.length).toEqual(financeNoteCategories.length + 1);

      expect(selectElement).toBeVisible();
      expect(labelElement).toBeInTheDocument();
      expect(labelElement).toHaveTextContent('Categoria *');
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
