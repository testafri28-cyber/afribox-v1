import { NextResponse } from 'next/server'

// API fictive — pour cette version, on accepte tout et on renvoie un succès.
// Brancher ici un envoi d'email, un CRM ou un webhook Slack le moment venu.
export async function POST(request: Request) {
  try {
    const body = await request.json()
    if (!body.email || !body.message) {
      return NextResponse.json(
        { ok: false, error: 'Email et message requis.' },
        { status: 400 },
      )
    }
    // Log côté serveur uniquement — pas de persistance.
    console.log('[contact] message reçu de', body.email)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Requête invalide.' },
      { status: 400 },
    )
  }
}
