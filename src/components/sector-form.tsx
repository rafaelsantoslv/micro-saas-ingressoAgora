'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PlusCircle, Trash2, Pencil } from 'lucide-react'
import { Sector, Lot } from '@/types/Isector-form'

export function SectorForm() {
  const [sectors, setSectors] = useState<Sector[]>([])
  const [currentSector, setCurrentSector] = useState<Sector>({
    name: '',
    lots: [],
  })
  const [editingSectorIndex, setEditingSectorIndex] = useState<number | null>(
    null,
  )

  const handleSectorNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSector((prev) => ({ ...prev, name: e.target.value }))
  }

  const handleLotChange = (index: number, field: keyof Lot, value: string) => {
    setCurrentSector((prev) => {
      const newLots = [...prev.lots]
      if (field === 'price') {
        const numericValue = value.replace(/\D/g, '')
        value = (Number(numericValue) / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })
      }
      newLots[index] = {
        ...newLots[index],
        [field]: field === 'quantity' ? parseInt(value) || 0 : value,
      }
      return { ...prev, lots: newLots }
    })
  }

  const addLot = () => {
    setCurrentSector((prev) => ({
      ...prev,
      lots: [
        ...prev.lots,
        { name: `Lote ${prev.lots.length + 1}`, price: 'R$ 0,00', quantity: 0 },
      ],
    }))
  }

  const removeLot = (index: number) => {
    setCurrentSector((prev) => ({
      ...prev,
      lots: prev.lots.filter((_, i) => i !== index),
    }))
  }

  const addOrUpdateSector = () => {
    if (currentSector.name && currentSector.lots.length > 0) {
      if (editingSectorIndex !== null) {
        setSectors((prev) => {
          const newSectors = [...prev]
          newSectors[editingSectorIndex] = currentSector
          return newSectors
        })
        setEditingSectorIndex(null)
      } else {
        setSectors((prev) => [...prev, currentSector])
      }
      setCurrentSector({ name: '', lots: [] })
    }
  }

  const removeSector = (index: number) => {
    setSectors((prev) => prev.filter((_, i) => i !== index))
  }

  const startEditingSector = (index: number) => {
    setEditingSectorIndex(index)
    setCurrentSector(sectors[index])
  }

  const cancelEditingSector = () => {
    setEditingSectorIndex(null)
    setCurrentSector({ name: '', lots: [] })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Sectors and lots:', sectors)
    alert('Evento criado com sucesso!')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>
            {editingSectorIndex !== null
              ? 'Editar Setor'
              : 'Adicionar Novo Setor'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="sectorName">Nome do Setor</Label>
              <Input
                id="sectorName"
                value={currentSector.name}
                onChange={handleSectorNameChange}
                placeholder="Ex: Camarote, Pista, Lounge"
              />
            </div>
            <div className="space-y-2">
              <Label>Lotes</Label>
              {currentSector.lots.map((lot, index) => (
                <div key={index} className="flex space-x-2 items-center">
                  <Input
                    placeholder="Nome do Lote"
                    value={lot.name}
                    onChange={(e) =>
                      handleLotChange(index, 'name', e.target.value)
                    }
                  />
                  <Input
                    placeholder="Preço"
                    value={lot.price}
                    onChange={(e) =>
                      handleLotChange(index, 'price', e.target.value)
                    }
                  />
                  <Input
                    placeholder="Quantidade"
                    type="number"
                    value={lot.quantity}
                    onChange={(e) =>
                      handleLotChange(index, 'quantity', e.target.value)
                    }
                  />
                  <Button
                    type="button"
                    onClick={() => removeLot(index)}
                    size="icon"
                    variant="outline"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={addLot} className="w-full mt-2">
                <PlusCircle className="h-4 w-4 mr-2" /> Adicionar Lote
              </Button>
            </div>
            {editingSectorIndex !== null ? (
              <div className="flex space-x-2">
                <Button
                  type="button"
                  onClick={addOrUpdateSector}
                  className="flex-1"
                >
                  Salvar Alterações
                </Button>
                <Button
                  type="button"
                  onClick={cancelEditingSector}
                  variant="outline"
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                onClick={addOrUpdateSector}
                className="w-full"
              >
                Adicionar Setor
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      {sectors.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Setores Adicionados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sectors.map((sector, index) => (
                <Card key={index} className="bg-secondary">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{sector.name}</CardTitle>
                      <div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => startEditingSector(index)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSector(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      {sector.lots.map((lot, lotIndex) => (
                        <div
                          key={lotIndex}
                          className="bg-background rounded-md p-2 shadow-sm"
                        >
                          <p className="font-semibold">{lot.name}</p>
                          <p className="text-primary">{lot.price}</p>
                          <p className="text-muted-foreground">
                            {lot.quantity} ingressos
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      <Button type="submit" className="w-full">
        Criar Evento
      </Button>
    </form>
  )
}
