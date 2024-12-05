'use client'
import { useState } from 'react'
import { Search, ArrowRight, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { UserDropdown } from '@/components/UserDropDown'

export default function Component() {
  const [searchQuery, setSearchQuery] = useState('')

  const eventosDestacados = [
    {
      id: 1,
      nome: 'Festival de Música de Verão',
      resumo:
        'Junte-se a nós para três dias de música ininterrupta com os melhores artistas do mundo.',
      imagem: '/images/image1.jpeg',
      data: 'Sáb, 07 de novembro',
    },
    {
      id: 2,
      nome: 'Conferência de Tecnologia 2023',
      resumo:
        'Explore as últimas tendências e inovações tecnológicas com líderes da indústria.',
      imagem: '/images/image1.jpeg',
      data: 'Sáb, 07 de novembro',
    },
    {
      id: 3,
      nome: 'Exposição de Arte Moderna',
      resumo:
        'Uma jornada visual através das obras mais provocativas e inspiradoras da arte contemporâneaaaaaaaaaaaaaaaaaaaaaaaaaaaa.',
      imagem: '/images/image1.jpeg',
      data: 'Sáb, 07 de novembro',
    },
  ]

  const teste = true

  const eventosPrincipais = [
    { id: 4, nome: 'Noite de Comédia', imagem: '/images/image1.jpeg' },
    { id: 5, nome: 'Festival Gastronômico', imagem: '/images/image1.jpeg' },
    { id: 6, nome: 'Maratona 2023', imagem: '/images/image1.jpeg' },
    { id: 7, nome: 'Feira do Livro', imagem: '/images/image1.jpeg' },
    { id: 8, nome: 'Estreia de Filme', imagem: '/images/image1.jpeg' },
    { id: 9, nome: 'Simpósio de Ciências', imagem: '/images/image1.jpeg' },
    { id: 10, nome: 'Desfile de Moda', imagem: '/images/image1.jpeg' },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="py-6 px-4 md:px-6 bg-primary text-primary-foreground">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-3xl font-bold mb-4 md:mb-0 text-primary-foreground">
            IngressoAgora
          </h1>
          <div className="flex w-full md:w-auto">
            <Input
              className="w-full md:w-64 mr-2 placeholder:text-primary-foreground"
              placeholder="Buscar eventos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant={'secondary'}>
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </div>

          {teste ? (
            <UserDropdown />
          ) : (
            <Button variant="secondary" className="mt-4 md:mt-0">
              Entrar
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Eventos em Destaque</h2>
          <Carousel className="w-full">
            <CarouselContent>
              {eventosDestacados.map((evento) => (
                <CarouselItem
                  key={evento.id}
                  className="flex-shrink-0 w-full md:w-1/3"
                >
                  <div className="flex flex-col md:flex-row h-full bg-card text-card-foreground rounded-lg overflow-hidden">
                    {/* Imagem */}
                    <div className="w-full md:w-1/3 relative h-64">
                      <Image
                        src={evento.imagem}
                        alt={evento.nome}
                        width={600}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Conteúdo alinhado à esquerda */}
                    <div className="p-6 flex flex-col justify-between w-full md:w-2/3">
                      <h3 className="text-xl font-semibold mb-2">
                        {evento.nome}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {evento.resumo}
                      </p>
                      <p className="text-sm text-muted-foreground mb-4">
                        {evento.data}
                      </p>{' '}
                      {/* Data do evento */}
                      <Button>Ver Detalhes</Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Principais Eventos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {eventosPrincipais.map((evento) => (
              <Card key={evento.id}>
                <CardHeader>
                  <div className="relative h-40 w-full">
                    <Image
                      src={evento.imagem}
                      alt={evento.nome}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="flex flex-col">
                    {evento.nome}
                    <div className="text-primary text-base">
                      ter, 31 de dezembro
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Fazenda do Rosa, Imbituba SC
                    </div>
                  </CardTitle>
                </CardContent>

                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Calendar className="mr-2 h-4 w-4" />
                    Ver Evento
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-muted mt-12 py-6 px-4 text-center">
        <p>&copy; 2023 IngressoAgora. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}
