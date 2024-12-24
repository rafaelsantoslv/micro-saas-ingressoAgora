import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { EventFormSchema } from '@/lib/schemas/eventSchema'

export const useEventSubmit = () => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitEvent = async (data: EventFormSchema) => {
    console.log('dados que chegaram: ', data)
    setIsSubmitting(true)
    try {
      const jsonData = {
        ...data,
        date: (data.date as Date).toISOString(),
        isSectorized: Boolean(data.isSectorized),
      }

      const response = await fetch('/api/events', {
        method: 'POST',
        body: JSON.stringify(jsonData),
      })

      if (!response.ok) {
        throw new Error('Falha ao criar o evento')
      }

      const result = await response.json()
      toast.success('evento cadastrado com sucesso')
      router.push(
        `/app/admin/events/create/tickets?eventId=${result.id}&isSectorized=${data.isSectorized}`,
      )
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error)
      toast.error('Erro ao cadastrar evento')
    } finally {
      setIsSubmitting(false)
    }
  }

  return { submitEvent, isSubmitting }
}
