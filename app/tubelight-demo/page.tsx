import { TubelightNavbar } from "@/components/ui/TubelightNavbar"
import Button from "@/components/ui/Button"
import { ArrowRight } from "lucide-react"

export default function TubelightDemoPage() {
  const navItems = [
    { name: 'Services', url: '#services', icon: 'briefcase' as const },
    { name: 'Fonctionnement', url: '#fonctionnement', icon: 'filetext' as const },
    { name: "L'app", url: '#app-mobile', icon: 'home' as const },
    { name: 'À propos', url: '#a-propos', icon: 'info' as const },
    { name: 'Contact', url: '#contact', icon: 'phone' as const }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-50 pt-3 md:pt-4 bg-white border-b border-brand-border">
        <div className="max-w-container mx-auto px-4 md:px-10 lg:px-20">
          <div className="flex items-center justify-between h-16">
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl text-green-dark">Afribox</span>
              <span className="hidden sm:block font-mono text-[9px] tracking-widest text-green-primary uppercase">
                Smart Locker Network
              </span>
            </div>
            
            <div className="hidden lg:flex items-center gap-6">
              <TubelightNavbar items={navItems} />
              <div className="flex items-center gap-3 pl-6 border-l border-brand-border">
                <Button href="/connexion" variant="ghost" size="sm">
                  Se connecter
                </Button>
                <Button href="/reserver" variant="primary" size="sm">
                  Réserver un locker
                  <ArrowRight size={16} className="ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Content */}
      <main className="max-w-container mx-auto px-4 md:px-10 lg:px-20 py-20">
        <div className="space-y-12">
          <section id="services" className="py-20">
            <h2 className="text-4xl font-bold mb-4 text-green-dark">Services</h2>
            <p className="text-brand-sub text-lg">Nos services innovants pour votre logistique</p>
          </section>

          <section id="fonctionnement" className="py-20">
            <h2 className="text-4xl font-bold mb-4 text-green-dark">Fonctionnement</h2>
            <p className="text-brand-sub text-lg">Comment ça marche</p>
          </section>

          <section id="app-mobile" className="py-20">
            <h2 className="text-4xl font-bold mb-4 text-green-dark">L'app</h2>
            <p className="text-brand-sub text-lg">Téléchargez notre application mobile</p>
          </section>

          <section id="a-propos" className="py-20">
            <h2 className="text-4xl font-bold mb-4 text-green-dark">À propos</h2>
            <p className="text-brand-sub text-lg">En savoir plus sur Afribox</p>
          </section>

          <section id="contact" className="py-20">
            <h2 className="text-4xl font-bold mb-4 text-green-dark">Contact</h2>
            <p className="text-brand-sub text-lg">Nous contacter</p>
          </section>
        </div>
      </main>
    </div>
  )
}
