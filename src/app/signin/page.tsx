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
  const [error, setError] = useState("");

  const btnClass =
    "flex flex-row rounded-xl hover:opacity-80 hover:bg-gray-100 transition-all border-gray-200 shadow-sm cursor-pointer items-center p-2 gap-4 border w-full sm:w-80 justify-center";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const form = e.currentTarget as HTMLFormElement;
    const emailInput = form.email.value;
    const passwordInput = form.password.value;

    if (!emailInput || !passwordInput) {
      setError("Preencha email e senha para continuar.");
      return;
    }

    setIsLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email: emailInput,
      password: passwordInput,
    });

    if (res?.error) {
      setError(res.error);
      setIsLoading(false);
      return;
    }

    window.location.href = "/";
  };

  return (
    <div className="flex flex-col min-h-dvh w-full bg-white">
      <NavBarLogin />
      <section className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col gap-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold font-mono text-black">
              Acesse agora sua conta Paperless
            </h1>
            <p className="text-gray-500 mt-1">Seu blog favorito</p>
          </div>

          {isLoading ? (
            <div className="flex justify-center">
              <LoadingSpinner message="Validando login..." width="w-12" height="h-12" />
            </div>
          ) : (
            <>
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
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
                      className="w-full border border-gray-300 rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <button
                      type="button"
                      onClick={() => setIsShowingPassword(prev => !prev)}
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
                {error && (
                  <p className="text-red-500 text-sm mt-1">
                    {error === "CredentialsSignin"
                      ? "Email ou senha inválidos."
                      : error === "Illegal arguments: string, object"
                      ? "Email ou senha inválidos."
                      : error}
                  </p>
                )}
                <button
                  type="submit"
                  className="bg-black text-white p-2 rounded-md w-full hover:opacity-80 transition-all"
                >
                  Entrar
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

              <Link href="/signup" className="text-center text-sm text-gray-600 underline mt-4">
                Não tem uma conta?
              </Link>
            </>
          )}
        </div>
      </section>
    </div>
  );
}