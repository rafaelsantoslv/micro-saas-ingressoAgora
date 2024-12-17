'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { EventForm } from './EventForm'
import { EventList } from './EventList'

export default function EventManagement() {
  const [isAddingEvent, setIsAddingEvent] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)

  const handleAddEvent = () => {
    setIsAddingEvent(true)
    setSelectedEvent(null)
  }

  const handleEditEvent = (event) => {
    setSelectedEvent(event)
    setIsAddingEvent(true)
  }

  const handleCloseForm = () => {
    setIsAddingEvent(false)
    setSelectedEvent(null)
  }

  return (
    <div className="space-y-6">
      {!isAddingEvent && (
        <Button onClick={handleAddEvent}>
          <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Novo Evento
        </Button>
      )}
      {isAddingEvent ? (
        <EventForm event={selectedEvent} onClose={handleCloseForm} />
      ) : (
        <EventList onEditEvent={handleEditEvent} />
      )}
    </div>
  )
}
