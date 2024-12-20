import { EventForm } from '@/components/event-form'
import { Stepper } from '@/components/stepper'

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
