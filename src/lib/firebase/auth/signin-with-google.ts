/* eslint-disable camelcase */
import type { UserCredential } from 'firebase/auth';
import {
  getAdditionalUserInfo,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

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
  isTheUserNew: boolean;
}> => {
  let result: FirebaseUserCredential = null;
  let error: FirebaseAuthError = null;
  let isTheUserNew = false;

  const provider = new GoogleAuthProvider();

  try {
    result = await signInWithPopup(auth, provider);

    const { isNewUser } = getAdditionalUserInfo(result)!;

    isTheUserNew = isNewUser;
  } catch (_error: FirebaseAuthError | unknown) {
    error = _error as FirebaseAuthError;
  }

  return { result, error, isTheUserNew };
};

export default signInWithGoogle;
