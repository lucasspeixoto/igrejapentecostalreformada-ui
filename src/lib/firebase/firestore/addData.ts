import type { PartialWithFieldValue } from 'firebase/firestore';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

import firebase_app from '../config';

export const db = getFirestore(firebase_app);

export default async function addData(collection: string, id: string, data: PartialWithFieldValue<unknown>) {
  let result = null;
  let error = null;

  try {
    result = await setDoc(doc(db, collection, id), data, {
      merge: true,
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}
