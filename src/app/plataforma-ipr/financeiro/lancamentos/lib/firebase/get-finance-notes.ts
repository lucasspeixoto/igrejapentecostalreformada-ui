/* eslint-disable react-hooks/rules-of-hooks */
import { collection, doc, getDoc, getDocs, getFirestore, query } from 'firebase/firestore';

import firebase_app from '@/lib/firebase/config';
import { getMonthFromTimestampDate, getYearFromTimestampDate } from '@/utils/transform-date';

import type { FinanceNote } from '../../types/finance-note';

export const db = getFirestore(firebase_app);

export const financeNotesRef = collection(db, 'finance-notes');

export const financeNotesQuery = query(financeNotesRef);

export async function getFinanceNotesDocumentsByMonthAndYear(month: number, year: number) {
  const financeNotesData: FinanceNote[] = [];

  let error = null;

  try {
    const docsSnap = await getDocs(financeNotesQuery);

    docsSnap.forEach(document => {
      const financeNote = document.data() as FinanceNote;

      const financeNoteMonth = getMonthFromTimestampDate(financeNote.date);

      const financeNoteYear = getYearFromTimestampDate(financeNote.date);

      if (financeNoteMonth === month && financeNoteYear === year) {
        const data = {
          ...financeNote,
          id: document.ref.id,
        };

        financeNotesData.push(data);
      }
    });
  } catch (_error) {
    error = _error;
  }

  return { financeNotesData, error };
}

export async function getFinanceNotesDocumentsByYear(year: number) {
  const financeNotesData: FinanceNote[] = [];

  let error = null;

  try {
    const docsSnap = await getDocs(financeNotesQuery);

    docsSnap.forEach(document => {
      const financeNote = document.data() as FinanceNote;

      const financeNoteYear = getYearFromTimestampDate(financeNote.date);

      if (financeNoteYear === year) {
        const data = {
          ...financeNote,
          id: document.ref.id,
        };

        financeNotesData.push(data);
      }
    });
  } catch (_error) {
    error = _error;
  }

  return { financeNotesData, error };
}

export async function getFinanceNote(id: string) {
  const docRef = doc(db, 'finance-notes', id);

  let financeNote!: FinanceNote;

  let result = null;
  let error = null;

  try {
    result = await getDoc(docRef);
    financeNote = result.data() as FinanceNote;
  } catch (_error) {
    error = _error;
  }

  return { financeNote, error };
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

export async function getCollection(_collection: string, id: string, target: string) {
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
