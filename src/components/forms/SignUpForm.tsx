'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { api } from '@/lib/api'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

const SignUpForm = () => {
  const signUpSchema = z
    .object({
      name: z.string(),
      email: z.string().email(),
      tel: z
        .string()
        .min(10, 'Insira um número valido')
        .regex(/^\d+$/, 'O telefone deve conter somente números'),
      password: z.string().min(6, 'A senha precisa de no mínimo 6 caracteres'),
      passwordConfirm: z.string(),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: 'As senhas precisam ser iguais',
    })

  type SignUpFormSchema = z.infer<typeof signUpSchema>

  const { register, handleSubmit } = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpSchema),
  })

  const handleSignIn = async (data: SignUpFormSchema) => {
    console.log('dados enviados: ' + JSON.stringify(data))
    const response = await api('/auth/sign-up', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      console.log('deu erro')
    }
    console.log('deu certo')
  }

  return (
    <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
      <div className="space-y-2">
        <Label>Seu nome Completo</Label>
        <Input
          placeholder="Seu nome completo"
          type="text"
          {...register('name')}
        />
      </div>

      <div className="space-y-2">
        <Label>Seu e-mail</Label>
        <Input placeholder="Seu e-mail" type="email" {...register('email')} />
      </div>

      <div className="space-y-2">
        <Label>Seu número de celular</Label>
        <Input
          placeholder="Seu número de celular"
          type="tel"
          {...register('tel')}
        />
      </div>

      <div className="space-y-2">
        <Label>Sua senha</Label>
        <Input
          placeholder="Sua senha"
          type="password"
          {...register('password')}
        />
      </div>

      <div className="space-y-2">
        <Label>Sua senha novamente</Label>
        <Input
          placeholder="Sua confirmação de senha"
          type="password"
          {...register('passwordConfirm')}
        />
      </div>

      <Button className="w-full" type="submit">
        Finalizar Cadastro
      </Button>
    </form>
  )
}

export default SignUpForm
