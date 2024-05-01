import type { FinanceNote } from '@lancamentos/types/finance-note';
import type { InputsVersusOutputsState } from '@relatorios/types/inputs-versus-output-state';

const JANUARY_MONTH_INDEX = 1;
const DEZEMBER_MONTH_INDEX = 12;

type InputsAndOutputs = {
  inputs: number[];
  outputs: number[];
};

/**
 * Computes the inputs and outputs values for each month in a given year.
 *
 * @param data - The finance notes data for the year.
 * @returns An object containing the inputs and outputs values for each month.
 */
export function computeInputsAndOutputsValuesInAYear(data: FinanceNote[]): InputsAndOutputs {
  const inputs = [];
  const outputs = [];

  for (let monthIndex = JANUARY_MONTH_INDEX; monthIndex <= DEZEMBER_MONTH_INDEX; monthIndex += 1) {
    let monthInputsValueTotal = 0;
    let monthOutputsValueTotal = 0;

    data.forEach(note => {
      const isTheCurrentMonth: boolean = note.date.toDate().getMonth() + 1 === monthIndex;

      if (note.type === 'C' && isTheCurrentMonth) {
        monthInputsValueTotal += note.value;
      }
      if (note.type === 'D' && isTheCurrentMonth) {
        monthOutputsValueTotal += note.value;
      }
    });

    inputs.push(monthInputsValueTotal);
    outputs.push(monthOutputsValueTotal);
  }

  return { inputs, outputs };
}

/**
 * Creates an InputsVersusOutputsState object with the given inputs and outputs.
 *
 * @param inputs - The input values for each month.
 * @param outputs - The output values for each month.
 * @returns The InputsVersusOutputsState object.
 */
export function createInputsVersusOutputsState(
  inputs: number[],
  outputs: number[]
): InputsVersusOutputsState {
  return {
    series: [
      { name: 'Entradas', data: inputs },
      { name: 'Saídas', data: outputs },
    ],
  };
}
