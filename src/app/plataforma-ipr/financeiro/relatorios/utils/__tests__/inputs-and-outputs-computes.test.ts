import { createInputsVersusOutputsState } from '../inputs-and-outputs-computes';

describe('Inputs And Outputs Computes', () => {
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
