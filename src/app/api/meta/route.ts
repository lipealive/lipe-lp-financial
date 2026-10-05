import { NextResponse, type NextRequest } from "next/server";
import { ALLOWED_EVENTS } from "@/lib/tracking/events";

/** Versão atual da Graph API (v26.0, julho/2026). */
const GRAPH_API_VERSION = "v26.0";

type Body = {
  event_name?: unknown;
  event_id?: unknown;
  event_source_url?: unknown;
  custom_data?: unknown;
  fbclid?: unknown;
};

/**
 * API de Conversões do Meta: recebe o evento do browser e reenvia pra Graph API
 * com o MESMO event_id do Pixel (deduplicação).
 * Sem META_CAPI_TOKEN (ou sem pixel), responde 204 e não faz nada.
 * O token só existe aqui, no servidor.
 */
export async function POST(request: NextRequest) {
  const pixelId = process.env.META_PIXEL_ID;
  const token = process.env.META_CAPI_TOKEN;
  if (!pixelId || !token) return new Response(null, { status: 204 });

  // Só aceita chamadas da própria página.
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return new Response(null, { status: 403 });
    } catch {
      return new Response(null, { status: 403 });
    }
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const eventName = typeof body.event_name === "string" ? body.event_name : "";
  const eventId = typeof body.event_id === "string" ? body.event_id.slice(0, 100) : "";
  if (!ALLOWED_EVENTS.includes(eventName) || !eventId) {
    return NextResponse.json({ ok: false, error: "invalid_event" }, { status: 400 });
  }

  const sourceUrl =
    typeof body.event_source_url === "string" && body.event_source_url.startsWith("http")
      ? body.event_source_url.slice(0, 2000)
      : (request.headers.get("referer") ?? undefined);

  // fbp / fbc: cookies do Pixel. Sem _fbc, monta a partir do fbclid da URL.
  const fbp = request.cookies.get("_fbp")?.value;
  let fbc = request.cookies.get("_fbc")?.value;
  if (!fbc) {
    let fbclid = typeof body.fbclid === "string" ? body.fbclid : undefined;
    if (!fbclid && sourceUrl) {
      try {
        fbclid = new URL(sourceUrl).searchParams.get("fbclid") ?? undefined;
      } catch {
        // URL inválida: segue sem fbc
      }
    }
    if (fbclid) fbc = `fb.1.${Date.now()}.${fbclid.slice(0, 500)}`;
  }

  // IP real do visitante (headers da Vercel / proxy).
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    undefined;
  const userAgent = request.headers.get("user-agent") ?? undefined;

  const userData: Record<string, string> = {};
  if (ip) userData.client_ip_address = ip;
  if (userAgent) userData.client_user_agent = userAgent;
  if (fbp) userData.fbp = fbp;
  if (fbc) userData.fbc = fbc;

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: "website",
        ...(sourceUrl ? { event_source_url: sourceUrl } : {}),
        user_data: userData,
        custom_data: sanitize(body.custom_data),
      },
    ],
    access_token: token,
  };
  const testCode = process.env.META_TEST_EVENT_CODE;
  if (testCode) payload.test_event_code = testCode;

  try {
    const res = await fetch(`https://graph.facebook.com/${GRAPH_API_VERSION}/${pixelId}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("[meta-capi]", res.status, (await res.text()).slice(0, 500));
      return NextResponse.json({ ok: false }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[meta-capi] falha de rede", err);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}

/** Mantém só chaves com valores primitivos (string/number/boolean). */
function sanitize(input: unknown): Record<string, string | number | boolean> {
  const out: Record<string, string | number | boolean> = {};
  if (!input || typeof input !== "object") return out;
  for (const [k, v] of Object.entries(input as Record<string, unknown>).slice(0, 20)) {
    if (typeof v === "string") out[k] = v.slice(0, 200);
    else if (typeof v === "number" && Number.isFinite(v)) out[k] = v;
    else if (typeof v === "boolean") out[k] = v;
  }
  return out;
}
