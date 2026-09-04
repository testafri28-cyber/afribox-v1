// Vérification rigoureuse (ne dépend pas des accents) :
// toute chaîne des dictionnaires FRANÇAIS qui apparaît sur une page ANGLAISE
// est une fuite — sauf si la traduction anglaise est identique (marques,
// unités, mots communs aux deux langues).
const fs = require('fs')

const FR_FILES = ['lib/i18n/content-fr.ts', 'lib/i18n/ui-fr.ts', 'lib/i18n/fr.ts']
const EN_FILES = ['lib/i18n/content-en.ts', 'lib/i18n/ui-en.ts', 'lib/i18n/en.ts']

// Extrait les littéraux de chaîne d'un fichier TS (simple ' " et backtick exclus).
function literals(files) {
  const out = new Set()
  for (const f of files) {
    const src = fs.readFileSync(f, 'utf8')
    for (const m of src.matchAll(/'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"/g)) {
      const raw = (m[1] ?? m[2] ?? '').replace(/\\'/g, "'").replace(/\\"/g, '"')
      if (raw.length >= 16) out.add(raw)
    }
  }
  return out
}

const fr = literals(FR_FILES)
const en = literals(EN_FILES)

// Décode les entités HTML les plus courantes pour comparer au rendu.
function decode(html) {
  return html
    .replace(/&#x27;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#x2F;/g, '/')
}

async function check(url) {
  const res = await fetch(url)
  const html = decode(await res.text())
  const leaks = []
  for (const s of fr) {
    if (en.has(s)) continue // identique dans les deux langues : normal
    if (html.includes(s)) leaks.push(s)
  }
  return leaks
}

;(async () => {
  const base = process.argv[2] || 'http://127.0.0.1:3014'
  let total = 0
  for (const path of ['/en', '/en/reserver']) {
    const leaks = await check(base + path)
    total += leaks.length
    if (leaks.length === 0) {
      console.log(`  OK  ${path} — aucune chaine francaise`)
    } else {
      console.log(`  !!  ${path} — ${leaks.length} fuite(s) :`)
      for (const s of leaks.slice(0, 12)) console.log(`        « ${s.slice(0, 90)} »`)
    }
  }
  console.log(
    total === 0
      ? `\nVerdict : la version anglaise ne contient aucune chaine du dictionnaire francais.`
      : `\nVerdict : ${total} fuite(s) a corriger.`,
  )
  console.log(`(${fr.size} chaines FR comparees, dont ${[...fr].filter((s) => en.has(s)).length} identiques en EN)`)
})()
