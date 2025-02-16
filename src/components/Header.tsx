import Image from "next/image";
import React from "react";
import SanduichMenu from "./SanduichMenu";
import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed w-full py-3 px-5 shadow-header lg:hidden bg-white select-none">
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
  )
}

export default Header