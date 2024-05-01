/* eslint-disable camelcase */
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

import firebase_app from '@/lib/firebase/config';
import type { FirebaseAuthError } from '@/types/firebase-auth-error';

const auth = getAuth(firebase_app);

const recoveryPasswordHandler = async (email: string): Promise<{ error: FirebaseAuthError }> => {
  let error: FirebaseAuthError | null = null;

  try {
    await sendPasswordResetEmail(auth, email);
  } catch (_error: FirebaseAuthError | unknown) {
    error = _error as FirebaseAuthError;
  }

  return { error };
};

export default recoveryPasswordHandler;
