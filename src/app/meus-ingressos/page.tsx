import { Metadata } from 'next'
import { TicketList } from './_components/ticketList'

export const metadata: Metadata = {
  title: 'Meus Ingressos',
  description: 'Visualize todos os seus ingressos para eventos',
}

export default function MeusIngressosPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6">Meus Ingressos</h1>
      <TicketList />
    </div>
  )
}
