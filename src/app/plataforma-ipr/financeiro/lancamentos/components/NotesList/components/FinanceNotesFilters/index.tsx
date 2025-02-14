import './styles.scss';

import { useFinanceNotesContext } from '@lancamentos/providers/FinanceNotesProvider';
import React from 'react';

import { SelectChevroletLogo } from '@/components/common/Icons';

import { financeParameters } from '../../../../constants/form-parameters';

const FinanceNotesFilters: React.FC = () => {
  const { isLoadingFinanceNotes, filterFinanceNotes } = useFinanceNotesContext();

  const { financeNoteCategories } = financeParameters;

  const [selectedValue, setSelectedValue] = React.useState('');

  const [selectedDate, setSelectedDate] = React.useState('');

  const [selectedCategory, setSelectedCategory] = React.useState('all');

  /* const changeCategoryHandler = (category: string) => {
    setSelectedCategory(category);

    if (category !== '') {
      setSelectedValue('');
      setSelectedDate('');
      filterFinanceNotesByCategory(category);
    }
  }; */

  /* const changeValueHandler = (value: string): void => {
    setSelectedValue(value);
    setSelectedDate('');
    setSelectedCategory('all');
    if (value !== '') filterFinanceNotesByValue(value);
  }; */

  /* const changeDateHandler = (): void => {
    setSelectedDate(selectedDate);
    setSelectedValue('');
    setSelectedCategory('all');
    if (selectedDate !== '') filterFinanceNotesByDate(selectedDate);
  }; */

  const filterFinanceNotesHandler = () => {
    filterFinanceNotes(selectedCategory, selectedDate, selectedValue);
  };

  return (
    <div className="flex w-full items-end justify-start gap-4">
      <div className="filters">
        {/* Categoria */}
        <div className="filters__item">
          <label htmlFor="category" data-testid="category">
            Categoria
          </label>
          <div className="filters__item-select_box">
            <select
              value={selectedCategory}
              onChange={event => setSelectedCategory(event.target.value)}
              id="category"
              aria-label="category"
              role="category-select"
              disabled={isLoadingFinanceNotes}>
              <option value="" disabled>
                Selecione a categoria
              </option>
              <option value="all">Todos</option>
              {React.Children.toArray(
                financeNoteCategories.map(note => <option value={note}>{note}</option>)
              )}
            </select>
            <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
              <SelectChevroletLogo size={24} />
            </span>
          </div>
        </div>

        {/* Valor */}
        <div className="filters__item">
          <label htmlFor="value" data-testid="value">
            Valor (R$)
          </label>
          <input
            type="text"
            disabled={isLoadingFinanceNotes}
            value={selectedValue}
            onChange={event => setSelectedValue(event.target.value)}
          />
        </div>

        {/* Data */}
        <div className="filters__item">
          <label htmlFor="date" data-testid="date">
            Data
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={event => setSelectedDate(event.target.value)}
            disabled={isLoadingFinanceNotes}
          />
        </div>
      </div>

      <div className="actions">
        <button onClick={() => filterFinanceNotesHandler()} type="button">
          Buscar
        </button>
      </div>
    </div>
  );
};

export default FinanceNotesFilters;
