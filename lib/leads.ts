import { contact } from '@/lib/constants'

// Construit un lien wa.me vers le numéro business Afribox avec un message
// pré-rempli. Utilisé comme canal de contact immédiat (et de secours si la
// persistance Google Sheet échoue).
export function whatsappUrl(text: string): string {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`
}

export type LeadType = 'contact' | 'reservation'

// Envoie le lead au sink serveur (/api/lead → Google Sheet).
// Ne jette jamais : en cas d'échec réseau on renvoie false, mais l'UX continue
// (WhatsApp reste proposé à l'utilisateur).
export async function submitLead(
  payload: Record<string, unknown> & { type: LeadType },
): Promise<boolean> {
  try {
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    return res.ok
  } catch {
    return false
  }
}
