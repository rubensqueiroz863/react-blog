import { UserProps } from "@/types/UserProps";
import UserIcon from "./UserIcon";
import Image from "next/image";
import { useSettingsMenu } from "@/menu";
import { texts } from "@/lib/translate";

export default function UserMenu({ user }: Readonly<{ user: UserProps}>) {
  const useMenu = useSettingsMenu()
  const handleShowSettings = () => {
    useMenu.toggleMenu();
  }

  return (
    <div className="flex flex-col px-3 absolute left-4 top-20 w-70 h-65 border rounded-lg border-neutral-700 dark:bg-neutral-800 bg-white">
      <div className="flex w-full h-1/4 dark:text-white gap-2 items-center">
        <UserIcon user={user} text="3xl" padding="px-5 py-5"/>
        <div className="">
          <p className="text-sm">{user?.name}</p>
          <p className="text-xs text-neutral-400">0 blogs</p>
        </div>
        
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleShowSettings}
          className="flex items-center border text-neutral-500 rounded-lg cursor-pointer px-0.5 pr-1.5"
        >
          <Image
            src={"https://i.postimg.cc/4ykqVqbW/Gear-icon.png"}
            width={24}
            height={24}
            alt="settings"
          />
          {texts.SettingName}
        </button>
        <button
          className="flex items-center border text-neutral-500 rounded-lg cursor-pointer px-0.5 pr-1.5"
        >
          {texts.inviteName}
        </button>
      </div>
    </div>
  );
}