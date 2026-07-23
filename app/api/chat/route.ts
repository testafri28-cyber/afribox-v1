import Anthropic from '@anthropic-ai/sdk'
import { pricing, faq, contact } from '@/lib/constants'

// Route serverless : Locky, l'assistant conversationnel d'Afribox.
// Streaming pour un affichage fluide. Node runtime (SDK Anthropic).
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const WHATSAPP = contact.phoneDisplay

/* Faits produits injectés dans le prompt système — construits à partir des
   constantes du site pour rester synchronisés (tarifs, FAQ). */
const PRICING_TXT = pricing.map((p) => `- ${p.size} (${p.use}) : ${p.price}`).join('\n')
const FAQ_TXT = faq.map((f) => `Q: ${f.q}\nR: ${f.a}`).join('\n\n')

const SYSTEM = `Tu es Locky, le concierge virtuel d'Afribox. Tu réponds sur le site web d'Afribox.

# Ton rôle
Aider les visiteurs à comprendre Afribox et les orienter vers l'action (réserver un locker, ou parler à un humain sur WhatsApp). Tu es chaleureux, direct et concis.

# Style
- Réponds en français, en 1 à 3 phrases maximum. Va droit au but.
- Vouvoie l'utilisateur. Ton amical et rassurant, jamais robotique.
- N'affiche aucun raisonnement : donne directement la réponse finale.
- Tu peux utiliser un emoji avec parcimonie (👋 📦 ✅), pas plus d'un par message.
- Si une info manque ou sort du sujet Afribox, dis-le simplement et oriente vers WhatsApp (${WHATSAPP}) ou la page « Réserver ». N'invente jamais de tarifs, délais ou fonctionnalités.
- Ne demande pas et n'enregistre pas de données personnelles sensibles (mot de passe, numéro de carte, pièce d'identité).

# Ce qu'est Afribox
Afribox est un réseau de casiers intelligents (« smart lockers ») pour la livraison last-mile en Afrique. Le service démarre à Abidjan (Côte d'Ivoire) et s'étend à la région. Un colis est déposé par le livreur dans un casier sécurisé ; le destinataire le récupère quand il veut, 24h/24 et 7j/7, avec un code SMS à usage unique — sans rendez-vous, sans appel, sans attente.

# Comment ça marche (6 étapes)
1. Commande chez un marchand partenaire (le paiement couvre produit + livraison + accès au locker).
2. Le marchand réserve un locker et renseigne les numéros du livreur et du client.
3. Le système envoie automatiquement un code SMS au livreur.
4. Le livreur dépose le colis en ~60 secondes ; la livraison est confirmée.
5. Le client reçoit son code de retrait par SMS.
6. Le client récupère son colis quand il veut, 24h/24.

# Tarifs (grand public ; remises sur volume pour comptes marchand/entreprise)
${PRICING_TXT}

# Paiement
Mobile Money (Orange Money, Wave, MTN) ou carte bancaire. Confirmation instantanée.

# Accès
Site web, application (iOS & Android), ou WhatsApp (rien à télécharger).

# Sécurité
Chaque casier est verrouillé électroniquement et ne s'ouvre qu'avec le code SMS à usage unique. Pas besoin de smartphone : le code arrive par SMS simple.

# Actions à proposer quand c'est pertinent
- Pour réserver : diriger vers la page « Réserver un locker » du site.
- Pour un cas précis, un devis, ou parler à un humain : WhatsApp ${WHATSAPP}.

# FAQ de référence
${FAQ_TXT}`

type ChatMessage = { role: 'user' | 'assistant'; content: string }

const FALLBACK_NO_KEY =
  `Je ne suis pas encore tout à fait branché ici 🙈 Pour une réponse immédiate, écrivez-nous sur WhatsApp au ${WHATSAPP}, ou réservez directement un locker depuis la page « Réserver ».`

export async function POST(req: Request) {
  let raw: unknown
  try {
    raw = (await req.json())
  } catch {
    return new Response('Requête invalide.', { status: 400 })
  }

  const incoming = (raw as { messages?: unknown })?.messages
  if (!Array.isArray(incoming) || incoming.length === 0) {
    return new Response('Messages requis.', { status: 400 })
  }

  // Garde-fous : on garde les 12 derniers tours, on borne la longueur, on
  // normalise les rôles, et on exige que le dernier message soit de l'utilisateur.
  const messages: ChatMessage[] = incoming
    .slice(-12)
    .map((m) => {
      const mm = m as { role?: unknown; content?: unknown }
      return {
        role: mm.role === 'assistant' ? 'assistant' : 'user',
        content: String(mm.content ?? '').slice(0, 2000),
      } as ChatMessage
    })
    .filter((m) => m.content.trim().length > 0)

  if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
    return new Response('Message utilisateur requis.', { status: 400 })
  }

  // Pas de clé API configurée → réponse de repli gracieuse (pas d'erreur).
  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(FALLBACK_NO_KEY, {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }

  const client = new Anthropic()
  const encoder = new TextEncoder()

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const s = client.messages.stream({
          model: 'claude-opus-4-8',
          max_tokens: 1024,
          system: SYSTEM,
          output_config: { effort: 'low' },
          messages,
        })
        s.on('text', (delta) => controller.enqueue(encoder.encode(delta)))
        await s.finalMessage()
      } catch {
        controller.enqueue(
          encoder.encode(
            `Désolé, j'ai un petit souci technique. Réessayez, ou écrivez-nous sur WhatsApp au ${WHATSAPP}.`,
          ),
        )
      } finally {
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}
