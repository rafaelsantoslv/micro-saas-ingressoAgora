'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, ArrowUpDown, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type Ingresso = {
  id: string
  identificador: string
  email: string
  nome: string
  metodoPagamento: string
  cpf: string
  dataCompra: string
  eventoId: string
  eventoNome: string
}

type Evento = {
  id: string
  nome: string
}

const ingressosExemplo: Ingresso[] = [
  {
    id: '1',
    identificador: 'FV2024-001',
    email: 'joao@email.com',
    nome: 'João Silva',
    metodoPagamento: 'Cartão de Crédito',
    cpf: '123.456.789-00',
    dataCompra: '2023-11-15',
    eventoId: '1',
    eventoNome: 'Festival de Verão 2024',
  },
  {
    id: '2',
    identificador: 'FV2024-002',
    email: 'maria@email.com',
    nome: 'Maria Santos',
    metodoPagamento: 'PIX',
    cpf: '987.654.321-00',
    dataCompra: '2023-11-16',
    eventoId: '1',
    eventoNome: 'Festival de Verão 2024',
  },
  {
    id: '3',
    identificador: 'TI2024-001',
    email: 'pedro@email.com',
    nome: 'Pedro Oliveira',
    metodoPagamento: 'Boleto',
    cpf: '456.789.123-00',
    dataCompra: '2023-11-17',
    eventoId: '2',
    eventoNome: 'Conferência Tech Inovação',
  },
  {
    id: '4',
    identificador: 'RN2023-001',
    email: 'ana@email.com',
    nome: 'Ana Rodrigues',
    metodoPagamento: 'Cartão de Débito',
    cpf: '789.123.456-00',
    dataCompra: '2023-11-18',
    eventoId: '3',
    eventoNome: 'Show de Rock Nacional',
  },
  {
    id: '3',
    identificador: 'FV2024-003',
    email: 'carlos@email.com',
    nome: 'Carlos Ferreira',
    metodoPagamento: 'PayPal',
    cpf: '321.654.987-00',
    dataCompra: '2023-11-19',
    eventoId: '1',
    eventoNome: 'Festival de Verão 2024',
  },
]

const eventosExemplo: Evento[] = [
  { id: '1', nome: 'Festival de Verão 2024' },
  { id: '2', nome: 'Conferência Tech Inovação' },
  { id: '3', nome: 'Show de Rock Nacional' },
]

export default function Ingressos() {
  const [ingressos, setIngressos] = useState<Ingresso[]>(ingressosExemplo)
  const [eventos] = useState<Evento[]>(eventosExemplo)
  const [eventoSelecionado, setEventoSelecionado] = useState<string>('')
  const [filtro, setFiltro] = useState('')
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Ingresso
    direction: 'asc' | 'desc'
  } | null>(null)

  const ingressosFiltrados = useMemo(() => {
    return ingressos
      .filter(
        (ingresso) =>
          (eventoSelecionado
            ? ingresso.eventoId === eventoSelecionado
            : true) &&
          (ingresso.nome.toLowerCase().includes(filtro.toLowerCase()) ||
            ingresso.email.toLowerCase().includes(filtro.toLowerCase()) ||
            ingresso.identificador
              .toLowerCase()
              .includes(filtro.toLowerCase())),
      )
      .sort((a, b) => {
        if (sortConfig === null) {
          return 0
        }
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
      })
  }, [ingressos, eventoSelecionado, filtro, sortConfig])

  const requestSort = (key: keyof Ingresso) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'asc'
    ) {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const handleExportCSV = () => {
    const headers = [
      'Identificador',
      'Nome',
      'Email',
      'CPF',
      'Método de Pagamento',
      'Data de Compra',
      'Evento',
    ]
    const csvContent = [
      headers.join(','),
      ...ingressosFiltrados.map((ingresso) =>
        [
          ingresso.identificador,
          ingresso.nome,
          ingresso.email,
          ingresso.cpf,
          ingresso.metodoPagamento,
          ingresso.dataCompra,
          ingresso.eventoNome,
        ].join(','),
      ),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', 'ingressos.csv')
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Ingressos</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Ingressos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {ingressosFiltrados.length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
        <div className="flex-1 w-full md:w-auto md:mr-4">
          <Input
            placeholder="Buscar por nome, email ou identificador"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="w-full"
            startIcon={<Search className="h-4 w-4 text-gray-400" />}
          />
        </div>
        <Select value={eventoSelecionado} onValueChange={setEventoSelecionado}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Selecione um evento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos os eventos</SelectItem>
            {eventos.map((evento) => (
              <SelectItem key={evento.id} value={evento.id}>
                {evento.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleExportCSV} className="w-full md:w-auto">
          <Download className="mr-2 h-4 w-4" /> Exportar CSV
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => requestSort('identificador')}
                  >
                    Identificador <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => requestSort('nome')}>
                    Nome <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => requestSort('email')}>
                    Email <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>CPF</TableHead>
                <TableHead>Método de Pagamento</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => requestSort('dataCompra')}
                  >
                    Data de Compra <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Evento</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ingressosFiltrados.map((ingresso) => (
                <TableRow key={ingresso.id}>
                  <TableCell className="font-medium">
                    {ingresso.identificador}
                  </TableCell>
                  <TableCell>{ingresso.nome}</TableCell>
                  <TableCell>{ingresso.email}</TableCell>
                  <TableCell>{ingresso.cpf}</TableCell>
                  <TableCell>{ingresso.metodoPagamento}</TableCell>
                  <TableCell>
                    {new Date(ingresso.dataCompra).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{ingresso.eventoNome}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </div>
  )
}
