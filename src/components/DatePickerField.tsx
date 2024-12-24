import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface DatePickerFieldProps {
  id: string
  label: string
  selected: Date
  onSelect: (date: Date | undefined) => void
  error?: string
}

export function DatePickerField({
  id,
  label,
  selected,
  onSelect,
  error,
}: DatePickerFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal',
              !selected && 'text-muted-foreground',
            )}
            aria-invalid={error ? 'true' : 'false'}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selected ? (
              format(selected, "d 'de' MMMM 'de' yyyy", { locale: ptBR })
            ) : (
              <span>Selecione uma data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={onSelect}
            initialFocus
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
      {error && (
        <p className="text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
