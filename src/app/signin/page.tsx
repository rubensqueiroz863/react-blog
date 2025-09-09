"use client";

import Image from "next/image";
import NavBarLogin from "../components/NavBarLogin";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <div className="flex flex-col h-screen w-full">
      <NavBarLogin />
      <section className="flex-grow p-4 flex items-center justify-center bg-white">
        <div className="flex flex-col bg-white p-8 h-full w-full items-center">
          <div className="flex flex-col justify-start w-1/2">
            <h1 className="text-xl font-black font-mono my-8">Crie agora sua conta Paperless</h1>
          </div>
          <button
           onClick={() => signIn("google", {callbackUrl: "/"})}
           className="flex flex-row rounded-xl border-gray-200 shadow-sm cursor-pointer items-center p-2 gap-4 border w-1/2">
            <Image 
              src="https://i.ibb.co/rfc4qSYF/Google-G-logo-svg.png"
              alt="Logo do Google"
              width={128}
              height={128}
              className="w-5 h-5"
            />
            <p>Continue com o Google</p>
          </button>
          outros logins (em breve)
        </div>
      </section>
    </div>
  );
}