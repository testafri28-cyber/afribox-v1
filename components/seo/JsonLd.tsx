// Injecte un bloc de données structurées JSON-LD dans le <head>/DOM.
// Server component : le script est présent dès le SSR, donc lisible par les
// crawlers sans exécuter de JavaScript.
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Le contenu vient de nos constantes (pas d'entrée utilisateur) : sûr.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
