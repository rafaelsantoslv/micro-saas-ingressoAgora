import Link from 'next/link'
import { DollarSign, CreditCard, Calendar, Menu } from 'lucide-react'

const navItems = [
  { icon: DollarSign, label: 'Vendas', href: '/app/admin/vendas' },
  { icon: CreditCard, label: 'Pagamentos', href: '/app/admin/pagamentos' },
  { icon: Calendar, label: 'Eventos', href: '/app/admin/eventos' },
]

export function HeaderSide() {
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="text-2xl font-bold">
            Administração
          </Link>
          <nav className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-1 hover:text-secondary-foreground transition-colors"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
          <button className="md:hidden text-primary-foreground">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  )
}
