// Scan independant des dictionnaires : extrait les textes rendus sur / et /en,
// et signale ceux qui sont IDENTIQUES sur les deux ET d'allure francaise.
// Attrape le francais reste EN DUR dans un composant (jamais extrait), que la
// comparaison dictionnaire-vers-HTML ne peut pas voir.
const BASE = process.argv[2] || 'https://afriboxlockers.com'

const STOP = /\b(le|la|les|des|une|un|du|de|et|est|sont|vous|votre|vos|nous|notre|pour|avec|dans|sur|par|qui|que|quoi|ça|cela|plus|tout|tous|sans|chez|dès|puis|aussi|ainsi|entre|leur|ses|mes|son|sa|au|aux|en|ne|pas|se|si|ou|où)\b/i
const ACCENT = /[éèêëàâäçùûüôöîïœ]/i

function texts(html) {
  const cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  const out = new Set()
  for (const m of cleaned.matchAll(/>([^<>]+)</g)) {
    let t = m[1]
      .replace(/&#x27;|&apos;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
    if (t.length >= 3 && /[A-Za-zÀ-ÿ]/.test(t)) out.add(t)
  }
  return out
}

function looksFrench(t) {
  if (ACCENT.test(t)) return true
  const words = t.split(/\s+/).length
  return words >= 2 && STOP.test(t)
}

;(async () => {
  const fr = texts(await (await fetch(BASE + '/')).text())
  const en = texts(await (await fetch(BASE + '/en')).text())

  // Present a l'identique sur les deux pages ET d'allure francaise.
  const suspects = [...en].filter((t) => fr.has(t) && looksFrench(t))

  console.log(`Textes distincts — /: ${fr.size}   /en: ${en.size}`)
  if (suspects.length === 0) {
    console.log('\nAucun texte francais identique sur les deux versions.')
  } else {
    console.log(`\n${suspects.length} texte(s) suspects (identiques FR/EN et d'allure francaise) :\n`)
    for (const s of suspects.sort((a, b) => b.length - a.length)) {
      console.log(`  • ${s.slice(0, 110)}`)
    }
  }
})()
