"use client";
import React, { useState } from "react";
import Image from "next/image";
import { LockKeyhole, LogIn, Mail, User } from "lucide-react";
import finance from "@/assets/login/finance.svg"
import { signUpUser } from "@/lib/Firebase/auth";

const page = () => {

    const [login, setLogin] = useState(true)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        signUpUser(name, email, password)
    }

  return (
    <main className="w-full min-h-screen flex items-center justify-center" style={{backgroundImage: "url(/Login/loginBackground.svg)"}}>
      <section className="flex shadow-header rounded-lg lg:max-w-[70%] bg-white">

      <div className="bg-gradient-to-br from-green-300 rounded-lg px-5 py-10 to-primary w-full flex-grow flex-1 flex flex-col items-center justify-around">
          <Image
            className="w-48"
            src="/spendifyLogoHorizontalWhite.svg"
            width={700}
            height={250}
            alt="Spendify"
            quality={100}
          />

          <h1 className="text-4xl text-center text-white font-semibold">Controle seus gastos, conquiste seus objetivos!</h1>
          <Image src={finance} alt="SVG animado" />
      </div>

        <div className="flex flex-col px-5 py-10 flex-1 w-[40vw] items-center justify-center gap-10">
            <h1 className="text-6xl font-semibold text-primary">Login</h1>
            <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4 w-full">
                <div className="relative">
                    <input
                      type="text"
                      placeholder="Nome"
                      className="outline-primary rounded-lg border-2 border-gray-150 p-2 pl-10 w-full"
                    onChange={(e) => setName(e.target.value)}/>
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-black opacity-50 pointer-events-none" />
                </div>
                <div className="relative">
                    <input
                      type="email"
                      placeholder="Email"
                      className="outline-primary rounded-lg border-2 border-gray-150 p-2 pl-10 w-full"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-black opacity-50 pointer-events-none" />
                </div>
                <div className="relative">
                    <input
                      type="password"
                      placeholder="Senha"
                      className="outline-primary rounded-lg border-2 border-gray-150 p-2 pl-10 w-full"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-black opacity-50 pointer-events-none" />
                </div>
                
                <div className="w-full flex justify-between">
                    <button className="text-primary font-semibold underline">Registre-se </button>
                    <button type="submit" className="text-white font-semibold px-4 py-2 bg-primary rounded-xl flex gap-1">
                        Entrar
                        <LogIn />
                        </button>
                        
                </div>
            </form>
        </div>
      </section>
    </main>
  );
};

export default page;
