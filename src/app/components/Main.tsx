import Image from "next/image";
import Link from "next/link";
import React from "react";

const Main = () => {
  return (
    <main className="max-w-[1280px] mx-auto py-5">
      <div className=" flex justify-between items-center gap-5 h-[calc(100vh-150px)]">
        <div className="flex-1 space-y-3">
          <span className="bg-primary-foreground text-primary font-semibold p-1.5 rounded-full inline-block items-start">
            O melhor jeito de controlar seus gastos
          </span>
          <h1 className="text-4xl text-slate-800 font-semibold">
            Controle sem complicação
          </h1>
          <p>
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
        <div className="relative h-96 flex-1">
          <Image
            src="/Demonstration.png"
            alt="Demonstração"
            fill
            className="object-contain"
          />
        </div>
      </div>
      <p className=" text-gray-400 block text-center">
        Desenvolvido por <a href="https://github.com/LuigiMDev" target="_blank" className="text-primary underline">LuigiMDev</a>
      </p>
    </main>
  );
};

export default Main;
