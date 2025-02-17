'use client'
import { DocumentSnapshot } from 'firebase/firestore'
import React, { createContext, useState } from 'react'

type providerProp = {
    children: React.ReactNode
}
type userData = {
    name: string,
    email: string,
    expenses?: []
}

type userContextType = {
    authUser: userData | null,
    setAuth: React.Dispatch<React.SetStateAction<userData | null>>
}

export const UserContext = createContext<userContextType | null>(null);

export const UserProvider: React.FC<providerProp> = ({children}) => {
    const [authUser, setAuth] = useState<null | userData>(null)

    return (
        <UserContext.Provider value={{authUser, setAuth}} >
            {children}
        </UserContext.Provider>
    )
}