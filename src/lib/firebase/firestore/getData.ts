/* eslint-disable react-hooks/rules-of-hooks */
import { collection, doc, getDoc, getDocs, getFirestore, query } from 'firebase/firestore';

import type { UserData } from '@/types/user-data';

import firebase_app from '../config';

export const db = getFirestore(firebase_app);

export const usersRef = collection(db, 'users');

export const usersQuery = query(usersRef);

export async function getUsersDocuments() {
  const userData: UserData[] = [];
  let error = null;

  try {
    const docsSnap = await getDocs(usersQuery);

    docsSnap.forEach(document => {
      const data = document.data() as UserData;

      userData.push(data);
    });
  } catch (_error) {
    error = _error;
  }

  return { userData, error };
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
