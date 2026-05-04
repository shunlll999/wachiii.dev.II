
import { getApps, initializeApp } from 'firebase/app';
import { getAnalytics, type Analytics } from 'firebase/analytics';
import { getAuth, signOut, User } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'


// Must use literal access (not process.env[key]) so Next.js can inline NEXT_PUBLIC_ vars in the client bundle
const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId:     process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
};

// Register
export async function register(email: string, password: string, role = 'user') {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const { uid } = userCredential.user;
  await setDoc(doc(db, 'users', uid), { uid, email, role });
}

// Login
export async function login(email: string, password: string): Promise<User> {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

export const logout = async (callback: () => void) => {
  await signOut(auth)
  if (callback)callback();
}


export const getUserByUid = async (uid: string) => {
  const snap = await getDoc(doc(db, 'users', uid))
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() }
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app)
export const firebase_getApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const analytics: Analytics | null =
  typeof window !== 'undefined' ? getAnalytics(app) : null;
