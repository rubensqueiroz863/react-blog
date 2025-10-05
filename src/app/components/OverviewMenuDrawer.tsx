"use client";

import { useOverviewMenu } from "@/menu";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

export default function OverviewMenuDrawer() {
  const [width, setWidth] = useState(150);
  const isResizing = useRef(false);
  const menu = useOverviewMenu();

  const handleMouseDown = () => {
    isResizing.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current) return;
    setWidth(Math.max(200, e.clientX)); // largura mínima de 200px
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp); // ✅ remover corretamente
  };

  return (
    <div className="flex fixed left-0 top-0 h-screen py-10 pointer-events-none">
      <motion.div 
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        onMouseLeave={menu.closeMenu}
        style={{ width }}
        className="flex h-screen"
      >
        <div className={`flex ${menu.isLocked ? "h-full w-full pointer-events-auto m-0" : "m-2 rounded-lg"} bg-gray-300 dark:bg-neutral-700 w-full`}>
          <button
            onMouseDown={handleMouseDown}
            className="flex cursor-ew-resize ml-auto w-1 h-full bg-red-900"
          />
        </div>
      </motion.div>
    </div>
  );
}
