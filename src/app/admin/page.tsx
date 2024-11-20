'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Plus, ChevronRight, Calendar, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

type Evento = {
  id: string
  nome: string
  local: string
  data: string
  imagem: string
  status: 'ativo' | 'finalizado' | 'cancelado'
  ingressosVendidos: number
  ingressosTotais: number
}

const eventosExemplo: Evento[] = [
  {
    id: '1',
    nome: 'Festival de Verão 2024',
    local: 'Praia de Copacabana, Rio de Janeiro',
    data: '2024-01-15',
    imagem: '/images/image1.jpeg',
    status: 'ativo',
    ingressosVendidos: 5000,
    ingressosTotais: 10000,
  },
  {
    id: '2',
    nome: 'Conferência Tech Inovação',
    local: 'Centro de Convenções, São Paulo',
    data: '2024-03-22',
    imagem: '/images/image1.jpeg',
    status: 'ativo',
    ingressosVendidos: 800,
    ingressosTotais: 1000,
  },
  {
    id: '3',
    nome: 'Show de Rock Nacional',
    local: 'Estádio do Mineirão, Belo Horizonte',
    data: '2023-11-30',
    imagem: '/images/image1.jpeg',
    status: 'finalizado',
    ingressosVendidos: 40000,
    ingressosTotais: 50000,
  },
]

export default function MeusEventos() {
  const [eventos, setEventos] = useState<Evento[]>(eventosExemplo)
  const [eventoSelecionado, setEventoSelecionado] = useState<Evento | null>(
    null,
  )

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Meus Eventos</h1>
        <Link href="/admin/criar-evento">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Criar Evento
          </Button>
        </Link>
      </div>
      <motion.div
        className="space-y-4"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {eventos.map((evento) => (
          <motion.div key={evento.id} variants={item}>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="flex items-center p-4">
                <Image
                  src={evento.imagem}
                  alt={evento.nome}
                  width={100}
                  height={100}
                  className="rounded-md mr-4"
                />
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold">{evento.nome}</h2>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <MapPin className="mr-1 h-4 w-4" /> {evento.local}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <Calendar className="mr-1 h-4 w-4" />{' '}
                    {new Date(evento.data).toLocaleDateString()}
                  </p>
                  <Badge
                    variant={
                      evento.status === 'ativo'
                        ? 'default'
                        : evento.status === 'finalizado'
                          ? 'secondary'
                          : 'destructive'
                    }
                    className="mt-2"
                  >
                    {evento.status.charAt(0).toUpperCase() +
                      evento.status.slice(1)}
                  </Badge>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => setEventoSelecionado(evento)}
                    >
                      Detalhes <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>{eventoSelecionado?.nome}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <p>
                        <strong>Local:</strong> {eventoSelecionado?.local}
                      </p>
                      <p>
                        <strong>Data:</strong>{' '}
                        {new Date(
                          eventoSelecionado?.data || '',
                        ).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Status:</strong> {eventoSelecionado?.status}
                      </p>
                      <p>
                        <strong>Ingressos Vendidos:</strong>{' '}
                        {eventoSelecionado?.ingressosVendidos} /{' '}
                        {eventoSelecionado?.ingressosTotais}
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
