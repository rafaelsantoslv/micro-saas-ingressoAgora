import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const { pathname } = req.nextUrl

  // Se o usuário estiver logado, impede o acesso à página de login
  if (token && pathname.startsWith('/auth/sign-in')) {
    // Redireciona para a página principal, por exemplo /app
    const url = new URL('/', req.url)
    return NextResponse.redirect(url)
  }

  // Se não estiver logado, redireciona para a página de login se tentar acessar as páginas protegidas
  if (!token && pathname.startsWith('/app')) {
    const url = new URL('/auth/sign-in', req.url)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/app/:path*', '/auth/sign-in'], // Aplica o middleware nas rotas protegidas e de login
}
