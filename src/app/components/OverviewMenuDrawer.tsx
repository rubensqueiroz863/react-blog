"use client";

import { useOverviewMenu } from "@/menu";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import UserMenu from "./UserMenu";
import { UserProps } from "@/types/UserProps";
import UserIcon from "./UserIcon";

export default function OverviewMenuDrawer({ user }: Readonly<{ user: UserProps}>) {
  const [width, setWidth] = useState(250);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const isResizing = useRef(false);
  const menu = useOverviewMenu();

  const handleShowUserMenu = () => {
    if (!showUserMenu) {
      setShowUserMenu(true);
    } else {
      setShowUserMenu(false);
    }
  }

  useEffect(() => {
    const handleLeave = (e: MouseEvent) => {
      if (e.clientX < width) return;
      menu.closeMenu();
    }
    document.addEventListener("mousemove", handleLeave);
    return () => document.removeEventListener("mousemove", handleLeave);
  }, [width, menu])

  const handleMouseDown = () => {
    isResizing.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current || e.clientX > 400) return;
    setWidth(Math.max(250, e.clientX)); // largura mínima de 250px
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp); // ✅ remover corretamente
  };

  return (
    <div className={`flex ${menu.isLocked ? "" : "fixed left-0 top-0 py-10"} h-screen pointer-events-none`}>
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        style={{ width }}
        className="flex h-full pointer-events-auto" // 👈 reativa aqui
        onMouseLeave={() => {
          if (!menu.isLocked) menu.closeMenu();
        }}
      >
        <div
          className={`flex ${
            menu.isLocked
              ? "h-full w-full m-0"
              : "h-2/3 m-2 rounded-sm"
          } bg-gray-300 dark:bg-neutral-800 w-full`}
        >
          {/* este bloco agora funciona com hover */}
          <button
            onClick={handleShowUserMenu}
            className={`flex m-1 rounded-md w-full h-8 items-center gap-2 p-2 ${showUserMenu ? "bg-[#333333]" : ""} hover:bg-[#333333] transition-all cursor-pointer`}
          >
            <UserIcon user={user} width={"6"} height={"6"}/>
            <p className="dark:text-white">{user?.name}</p>
            
          </button>
          { showUserMenu ? (
              <UserMenu user={user} />
            ): (
              <div></div>
          )}

          {/* botão de resize também precisa responder */}
          <button
            onMouseDown={handleMouseDown}
            className="flex cursor-ew-resize ml-auto w-0.5 h-full"
          />
        </div>
      </motion.div>
    </div>

  );

}
