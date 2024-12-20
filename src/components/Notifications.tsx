import { Bell, AlertTriangle } from 'lucide-react'

export function Notifications() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Bell className="h-4 w-4 text-blue-500" />
        <span className="text-sm">
          Novo evento adicionado: Festival de Verão
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <AlertTriangle className="h-4 w-4 text-yellow-500" />
        <span className="text-sm">
          Evento Rock na Praia está quase esgotado
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <Bell className="h-4 w-4 text-green-500" />
        <span className="text-sm">
          100 ingressos vendidos para Noite de Jazz
        </span>
      </div>
    </div>
  )
}
