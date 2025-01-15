import type { PartialWithFieldValue } from 'firebase/firestore';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

import firebase_app from '@/lib/firebase/config';

import type { FinanceReport } from '../../types/finance-report';
import { getFinanceReportsDocuments } from './get-finance-reports';

export const db = getFirestore(firebase_app);

export const updateFinanceReportsTotalBalance = async (note: number) => {
  let result = null;
  let error = null;

  const { financeReportData } = await getFinanceReportsDocuments();

  const updatedData = {
    totalBalance: +financeReportData!.totalBalance + note,
  } as PartialWithFieldValue<FinanceReport>;

  try {
    result = await setDoc(doc(db, 'finance-reports', financeReportData!.id), updatedData, {
      merge: true,
    });
  } catch (_error) {
    error = _error;
  }

  return { result, error };
};

export const updateFinanceReportsMonthBalance = async (note: number) => {
  let result = null;
  let error = null;

  const { financeReportData } = await getFinanceReportsDocuments();

  const updatedData = {
    monthBalance: +financeReportData!.monthBalance + note,
  } as PartialWithFieldValue<FinanceReport>;

  try {
    result = await setDoc(doc(db, 'finance-reports', financeReportData!.id), updatedData, {
      merge: true,
    });
  } catch (_error) {
    error = _error;
  }

  return { result, error };
};
