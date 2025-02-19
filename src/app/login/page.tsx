"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Eye, EyeClosed, LockKeyhole, LogIn, Mail } from "lucide-react";
import finance from "@/assets/login/finance.svg";
import { signInUser, signInWithGoogle } from "@/lib/Firebase/auth";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const router = useRouter();


  const handleSeePassword = () => {
    setSeePassword(!seePassword);
  };

  const LoginWithGoogle = async () => {
    try {
      await signInWithGoogle()
      router.push("/system/dashboard")
    } catch (error: any) {
      if (error.code === "auth/invalid-credential") {
        toast.error("E-mail ou senha inválidos")
      } else {
        toast.error("Ocorreu um erro ao fazer login")
      }
    }
  }

  const LoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signInUser(email, password);
      router.push("/system/dashboard");
    } catch (error: any) {
      if (error.code === "auth/invalid-credential") {
        toast.error("E-mail ou senha inválidos")
      } else {
        toast.error("Ocorreu um erro ao fazer login")
      }
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
          <h1 className="text-6xl font-semibold text-primary">Login</h1>
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
            <div className="relative">
              <input
                type={seePassword ? "text" : "password"}
                placeholder="Senha"
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

            <Link
              href="/forget-password"
              className="text-primary font-semibold underline"
            >
              Esqueci minha senha{" "}
            </Link>

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
                <LogIn />
              </button>
            </div>
          </form>
          <div className="w-full flex justify-center">
            <button
              className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100"
              onClick={LoginWithGoogle}
            >
              <FcGoogle className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
