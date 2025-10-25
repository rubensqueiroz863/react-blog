"use client";

import { useOverviewMenu, useSettingsMenu } from "@/menu";
import NavBarOverview from "../components/NavBarOverviewTemp";
import OverviewMenuDrawer from "../components/OverviewMenuDrawer";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { UserType } from "@/types/UserType";
import SettingsMenu from "../components/SettingsMenu";

export default function OverviewPage() {
  const menu = useOverviewMenu();
  const settingsMenu = useSettingsMenu();
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) window.location.href = "/signin"; // ou redirecionar para login

    fetch("https://sticky-charil-react-blog-3b39d9e9.koyeb.app/auth/me", {
      headers: { Authorization: `Bearer ${token}` }
    })


    .then(res => {
      if (!res.ok) throw new Error("Unauthorized");
      return res.json();
    })
    .then(data => setUser(data));
  }, []);

  return (
    <div>
      {settingsMenu.isOpen && (
        <>
          {/* Fundo escuro */}
          <div className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"></div>

          {/* Menu de configurações sobreposto */}
          <div className="fixed inset-0 z-50">
            <SettingsMenu onClose={settingsMenu.closeMenu}/>
          </div>
        </>
      )}

      <div className="flex bg-neutral-900 flex-col h-screen">
        <NavBarOverview />

        <div className="flex flex-1 overflow-hidden">
          {(menu.isOpen || menu.isLocked) && (
            <AnimatePresence mode="wait">
              <div className="shrink-0">
                {user && <OverviewMenuDrawer user={user} />}
              </div>
            </AnimatePresence>
          )}

          <div className="flex-1 w-full h-full dark:text-white bg-white dark:bg-neutral-900 p-4 overflow-auto">
            ok
          </div>
        </div>
      </div>
    </div>
  );
}
