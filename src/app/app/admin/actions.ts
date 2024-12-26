'use server'

import { getServerSession } from 'next-auth'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/services/database'

export async function addEvent(body: {
  name: string
  description: string
  date: string
  location: string
}) {
  try {
    // Obter a sessão do usuário para pegar o producerId
    const session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user.id) {
      throw new Error('Usuário não autorizado. Faça login para continuar.')
    }

    const producerId = session.user.id // Aqui está o producerId vindo do token

    const { name, description, date, location } = body

    // Validação dos dados obrigatórios
    if (!name || !description || !date || !location) {
      throw new Error('Todos os campos obrigatórios precisam ser preenchidos.')
    }

    // Validar o formato da data
    const parsedDate = new Date(date)
    if (isNaN(parsedDate.getTime())) {
      throw new Error('Data inválida.')
    }

    // Criar o evento no banco de dados
    const event = await prisma.evento.create({
      data: {
        name,
        description,
        location,
        producerId,
        date: new Date(date),
      },
    })

    return event
  } catch (error) {
    throw new Error(
      error.message || 'Erro ao criar o evento. Tente novamente mais tarde.',
    )
  }
}

export async function getEvents() {
  try {
    const events = prisma.evento.findMany({
      orderBy: {
        date: 'desc',
      },
    })
    return events
  } catch (error) {
    throw new Error(
      error.message || 'Erro ao listar os eventos. Tente novamente mais tarde.',
    )
  }
}
