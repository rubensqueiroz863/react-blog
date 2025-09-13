"use client"

import OverviewMenuButton from "./OverviewMenuButton";
import { useOverviewMenu } from "@/menu";

export default function NavbarOverview() { 
  const menu = useOverviewMenu()
  
  return (
    <div
      onMouseLeave={menu.closeMenu}
      className="flex h-10 px-4 py-2 justify-between w-full bg-white dark:bg-neutral-800">
      <OverviewMenuButton />
    </div>
  )
}