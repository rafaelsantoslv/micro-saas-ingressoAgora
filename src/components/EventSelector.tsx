'use client'

import { useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const events = [
  {
    value: 'event1',
    label: 'Evento de Rock',
  },
  {
    value: 'event2',
    label: 'Festival de Jazz',
  },
  {
    value: 'event3',
    label: 'Concerto de Música Clássica',
  },
]

export function EventSelector({
  onSelectEvent,
}: {
  onSelectEvent: (value: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? events.find((event) => event.value === value)?.label
            : 'Selecione um evento...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Procurar evento..." />
          <CommandEmpty>Nenhum evento encontrado.</CommandEmpty>
          <CommandGroup>
            {events.map((event) => (
              <CommandItem
                key={event.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? '' : currentValue)
                  onSelectEvent(currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === event.value ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {event.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
