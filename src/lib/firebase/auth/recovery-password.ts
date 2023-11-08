/* eslint-disable camelcase */
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

import firebase_app from '../config';

const auth = getAuth(firebase_app);

type FirebaseAuthError = {
  code: string;
  message: string;
} | null;

const recoveryPasswordHandler = async (
  email: string
): Promise<{ error: FirebaseAuthError }> => {
  let error: FirebaseAuthError = null;

  try {
    await sendPasswordResetEmail(auth, email);
  } catch (_error: FirebaseAuthError | unknown) {
    error = _error as FirebaseAuthError;
  }

  return { error };
};

export default recoveryPasswordHandler;
