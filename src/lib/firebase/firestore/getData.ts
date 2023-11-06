/* eslint-disable react-hooks/rules-of-hooks */
import { doc, getDoc, getFirestore } from 'firebase/firestore';

import firebase_app from '../config';

const db = getFirestore(firebase_app);

export async function getDocument(collection: string, id: string) {
  const docRef = doc(db, collection, id);

  let result = null;
  let error = null;

  try {
    result = await getDoc(docRef);
  } catch (_error) {
    error = _error;
  }

  return { result, error };
}

/**
const authdata = getDocument('users', user?.uid!);

  authdata
    .then(response => {
      console.log(response.result?.get('auth'));
    })
    .catch(error => {
      console.log(error);
    });
 */

// ! Obter lista de usuários:
//! const query = collection(db, 'users');
//! const [docs, loading, error] = useCollectionData(query);
//! console.log(docs)

export async function getCollection(
  collection: string,
  id: string,
  target: string
) {
  let result = null;
  let error = null;

  try {
    const response = await getDocument(collection, id);

    result = response.result?.get(target);
  } catch (_error) {
    error = _error;
  }

  return { result, error };
}
