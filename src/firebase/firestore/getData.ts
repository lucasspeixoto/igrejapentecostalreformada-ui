import { doc, getDoc, getFirestore } from 'firebase/firestore';

import firebase_app from '../config';

const db = getFirestore(firebase_app);

export default async function getDoument(collection: any, id: string) {
  const docRef = doc(db, collection, id);

  let result = null;
  let error = null;

  try {
    result = await getDoc(docRef);
    /* console.log(result.data()); */
  } catch (e) {
    error = e;
  }

  return { result, error };
}
