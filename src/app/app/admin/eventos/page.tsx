import { Metadata } from 'next'
import EventManagement from './_components/EventManagement'

export const metadata: Metadata = {
  title: 'Gestão de Eventos',
  description: 'Adicione, edite e exclua eventos',
}

export default function EventManagementPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Gestão de Eventos</h1>
      <EventManagement />
    </div>
  )
}
