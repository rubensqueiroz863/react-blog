"use client";

import Image from "next/image";
import NavBarLogin from "../components/NavBarLogin";
import { signIn } from "next-auth/react";
import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import Link from "next/link";

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowingPassword, setIsShowingPassword] = useState(false);
  const btnClass = "flex flex-row rounded-xl hover:opacity-80 hover:bg-gray-100 transition-all border-gray-200 shadow-sm cursor-pointer items-center p-2 gap-4 border w-1/2";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validação mínima da senha
    if (password.length < 8) {
      setError("A senha deve ter no mínimo 8 caracteres.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erro ao criar conta.");
      }

      window.location.href = "/signin";
    } catch (err: unknown) {
      console.error(err);
      setError("Erro ao criar conta.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <NavBarLogin />
      <section className="flex-grow p-2 flex items-center justify-center bg-white">
        <div className="flex flex-col gap-2 bg-white p-8 h-full w-full items-center">
          <div className="flex flex-col justify-start w-1/2">
            <h1 className="text-xl text-black w-full font-black font-mono">Crie agora sua conta Paperless</h1>
            <h1 className="text-xl text-gray-500 w-full font-black font-mono">Seu blog favorito</h1>
          </div>
          {isLoading ? (
            <LoadingSpinner message="Validando criação de conta..." width="w-12" height="h-12" />
          ): (
            <div className="flex flex-col justify-center items-center w-full gap-2"> 
              <form onSubmit={handleSubmit} className="flex gap-4 flex-col justify-center items-center w-full my-8">
                {/* Nome */}
                <div className="flex flex-col w-1/2">
                  <label 
                    htmlFor="name" 
                    className="mb-1 text-sm font-medium text-gray-700"
                  >
                    Nome
                  </label>
                  <input
                    id="name"
                    name="name"
                    className="border border-gray-300 w-full p-2 rounded-md"
                    type="text"
                    placeholder="Digite seu nome..."
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col w-1/2">
                  <label 
                    htmlFor="email" 
                    className="mb-1 text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    className="border border-gray-300 w-full p-2 rounded-md"
                    type="email"
                    placeholder="Digite seu email..."
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Senha */}
                <div className="flex flex-col w-1/2">
                  <label 
                    htmlFor="password" 
                    className="mb-1 text-sm font-medium text-gray-700"
                  >
                    Senha
                  </label>
                  <div className="flex w-full items-center relative">
                    <input 
                      id="password"
                      name="password"
                      className="border border-gray-300 w-full p-2 rounded-md pr-10"
                      type={isShowingPassword ? "text" : "password"}
                      placeholder="Digite sua senha..."
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setIsShowingPassword(isShowing => !isShowing)}
                      className="absolute right-2 p-1 rounded-md hover:opacity-80 transition-all"
                    >
                      {isShowingPassword ? (
                        <Image
                          src="https://i.postimg.cc/YCgvvk7F/10435731.png"
                          alt="Ícone de olho"
                          width={20}
                          height={20}
                          className="w-6 h-6"
                        />
                      ) : (
                        <Image
                          src="https://i.postimg.cc/SRsXRMQQ/6684701.png"
                          alt="Ícone de olho fechado"
                          width={20}
                          height={20}
                          className="w-7 h-7"
                        />
                      )}
                    </button>
                  </div>
                </div>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <button
                  type="submit"
                  className="bg-black text-white w-1/2 p-2 rounded-md hover:opacity-80 transition-all"
                >
                  Cadastrar
                </button>

              </form>

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
              <Link href="/signin" className="mt-2 underline">Já tem uma conta?</Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}