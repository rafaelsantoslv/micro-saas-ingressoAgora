import { Metadata } from 'next'
import Link from 'next/link'

import { TicketList } from '@/components/ticket/TicketList'
import { Button } from '@/components/ui/button'

import { getEvents } from '../actions'

export const metadata: Metadata = {
  title: 'Gestão de Eventos',
  description: 'Adicione, edite e exclua eventos',
}

export default async function EventManagementPage() {
  // Obtém os ingressos disponíveis via backend
  const tickets = await getEvents()
  console.log('consulta tickets ', tickets)

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Gestão de Eventos</h1>

      <Link href="/app/admin/events/create">
        <Button>Novo Evento</Button>
      </Link>

      {/* Passa os ingressos para o TicketList */}
      <TicketList tickets={tickets} isAdmin={true} />
    </div>
  )
}
