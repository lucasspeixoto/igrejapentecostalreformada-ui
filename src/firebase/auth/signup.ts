/* eslint-disable camelcase */
import type { UserCredential } from 'firebase/auth';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

import firebase_app from '../config';

const auth = getAuth(firebase_app);

type FirebaseAuthError = {
  code: string;
  message: string;
} | null;

const signUp = async (
  name: string,
  email: string,
  password: string
): Promise<{
  error: FirebaseAuthError;
  result: UserCredential | null;
}> => {
  let result: UserCredential | null = null;
  let error: FirebaseAuthError = null;

  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (_error: FirebaseAuthError | unknown) {
    error = _error as FirebaseAuthError;
  }

  return { result, error };
};

export default signUp;
