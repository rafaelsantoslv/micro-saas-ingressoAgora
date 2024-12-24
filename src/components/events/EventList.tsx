'use client'

import { Edit, Trash2 } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// Mock data for demonstration
const mockEvents = [
  {
    id: 1,
    name: 'Concerto de Rock',
    date: '2023-08-15',
    location: 'Estádio Municipal',
  },
  {
    id: 2,
    name: 'Festival de Jazz',
    date: '2023-09-01',
    location: 'Parque Central',
  },
  {
    id: 3,
    name: 'Show de Comédia',
    date: '2023-07-30',
    location: 'Teatro Nacional',
  },
]

export function EventList({ onEditEvent }) {
  const [events, setEvents] = useState(mockEvents)

  const handleDelete = (id) => {
    // TODO: Implement actual delete logic
    setEvents(events.filter((event) => event.id !== id))
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome do Evento</TableHead>
          <TableHead>Data</TableHead>
          <TableHead>Local</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event) => (
          <TableRow key={event.id}>
            <TableCell>{event.name}</TableCell>
            <TableCell>{event.date}</TableCell>
            <TableCell>{event.location}</TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEditEvent(event)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(event.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
