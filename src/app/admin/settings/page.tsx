'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Save, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const formSchema = z.object({
  nomeEmpresa: z.string().min(2, {
    message: 'O nome da empresa deve ter pelo menos 2 caracteres.',
  }),
  email: z.string().email({
    message: 'Por favor, insira um endereço de e-mail válido.',
  }),
  telefone: z.string().min(10, {
    message: 'O telefone deve ter pelo menos 10 dígitos.',
  }),
  endereco: z.string().min(5, {
    message: 'O endereço deve ter pelo menos 5 caracteres.',
  }),
  descricao: z.string().max(500, {
    message: 'A descrição não pode ter mais de 500 caracteres.',
  }),
  moeda: z.string(),
  fusoHorario: z.string(),
  notificacoesEmail: z.boolean(),
  modoEscuro: z.boolean(),
})

export default function Configuracoes() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomeEmpresa: 'Minha Empresa de Eventos',
      email: 'contato@minhaempresa.com',
      telefone: '(11) 98765-4321',
      endereco: 'Rua dos Eventos, 123 - São Paulo, SP',
      descricao:
        'Somos uma empresa especializada em organização de eventos incríveis!',
      moeda: 'BRL',
      fusoHorario: 'America/Sao_Paulo',
      notificacoesEmail: true,
      modoEscuro: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    // Simular uma chamada de API
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      toast({
        title: 'Configurações salvas',
        description: 'Suas configurações foram atualizadas com sucesso.',
      })
    }, 2000)
  }

  return (
    <div className="container mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">
          Configurações da Conta Empresa
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="nomeEmpresa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Empresa</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da sua empresa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="contato@suaempresa.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telefone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input placeholder="(00) 00000-0000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endereco"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Rua, número, cidade - Estado"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="descricao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição da Empresa</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva sua empresa em poucas palavras"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Máximo de 500 caracteres.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="moeda"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Moeda Padrão</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a moeda padrão" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="BRL">Real Brasileiro (BRL)</SelectItem>
                      <SelectItem value="USD">Dólar Americano (USD)</SelectItem>
                      <SelectItem value="EUR">Euro (EUR)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fusoHorario"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fuso Horário</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o fuso horário" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="America/Sao_Paulo">
                        Brasília (GMT-3)
                      </SelectItem>
                      <SelectItem value="America/New_York">
                        Nova York (GMT-5)
                      </SelectItem>
                      <SelectItem value="Europe/London">
                        Londres (GMT+0)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notificacoesEmail"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Notificações por E-mail
                    </FormLabel>
                    <FormDescription>
                      Receba atualizações importantes por e-mail.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="modoEscuro"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Modo Escuro</FormLabel>
                    <FormDescription>
                      Ative o modo escuro para uma experiência visual diferente.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Configurações
                </>
              )}
            </Button>
          </form>
        </Form>
      </motion.div>
    </div>
  )
}
