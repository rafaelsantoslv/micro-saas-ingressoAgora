import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'

const SignInForm = () => {
  const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, 'A senha precisa de no mínimo 6 caracteres'),
  })

  type SignInFormShcema = z.infer<typeof signInSchema>

  const { register, handleSubmit } = useForm<SignInFormShcema>({
    resolver: zodResolver(signInSchema),
  })

  const handleSignIn = async (data: SignInFormShcema) => {
    console.log(data)
    const response = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: '/admin',
    })
    console.log(response)
  }

  return (
    <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
      <div className="space-y-2">
        <Label>Seu email</Label>
        <Input
          required
          type="text"
          placeholder="joão@gmail.com"
          {...register('email')}
        />
      </div>

      <div className="space-y-2">
        <Label>Sua senha</Label>
        <Input
          required
          type="password"
          placeholder="**********"
          {...register('password')}
        />
      </div>
      <Button className="w-full" type="submit">
        Entrar
      </Button>
    </form>
  )
}

export default SignInForm
