"use client";

import { useOverviewMenu } from "@/menu";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function OverviewMenuDrawer() {
  const [width, setWidth] = useState(200);
  const isResizing = useRef(false);
  const menu = useOverviewMenu();

  useEffect(() => {
    const handleLeave = (e: MouseEvent) => {
      if (e.clientX < width) return;
      menu.closeMenu();
    }
    document.addEventListener("mousemove", handleLeave);
    return () => document.removeEventListener("mousemove", handleLeave);
  }, [width])

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
    <div className={`flex ${menu.isLocked ? "" : "fixed left-0 top-0 py-10"} h-full pointer-events-none`}> {/* ❌ sem fixed */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        style={{ width }}
        className="flex h-full"
        onMouseLeave={() => {
          if (!menu.isLocked) menu.closeMenu();
        }}
      >
        <div
          className={`flex ${
            menu.isLocked
              ? "h-full w-full pointer-events-auto m-0"
              : "h-2/3 m-2 rounded-lg"
          } bg-gray-300 dark:bg-neutral-700 w-full`}
        >
          div
          <button
            onMouseDown={handleMouseDown}
            className="flex cursor-ew-resize ml-auto w-1 h-full"
          />
        </div>
      </motion.div>
    </div>
  );

}
