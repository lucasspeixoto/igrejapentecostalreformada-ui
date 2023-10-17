/* eslint-disable camelcase */
import type { UserCredential } from 'firebase/auth';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import firebase_app from '../config';

const auth = getAuth(firebase_app);

type FirebaseAuthError = {
  code: string;
  message: string;
} | null;

type FirebaseUserCredential = UserCredential | null;

const signInWithGoogle = async (): Promise<{
  error: FirebaseAuthError;
  result: FirebaseUserCredential;
}> => {
  let result: FirebaseUserCredential = null;
  let error: FirebaseAuthError = null;

  const provider = new GoogleAuthProvider();

  try {
    result = await signInWithPopup(auth, provider);
  } catch (_error: FirebaseAuthError | unknown) {
    error = _error as FirebaseAuthError;
  }

  return { result, error };
};

export default signInWithGoogle;
