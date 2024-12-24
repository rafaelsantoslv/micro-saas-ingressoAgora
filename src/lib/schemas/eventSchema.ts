import { z } from 'zod'

export const eventSchema = z.object({
  name: z.string().min(1, { message: 'Nome do evento é obrigatório' }),
  description: z.string().min(1, { message: 'Descrição é obrigatória' }),
  date: z.date(),
  location: z.string().min(1, { message: 'Local é obrigatório' }),
  isSectorized: z.boolean(),
})

export type EventFormSchema = z.infer<typeof eventSchema>
