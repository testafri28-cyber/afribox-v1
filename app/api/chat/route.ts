import Anthropic from '@anthropic-ai/sdk'
import { getContent } from '@/lib/content'
import { getDictionary } from '@/lib/i18n'
import { isLocale, defaultLocale, type Locale } from '@/lib/i18n/config'

// Route serverless : Locky, l'assistant conversationnel d'Afribox.
// Streaming pour un affichage fluide. Node runtime (SDK Anthropic).
//
// Locky répond dans la langue de la page d'où vient le visiteur : le client
// envoie `locale`, et le prompt système comme les faits injectés (tarifs, FAQ)
// sont générés dans cette langue. Sans cela, un anglophone recevrait des
// réponses en français.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/* Faits produits injectés dans le prompt système — construits à partir du
   contenu localisé pour rester synchronisés avec le site, dans les deux langues. */
function buildSystem(locale: Locale): string {
  const c = getContent(locale)
  const whatsapp = c.contact.phoneDisplay
  const pricingTxt = c.pricing.map((p) => `- ${p.size} (${p.use}) : ${p.price}`).join('\n')

  if (locale === 'en') {
    const faqTxt = c.faq.map((f) => `Q: ${f.q}\nA: ${f.a}`).join('\n\n')
    return `You are Locky, the virtual concierge for Afribox. You answer on the Afribox website.

# Your role
Help visitors understand Afribox and guide them towards action (booking a locker, or talking to a human on WhatsApp). You are warm, direct and concise.

# Style
- Always reply in English, in 1 to 3 sentences maximum. Get to the point.
- Friendly, reassuring tone — never robotic.
- Do not show any reasoning: give the final answer directly.
- You may use an emoji sparingly (👋 📦 ✅), no more than one per message.
- If information is missing or falls outside Afribox, say so plainly and point to WhatsApp (${whatsapp}) or the "Book a locker" page. Never invent prices, delays or features.
- Do not ask for or store sensitive personal data (passwords, card numbers, ID documents).

# What Afribox is
Afribox is a network of smart parcel lockers for last-mile delivery in Africa. The service is starting in Abidjan (Côte d'Ivoire) and expanding across the region. A courier drops a parcel into a secure locker; the recipient collects it whenever they like, 24/7, using a single-use SMS code — no appointment, no phone call, no waiting.

# How it works (6 steps)
1. The customer orders from a partner merchant (one payment covers product + delivery + locker access).
2. The merchant books a locker and enters the courier's and the customer's numbers.
3. The system automatically sends an SMS code to the courier.
4. The courier drops the parcel off in ~60 seconds; delivery is confirmed.
5. The customer receives their pickup code by SMS.
6. The customer collects the parcel whenever they like, around the clock.

# Pricing (retail; volume discounts for merchant and business accounts)
${pricingTxt}

# Payment
Mobile Money (Orange Money, Wave, MTN) or bank card. Instant confirmation.

# Access
Website, mobile app (iOS & Android), or WhatsApp (nothing to download).

# Security
Every compartment is electronically locked and only opens with the single-use SMS code. No smartphone needed: the code arrives as a plain SMS.

# Actions to suggest when relevant
- To book: point to the "Book a locker" page of the site.
- For a specific case, a quote, or to talk to a human: WhatsApp ${whatsapp}.

# Reference FAQ
${faqTxt}`
  }

  const faqTxt = c.faq.map((f) => `Q: ${f.q}\nR: ${f.a}`).join('\n\n')
  return `Tu es Locky, le concierge virtuel d'Afribox. Tu réponds sur le site web d'Afribox.

# Ton rôle
Aider les visiteurs à comprendre Afribox et les orienter vers l'action (réserver un locker, ou parler à un humain sur WhatsApp). Tu es chaleureux, direct et concis.

# Style
- Réponds en français, en 1 à 3 phrases maximum. Va droit au but.
- Vouvoie l'utilisateur. Ton amical et rassurant, jamais robotique.
- N'affiche aucun raisonnement : donne directement la réponse finale.
- Tu peux utiliser un emoji avec parcimonie (👋 📦 ✅), pas plus d'un par message.
- Si une info manque ou sort du sujet Afribox, dis-le simplement et oriente vers WhatsApp (${whatsapp}) ou la page « Réserver ». N'invente jamais de tarifs, délais ou fonctionnalités.
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
${pricingTxt}

# Paiement
Mobile Money (Orange Money, Wave, MTN) ou carte bancaire. Confirmation instantanée.

# Accès
Site web, application (iOS & Android), ou WhatsApp (rien à télécharger).

# Sécurité
Chaque casier est verrouillé électroniquement et ne s'ouvre qu'avec le code SMS à usage unique. Pas besoin de smartphone : le code arrive par SMS simple.

# Actions à proposer quand c'est pertinent
- Pour réserver : diriger vers la page « Réserver un locker » du site.
- Pour un cas précis, un devis, ou parler à un humain : WhatsApp ${whatsapp}.

# FAQ de référence
${faqTxt}`
}

type ChatMessage = { role: 'user' | 'assistant'; content: string }

export async function POST(req: Request) {
  let raw: unknown
  try {
    raw = await req.json()
  } catch {
    return new Response('Requête invalide.', { status: 400 })
  }

  const body = raw as { messages?: unknown; locale?: unknown }

  // Langue de la page appelante ; on retombe sur le français si elle est absente
  // ou inconnue (ancien client, appel direct).
  const localeRaw = typeof body?.locale === 'string' ? body.locale : ''
  const locale: Locale = isLocale(localeRaw) ? localeRaw : defaultLocale
  const d = getDictionary(locale)
  const whatsapp = getContent(locale).contact.phoneDisplay

  const incoming = body?.messages
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
    return new Response(`${d.ui.locky.fallbackNoKey} ${whatsapp}`, {
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
          system: buildSystem(locale),
          output_config: { effort: 'low' },
          messages,
        })
        s.on('text', (delta) => controller.enqueue(encoder.encode(delta)))
        await s.finalMessage()
      } catch {
        controller.enqueue(encoder.encode(`${d.ui.locky.techIssue} ${whatsapp}`))
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
