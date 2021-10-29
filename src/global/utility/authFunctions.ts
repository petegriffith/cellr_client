import { FirebaseError } from '@firebase/util';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth'


export const registerUser = async (email: string, password: string): Promise<UserCredential | void> => {
  const auth  = getAuth();
  try {
    return await createUserWithEmailAndPassword(auth, email, password)
  }  catch (err: unknown) {
    if (err instanceof FirebaseError) {
      const errorMessage = `Something went wrong! I will improve error handling, but this is the error code: ${err.code}`
      alert(errorMessage)
    }
  }
}

export const loginUser = async (email: string, password: string): Promise<UserCredential | void> => {
  const auth = getAuth()
  try {
    return await signInWithEmailAndPassword(auth, email, password)
  } catch (err: unknown) {
    if (err instanceof FirebaseError) {
      const errorMessage = `Something went wrong! I will improve error handling, but this is the error code: ${err.code}`
      alert(errorMessage)
    }
  }
}

export const logoutUser = async (): Promise<void> => {
  const auth = getAuth();
  await signOut(auth);
};

export const checkFirebaseUser = () => {
  return getAuth()
}