import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function LoginButton() {
  const { data: session } =  useSession();
  if (session) {
    return (
      <>
        <div className="relative p-1 hover:bg-gray-200 rounded-full transition">
          <Image
            src={session.user?.image || ""}
            alt={session.user?.name || "User Image"}
            width={128}
            height={128}
            className="w-8 h-8 rounded-full bg-gray-400 cursor-pointer object-cover"
          />
          {/* Aqui você pode colocar um menu dropdown */}
        </div>
        <button onClick={() => {signOut()}} className="bg-red-500 cursor-pointer text-white px-5 py-1 rounded-lg hover:bg-red-700 transition">
          logout
        </button>
      </>
      
    )
  }
  
  return (
    <Link href="/signin">
      <div className="bg-blue-500 cursor-pointer text-white px-5 py-1 rounded-lg hover:bg-blue-700 transition">
        fazer login
      </div>
    </Link>
    
  )
}