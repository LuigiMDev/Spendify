"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import Navbar from "./Navbar";
import { PanelRightClose, PanelRightOpen } from "lucide-react";

const Aside = () => {
  const [openAside, setOpenAside] = useState(true);

  const handleAside = () => {
    setOpenAside(!openAside);
  };

  return (
    <aside
      className={`fixed h-screen shadow-header px-5 py-10 bg-white hidden lg:block select-none overflow-hidden transition-all`}
    >
      <div className="flex justify-between items-center">
        <Link
          href="/dashboard"
          className={`flex items-center gap-3 w-auto  transition-all overflow-hidden`}
        >
          <Image
            className={`h-16 ${
                !openAside && "w-0"
              } transition-all`}
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
    </aside>
  );
};

export default Aside;
