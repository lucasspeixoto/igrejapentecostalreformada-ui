import { doc, getFirestore, setDoc } from 'firebase/firestore';

import firebase_app from '../config';

const db = getFirestore(firebase_app);

export default async function addData(colllection: string, id: any, data: any) {
  let result = null;
  let error = null;

  try {
    result = await setDoc(doc(db, colllection, id), data, {
      merge: true,
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}
