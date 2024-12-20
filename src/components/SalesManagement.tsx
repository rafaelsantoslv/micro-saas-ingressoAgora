'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Download, Eye } from 'lucide-react'
import { DatePicker } from './DatePicker'

// Mock data for demonstration
const mockSales = [
  {
    id: 1,
    buyer: 'João Silva',
    email: 'joao@example.com',
    cpf: '123.456.789-00',
    event: 'Concerto de Rock',
    paymentMethod: 'Cartão de Crédito',
    date: '2023-07-15',
  },
  {
    id: 2,
    buyer: 'Maria Santos',
    email: 'maria@example.com',
    cpf: '987.654.321-00',
    event: 'Festival de Jazz',
    paymentMethod: 'Boleto',
    date: '2023-07-20',
  },
  {
    id: 3,
    buyer: 'Carlos Oliveira',
    email: 'carlos@example.com',
    cpf: '456.789.123-00',
    event: 'Show de Comédia',
    paymentMethod: 'PIX',
    date: '2023-07-25',
  },
]

export default function SalesManagement() {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())
  const [searchTerm, setSearchTerm] = useState('')

  const filteredSales = mockSales.filter(
    (sale) =>
      sale.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.cpf.includes(searchTerm) ||
      sale.event.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleExport = () => {
    // TODO: Implement CSV export logic
    console.log('Exporting sales data...')
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <DatePicker />
        <span>até</span>
        <DatePicker />
        <Input
          placeholder="Buscar por nome, email, CPF ou evento"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" /> Exportar CSV
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Comprador</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>CPF</TableHead>
            <TableHead>Evento</TableHead>
            <TableHead>Método de Pagamento</TableHead>
            <TableHead>Data da Compra</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSales.map((sale) => (
            <TableRow key={sale.id}>
              <TableCell>{sale.buyer}</TableCell>
              <TableCell>{sale.email}</TableCell>
              <TableCell>{sale.cpf}</TableCell>
              <TableCell>{sale.event}</TableCell>
              <TableCell>{sale.paymentMethod}</TableCell>
              <TableCell>{sale.date}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
