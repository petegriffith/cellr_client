import { getAuth, createUserWithEmailAndPassword, UserCredential } from 'firebase/auth'


export const registerUser = async (email: string, password: string): Promise<UserCredential> => {
  const auth  = getAuth();
  return await createUserWithEmailAndPassword(auth, email, password)
}