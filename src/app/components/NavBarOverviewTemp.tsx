"use client"

import OverviewMenuButton from "./OverviewMenuButton";

export default function NavBarOverview() { 

  return (
    <div

      className="flex h-10 px-4 py-2 justify-between w-full bg-white dark:bg-neutral-800">
      <OverviewMenuButton />
    </div>
  )
}