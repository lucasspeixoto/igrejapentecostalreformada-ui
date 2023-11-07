/* eslint-disable react-hooks/rules-of-hooks */
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
} from 'firebase/firestore';

import type { UserAuth } from '@/types/user-auth';
import type { UserData } from '@/types/user-data';

import firebase_app from '../config';

export const db = getFirestore(firebase_app);

export const usersRef = collection(db, 'users');

export const usersQuery = query(usersRef);

export async function getUsersDocuments() {
  const result: UserAuth[] = [];
  let error = null;

  try {
    const docsSnap = await getDocs(usersQuery);

    docsSnap.forEach(documment => {
      const data = documment.data() as UserData;

      result.push(data?.auth);
    });
  } catch (_error) {
    error = _error;
  }

  return { result, error };
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

// ! Obter lista de usuários:
//! const query = collection(db, 'users');
//! const [docs, loading, error] = useCollectionData(query);
//! console.log(docs)

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
