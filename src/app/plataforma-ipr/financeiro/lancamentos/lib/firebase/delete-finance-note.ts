import { deleteDoc, doc, getFirestore } from 'firebase/firestore';

import firebase_app from '@/lib/firebase/config';

export const db = getFirestore(firebase_app);

export default async function deleteFinanceNote(id: string) {
  let result = null;
  let error = null;

  try {
    result = await deleteDoc(doc(db, 'finance-notes', id));
  } catch (e) {
    error = e;
  }

  return { result, error };
}
