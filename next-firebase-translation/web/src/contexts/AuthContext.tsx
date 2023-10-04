"use client"
import { useEffect, useState, createContext, useContext } from 'react';
import { onAuthStateChanged, signInAnonymously, User } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '@/services/firebase/init';
import { UserData } from '@/types/auth/UserData';
import { useRouter, usePathname } from "next/navigation"

type AC = {
  user: User | false | null;
  userdata: UserData | null;
};

const AuthContext = createContext<AC>({} as AC);

export const useAuth = (): AC => useContext(AuthContext);
export function AuthContextProvider(props: any) {
  const [user, setUser] = useState<User | false | null>(false);
  const [userdata, setUserData] = useState<UserData | null>(null);
  const router = useRouter();
  const path = usePathname();
  const { children } = props;

  // Handle user state changes
  const handleUser = async (user: User | null) => {
    console.log(`user anos ${user?.isAnonymous}`)
    if (user) {
      setUser(user);
      if (!user.isAnonymous) {
        const userRef = doc(db, 'users', user.uid);
        const userDataSnapshot = await getDoc(userRef);

        if (userDataSnapshot.exists()) {
          setUserData(userDataSnapshot.data() as UserData);
          const unsubscribe = onSnapshot(userRef, (snapshot) => {
            setUserData(snapshot.data() as UserData);
          });
          return unsubscribe;
        }
      }
    } else {
      setUser(null);
      setUserData(null);
      if (path.includes('users')) {
        router.push("/")
      }
      signInAnonymously(auth);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleUser);
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userdata,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
