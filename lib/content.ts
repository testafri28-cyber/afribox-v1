// ---------------------------------------------------------------------------
// Contenu du site, localisé.
//
// `lib/constants.ts` porte la STRUCTURE (icônes, coordonnées GPS, liens,
// images, dimensions, identifiants) ; les dictionnaires portent le TEXTE.
// Ce fichier superpose les deux, index par index, et rend des objets de la
// même forme que ceux consommés aujourd'hui par les composants.
//
// Le résultat est mis en cache par langue : la fusion ne s'exécute qu'une fois.
// ---------------------------------------------------------------------------
import { getDictionary } from './i18n'
import { localePath, type Locale } from './i18n/config'
import {
  lockers,
  impact,
  stats,
  problems,
  services,
  processSteps,
  previewSteps,
  channels,
  appFeatures,
  values,
  team,
  testimonials,
  pricing,
  whyAfribox,
  contact,
  footerLinks,
  socials,
} from './constants'

function build(locale: Locale) {
  const c = getDictionary(locale).content

  // Préfixe les liens internes par la langue ; ancres et liens externes intacts.
  const lp = (href: string) => (href.startsWith('/') ? localePath(locale, href) : href)

  return {
    lockers: lockers.map((l, i) => ({ ...l, ...c.lockers[i] })),

    // Texte pur : aucune structure à conserver.
    lockerSpecs: c.lockerSpecs,
    faq: c.faq,
    merchantBenefits: c.merchantBenefits,
    consumerBenefits: c.consumerBenefits,
    aboutMission: c.aboutMission,
    aboutMissionCourte: c.aboutMissionCourte,

    impact: impact.map((g, i) => ({ ...g, ...c.impact[i] })),
    stats: stats.map((s, i) => ({ ...s, ...c.stats[i] })),
    problems: problems.map((p, i) => ({ ...p, ...c.problems[i] })),
    services: services.map((s, i) => ({ ...s, ...c.services[i] })),
    previewSteps: previewSteps.map((s, i) => ({ ...s, ...c.previewSteps[i] })),
    channels: channels.map((ch, i) => ({ ...ch, ...c.channels[i] })),
    appFeatures: appFeatures.map((f, i) => ({ ...f, label: c.appFeatures[i] })),
    values: values.map((v, i) => ({ ...v, ...c.values[i] })),
    team: team.map((m, i) => ({ ...m, ...c.team[i] })),
    testimonials: testimonials.map((t, i) => ({ ...t, ...c.testimonials[i] })),
    pricing: pricing.map((p, i) => ({ ...p, ...c.pricing[i] })),
    whyAfribox: whyAfribox.map((w, i) => ({ ...w, ...c.whyAfribox[i] })),

    // Le visuel de l'étape est soit une pastille, soit un SMS : le libellé
    // traduit alimente l'un ou l'autre selon le type.
    processSteps: processSteps.map((s, i) => {
      const t = c.processSteps[i]
      const visual =
        s.visual.kind === 'pill'
          ? { ...s.visual, pillLabel: t.visualLabel }
          : { ...s.visual, from: t.visualLabel }
      return {
        ...s,
        title: t.title,
        tag: t.tag,
        text: t.text,
        short: t.short,
        actors: t.actors,
        visual,
      }
    }),

    contact: { ...contact, ...c.contact },

    // Libellés de marque (Facebook, Instagram) : non traduisibles.
    socials,

    // Les URLs restent dans constants.ts ; seuls les libellés sont traduits.
    footerLinks: {
      produit: footerLinks.produit.map((l, i) => ({ ...l, href: lp(l.href), label: c.footer.produit[i] })),
      societe: footerLinks.societe.map((l, i) => ({ ...l, href: lp(l.href), label: c.footer.societe[i] })),
      ressources: footerLinks.ressources.map((l, i) => ({
        ...l,
        href: lp(l.href),
        label: c.footer.ressources[i],
      })),
      columns: c.footer.columns,
    },
  }
}

export type SiteContentLocalized = ReturnType<typeof build>

const cache = new Map<Locale, SiteContentLocalized>()

export function getContent(locale: Locale): SiteContentLocalized {
  let hit = cache.get(locale)
  if (!hit) {
    hit = build(locale)
    cache.set(locale, hit)
  }
  return hit
}
