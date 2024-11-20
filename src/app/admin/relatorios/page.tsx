'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { ArrowUpDown, DollarSign, Ticket, Users } from 'lucide-react'
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type Relatorio = {
  id: string
  nome: string
  ingressosVendidos: number
  ingressosDisponiveis: number
  loteAtual: string
  faturamento: number
}

const relatoriosExemplo: Relatorio[] = [
  {
    id: '1',
    nome: 'Festival de Verão 2024',
    ingressosVendidos: 5000,
    ingressosDisponiveis: 5000,
    loteAtual: '2º Lote',
    faturamento: 500000,
  },
  {
    id: '2',
    nome: 'Conferência Tech Inovação',
    ingressosVendidos: 800,
    ingressosDisponiveis: 200,
    loteAtual: '3º Lote',
    faturamento: 160000,
  },
  {
    id: '3',
    nome: 'Show de Rock Nacional',
    ingressosVendidos: 40000,
    ingressosDisponiveis: 10000,
    loteAtual: 'Lote Final',
    faturamento: 2000000,
  },
  {
    id: '4',
    nome: 'Feira Gastronômica',
    ingressosVendidos: 3000,
    ingressosDisponiveis: 2000,
    loteAtual: '1º Lote',
    faturamento: 150000,
  },
  {
    id: '5',
    nome: 'Exposição de Arte Moderna',
    ingressosVendidos: 1500,
    ingressosDisponiveis: 500,
    loteAtual: '2º Lote',
    faturamento: 75000,
  },
]

export default function Relatorios() {
  const [relatorios, setRelatorios] = useState<Relatorio[]>(relatoriosExemplo)
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Relatorio
    direction: 'asc' | 'desc'
  } | null>(null)
  const [filtro, setFiltro] = useState('')

  const sortedRelatorios = useMemo(() => {
    const sortableRelatorios = [...relatorios]
    if (sortConfig !== null) {
      sortableRelatorios.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
      })
    }
    return sortableRelatorios
  }, [relatorios, sortConfig])

  const filteredRelatorios = useMemo(() => {
    return sortedRelatorios.filter((relatorio) =>
      relatorio.nome.toLowerCase().includes(filtro.toLowerCase()),
    )
  }, [sortedRelatorios, filtro])

  const requestSort = (key: keyof Relatorio) => {
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

  const totalFaturamento = filteredRelatorios.reduce(
    (sum, relatorio) => sum + relatorio.faturamento,
    0,
  )
  const totalIngressosVendidos = filteredRelatorios.reduce(
    (sum, relatorio) => sum + relatorio.ingressosVendidos,
    0,
  )

  const chartData = {
    labels: filteredRelatorios.map((r) => r.nome),
    datasets: [
      {
        label: 'Faturamento (R$)',
        data: filteredRelatorios.map((r) => r.faturamento),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Ingressos Vendidos',
        data: filteredRelatorios.map((r) => r.ingressosVendidos),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Desempenho dos Eventos',
      },
    },
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Relatórios</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Faturamento Total
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {totalFaturamento.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Ingressos Vendidos
            </CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalIngressosVendidos}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Eventos Ativos
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredRelatorios.length}
            </div>
          </CardContent>
        </Card>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Bar data={chartData} options={chartOptions} className="mb-8" />
      </motion.div>

      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Filtrar por nome do evento"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="max-w-sm"
        />
        <Select
          onValueChange={(value) => requestSort(value as keyof Relatorio)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nome">Nome</SelectItem>
            <SelectItem value="ingressosVendidos">
              Ingressos Vendidos
            </SelectItem>
            <SelectItem value="faturamento">Faturamento</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">
                <Button variant="ghost" onClick={() => requestSort('nome')}>
                  Evento <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => requestSort('ingressosVendidos')}
                >
                  Ingressos Vendidos <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Ingressos Disponíveis</TableHead>
              <TableHead>Lote Atual</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => requestSort('faturamento')}
                >
                  Faturamento <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRelatorios.map((relatorio) => (
              <TableRow key={relatorio.id}>
                <TableCell className="font-medium">{relatorio.nome}</TableCell>
                <TableCell>{relatorio.ingressosVendidos}</TableCell>
                <TableCell>{relatorio.ingressosDisponiveis}</TableCell>
                <TableCell>{relatorio.loteAtual}</TableCell>
                <TableCell>
                  R$ {relatorio.faturamento.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
