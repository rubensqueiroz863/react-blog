export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const accessToken = localStorage.getItem("accessToken");

  const headers = {
    ...(options.headers || {}),
    "Authorization": `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  let res = await fetch(url, { ...options, headers });

  // se o token expirou
  if (res.status === 401) {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("Sem refresh token");

    // tenta renovar
    const refreshRes = await fetch("https://sticky-charil-react-blog-3b39d9e9.koyeb.app/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }), // <-- objeto
    });


    if (!refreshRes.ok) throw new Error("Refresh token inválido");

    const data = await refreshRes.json();
    localStorage.setItem("accessToken", data.accessToken);

    // tenta de novo com o novo token
    const retryHeaders = {
      ...(options.headers || {}),
      "Authorization": `Bearer ${data.accessToken}`,
      "Content-Type": "application/json",
    };

    res = await fetch(url, { ...options, headers: retryHeaders });
  }

  return res;
}
