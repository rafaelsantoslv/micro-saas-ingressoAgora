'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ImageUpload } from './ImageUpload'
import { DatePicker } from './DatePicker'

const eventSchema = z.object({
  name: z.string().min(2, {
    message: 'O nome do evento deve ter pelo menos 2 caracteres.',
  }),
  description: z.string().min(10, {
    message: 'A descrição deve ter pelo menos 10 caracteres.',
  }),
  date: z.date({
    required_error: 'A data do evento é obrigatória.',
  }),
  location: z.string().min(2, {
    message: 'O local do evento deve ter pelo menos 2 caracteres.',
  }),
  capacity: z.number().min(1, {
    message: 'A capacidade deve ser de pelo menos 1 pessoa.',
  }),
  price: z.number().min(0, {
    message: 'O preço não pode ser negativo.',
  }),
  availableTickets: z.number().min(0, {
    message: 'A quantidade de ingressos disponíveis não pode ser negativa.',
  }),
})

export function EventForm({ event, onClose }) {
  const [images, setImages] = useState(event?.images || [])

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: event || {
      name: '',
      description: '',
      date: new Date(),
      location: '',
      capacity: 0,
      price: 0,
      availableTickets: 0,
    },
  })

  function onSubmit(values: z.infer<typeof eventSchema>) {
    // TODO: Implement event submission logic
    console.log(values)
    console.log(images)
    onClose()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Evento</FormLabel>
              <FormControl>
                <Input placeholder="Nome do evento" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva o evento"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data do Evento</FormLabel>
              <DatePicker />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Local</FormLabel>
              <FormControl>
                <Input placeholder="Local do evento" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacidade</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Capacidade do evento"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço do Ingresso</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Preço do ingresso"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="availableTickets"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ingressos Disponíveis</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Quantidade de ingressos disponíveis"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ImageUpload images={images} setImages={setImages} />
        <Button type="submit">Salvar Evento</Button>
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="ml-2"
        >
          Cancelar
        </Button>
      </form>
    </Form>
  )
}
