import type { FinanceNote } from '../types/finance-note';
import { getRandomHexColor } from './generate-random-hex-color';

export function getTotalValuesByCategory(financeNotes: FinanceNote[]): Record<string, number> {
  return financeNotes.reduce(
    (acc, note) => {
      const { category } = note;
      const value = parseFloat(note.value.toFixed(2));
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += value;
      return acc;
    },
    {} as Record<string, number>
  );
}

type MonthBalanceChartData = { x: string; y: number; fillColor: string };

export function convertTotalValuesToXYArray(
  totalValuesByCategory: Record<string, number>
): MonthBalanceChartData[] {
  return Object.entries(totalValuesByCategory)
    .map(([category, value]) => ({
      x: category,
      y: value,
      fillColor: getRandomHexColor(),
    }))
    .sort((a, b) => b.y - a.y)
    .slice(1, 6);
}
