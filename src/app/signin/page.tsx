"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import Link from "next/link";
import NavBarLogin from "../components/NavBarLogin";

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowingPassword, setIsShowingPassword] = useState(false);
  const [error, setError] = useState("");
  const [texts, setTexts] = useState({
    signInText: "Acesse agora sua conta Paperless",
    signInSubText: "Seu blog favorito",
    emailHolder: "Digite seu email...",
    passwordHolder: "Digite sua senha....",
    signInBtn: "Entrar",
    passwordLabel: "Senha",
    googleBtn: "Continue com google",
    redirectSignUp: "Cadastre-se",
  });

  useEffect(() => {
    const lang = navigator.language;

    if (lang === "pt-BR") {
      setTexts({
        signInText: "Acesse agora sua conta Paperless",
        signInSubText: "Seu blog favorito",
        emailHolder: "Digite seu email...",
        passwordHolder: "Digite sua senha...",
        signInBtn: "Entrar",
        passwordLabel: "Senha",
        googleBtn: "Continue com google",
        redirectSignUp: "Cadastre-se",
      })
    } else {
      setTexts({
        signInText: "Access your Paperless account now",
        signInSubText: "Your favorite blog",
        emailHolder: "Enter your email...",
        passwordHolder: "Enter your password...",
        signInBtn: "Login",
        passwordLabel: "Password",
        googleBtn: "Continue with Google",
        redirectSignUp: "Sign up",
      });
    }
  }, []);

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

    // 📌 Detecta idioma do navegador
    const language = navigator.language || "en-US";

    try {
      const res = await fetch(
        "https://sticky-charil-react-blog-3b39d9e9.koyeb.app/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // ✅ Envia também o idioma
          body: JSON.stringify({
            email: emailInput,
            password: passwordInput,
            language,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Email ou senha inválidos.");
        setIsLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      window.location.href = "/overview";
    } catch (err) {
      console.log(err);
      setError("Erro ao conectar com o servidor.");
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
            <h1 className="text-xl font-extrabold font-mono text-black">
              {texts.signInText}
            </h1>
            <p className="text-gray-500 mt-1">{texts.signInSubText}</p>
          </div>

          {isLoading ? (
            <div className="flex justify-center">
              <LoadingSpinner width="w-12" height="h-12" />
            </div>
          ) : (
            <>
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={texts.emailHolder}
                    required
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">
                    {texts.passwordLabel}
                  </label>
                  <div className="relative flex items-center">
                    <input
                      id="password"
                      name="password"
                      type={isShowingPassword ? "text" : "password"}
                      placeholder={texts.passwordHolder}
                      required
                      className="w-full border border-gray-300 rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <button
                      type="button"
                      onClick={() => setIsShowingPassword(prev => !prev)}
                      className="absolute cursor-pointer right-2 p-1 rounded-md hover:opacity-80 transition-all"
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
                  <p className="text-red-500 text-sm mt-1">{error}</p>
                )}

                <button
                  type="submit"
                  className="bg-black cursor-pointer text-white p-2 rounded-md w-full hover:opacity-80 transition-all"
                >
                  {texts.signInBtn}
                </button>
              </form>

              <div className="flex flex-col items-center gap-3 mt-4">
                <button
                  onClick={() => {
                    setIsLoading(true);
                    const lang = navigator.language || "en-US";
                    // ✅ envia idioma na URL do OAuth2
                    window.location.href = `https://sticky-charil-react-blog-3b39d9e9.koyeb.app/oauth2/authorization/google?lang=${lang}`;
                  }}
                  className={btnClass}
                >
                  <Image
                    src="https://i.postimg.cc/15vZ3SGR/Google-G-logo-svg-1.png"
                    alt="Logo do Google"
                    width={20}
                    height={20}
                  />
                  {texts.googleBtn}
                </button>
              </div>

              <Link href="/signup" className="text-center text-md text-gray-600 underline mt-4">
                {texts.redirectSignUp}
              </Link>
            </>
          )}
        </div>
      </section>
    </div>
  );
}