import { FileText, Home, Briefcase, Phone, Info } from 'lucide-react'
import { TubelightNavbar } from "@/components/ui/TubelightNavbar"

export function TubelightNavbarDemo() {
  const navItems = [
    { name: 'Services', url: '#services', icon: Briefcase },
    { name: 'Fonctionnement', url: '#fonctionnement', icon: FileText },
    { name: "L'app", url: '#app-mobile', icon: Home },
    { name: 'À propos', url: '#a-propos', icon: Info },
    { name: 'Contact', url: '#contact', icon: Phone }
  ]

  return (
    <div className="p-8">
      <h2 className="mb-6 text-2xl font-bold">Tubelight Navbar - Afribox Style</h2>
      <TubelightNavbar items={navItems} />
    </div>
  )
}
