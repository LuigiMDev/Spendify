"use client";
import { auth, db } from "@/lib/Firebase/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";

type providerProp = {
  children: React.ReactNode;
};
export type userData = {
  name: string;
  email: string;
  avatar: string;
  expenses?: [];
};

type userContextType = {
  authUser: userData | null;
  setAuth: React.Dispatch<React.SetStateAction<userData | null>>;
};

export const UserContext = createContext<userContextType | null>(null);

export const UserProvider: React.FC<providerProp> = ({ children }) => {
  const [authUser, setAuth] = useState<null | userData>(null);

  useEffect(() => {
    const unsubscrible = auth.onAuthStateChanged( (user) => {
      if (user) {
        try {
          onSnapshot(doc(db, "users", user.uid), (docSnap) => {
            if (docSnap.exists()) {
                const docSnapUser = docSnap.data() as userData;
                setAuth(docSnapUser)
            }
          })
        } catch (error) {
          console.log(error);
        }
      } else {
        setAuth(null);
      }
    });

    return () => unsubscrible();
  }, []);

  return (
    <UserContext.Provider value={{ authUser, setAuth }}>
      {children}
    </UserContext.Provider>
  );
};
