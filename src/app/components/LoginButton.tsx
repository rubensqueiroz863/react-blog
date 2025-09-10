import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function LoginButton() {
  const { data: session, status } =  useSession();
  const [isLoading, setIsLoading] = useState(false);

  if (status === "loading") {
    return <div className="relative p-1 mr-1 rounded-full"><LoadingSpinner message="" width="w-6" height="h-6" /></div>;
  }

  if (session) {  
    return (
      <>
        <div className="relative p-1 transition-all hover:bg-gray-200 rounded-full">
          <Image
            src={session.user?.image || "https://i.postimg.cc/qR0CxJnP/default-avatar-icon-of-social-media-user-vector.jpg"}
            alt={session.user?.name || "User Image"}
            width={128}
            height={128}
            className="w-8 h-8 rounded-full bg-gray-400 cursor-pointer object-cover"
          />
          {/* Aqui você pode colocar um menu dropdown */}
        </div>
        <button
          onClick={() => signOut()}
          className="bg-red-500 cursor-pointer text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
        >
          sair
        </button>
      </>
    )
  }
  
  return (
    <Link 
      href="/signin"
      onClick={() => setIsLoading(true)}
    >
      {isLoading ? (
        <LoadingSpinner message="Carregando pagina de login..." width="w-6" height="h-6" />
      ): (
        <div className="bg-blue-500 cursor-pointer text-white px-5 py-1 rounded-lg hover:bg-blue-700 transition">
          fazer login
        </div>
      )}
      
    </Link>
    
  )
}