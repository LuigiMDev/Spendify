'use client'
import Image from "next/image";
import React, { useState } from "react";
import SanduichMenu from "@/components/SanduichMenu";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import UserAsideAndHeader from "@/components/UserAsideAndHeader";


const layout = ({ children }: { children: React.ReactNode }) => {

  const [openAside, setOpenAside] = useState(true);
  
    const handleAside = () => {
      setOpenAside(!openAside);
    };

  return (
    <>
      <header className="fixed w-full py-3 px-5 shadow-header lg:hidden bg-white select-none h-[85px] top-0">
        <div className="w-full flex justify-between items-center ">
          <Link href="/dashboard">
          <Image
            className="w-48"
            src="/spendifyLogoHorizontal.svg"
            width={700}
            height={250}
            alt="Spendify"
            quality={100}
          />
          </Link>
          <SanduichMenu />
        </div>
      </header>

      <aside
      className={`fixed h-screen shadow-header  bg-white hidden lg:flex select-none overflow-hidden transition-all justify-between flex-col ${openAside ? "w-[309px]" : "w-[88px]"}`}
    >
      <div className="px-5 py-10">
        <div className="flex justify-between items-center">
          <Link
            href="/dashboard"
            className={`flex items-center gap-3 w-auto  transition-all overflow-hidden`} 
          >
            <Image
              className={`h-16 ${!openAside && "w-0"} transition-all`}
              src="/spendifyLogoHorizontal.svg"
              width={200}
              height={64}
              alt="Spendify"
              quality={100}
            />
          </Link>
          <div
            className="text-black cursor-pointer p-3 bg-gray-50 hover:bg-gray-100  rounded-lg transition-all"
            onClick={handleAside}
          >
            {openAside ? <PanelRightOpen /> : <PanelRightClose />}
          </div>
        </div>
        <div className="w-full h-[2px] bg-black opacity-30 my-5"></div>
        <Navbar openAside={openAside} />
      </div>
      <UserAsideAndHeader openAside={openAside} />
    </aside>


      <main className={`${openAside ? "lg:ml-[309px]" : "lg:ml-[88px]"} transition-all lg:mt-0 mt-[85px] px-5 py-12`}>{children}</main>
    </>
  );
};

export default layout;
