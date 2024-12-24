import Link from 'next/link'

import SignUpForm from '@/components/forms/SignUpForm'
import { Button } from '@/components/ui/button'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Button variant="ghost" asChild className="absolute right-8 top-8">
        <Link href="/auth/sign-in">Voltar</Link>
      </Button>
      <div className="w-full max-w-[400px] space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Criar conta</h1>
          <p className="text-sm text-muted-foreground">
            Seja um cliente e adquira seus ingressos agora!
          </p>
        </div>

        <SignUpForm />

        <p className="px-6 text-center text-sm text-muted-foreground">
          Ao continuar, você concorda com nossos{' '}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            termos de serviço
          </Link>{' '}
          e{' '}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            política de privacidade
          </Link>
          .
        </p>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Ou</span>
          </div>
        </div>

        <Button variant="outline" asChild className="w-full">
          <Link href="/auth/sign-in">Já tem uma conta? Faça login</Link>
        </Button>
      </div>
    </div>
  )
}
