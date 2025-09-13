"use client";

import { useOverviewMenu } from "@/menu"

export default function OverviewMenuButton() {
  const menu = useOverviewMenu();

  return (
    <div
      onClick={menu.toggleMenu}
      onMouseEnter={menu.openMenu}
      className="flex flex-col justify-between w-5 h-4 mt-1 cursor-pointer relative"
    >
      <span
        className={`h-0.5 w-full dark:bg-neutral-200 bg-neutral-900 rounded-lg transition-transform duration-300 ${
          menu.isOpen ? "rotate-45 translate-y-2" : ""
        }`}
      ></span>
      <span
        className={`h-0.5 w-full dark:bg-neutral-200 bg-neutral-900 rounded-lg transition-all duration-300 ${
          menu.isOpen ? "opacity-0" : "opacity-100"
        }`}
      ></span>
      <span
        className={`h-0.5 w-full dark:bg-neutral-200 bg-neutral-900 rounded-lg transition-transform duration-300 ${
          menu.isOpen ? "-rotate-45 -translate-y-1.5" : ""
        }`}
      ></span>
    </div>
  )
}