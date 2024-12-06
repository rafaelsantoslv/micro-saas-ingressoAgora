import { Metadata } from 'next'
import SalesManagement from './_components/SalesManagement'

export const metadata: Metadata = {
  title: 'Vendas e Compras',
  description: 'Acompanhe as compras realizadas para seus eventos',
}

export default function SalesPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Vendas e Compras</h1>
      <SalesManagement />
    </div>
  )
}
