"use client";

import { UserType } from "@/types/UserType";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function LogoutMenu() {
  const [user, setUser] = useState<UserType | null>(null);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log("começou")

    if (!token) {
      return;
    }

    fetch("https://sticky-charil-react-blog-3b39d9e9.koyeb.app/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })

      .then(res => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(data => setUser(data))
      .catch(() => setUser(null))
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // <--- limpa o JWT
    localStorage.removeItem("refreshToken");

    fetch("https://sticky-charil-react-blog-3b39d9e9.koyeb.app/logout", {
      method: "POST"
    }).finally(() => {
      setUser(null);
      router.push("/");
    });
  };

  return (
     <button
        onClick={handleLogout}
        className="flex absolute text-sm left-67 top-30 items-center justify-center bg-neutral-700 w-18 h-5 text-white px-3 py-1 rounded-md hover:bg-neutral-600 cursor-pointer transition"
      >
        Sair
      </button>
  );
}