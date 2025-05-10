'use client'
import React, { createContext, useState } from 'react'

type contextType = {
    openAside: boolean
    setOpenAside: React.Dispatch<React.SetStateAction<boolean>>
}

export const asideContext = createContext<contextType | null>(null)

const AsideContext = ({children}: {children: React.ReactNode}) => {
    const [openAside, setOpenAside] = useState(true);

  return (
    <asideContext.Provider value={{openAside, setOpenAside}}>
        {children}
    </asideContext.Provider>
  )
}

export default AsideContext