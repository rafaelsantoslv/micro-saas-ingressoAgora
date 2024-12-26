import { format, isValid } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon, TicketIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

interface TicketCardProps {
  ticket: {
    id: string
    name: string
    date: string // Deve ser uma string em formato ISO ou Date
    ticketType: string
    bannerUrl: string
    fl_ativo: boolean
  }
  isAdmin?: boolean // Propriedade que define se é admin ou não
}

export function TicketCard({ ticket, isAdmin }: TicketCardProps) {
  // Transforme a data em um objeto Date
  const eventDate = new Date(ticket.date)

  // Valide a data antes de formatar
  const formattedDate = isValid(eventDate)
    ? format(eventDate, "d 'de' MMMM 'de' yyyy, HH:mm", { locale: ptBR })
    : 'Data inválida'

  return (
    <Card
      className={`overflow-hidden ${
        ticket.fl_ativo !== true ? 'opacity-50 pointer-events-none' : ''
      }`}
    >
      <div className="relative h-48">
        <Image
          src={ticket.bannerUrl}
          alt={`Banner do evento ${ticket.name}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-2">{ticket.name}</h2>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <CalendarIcon className="w-4 h-4 mr-2" />
          {formattedDate}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <TicketIcon className="w-4 h-4 mr-2" />
          {ticket.ticketType}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <Badge variant="secondary">
          {ticket.fl_ativo === true ? 'Ativo' : 'Inativo'}
        </Badge>
        {ticket.fl_ativo === true && (
          <Button asChild>
            <Link
              href={
                isAdmin
                  ? `/admin/eventos/${ticket.id}`
                  : `/meus-ingressos/${ticket.id}`
              }
            >
              {isAdmin ? 'Ver Evento' : 'Ver Ingresso'}
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
