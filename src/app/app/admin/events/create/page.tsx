import { Stepper } from '@/components/events/EventStepper'
import { EventForm } from '@/components/forms/EventForm'

export default function CreateEventPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Criar Novo Evento</h1>
      <Stepper
        steps={['Informações Básicas', 'Setores e Lotes']}
        currentStep={0}
      />
      <EventForm />
    </div>
  )
}
