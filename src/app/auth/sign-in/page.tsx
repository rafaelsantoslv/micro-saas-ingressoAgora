'use client'
import Link from 'next/link'

import SignInForm from '@/components/forms/SignInForm'
import { Button } from '@/components/ui/button'

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="w-full max-w-md rounded-lg bg-background p-8 shadow-lg">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link href="/auth/sign-up">Criar Conta</Link>
        </Button>
        <div className="flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar Conta
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe seus ingressos por aqui!
            </p>
          </div>
          <SignInForm />
        </div>
      </div>
    </div>
  )
}
