"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

type UserType = {
  sub?: string;          // ID do usuário no OAuth
  name?: string;         // Nome completo
  given_name?: string;   // Primeiro nome
  family_name?: string;  // Sobrenome
  picture?: string;      // URL da imagem
  email?: string;        // Email
  email_verified?: boolean; // Se o email foi verificado
};


export default function LoginButton() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://sticky-charil-react-blog-3b39d9e9.koyeb.app/auth/me", {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      credentials: "include" // permite enviar cookies JSESSIONID do OAuth2
    })
      .then(res => {
        if (!res.ok) return; // res.ok = false se 401 ou 403
        return res.json();
      })
      .then(data => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);



  const handleLogout = () => {
    setIsLoading(true);
    localStorage.removeItem("token"); // <--- limpa o JWT

    fetch("https://sticky-charil-react-blog-3b39d9e9.koyeb.app/logout", {
      credentials: "include",
      method: "POST"
    }).finally(() => {
      setUser(null);
      setIsLoading(false);
      window.location.href = "/";
    });
  };


  if (isLoading) return <LoadingSpinner message="" width="w-6" height="h-6" />;

  if (user) {
    return (
      <>
        <div className="relative p-1 transition-all hover:bg-gray-200 rounded-full">
          <Image
            src={user.picture || "https://i.postimg.cc/qR0CxJnP/default-avatar-icon-of-social-media-user-vector.jpg"}
            alt={user.name || "User Image"}
            width={128}
            height={128}
            className="w-8 h-8 rounded-full object-cover cursor-pointer"
          />
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
        >
          Sair
        </button>
      </>
    );
  }

  return (
    <Link href="/signin" onClick={() => setIsLoading(true)}>
      <div className="bg-blue-500 text-white px-5 py-1 rounded-lg hover:bg-blue-700 transition">
        Começar Agora
      </div>
    </Link>
  );
}
