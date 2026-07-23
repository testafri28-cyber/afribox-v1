import { NextResponse } from 'next/server'

// Sink unique des leads du site (contact + réservation).
// Persiste dans un Google Sheet via un webhook Apps Script (server-to-server,
// donc l'URL du webhook reste secrète côté serveur — jamais exposée au client).
// Conçu pour ne jamais bloquer l'utilisateur : si le Sheet n'est pas configuré
// ou tombe, on renvoie quand même { ok: true } — WhatsApp est le canal de secours.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const WEBHOOK = process.env.GOOGLE_SHEET_WEBHOOK_URL

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Requête invalide.' },
      { status: 400 },
    )
  }

  const type = body.type
  if (type !== 'contact' && type !== 'reservation') {
    return NextResponse.json(
      { ok: false, error: 'Type de lead invalide.' },
      { status: 400 },
    )
  }

  const record = {
    ...body,
    receivedAt: new Date().toISOString(),
    source: 'afribox.site',
  }

  if (!WEBHOOK) {
    // Pas de Sheet configuré : on trace côté serveur sans casser l'UX.
    console.warn('[lead] GOOGLE_SHEET_WEBHOOK_URL absent — lead non persisté:', type)
    return NextResponse.json({ ok: true, stored: false })
  }

  try {
    const res = await fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
      // Le webhook doit répondre vite ; on ne veut pas retenir la requête client.
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) throw new Error(`sheet responded ${res.status}`)
    return NextResponse.json({ ok: true, stored: true })
  } catch (err) {
    // Échec de persistance : on ne bloque pas — WhatsApp prend le relais.
    console.error('[lead] échec envoi Google Sheet:', err)
    return NextResponse.json({ ok: true, stored: false })
  }
}
