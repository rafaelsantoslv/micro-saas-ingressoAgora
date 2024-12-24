import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface FormFieldProps {
  id: string
  label: string
  error?: string
  type?: 'text' | 'textarea'
  register: any
  placeholder?: string
}

export function FormField({
  id,
  label,
  error,
  type = 'text',
  register,
  placeholder,
}: FormFieldProps) {
  const InputComponent = type === 'textarea' ? Textarea : Input

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <InputComponent
        id={id}
        {...register(id)}
        aria-invalid={error ? 'true' : 'false'}
        placeholder={placeholder}
      />
      {error && (
        <p className="text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
