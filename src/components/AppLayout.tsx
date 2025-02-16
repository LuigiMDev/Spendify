import Image from "next/image";
import React from "react";
import SanduichMenu from "./SanduichMenu";
import Link from "next/link";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="fixed w-full py-3 px-5 shadow-header lg:hidden">
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

      <aside className="fixed h-screen shadow-header px-5 py-10">
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
      </aside>

    </>
  );
};

export default AppLayout;
