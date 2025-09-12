"use client";

import { useMenu } from "@/menu"

export default function MenuButton() {
  const menu = useMenu();

  return (
    <div
      onClick={menu.toggleMenu}
      className="flex flex-col justify-between w-6 h-5 cursor-pointer relative"
    >
      <span
        className={`h-1 w-full dark:bg-gray-200 bg-neutral-900 rounded-lg transition-transform duration-300 ${
          menu.isOpen ? "rotate-45 translate-y-2" : ""
        }`}
      ></span>
      <span
        className={`h-1 w-full dark:bg-gray-200 bg-neutral-900 rounded-lg transition-all duration-300 ${
          menu.isOpen ? "opacity-0" : "opacity-100"
        }`}
      ></span>
      <span
        className={`h-1 w-full dark:bg-gray-200 bg-neutral-900 rounded-lg transition-transform duration-300 ${
          menu.isOpen ? "-rotate-45 -translate-y-2" : ""
        }`}
      ></span>
    </div>
  )
}