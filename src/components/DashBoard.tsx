'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { EventSelector } from './EventSelector'
import { Overview } from './OverView'
import { RecentSales } from './RecentsSales'
import { Notifications } from './Notifications'

export default function DashboardComponent() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)

  // Simulated data - in a real application, this would come from an API
  const dashboardData = {
    totalTickets: 1234,
    revenue: 45678.9,
    visitors: 5678,
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <EventSelector onSelectEvent={setSelectedEvent} />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total de Ingressos Vendidos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{dashboardData.totalTickets}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Receitas Geradas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            R$ {dashboardData.revenue.toFixed(2)}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Visitantes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{dashboardData.visitors}</div>
        </CardContent>
      </Card>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Visão Geral</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <Overview />
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Últimas Compras</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentSales />
        </CardContent>
      </Card>
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Notificações</CardTitle>
        </CardHeader>
        <CardContent>
          <Notifications />
        </CardContent>
      </Card>
    </div>
  )
}
