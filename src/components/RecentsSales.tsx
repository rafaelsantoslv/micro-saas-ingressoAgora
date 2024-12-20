import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">João da Silva</p>
          <p className="text-sm text-muted-foreground">
            joao.silva@example.com
          </p>
        </div>
        <div className="ml-auto font-medium">R$250,00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>MR</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Maria Rodrigues</p>
          <p className="text-sm text-muted-foreground">
            maria.rodrigues@example.com
          </p>
        </div>
        <div className="ml-auto font-medium">R$150,00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>CP</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Carlos Pereira</p>
          <p className="text-sm text-muted-foreground">
            carlos.pereira@example.com
          </p>
        </div>
        <div className="ml-auto font-medium">R$350,00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/04.png" alt="Avatar" />
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Ana Santos</p>
          <p className="text-sm text-muted-foreground">
            ana.santos@example.com
          </p>
        </div>
        <div className="ml-auto font-medium">R$450,00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/05.png" alt="Avatar" />
          <AvatarFallback>PO</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Pedro Oliveira</p>
          <p className="text-sm text-muted-foreground">
            pedro.oliveira@example.com
          </p>
        </div>
        <div className="ml-auto font-medium">R$550,00</div>
      </div>
    </div>
  )
}
