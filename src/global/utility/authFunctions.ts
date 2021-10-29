import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth'


export const registerUser = async (email: string, password: string): Promise<UserCredential> => {
  const auth  = getAuth();
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const loginUser = async (email: string, password: string): Promise<UserCredential> => {
  const auth = getAuth()
  return await signInWithEmailAndPassword(auth, email, password)
}

export const logoutUser = async (): Promise<void> => {
  const auth = getAuth()
  await signOut(auth)
}

export const checkUser = () => {
  return getAuth()
}