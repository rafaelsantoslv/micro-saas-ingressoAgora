import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/services/database'
import { compareSync } from 'bcrypt'

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

        if (!email || !password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email },
        })

        if (!user) {
          return null
        }

        const passwordMatch = compareSync(password, user.password ?? '')

        if (passwordMatch) {
          return { id: user.id, name: user.name, email: user.email }
        }
        return null
      },
    }),
  ],

  pages: {
    signIn: '/auth/sign-in',
  },
})

export { handler as GET, handler as POST }
