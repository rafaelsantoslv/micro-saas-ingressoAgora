'use client'

import Image from 'next/image'
import { QRCodeSVG } from 'qrcode.react'

import { Card, CardContent } from '@/components/ui/card'

interface TicketDetailsProps {
  ticket: {
    id: string
    eventTitle: string
    eventDate: string
    ticketType: string
    bannerUrl: string
    uniqueCode: string
  }
}

export function TicketDetails({ ticket }: TicketDetailsProps) {
  return (
    <Card className="max-w-md mx-auto">
      <div className="relative h-48">
        <Image
          src={ticket.bannerUrl}
          alt={`Banner do evento ${ticket.eventTitle}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-2">{ticket.eventTitle}</h2>
        <p className="text-gray-600 mb-4">{ticket.eventDate}</p>
        <div className="flex justify-center mb-4">
          <QRCodeSVG value={ticket.uniqueCode} size={200} />
        </div>
        <p className="text-center text-sm font-mono bg-gray-100 py-2 rounded">
          Código: {ticket.uniqueCode}
        </p>
      </CardContent>
    </Card>
  )
}
