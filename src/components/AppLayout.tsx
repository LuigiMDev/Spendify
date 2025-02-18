"use client";
import React, { useEffect } from "react";
import Header from "./Header";
import Aside from "./Aside/Aside";
import { UserHookContext } from "@/context/UserHookContext";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/Firebase/firebaseConfig";

const AppLayout = ({ children }: { children: React.ReactNode }) => {

  const { authUser } = UserHookContext();
  const router = useRouter();

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (user) => {
      if(!user) {
        router.push("/login")
      }
    })
  })

  return (
    <>
      <Header />
      <Aside />
    </>
  );
};

export default AppLayout;
