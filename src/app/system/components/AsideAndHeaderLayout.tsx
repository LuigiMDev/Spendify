"use client";
import Image from "next/image";
import React from "react";
import SanduichMenu from "@/app/login/components/SanduichMenu";
import Link from "next/link";
import Navbar from "@/app/login/components/Navbar";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import UserAsideAndHeader from "@/app/login/components/UserAsideAndHeader";
import HookContext from "../context/Aside/HookContext";

const AsideAndHeaderLayout = () => {
  const { openAside, setOpenAside } = HookContext();

  const handleAside = () => {
    setOpenAside(!openAside);
  };

  return (
    <>
      <header className="fixed w-full py-3 px-5 shadow-header lg:hidden bg-white select-none h-[85px] top-0 z-50">
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
        className={`fixed h-screen shadow-header  bg-white hidden lg:flex select-none overflow-hidden transition-all justify-between flex-col ${
          openAside ? "w-[309px]" : "w-[88px]"
        }`}
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
    </>
  );
};

export default AsideAndHeaderLayout;
