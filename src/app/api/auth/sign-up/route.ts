// app/api/auth/sign-up/route.ts

import { NextResponse } from 'next/server'

import { hashPassword } from '@/lib/hashPassword'
import { prisma } from '@/services/database'

export async function POST(req: Request) {
  try {
    // Recebe os dados do corpo da requisição
    const body = await req.json()

    if (!body) {
      return NextResponse.json(
        { message: 'Dados não fornecidos' },
        { status: 400 },
      )
    }

    // Aqui você pode processar os dados
    console.log('Dados recebidos:', body)

    const { name, email, password } = body

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'Usuário já existe' },
        { status: 400 },
      )
    }
    const hashedPassword = await hashPassword(password)

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword, // Lembre-se de hash a senha antes de salvar
        name,
        role: 'COMPRADOR',
      },
    })

    console.log(newUser)

    return NextResponse.json(
      { message: 'Usuário criado com sucesso!' },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao criar usuário', error },
      { status: 500 },
    )
  }
}
