import Image from 'next/image'
import { CalendarIcon, TicketIcon } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface TicketCardProps {
  ticket: {
    id: string
    eventTitle: string
    eventDate: string
    ticketType: string
    bannerUrl: string
    status: string
  }
}

export function TicketCard({ ticket }: TicketCardProps) {
  const formattedDate = format(
    new Date(ticket.eventDate),
    "d 'de' MMMM 'de' yyyy, HH:mm",
    { locale: ptBR },
  )

  return (
    <Card
      className={`overflow-hidden ${ticket.status !== 'actived' ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <div className="relative h-48">
        <Image
          src={ticket.bannerUrl}
          alt={`Banner do evento ${ticket.eventTitle}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-2">{ticket.eventTitle}</h2>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <CalendarIcon className="w-4 h-4 mr-2" />
          {formattedDate}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <TicketIcon className="w-4 h-4 mr-2" />
          {ticket.ticketType}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Badge variant="secondary">
          {ticket.status === 'actived' ? 'Ativo' : 'inativo'}
        </Badge>
        {ticket.status === 'actived' ? (
          <Button asChild>
            <Link href={`/meus-ingressos/${ticket.id}`}>Ver Ingresso</Link>
          </Button>
        ) : (
          ''
        )}
      </CardFooter>
    </Card>
  )
}
