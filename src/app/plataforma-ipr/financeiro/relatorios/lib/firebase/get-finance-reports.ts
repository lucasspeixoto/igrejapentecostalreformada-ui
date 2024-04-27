/* eslint-disable react-hooks/rules-of-hooks */
import type { FinanceReport } from '@relatorios/types/finance-report';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
} from 'firebase/firestore';

import firebase_app from '@/lib/firebase/config';

export const db = getFirestore(firebase_app);

export const financeReportsRef = collection(db, 'finance-reports');

export const financeReportsQuery = query(financeReportsRef);

export async function getFinanceReportsDocuments() {
  let financeReportData: FinanceReport | null = null;

  let error = null;

  try {
    const docsSnap = await getDocs(financeReportsQuery);

    const document = docsSnap.docs[0];

    const financeReport = document.data() as FinanceReport;

    const { id } = document.ref;

    financeReportData = {
      ...financeReport,
      id,
    };
  } catch (_error) {
    error = _error;
  }

  return { financeReportData, error };
}

export async function getDocument(_collection: string, id: string) {
  const docRef = doc(db, _collection, id);

  let result = null;
  let error = null;

  try {
    result = await getDoc(docRef);
  } catch (_error) {
    error = _error;
  }

  return { result, error };
}

export async function getCollection(
  _collection: string,
  id: string,
  target: string
) {
  let result = null;
  let error = null;

  try {
    const response = await getDocument(_collection, id);

    result = response.result?.get(target);
  } catch (_error) {
    error = _error;
  }

  return { result, error };
}
