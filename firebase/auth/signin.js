/* eslint-disable camelcase */
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import firebase_app from '../config';

const auth = getAuth(firebase_app);

export default async function signIn(email, password) {
  let result = null;
  let error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
    console.log(result);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
