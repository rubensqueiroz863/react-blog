"use client";

import { useOverviewMenu } from "@/menu";
import NavBarOverview from "../components/NavBarOverviewTemp";
import OverviewMenuDrawer from "../components/OverviewMenuDrawer";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { UserType } from "@/types/UserType";

export default function OverviewPage() {
  const menu = useOverviewMenu();
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    fetch("https://sticky-charil-react-blog-3b39d9e9.koyeb.app/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
      credentials: "include"
    })

    .then(res => {
      if (!res.ok) throw new Error("Unauthorized");
      return res.json();
    })
    .then(data => setUser(data));
  })

  return (
    <div className="flex flex-col h-screen">
      <NavBarOverview /> {/* h-10 já está aplicado no próprio componente */}

      {/* Container principal em duas colunas */}
      <div className="flex flex-1 overflow-hidden">
        {/* Menu lateral fixo */}
        {(menu.isOpen || menu.isLocked) && (
          <AnimatePresence mode="wait">
            <div className="shrink-0">
              <OverviewMenuDrawer user={user!} />
            </div>
          </AnimatePresence>
        )}

        {/* Conteúdo principal */}
        <div className="flex-1 w-full h-full dark:text-white bg-white dark:bg-neutral-900 p-4 overflow-auto">
          Conteudo
        </div>
      </div>
    </div>
  );
}
