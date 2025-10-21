"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { UserType } from "@/types/UserType";
import { texts } from "@/lib/translate";

export default function LoginButton() {
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


  if (isLoading) return <LoadingSpinner width="w-6" height="h-6" />;

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
        {"delelopment button"}
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
        {texts.signInBtnName1}
      </div>
    </Link>
  );
}
