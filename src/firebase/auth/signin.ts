/* eslint-disable camelcase */
import type { UserCredential } from 'firebase/auth';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import firebase_app from '../config';

const auth = getAuth(firebase_app);

type FirebaseAuthError = {
  code: string;
  message: string;
} | null;

const signInUserHandler = async (
  email: string,
  password: string
): Promise<{ error: FirebaseAuthError; result: UserCredential | null }> => {
  let result: UserCredential | null = null;
  let error: FirebaseAuthError = null;

  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (_error: FirebaseAuthError | unknown) {
    error = _error as FirebaseAuthError;
  }

  return { result, error };
};

export default signInUserHandler;
