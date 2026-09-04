// Scan du CODE SOURCE : signale TOUT texte d'interface ecrit en dur dans les
// composants — quelle que soit la langue.
//
// Pourquoi pas une detection "est-ce du francais ?" : elle rate les mots isoles
// sans accent ("S'abonner", "SUIVRE") et les tournures sans mot-outil
// ("L'essentiel, vite fait."). Dans un code entierement internationalise il ne
// doit rester AUCUN texte en dur : on signale tout, et on relit la liste.
//
// Usage : node scripts/scan-source.js
const fs = require('fs')
const path = require('path')

const ROOTS = ['components', 'app']
const SKIP = /lib[\\/]i18n|node_modules|\.next/
// Fichiers dont le texte en dur est legitime : prompts systeme et logs serveur.
const ALLOW_FILES = /app[\\/]api[\\/]/

// Marques et termes techniques, identiques dans les deux langues.
const BRANDS = new Set([
  'Afribox', 'WhatsApp', 'Mobile Money', 'Orange Money', 'Wave', 'MTN', 'Locky',
  'App Store', 'Google Play', 'iOS & Android', 'FAQ', 'API', 'SMS', 'RFID',
  'Facebook', 'Instagram', 'VISA', 'Abidjan', 'Cap Sud', 'Email', 'Android',
  'Smart Locker Network',
])

// Remplace un commentaire par autant de lignes vides, pour ne pas decaler les
// numeros de ligne rapportes.
const blankOut = (m) => m.split('\n').map(() => '').join('\n')

function stripNoise(src) {
  return src
    .replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, blankOut)
    .replace(/\/\*[\s\S]*?\*\//g, blankOut)
    .replace(/^\s*\/\/.*$/gm, '')
    // Attributs techniques : leurs valeurs ne sont pas du texte d'interface.
    .replace(
      /\b(className|class|style|href|src|id|key|type|rel|target|viewBox|d|fill|stroke|variant|size|name|value|htmlFor|autoComplete|inputMode|role|width|height|sizes|blurDataURL|priority|loading)\s*=\s*(\{[^}]*\}|"[^"]*"|'[^']*'|`[^`]*`)/g,
      ' ',
    )
    // Chaines de classes utilitaires restees dans des template literals.
    .replace(/`[^`]*(?:flex|grid|text-|bg-|px-|py-|mt-|mb-|rounded|border|absolute|relative|hidden|w-|h-)[^`]*`/g, ' ')
}

function isUiText(s) {
  const t = s.trim()
  if (t.length < 3) return false
  if (BRANDS.has(t)) return false
  if (!/[A-Za-zÀ-ÿ]/.test(t)) return false
  if (/^https?:/.test(t)) return false
  if (/^[/#@.]/.test(t) || t.includes('/')) return false          // URL, chemin, import
  if (/^use (client|server)$/.test(t)) return false
  if (/^[a-z][a-zA-Z0-9]*$/.test(t)) return false                  // identifiant camelCase
  if (/^[a-z0-9-]+$/.test(t)) return false                         // slug
  if (/^[A-Z][A-Z0-9_]*$/.test(t) && !/\s/.test(t)) return false   // CONSTANTE
  if (/^#[0-9a-f]{3,8}$/i.test(t)) return false
  if (/min-width|max-width|\dpx|rgba?\(/.test(t)) return false     // CSS
  if (/^[\w$]+\??\s*:\s*(string|number|boolean|React|\(|'|"|\[)/.test(t)) return false // type TS
  // Doit ressembler a un libelle : espace, majuscule initiale, apostrophe, ou
  // ponctuation finale.
  return /\s/.test(t) || /^[A-ZÀ-Þ]/.test(t) || /['’]/.test(t) || /[.!?…]$/.test(t)
}

function walk(dir, acc) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (SKIP.test(p)) continue
    if (e.isDirectory()) walk(p, acc)
    else if (/\.tsx?$/.test(e.name)) acc.push(p)
  }
  return acc
}

const files = []
for (const r of ROOTS) if (fs.existsSync(r)) walk(r, files)

const findings = []
for (const file of files) {
  if (ALLOW_FILES.test(file)) continue
  const lines = stripNoise(fs.readFileSync(file, 'utf8')).split('\n')

  lines.forEach((line, i) => {
    const hits = new Set()

    for (const m of line.matchAll(/\b(alt|aria-label|placeholder|title)="([^"]+)"/g)) {
      if (isUiText(m[2])) hits.add(m[1] + '="' + m[2] + '"')
    }
    for (const m of line.matchAll(/'((?:[^'\\\n]|\\.)*)'|"((?:[^"\\\n]|\\.)*)"/g)) {
      const v = m[1] !== undefined ? m[1] : m[2] !== undefined ? m[2] : ''
      if (isUiText(v)) hits.add("'" + v + "'")
    }
    // Texte JSX nu : la ligne ne doit contenir aucune syntaxe de code.
    const bare = line.trim()
    const isCode =
      /[<>{}=();]/.test(bare) ||
      /\b(import|export|return|const|let|function|await|async)\b/.test(bare) ||
      /^[\w$]+\??\s*:/.test(bare) ||
      /^['"`].*['"`],?$/.test(bare) ||        // directive ou chaine isolee
      /^[A-Z][a-zA-Z0-9]*,?$/.test(bare)      // element de liste d'import
    if (bare && !isCode && isUiText(bare)) hits.add(bare)

    for (const h of hits) findings.push({ file, line: i + 1, text: h })
  })
}

if (findings.length === 0) {
  console.log('Aucun texte en dur dans les composants — tout passe par les dictionnaires.')
} else {
  console.log(findings.length + ' texte(s) en dur a verifier :\n')
  let last = ''
  for (const f of findings) {
    if (f.file !== last) {
      console.log('  ' + f.file)
      last = f.file
    }
    console.log('      L' + f.line + '  ' + f.text.slice(0, 95))
  }
  console.log('\n(Marques et termes techniques identiques dans les deux langues : ignores.)')
}
