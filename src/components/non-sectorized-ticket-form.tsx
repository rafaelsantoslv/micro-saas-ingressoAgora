'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

interface NonSectorizedTicketData {
  price: string
  quantity: number
}

export function NonSectorizedTicketForm() {
  const router = useRouter()
  const [ticketData, setTicketData] = useState<NonSectorizedTicketData>({
    price: '',
    quantity: 0,
  })

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    const formattedValue = (Number(value) / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
    setTicketData((prev) => ({ ...prev, price: formattedValue }))
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)
    setTicketData((prev) => ({ ...prev, quantity: isNaN(value) ? 0 : value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Ticket data:', ticketData)
    // Here you would typically send the data to your backend
    alert('Evento criado com sucesso!')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Detalhes do Ingresso</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="price">Valor do Ingresso</Label>
            <Input
              id="price"
              value={ticketData.price}
              onChange={handlePriceChange}
              placeholder="R$ 0,00"
            />
            <p className="text-sm text-muted-foreground">
              Digite o preço do ingresso. O valor será formatado
              automaticamente.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantidade de Ingressos</Label>
            <Input
              id="quantity"
              type="number"
              value={ticketData.quantity}
              onChange={handleQuantityChange}
              min={0}
            />
            <p className="text-sm text-muted-foreground">
              Informe o número total de ingressos disponíveis para venda.
            </p>
          </div>
        </CardContent>
      </Card>
      <div className="flex space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/create-event')}
          className="flex-1"
        >
          Voltar
        </Button>
        <Button type="submit" className="flex-1">
          Criar Evento
        </Button>
      </div>
    </form>
  )
}
