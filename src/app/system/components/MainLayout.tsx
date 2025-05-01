'use client'
import React from 'react'
import HookContext from '../context/HookContext';

const MainLayout = ({children}: {children: React.ReactNode}) => {
    const {openAside} = HookContext();
  return (
    <main className={`${openAside ? "lg:ml-[309px]" : "lg:ml-[88px]"} transition-all lg:mt-0 mt-[85px] px-5 py-12`}>{children}</main>
  )
}

export default MainLayout