import { deleteDoc, doc, getFirestore } from 'firebase/firestore';

import firebase_app from '../config';

export const db = getFirestore(firebase_app);

export default async function deleteData(collection: string, id: string) {
  let result = null;
  let error = null;

  try {
    result = await deleteDoc(doc(db, collection, id));
  } catch (e) {
    error = e;
  }

  return { result, error };
}
