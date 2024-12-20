import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/services/database'

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials

        // Validar email e password
        if (!email || !password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: email as string }, // Garantir que email é tratado como string
        })

        if (!user) {
          return null
        }

        // Aqui estamos usando type assertion para garantir que estamos acessando o campo password
        // Se não utilizar assertion, o TypeScript vai reclamar que password não existe no tipo User
        const userWithPassword = user as { password: string }

        // Comparar a senha de forma segura, utilizando um método adequado como bcrypt
        if (userWithPassword.password === password) {
          return { id: user.id, name: user.name, email: user.email }
        }

        return null
      },
    }),
  ],

  callbacks: {
    // SignIn Callback para criar um novo usuário se ele não existir
    async signIn({ user }) {
      console.log(user)
      const { email } = user

      // Verificar se o email é uma string válida
      if (typeof email !== 'string' || !email) {
        return false // Se o email não for válido, não permite a criação do usuário
      }

      // Verificar se o usuário já existe
      const existingUser = await prisma.user.findUnique({
        where: { email },
      })

      if (!existingUser) {
        // Criar o novo usuário
        await prisma.user.create({
          data: {
            password: user.password,
          },
        })
      }

      return true
    },
  },

  pages: {
    signIn: '/auth/sign-in',
    newUser: '/auth/sign-up', // Página para novo usuário
  },
})

export { handler as GET, handler as POST }
