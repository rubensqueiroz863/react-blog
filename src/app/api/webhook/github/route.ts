import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Aqui você pode pegar headers do GitHub
    const signature = req.headers.get("x-hub-signature-256");
    const event = req.headers.get("x-github-event");

    console.log("GitHub Event:", event);
    console.log("Payload:", body);
    console.log("Signature:", signature);

    // TODO: verificar a assinatura se você quiser segurança
    // Verificar event e processar
    if (event === "push") {
      console.log("Push detectado para branch:", body.ref);
      // Faça algo: deploy, log, etc
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, error: error });
  }
}
