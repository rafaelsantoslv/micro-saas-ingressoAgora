'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { addEvent } from '@/app/app/admin/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { uploadImage } from '@/lib/uploadImage'
import { EventFormSchema, eventSchema } from '@/lib/validators/eventSchema'

import { DatePickerField } from '../DatePickerField'
import { DropZone } from '../events/DropZone'
import { FormField } from './FormField'

export function EventForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<EventFormSchema>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      date: new Date(),
      isSectorized: false,
    },
  })

  const selectedDate = watch('date')
  const eventName = watch('name')

  const handleImageSelected = (file: File) => {
    setImageFile(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmitForm = async (data: EventFormSchema) => {
    try {
      // let imageData = null
      // if (imageFile) {
      //  const { uploadUrl, key } = await uploadImage(imageFile.name, imageFile.type)
      //  await fetch(uploadUrl, {
      //    method: 'PUT',
      //    body: imageFile,
      //    headers: {
      //      'Content-Type': imageFile.type,
      //    },
      //  })
      // imageData = { name: imageFile.name, key, contentType: imageFile.type }
      // }

      await addEvent({ ...data })
      toast.success('Evento criado com sucesso')
    } catch (error) {
      toast.error('Erro ao criar evento ', error)
    }
  }

  return (
    <div className="flex gap-8 max-w-6xl mx-auto">
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="space-y-6 flex-1"
      >
        <FormField
          id="name"
          label="Nome do Evento"
          error={errors.name?.message}
          register={register}
          placeholder="Ex: Festival de Verão 2023"
        />

        <FormField
          id="description"
          label="Descrição"
          error={errors.description?.message}
          register={register}
          type="textarea"
          placeholder="Descreva seu evento..."
        />

        <DatePickerField
          id="date"
          label="Data do Evento"
          selected={selectedDate}
          onSelect={(date) => date && setValue('date', date)}
          error={errors.date?.message}
        />

        <FormField
          id="location"
          label="Local do Evento"
          error={errors.location?.message}
          register={register}
          placeholder="Ex: Centro de Convenções"
        />

        <div className="flex items-center space-x-2">
          <Switch id="isSectorized" {...register('isSectorized')} />
          <Label htmlFor="isSectorized">Evento Setorizado</Label>
        </div>

        <div>
          <Label htmlFor="image">Imagem do Evento</Label>
          <DropZone onFileSelected={handleImageSelected} />
        </div>

        <Button type="submit" className="w-full">
          Enviar
        </Button>
      </form>

      <div className="flex-1">
        {imagePreview ? (
          <Card className="w-full sticky top-4">
            <CardHeader>
              <CardTitle>{eventName || 'Nome do Evento'}</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src={imagePreview}
                alt="Preview do evento"
                width={400}
                height={300}
                className="w-full h-64 object-cover rounded-md"
              />
            </CardContent>
          </Card>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">
              A pré-visualização do evento aparecerá aqui após o upload da
              imagem.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
