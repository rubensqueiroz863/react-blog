"use client";

import { UserProps } from "@/types/UserProps";

interface UserIconProps {
  readonly user: UserProps;
  readonly width?: string;
  readonly height?: string;
  readonly text?: string;
  readonly padding?: string;
}

export default function UserIcon({ user, width = "8", height = "8", text = "md", padding = "0" }: UserIconProps) {
  return (
    <div
      className={`flex font-bold ${padding} text-${text} text-neutral-400 bg-neutral-700 justify-center items-center rounded-sm w-${width} h-${height}`}
    >
      {user?.name?.at(0)?.toUpperCase()}
    </div>
  );
}
