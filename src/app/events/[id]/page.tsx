import CardPaymentsMethods from '@/components/cardPaymentsMethods'
import EventBanner from '@/components/eventBanner'
import EventDescription from '@/components/eventDescription'

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
    eventAbout:
      'Bandas nacionais e internacionais, Cerveja, cocktails, refrigerantes',
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
      <EventBanner
        name={event.name}
        date={event.date}
        location={event.location}
        imageUrl={event.imageUrl}
      />

      <section className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <EventDescription
            eventAbout={event.eventAbout}
            description={event.description}
          />
        </div>
        <div className="md:w-1/3">
          <CardPaymentsMethods
            paymentMethods={event.paymentMethods}
            ageRestriction={event.ageRestriction}
          />
        </div>
      </section>
    </div>
  )
}
