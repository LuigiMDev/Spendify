import Image from "next/image";
import Link from "next/link";
import React from "react";

const Main = () => {
  return (
    <main className="max-w-[1280px] mx-auto p-5">
      <div className=" flex flex-col md:flex-row md:justify-between items-center gap-5 h-[calc(100dvh-150px)]">
        <div className="w-full space-y-3 flex flex-col items-center md:items-start">
          <span className="bg-primary-foreground text-primary font-semibold p-1.5 rounded-full inline-block items-start text-center">
            O melhor jeito de controlar seus gastos
          </span>
          <h1 className="text-4xl text-slate-800 font-semibold text-center md:text-left">
            Controle sem complicação
          </h1>
          <p className="text-center md:text-left">
            Tenha total controle das suas finanças com um app simples, visual e
            fácil de usar. Registre seus gastos, acompanhe sua evolução e
            alcance seus objetivos.
          </p>
          <Link
            href="/login"
            className="bg-primary text-white py-3 px-5 rounded-md font-semibold hover:bg-primaryHover transition-all block w-fit"
          >
            Entrar
          </Link>
        </div>

          <Image
            src="/Demonstration.png"
            alt="Demonstração"
            width={400}
            height={500}
            className="object-contain w-full max-h-full"
          />
      
      </div>
      <p className=" text-gray-400 block text-center">
        Desenvolvido por <a href="https://github.com/LuigiMDev" target="_blank" className="text-primary underline">LuigiMDev</a>
      </p>
    </main>
  );
};

export default Main;
