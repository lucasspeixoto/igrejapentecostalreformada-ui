import { MOCKED_FINANCE_NOTES2 } from '@lancamentos/__mocks__/finance-notes';

import {
  computeInputsAndOutputsValuesInAYear,
  createInputsVersusOutputsState,
} from '../inputs-and-outputs-computes';

describe('Inputs And Outputs Computes', () => {
  describe('computeInputsAndOutputsValuesInAYear', () => {
    it('should return the correct inputs and outputs for a given year of finance notes', () => {
      const financeNotes = MOCKED_FINANCE_NOTES2;

      const { inputs, outputs } = computeInputsAndOutputsValuesInAYear(financeNotes);

      expect(inputs).toEqual([6900, 4700, 12702, 11950, 0, 0, 0, 0, 0, 0, 0, 0]);
      expect(outputs).toEqual([8430, 9200, 3800, 9285, 0, 0, 0, 0, 0, 0, 0, 0]);
    });
  });

  describe('createInputsVersusOutputsState', () => {
    it('should handle an array of inputs and an array of outputs', () => {
      const inputs = [1, 2, 3];
      const outputs = [4, 5, 6];

      const result = createInputsVersusOutputsState(inputs, outputs);

      expect(result).toEqual({
        series: [
          { name: 'Entradas', data: inputs },
          { name: 'Saídas', data: outputs },
        ],
      });
    });

    it('should handle an empty array for inputs and outputs', () => {
      const inputs: number[] = [];
      const outputs: number[] = [];

      const result = createInputsVersusOutputsState(inputs, outputs);

      expect(result).toEqual({
        series: [
          { name: 'Entradas', data: [] },
          { name: 'Saídas', data: [] },
        ],
      });
    });

    it('should handle a single value for inputs and outputs', () => {
      const inputs = [1];
      const outputs = [2];

      const result = createInputsVersusOutputsState(inputs, outputs);

      expect(result).toEqual({
        series: [
          { name: 'Entradas', data: inputs },
          { name: 'Saídas', data: outputs },
        ],
      });
    });

    it('should handle an array with different lengths for inputs and outputs', () => {
      const inputs = [1, 2, 3];
      const outputs = [4, 5];

      const result = createInputsVersusOutputsState(inputs, outputs);

      expect(result).toEqual({
        series: [
          { name: 'Entradas', data: inputs },
          { name: 'Saídas', data: outputs },
        ],
      });
    });
  });
});
