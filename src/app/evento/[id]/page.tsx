import Image from 'next/image'
import { CreditCard, Calendar, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

// Esta função seria usada para buscar os detalhes do evento com base no ID
async function getEventDetails(id: string) {
  // Simular uma chamada de API
  return {
    id,
    name: 'Festival de Verão',
    date: '15 de Janeiro, 2024',
    location: 'Praia de Copacabana, Rio de Janeiro',
    imageUrl: '/images/image1.jpeg',
    description:
      'O maior festival de música do verão! Com shows incríveis, bebidas refrescantes e muito mais.',
    drinks: 'Cerveja, cocktails, refrigerantes',
    shows: 'Bandas nacionais e internacionais',
    ageRestriction: '+18',
    paymentMethods: ['PIX', 'Mastercard', 'Visa', 'Elo', 'Hypercard'],
  }
}

export default async function EventPage({
  params,
}: {
  params: { id: string }
}) {
  const event = await getEventDetails(params.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <Image
            src={event.imageUrl}
            alt={event.name}
            width={600}
            height={400}
            className="rounded-lg object-cover w-full h-[400px]"
          />
        </div>
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">{event.name}</h1>
            <p className="text-xl mb-4 flex items-center">
              <Calendar className="mr-2" /> {event.date}
            </p>
            <p className="text-xl mb-6 flex items-center">
              <MapPin className="mr-2" /> {event.location}
            </p>
          </div>
          <Button size="lg" className="w-full md:w-auto">
            Comprar Ingresso
          </Button>
        </div>
      </section>

      <section className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <h2 className="text-2xl font-semibold mb-4">Sobre o Evento</h2>
          <p className="mb-4">{event.description}</p>
          <h3 className="text-xl font-semibold mb-2">O que teremos:</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Bebidas: {event.drinks}</li>
            <li>Shows: {event.shows}</li>
          </ul>
        </div>
        <div className="md:w-1/3">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Informações</h3>
              <Badge variant="secondary" className="mb-4 text-lg">
                {event.ageRestriction}
              </Badge>
              <h4 className="font-semibold mb-2">Formas de Pagamento:</h4>
              <div className="flex flex-wrap gap-2">
                {event.paymentMethods.map((method) => (
                  <Badge
                    key={method}
                    variant="outline"
                    className="flex items-center"
                  >
                    <CreditCard className="mr-1 h-4 w-4" />
                    {method}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
