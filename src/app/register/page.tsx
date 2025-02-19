"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Eye, EyeClosed, LockKeyhole, LogIn, Mail, User } from "lucide-react";
import finance from "@/assets/login/finance.svg";
import { signInWithGoogle, signUpUser } from "@/lib/Firebase/auth";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(true);
  const [seePassword, setSeePassword] = useState(false);
  const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);

  const router = useRouter();

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value === password
      ? setConfirmPassword(true)
      : setConfirmPassword(false);
  };

  const handleSeePassword = () => {
    setSeePassword(!seePassword);
  };
  const handleSeeConfirmPassword = () => {
    setSeeConfirmPassword(!seeConfirmPassword);
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

  const RegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (confirmPassword) {
        await signUpUser(name, email, password);
      }
      router.push("/dashboard");
    } catch (error: any) {
      if (error.code === "auth/weak-password") {
        toast.error("A senha precisa ter no mínimo 6 dígitos")
      } else {
        toast.error("Ocorreu um erro ao fazer o cadastro")
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
                onChange={(e) => handleConfirmPassword(e)}
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
            {!confirmPassword && (
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
