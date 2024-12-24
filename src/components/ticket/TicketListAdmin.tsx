import { TicketCardAdmin } from './TicketCardAdmin'

const mockTickets = [
  {
    id: '1',
    eventTitle: 'Rock in Rio 2024',
    eventDate: '2024-09-27T20:00:00Z',
    ticketType: 'Pista',
    bannerUrl: '/images/image1.jpeg',
    status: 'actived',
  },
  {
    id: '2',
    eventTitle: 'Lollapalooza Brasil',
    eventDate: '2024-03-22T14:00:00Z',
    ticketType: 'Camarote',
    bannerUrl: '/images/image1.jpeg',
    status: 'actived',
  },
  {
    id: '3',
    eventTitle: 'Festival de Verão Salvador',
    eventDate: '2024-01-27T16:00:00Z',
    ticketType: 'Comum',
    bannerUrl: '/images/image1.jpeg',
    status: 'inactived',
  },
]

export function TicketListAdmin() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {mockTickets.map((ticket) => (
        <TicketCardAdmin key={ticket.id} ticket={ticket} />
      ))}
    </div>
  )
}
