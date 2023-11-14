import { getFirestore } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';

import firebase_app, { storage } from '../config';

export const db = getFirestore(firebase_app);

export default async function deletePhoto(collection: string, userId: string) {
  let result = null;
  let error = null;

  const userPhotoRef = ref(storage, `${collection}/${userId}.jpg`);

  try {
    result = await deleteObject(userPhotoRef);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
