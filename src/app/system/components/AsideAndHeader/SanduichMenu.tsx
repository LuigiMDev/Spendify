"use client";
import React, { useState } from "react";
import Navbar from "./Navbar";
import UserAsideAndHeader from "./UserAsideAndHeader";

const SanduichMenu = () => {
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
    console.log(menu);
  };

  return (
    <>
      <div
        className="cursor-pointer relative w-7 h-[22px]"
        onClick={handleMenu}
      >
        <div className="z-50 flex justify-center items-center flex-col gap-2 relative w-full h-full">
          <div
            className={`${
              menu && "-rotate-45 absolute bottom-1/2"
            } bg-black w-7 h-[2px] transition-all`}
          ></div>
          <div
            className={`${
              menu && "hidden"
            } bg-black w-7 h-[2px] transition-all`}
          ></div>
          <div
            className={`${
              menu && "rotate-45 absolute bottom-1/2"
            } bg-black w-7 h-[2px] transition-all`}
          ></div>
        </div>
      </div>

      <div
        className={`${
          menu ? "opacity-30" : "opacity-0 pointer-events-none"
        } w-screen h-[100vh] bg-black fixed top-0 left-0 transition-all durations 300 lg:hidden z-40`}
        onClick={handleMenu}
      ></div>

      <div
        className={`fixed ${
          menu ? "-translate-x-full" : "translate-x-0"
        } left-full bg-white h-[100dvh] shadow-header top-0 transition-all duration-500 pt-24 w-[80vw] md:w-[50vw] lg:hidden px-5 z-40 flex`}
      >
        <div className="flex flex-col justify-between flex-grow">
          <div className="pl-5">
            <div className="w-full h-[2px] bg-black opacity-30 mb-5"></div>
            <Navbar />
          </div>
          <UserAsideAndHeader />
        </div>
      </div>
    </>
  );
};

export default SanduichMenu;
