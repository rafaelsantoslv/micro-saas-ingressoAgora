'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { NonSectorizedTicketForm } from '@/components/events/EventNoSectorized'
import { Stepper } from '@/components/events/EventStepper'
import { SectorForm } from '@/components/forms/SectorForm'
import { Button } from '@/components/ui/button'

export default function TicketsPage() {
  const searchParams = useSearchParams()
  const isSectorized = searchParams.get('isSectorized') === 'true'
  const router = useRouter()

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        {isSectorized ? 'Adicionar Setores e Lotes' : 'Detalhes do Ingresso'}
      </h1>
      <Stepper steps={['Informações Básicas', 'Ingressos']} currentStep={1} />
      <div className="mb-6">
        <Button variant="outline" onClick={() => router.push('/create-event')}>
          Voltar
        </Button>
      </div>
      {isSectorized ? <SectorForm /> : <NonSectorizedTicketForm />}
    </div>
  )
}
