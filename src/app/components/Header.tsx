import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <>
      <header className="fixed py-3 px-4 bg-white shadow-header w-full h-20">
        <div className="max-w-[1280px] m-auto flex justify-between items-center">
          <Link href="/">
            <Image
              className="w-48"
              src="/spendifyLogoHorizontal.svg"
              width={700}
              height={250}
              alt="Spendify"
              quality={100}
            />
          </Link>
          <Link
            href="/login"
            className="bg-primary text-white py-3 px-5 rounded-md font-semibold hover:bg-primaryHover transition-all"
          >
            Entrar
          </Link>
        </div>
      </header>
      <div className="h-20"></div>
    </>
  );
};

export default Header;
