"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Mail, Send } from "lucide-react";
import finance from "@/assets/login/finance.svg";
import { ForgetPassword } from "@/lib/Firebase/auth";
import Link from "next/link";
import { toast } from "react-toastify";

const page = () => {
  const [email, setEmail] = useState("");


  const LoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      ForgetPassword(email);
      toast.success("E-mail enviado! Verifique sua caixa de entrada para as instruções de redefinição de senha.")
    } catch (error) {
      toast.error("Ocorreu um erro ao fazer a solicitação de recuperação de senha")
    }
  };

  return (
    <main
      className="w-full min-h-screen flex items-center justify-center flex-col"
      style={{ backgroundImage: "url(/Login/loginBackground.svg)" }}
    >
        <Image
                className="w-60 mb-5 block lg:hidden"
                src="/spendifyLogoHorizontalSemFundo.svg"
                width={700}
                height={250}
                alt="Spendify"
                quality={100}
              />
      <section className="flex shadow-header rounded-lg lg:max-w-[70%] max-w-[90%] bg-white w-full flex-shrink-0">
      <div className="bg-gradient-to-br from-green-300 rounded-lg px-5 py-10 to-primary w-full flex-grow flex-1 flex-col items-center justify-around hidden lg:flex">
          <Image
            className="w-48"
            src="/spendifyLogoHorizontalWhite.svg"
            width={700}
            height={250}
            alt="Spendify"
            quality={100}
          />

          <h1 className="text-4xl text-center text-white font-semibold">
            Controle seus gastos, conquiste seus objetivos!
          </h1>
          <Image src={finance} alt="SVG animado" />
        </div>

        <div className="flex flex-col px-5 py-10 flex-1 w-[40vw] items-center justify-center gap-10">
          <h1 className="text-6xl font-semibold text-primary text-center">Recuperar senha</h1>
          <form
            onSubmit={(e) => LoginSubmit(e)}
            className="flex flex-col gap-4 w-full"
          >
            <div className="relative">
              <input
                type="email"
                placeholder="E-mail"
                className="outline-primary rounded-lg border-2 border-gray-150 p-2 pl-10 w-full"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-black opacity-50 pointer-events-none" />
            </div>

            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col gap-3">
                <Link
                  href="/login"
                  className="text-primary font-semibold underline"
                >
                  Fazer Login{" "}
                </Link>
              </div>

              <button
                type="submit"
                className="text-white font-semibold px-4 py-2 bg-primary rounded-xl flex gap-1"
              >
                Enviar
                <Send />
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default page;
