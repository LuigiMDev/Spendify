"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Eye,
  EyeClosed,
  LoaderCircle,
  LockKeyhole,
  LogIn,
  Mail,
} from "lucide-react";
import finance from "@/assets/login/finance.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { string } from "zod";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const router = useRouter();

  const handleSeePassword = () => {
    setSeePassword(!seePassword);
  };

  const LoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsloading(true);
      const userLoged = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (userLoged.status === 401) {
        throw new Error("E-mail ou senha inválidos!");
      }

      if (!userLoged.ok) {
        throw new Error(
          "Ocorreu um erro ao fazer login! Tente novamente mais tarde."
        );
      }

      router.push("/system/dashboard");
      toast.success("Usuário logado com sucesso!");
    } catch (err) {
      console.log(err);
      if (err instanceof Error && err.message === "E-mail ou senha inválidos!") {
        toast.error("E-mail ou senha inválidos!");
      } else {
        toast.error(
          "Ocorreu um erro ao fazer login! Tente novamente mais tarde."
        );
      }
      setIsloading(false);
    }
  };

  return (
    <main
      className="w-full min-h-[100dvh] flex items-center justify-center flex-col"
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
        <div className="bg-gradient-to-br from-green-300 rounded-lg px-5 py-10 to-primary w-full flex-grow flex-1 flex-col items-center justify-around hidden lg:flex ">
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
          <h1 className="text-6xl font-semibold text-primary">Login</h1>
          <form
            onSubmit={(e) => LoginSubmit(e)}
            className="flex flex-col gap-4 w-full"
          >
            <div className="relative">
              <input
                type="email"
                placeholder="E-mail"
                maxLength={100}
                className="outline-primary rounded-lg border-2 border-gray-150 p-2 pl-10 w-full"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-black opacity-50 pointer-events-none" />
            </div>
            <div className="relative">
              <input
                type={seePassword ? "text" : "password"}
                placeholder="Senha"
                maxLength={50}
                minLength={8}
                className="outline-primary rounded-lg border-2 border-gray-150 py-2 px-10 w-full"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-black opacity-50 pointer-events-none" />
              {seePassword ? (
                <Eye
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black opacity-50 cursor-pointer"
                  onClick={handleSeePassword}
                />
              ) : (
                <EyeClosed
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black opacity-50 cursor-pointer"
                  onClick={handleSeePassword}
                />
              )}
            </div>

            <div className="w-full flex justify-between items-center">
              <Link
                href="/register"
                className="text-primary font-semibold underline"
              >
                Registre-se{" "}
              </Link>

              <button
                type="submit"
                className="text-white font-semibold px-4 py-2 bg-primary rounded-xl flex gap-1"
              >
                Entrar
                {isLoading ? (
                  <LoaderCircle className="text-white animate-spin" />
                ) : (
                  <LogIn />
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Page;
