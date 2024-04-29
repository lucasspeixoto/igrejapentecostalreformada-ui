import type { PartialWithFieldValue } from 'firebase/firestore';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

import firebase_app from '@/lib/firebase/config';

import type { FinanceNote } from '../../types/finance-note';

export const db = getFirestore(firebase_app);
export default async function updateFinanceNote(id: string, data: PartialWithFieldValue<FinanceNote>) {
  let result = null;
  let error = null;

  try {
    result = await setDoc(doc(db, 'finance-notes', id), data, {
      merge: true,
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}
