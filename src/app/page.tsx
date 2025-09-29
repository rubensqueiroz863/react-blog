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
        <LoadingSpinner message="Carregando..." width="w-18 mb-40" height="h-18" />
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
      <div className="flex flex-col w-full items-center text-center text-3xl md:text-5xl font-Inter font-extrabold">
        <p>Um espaço criativo</p>
        <p>que transforma ideias</p>
      </div>
      <div className="flex flex-col my-6 text-center items-center justify-center text-md">
        Um espaço onde ideias se encontram, <br/>tarefas se simplificam e projetos ganham vida
      </div>
      <div className="flex justify-center mb-10">
        {!user ? (
            <Link href="/signin">
              <div className="bg-blue-500 cursor-pointer text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
                Começar Agora
              </div>
            </Link>
          ) : (
          <Link href="/overview">
            <div className="bg-blue-500 cursor-pointer text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
              Continuar
            </div>
          </Link>
          )
        }
      </div>
    </div>
  );
}
