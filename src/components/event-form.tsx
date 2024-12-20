'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { EventData } from '@/lib/types'

export function EventForm() {
  const router = useRouter()
  const [eventData, setEventData] = useState<EventData>({
    name: '',
    description: '',
    date: new Date(),
    location: '',
    isSectorized: false,
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setEventData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setEventData((prev) => ({ ...prev, date }))
    }
  }

  const handleSwitchChange = (checked: boolean) => {
    setEventData((prev) => ({ ...prev, isSectorized: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Event data:', eventData)
    router.push(`/eventos/tickets?isSectorized=${eventData.isSectorized}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <Label htmlFor="name">Nome do Evento</Label>
        <Input
          id="name"
          name="name"
          value={eventData.name}
          onChange={handleInputChange}
          required
          placeholder="Ex: Festival de Verão 2023"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          name="description"
          value={eventData.description}
          onChange={handleInputChange}
          required
          placeholder="Descreva seu evento..."
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="date">Data do Evento</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-full justify-start text-left font-normal',
                !eventData.date && 'text-muted-foreground',
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {eventData.date ? (
                format(eventData.date, "d 'de' MMMM 'de' yyyy", {
                  locale: ptBR,
                })
              ) : (
                <span>Selecione uma data</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={eventData.date}
              onSelect={handleDateChange}
              initialFocus
              locale={ptBR}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="space-y-2">
        <Label htmlFor="location">Local do Evento</Label>
        <Input
          id="location"
          name="location"
          value={eventData.location}
          onChange={handleInputChange}
          required
          placeholder="Ex: Centro de Convenções"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="isSectorized"
          checked={eventData.isSectorized}
          onCheckedChange={handleSwitchChange}
        />
        <Label htmlFor="isSectorized">Evento Setorizado</Label>
      </div>
      <Button type="submit" className="w-full">
        Próxima Etapa
      </Button>
    </form>
  )
}
