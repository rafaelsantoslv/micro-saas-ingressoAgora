import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

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
              Acessar Eventos
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe seus ingressos por aqui!
            </p>
          </div>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                required
              />
            </div>
            <Button className="w-full" type="submit">
              Acessar
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
