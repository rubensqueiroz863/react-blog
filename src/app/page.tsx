"use client";

import Image from "next/image";
import Link from "next/link";
import LoadingSpinner from "./components/LoadingSpinner";
import NavBarHome from "./components/NavBarHome";
import { useEffect, useState } from "react";
import { UserType } from "@/types/UserType";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserType | null>(null);

  const [texts, setTexts] = useState({
    initialText1: "Um espaço criativo",
    initialText2: "que transforma ideias",
    initialSubText1: "Um espaço onde ideias se encontram,",
    initialSubText2: "tarefas se simplificam e projetos ganham vida",
    redirectSignIn: "Começar",
  });

  useEffect(() => {
    const lang = navigator.language;
    
    if (lang === "pt-BR") {
      setTexts({
        initialText1: "Um espaço criativo",
        initialText2: "que transforma ideias",
        initialSubText1: "Um espaço onde ideias se encontram,",
        initialSubText2: "tarefas se simplificam e projetos ganham vida",
        redirectSignIn: "Começar",
      });
    } else {
      setTexts({
        initialText1: "A creative space",
        initialText2: "that transforms ideas",
        initialSubText1: "A space where ideas meet,",
        initialSubText2: "tasks become simpler, and projects come to life.",
        redirectSignIn: "Get started",
      });
    }
  }, []);


  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoading(false);
      return;
    }

    fetch("https://sticky-charil-react-blog-3b39d9e9.koyeb.app/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include"
    })

      .then(res => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(data => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <LoadingSpinner width="w-18 mb-40" height="h-18" />
      </div>
    )
  }
  
  return (
    <div>
      <NavBarHome />
      <div className="flex sm:gap-5 gap-10 justify-center items-center py-14 px-8 my-6">
        <Image 
          src="https://i.postimg.cc/FR1h8trR/wired-outline-245-edit-document-hover-pinch.gif"
          alt="Ilustração de boas-vindas"
          width={118}
          height={118}
          className="w-25 sm:w-20 md:w-35 xl:w-45 rotate-2"
        />
        <Image 
          src="https://i.postimg.cc/MHK3dxqP/wired-outline-478-computer-display-hover-angle.gif"
          alt="Ilustração de boas-vindas"
          width={168}
          height={168}
          className="w-30 md:w-40 xl:w-50 -rotate-4"
        />
        <Image 
          src="https://i.postimg.cc/YSrF4S3s/wired-outline-981-consultation-hover-conversation.gif"
          alt="Ilustração de boas-vindas"
          width={118}
          height={118}
          className="w-25 md:w-35 xl:w-45 rotate-4"
        />
      </div>
      <div className="flex flex-col w-full items-center text-center text-3xl md:text-5xl font-mono font-black">
        <p>{texts.initialText1}</p>
        <p>{texts.initialText2}</p>
      </div>
      <div className="flex flex-col font-serif my-6 text-center items-center justify-center text-md">
        {texts.initialSubText1}<br/>{texts.initialSubText2}
      </div>
      <div className="flex justify-center mb-10">
        <Link href="/signin">
          <div className="bg-blue-500 cursor-pointer text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
            {texts.redirectSignIn}
          </div>
        </Link>
      </div>
    </div>
  );
}
