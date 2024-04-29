import type { PartialWithFieldValue } from 'firebase/firestore';
import { addDoc, collection, getFirestore } from 'firebase/firestore';

import firebase_app from '@/lib/firebase/config';

export const db = getFirestore(firebase_app);

export default async function addFinanceNote(data: PartialWithFieldValue<unknown>) {
  let result = null;
  let error = null;

  try {
    result = await addDoc(collection(db, 'finance-notes'), data);
  } catch (_error) {
    error = _error;
  }

  return { result, error };
}
