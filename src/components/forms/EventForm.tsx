'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Upload } from 'lucide-react'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useEventSubmit } from '@/hooks/useEventSubmit'
import { EventFormSchema, eventSchema } from '@/lib/schemas/eventSchema'

import { DatePickerField } from '../DatePickerField'
import { FormField } from './FormField'

export function EventForm() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { submitEvent, isSubmitting } = useEventSubmit()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<EventFormSchema>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      date: new Date(),
      isSectorized: false,
    },
  })

  const selectedDate = watch('date')

  const handleSubmitForm = (data: EventFormSchema) => {
    submitEvent(data)
  }

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="space-y-6 max-w-2xl mx-auto"
    >
      <FormField
        id="name"
        label="Nome do Evento"
        error={errors.name?.message}
        register={register}
        placeholder="Ex: Festival de Verão 2023"
      />

      <FormField
        id="description"
        label="Descrição"
        error={errors.description?.message}
        register={register}
        type="textarea"
        placeholder="Descreva seu evento..."
      />

      <DatePickerField
        id="date"
        label="Data do Evento"
        selected={selectedDate}
        onSelect={(date) => date && setValue('date', date)}
        error={errors.date?.message}
      />

      <FormField
        id="location"
        label="Local do Evento"
        error={errors.location?.message}
        register={register}
        placeholder="Ex: Centro de Convenções"
      />

      <div className="flex items-center space-x-2">
        <Switch id="isSectorized" {...register('isSectorized')} />
        <Label htmlFor="isSectorized">Evento Setorizado</Label>
      </div>


      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Próxima Etapa'}
      </Button>
    </form>
  )
}
