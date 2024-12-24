import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/services/database'

export async function POST(req: Request) {
  try {
    // Obter a sessão atual
    const session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { message: 'Não autorizado. Faça login para continuar.' },
        { status: 401 },
      )
    }

    const producerId = session.user.id
    console.log(producerId)
    // Ler o corpo da requisição
    const body = await req.json()

    // Validação dos dados obrigatórios
    const { name, description, date, location } = body
    console.log('meu payload ', body)

    // Verificar se todos os campos obrigatórios foram fornecidos
    if (!name || !description || !date || !location) {
      return NextResponse.json(
        { message: 'Todos os campos obrigatórios precisam ser preenchidos.' },
        { status: 400 },
      )
    }

    // Validar o formato da data
    const parsedDate = new Date(date)
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json({ message: 'Data inválida.' }, { status: 400 })
    }

    console.log('Dados para criação de evento:', {
      name,
      description,
      date: new Date(),
      location,
      producerId,
    })

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

    // Retornar sucesso com os dados do evento criado
    return NextResponse.json(
      { message: 'Evento criado com sucesso!', event },
      { status: 201 },
    )
  } catch (error) {
    console.log('erro que deu: ', error)

    return NextResponse.json(
      { message: 'Erro ao criar o evento. Tente novamente mais tarde.' },
      { status: 500 },
    )
  }
}
