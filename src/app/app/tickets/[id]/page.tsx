import { TicketDetails } from '@/components/ticketDetails'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Detalhes do Ingresso',
  description: 'Visualize os detalhes do seu ingresso',
}

const getMockTicket = (id: string) => {
  return {
    id,
    eventTitle: 'Rock in Rio 2024',
    eventDate: '10/10/2024',
    ticketType: 'Pista',
    bannerUrl: '/images/image1.jpeg',
    uniqueCode: 'RIR2024-ABCD1234',
  }
}

export default function TicketPage({
  params,
}: {
  params: { ticketId: string }
}) {
  const ticket = getMockTicket(params.ticketId)

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Seu Ingresso</h1>
      <TicketDetails ticket={ticket} />
    </div>
  )
}
