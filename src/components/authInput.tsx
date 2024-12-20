import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

type AuthInputProps = {
  labelInput: string
  typeInput: string
  nameInput: string
}

const AuthInput = ({ labelInput, typeInput, nameInput }: AuthInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={nameInput}>{labelInput}</Label>
      <Input id={nameInput} name={nameInput} type={typeInput} required />
    </div>
  )
}

export default AuthInput
