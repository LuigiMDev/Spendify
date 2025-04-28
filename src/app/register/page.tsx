"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Eye, EyeClosed, LockKeyhole, LogIn, Mail, User } from "lucide-react";
import finance from "@/assets/login/finance.svg";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState(true)
  const [seePassword, setSeePassword] = useState(false);
  const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);

  const router = useRouter();

  useEffect(() => {
    confirmPassword === password
    ? setVerifyPassword(true)
    : setVerifyPassword(false);
  }, [confirmPassword, password])

  const handleSeePassword = () => {
    setSeePassword(!seePassword);
  };
  const handleSeeConfirmPassword = () => {
    setSeeConfirmPassword(!seeConfirmPassword);
  };

  const RegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (verifyPassword) {
        const newUser = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password, confirmPassword }),
        })
        console.log(await newUser.json());
        router.push("/system/dashboard");
      }
    } catch (err) {
      console.log(err);
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
          <h1 className="text-6xl font-semibold text-primary">Registrar</h1>
          <form
            onSubmit={(e) => RegisterSubmit(e)}
            className="flex flex-col gap-4 w-full"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Nome de usuário"
                className="outline-primary rounded-lg border-2 border-gray-150 p-2 pl-10 w-full"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-black opacity-50 pointer-events-none" />
            </div>
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
            <div className="relative">
              <input
                type={seeConfirmPassword ? "text" : "password"}
                placeholder="Confirmar Senha"
                className="outline-primary rounded-lg border-2 border-gray-150 py-2 px-10 w-full"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-black opacity-50 pointer-events-none" />
              {seeConfirmPassword ? (
                <Eye
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black opacity-50 cursor-pointer"
                  onClick={handleSeeConfirmPassword}
                />
              ) : (
                <EyeClosed
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black opacity-50 cursor-pointer"
                  onClick={handleSeeConfirmPassword}
                />
              )}
            </div>
            {!verifyPassword && (
              <span className="text-red-600">As senhas devem ser iguais!</span>
            )}

            <div className="w-full flex justify-between">
              <Link
                href="/login"
                className="text-primary font-semibold underline"
              >
                Fazer login
              </Link>

              <button
                type="submit"
                className="text-white font-semibold px-4 py-2 bg-primary rounded-xl flex gap-1"
              >
                Cadastrar
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
