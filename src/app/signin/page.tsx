"use client";

import Image from "next/image";
import NavBarLogin from "../components/NavBarLogin";
import { signIn } from "next-auth/react";
import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const btnClass = "flex flex-row rounded-xl hover:opacity-80 hover:bg-gray-100 transition-all border-gray-200 shadow-sm cursor-pointer items-center p-2 gap-4 border w-1/2";

  return (
    <div className="flex flex-col h-screen w-full">
      <NavBarLogin />
      <section className="flex-grow p-4 flex items-center justify-center bg-white">
        <div className="flex flex-col gap-2 bg-white p-8 h-full w-full items-center">
          <div className="flex flex-col justify-start w-1/2">
            <h1 className="text-xl font-black font-mono my-8">Crie agora sua conta Paperless</h1>
          </div>
          {isLoading ? (
            <LoadingSpinner message="Validando login..." width="w-12" height="h-12" />
          ): (
            <div className="flex flex-col justify-center items-center w-full gap-2"> 
              <button
                onClick={() => {
                  setIsLoading(true);
                  signIn("google", {callbackUrl: "/"}) 
                }}
                className={btnClass}
              >
                <Image 
                  src="https://i.postimg.cc/15vZ3SGR/Google-G-logo-svg-1.png"
                  alt="Logo do Google"
                  width={128}
                  height={128}
                  className="w-5 h-5" 
                />
                <p>Continue com o Google</p>
              </button>
              <button
                onClick={() => {
                  setIsLoading(true);
                  signIn("github", {callbackUrl: "/"});
                }}
                className={btnClass}>
                <Image 
                  src="https://i.postimg.cc/XYgBJp2G/733609.png"
                  alt="Logo do Google"
                  width={128}
                  height={128}
                  className="w-5 h-5" 
                />
                <p>Continue com o GitHub</p>
              </button>
              outros logins (em breve)
            </div>
          )}
          
        </div>
      </section>
    </div>
  );
}