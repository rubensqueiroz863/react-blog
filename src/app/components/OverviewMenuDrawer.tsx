"use client";

import { useOverviewMenu } from "@/menu";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface UserProps {
  id?: string;
  name?: string;
  email?: string;
  picture?: string;
}

export default function OverviewMenuDrawer({ user }: { user: UserProps}) {
  const [width, setWidth] = useState(250);
  const isResizing = useRef(false);
  const menu = useOverviewMenu();

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
    setWidth(Math.max(250, e.clientX)); // largura mínima de 200px
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
          <div className="flex m-1 rounded-md w-full h-8 items-center gap-1 p-1 hover:bg-neutral-700 transition-all cursor-pointer">
            <div className="flex font-bold w-6 h-6 border justify-center">
              {user?.name?.at(0)}
            </div>
            <p className="dark:text-white">{user?.name}</p>
          </div>

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
