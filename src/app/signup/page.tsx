"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import Link from "next/link";
import NavBarLogin from "../components/NavBarLogin";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowingPassword, setIsShowingPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const btnClass =
    "flex flex-row rounded-xl hover:opacity-80 hover:bg-gray-100 transition-all border-gray-200 shadow-sm cursor-pointer items-center p-2 gap-4 border w-full sm:w-80 justify-center";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

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
    } catch (err) {
      console.error(err);
      setError("Erro ao criar conta.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-dvh w-full bg-white">
      <NavBarLogin />
      <section className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col gap-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold font-mono text-black">
              Crie agora sua conta Paperless
            </h1>
            <p className="text-gray-500 mt-1">Seu blog favorito</p>
          </div>

          {isLoading ? (
            <div className="flex justify-center">
              <LoadingSpinner
                message="Validando criação de conta..."
                width="w-12"
                height="h-12"
              />
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Nome */}
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">
                    Nome
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Digite seu nome..."
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Digite seu email..."
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                {/* Senha */}
                <div className="flex flex-col">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">
                    Senha
                  </label>
                  <div className="relative flex items-center">
                    <input
                      id="password"
                      name="password"
                      type={isShowingPassword ? "text" : "password"}
                      placeholder="Digite sua senha..."
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <button
                      type="button"
                      onClick={() => setIsShowingPassword((prev) => !prev)}
                      className="absolute right-2 p-1 rounded-md hover:opacity-80 transition-all"
                    >
                      <Image
                        src={
                          isShowingPassword
                            ? "https://i.postimg.cc/YCgvvk7F/10435731.png"
                            : "https://i.postimg.cc/SRsXRMQQ/6684701.png"
                        }
                        alt={isShowingPassword ? "Ícone de olho" : "Ícone de olho fechado"}
                        width={24}
                        height={24}
                      />
                    </button>
                  </div>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                  type="submit"
                  className="bg-black cursor-pointer text-white p-2 rounded-md w-full hover:opacity-80 transition-all"
                >
                  Cadastrar
                </button>
              </form>

              <div className="flex flex-col items-center gap-3 mt-4">
                <button
                  onClick={() => {
                    setIsLoading(true);
                    signIn("google", { callbackUrl: "/" });
                  }}
                  className={btnClass}
                >
                  <Image
                    src="https://i.postimg.cc/15vZ3SGR/Google-G-logo-svg-1.png"
                    alt="Logo do Google"
                    width={20}
                    height={20}
                  />
                  Continue com o Google
                </button>

                <button
                  onClick={() => {
                    setIsLoading(true);
                    signIn("github", { callbackUrl: "/" });
                  }}
                  className={btnClass}
                >
                  <Image
                    src="https://i.postimg.cc/XYgBJp2G/733609.png"
                    alt="Logo do GitHub"
                    width={20}
                    height={20}
                  />
                  Continue com o GitHub
                </button>
              </div>

              <Link
                href="/signin"
                className="text-center text-sm text-gray-600 underline mt-4"
              >
                Já tem uma conta?
              </Link>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
