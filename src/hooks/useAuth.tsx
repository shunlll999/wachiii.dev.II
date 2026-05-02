import { auth, getUserByUid } from "@/services/firebase";
import { onAuthStateChanged, type User } from "firebase/auth";
import { useEffect, useState } from "react";

type Metadata = {
  createdAt: string
  creationTime: string
  lastLoginAt: string
  lastSignInTime: string
}

type UseAuthReturnType = {
email: string
emailVerified: boolean
id: string
metadata: Metadata
phoneNumber: string
photoURL: string
role: string
uid: string
}

export const useAuth = () => {
  const [user, setUser] = useState<UseAuthReturnType | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
          getUserByUid(user.uid).then((userData) => {
            setUser(userData as UseAuthReturnType);
          }).catch((error) => {
            setError(true);
            throw new Error("Error fetching user data:", error);
          });
        }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  return {
    loading, user, error
  }
}
