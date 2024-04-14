/* eslint-disable camelcase */

import { getAuth, signOut } from 'firebase/auth';

import firebase_app from '@/lib/firebase/config';
import type { FirebaseAuthError } from '@/types/firebase-auth-error';

const auth = getAuth(firebase_app);

const signOutUserHandler = async (): Promise<{
  error: FirebaseAuthError;
}> => {
  let error: FirebaseAuthError = null;

  try {
    await signOut(auth);
  } catch (_error: FirebaseAuthError | unknown) {
    error = _error as FirebaseAuthError;
  }

  return { error };
};

export default signOutUserHandler;
