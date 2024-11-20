import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Button variant="ghost" asChild className="absolute right-8 top-8">
        <Link href="/auth/sign-in">Voltar</Link>
      </Button>
      <div className="w-full max-w-[400px] space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Criar conta grátis
          </h1>
          <p className="text-sm text-muted-foreground">
            Seja um cliente e adquira seus ingressos agora!
          </p>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="managerName">Seu nome</Label>
            <Input id="managerName" name="managerName" type="text" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Seu e-mail</Label>
            <Input id="email" name="email" type="email" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Seu celular</Label>
            <Input id="phone" name="phone" type="tel" required />
          </div>

          <Button className="w-full" type="submit">
            Finalizar Cadastro
          </Button>
        </form>

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
          <Link href="/sign-in">Já tem uma conta? Faça login</Link>
        </Button>
      </div>
    </div>
  )
}
