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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Eye, Download } from 'lucide-react'
import { DatePicker } from './DatePicker'

// Mock data for demonstration
const mockPayments = [
  {
    id: 1,
    producer: 'João Silva',
    event: 'Concerto de Rock',
    amount: 5000,
    status: 'Pago',
    date: '2023-07-15',
  },
  {
    id: 2,
    producer: 'Maria Santos',
    event: 'Festival de Jazz',
    amount: 7500,
    status: 'Pendente',
    date: '2023-07-20',
  },
  {
    id: 3,
    producer: 'Carlos Oliveira',
    event: 'Show de Comédia',
    amount: 3000,
    status: 'Pago',
    date: '2023-07-25',
  },
]

export default function AdminPayments() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredPayments = mockPayments.filter(
    (payment) =>
      (payment.producer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.event.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'all' || payment.status.toLowerCase() === statusFilter),
  )

  const handleExport = () => {
    // TODO: Implement CSV export logic
    console.log('Exporting payment data...')
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <DatePicker />
        <span>até</span>
        <DatePicker />
        <Input
          placeholder="Buscar por produtor ou evento"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status do Pagamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="pago">Pago</SelectItem>
            <SelectItem value="pendente">Pendente</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" /> Exportar CSV
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Produtor</TableHead>
            <TableHead>Evento</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPayments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>{payment.producer}</TableCell>
              <TableCell>{payment.event}</TableCell>
              <TableCell>R$ {payment.amount.toFixed(2)}</TableCell>
              <TableCell>{payment.status}</TableCell>
              <TableCell>{payment.date}</TableCell>
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
