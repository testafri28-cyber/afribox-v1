// Scan du CODE SOURCE : trouve le francais ecrit en dur dans les composants,
// y compris ce que le HTML initial ne montre pas (attributs aria-label/alt/
// placeholder, contenu rendu seulement apres interaction : menu, chat,
// accordeons). Les commentaires sont retires avant analyse.
const fs = require('fs')
const path = require('path')

const ROOTS = ['components', 'app']
const SKIP = /lib[\\/]i18n|node_modules|\.next/
const ACCENT = /[éèêëàâäçùûüôöîïœÉÈÊÀÇÔÎ]/
const STOP = /\b(le|la|les|des|une|un|du|de|et|est|sont|vous|votre|vos|nous|notre|nos|pour|avec|dans|sur|par|qui|que|ça|plus|tout|tous|sans|chez|dès|puis|aussi|ainsi|entre|leur|ses|mes|son|sa|aux|ne|pas|se|si|ou|où|au)\b/i

// Motifs a ignorer : ce ne sont pas des textes d'interface.
const IGNORE = [
  /^[a-z-]+(\s+[a-z0-9:/\[\]().%-]+)*$/i, // suites de classes utilitaires
  /^[\w./-]+$/,                            // chemins, identifiants
  /^#[\w-]+$/,
  /^https?:/,
  /^\d/,
  /^[A-Z_]+$/,
]

function looksFrench(t) {
  const s = t.trim()
  if (s.length < 4) return false
  if (IGNORE.some((re) => re.test(s))) return false
  if (ACCENT.test(s)) return true
  return s.split(/\s+/).length >= 2 && STOP.test(s)
}

function stripComments(src) {
  return src
    .replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, ' ') // {/* ... */}
    .replace(/\/\*[\s\S]*?\*\//g, ' ')            // /* ... */
    .replace(/^\s*\/\/.*$/gm, ' ')                // // ... en debut de ligne
    .replace(/([^:])\/\/[^\n'"`]*$/gm, '$1')      // // en fin de ligne
}

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (SKIP.test(p)) continue
    if (e.isDirectory()) walk(p, acc)
    else if (/\.tsx?$/.test(e.name)) acc.push(p)
  }
  return acc
}

const findings = []
for (const file of ROOTS.flatMap((r) => (fs.existsSync(r) ? walk(r) : []))) {
  const raw = fs.readFileSync(file, 'utf8')
  const src = stripComments(raw)
  const lines = src.split('\n')

  lines.forEach((line, i) => {
    const hits = []

    // 1) Attributs textuels
    for (const m of line.matchAll(/\b(alt|aria-label|placeholder|title)="([^"]+)"/g)) {
      if (looksFrench(m[2])) hits.push(`${m[1]}="${m[2]}"`)
    }
    // 2) Litteraux de chaine
    for (const m of line.matchAll(/'((?:[^'\\\n]|\\.)*)'|"((?:[^"\\\n]|\\.)*)"/g)) {
      const v = m[1] ?? m[2] ?? ''
      if (looksFrench(v) && !hits.some((h) => h.includes(v))) hits.push(`'${v}'`)
    }
    // 3) Texte JSX nu (ligne sans balise ni accolade)
    const bare = line.trim()
    if (bare && !/[<>{}=]/.test(bare) && looksFrench(bare)) hits.push(bare)

    for (const h of hits) findings.push({ file, line: i + 1, text: h })
  })
}

if (findings.length === 0) {
  console.log('Aucun francais en dur dans les composants.')
} else {
  console.log(`${findings.length} chaine(s) francaise(s) en dur :\n`)
  let last = ''
  for (const f of findings) {
    if (f.file !== last) { console.log(`  ${f.file}`); last = f.file }
    console.log(`      L${f.line}  ${f.text.slice(0, 95)}`)
  }
}
