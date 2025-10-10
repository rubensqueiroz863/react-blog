import { UserProps } from "@/types/UserProps";
import UserIcon from "./UserIcon";

export default function UserMenu({ user }: Readonly<{ user: UserProps}>) {
  return (
    <div className="flex px-2 absolute left-2 top-20 w-70 h-65 border rounded-lg border-neutral-700 dark:bg-neutral-800 bg-white">
      <div className="flex w-full h-1/4 dark:text-white gap-2 items-center">
        <UserIcon user={user} text="2xl" padding="px-2"/>
        <p>{user?.name}</p>
      </div>
    </div>
  );
}