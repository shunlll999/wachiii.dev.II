'use client'
import { firebase_getApp } from "@/services/firebase"
import { getAuth, onAuthStateChanged, type User } from "firebase/auth"
import { createContext, useEffect, useState } from "react"
import style from '@/styles/Auth.module.css'

export type AuthContextType = {
  user: User | null;
}

const auth = getAuth(firebase_getApp);
export const AuthContext = createContext<AuthContextType>({ user: null });

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ?? null)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [user])

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <div className={style["loading-view"]}>Loading...</div> : children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
