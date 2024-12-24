'use client'

import { ArrowRight, Search } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { UserDropdown } from './UserDropDown'

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const teste = true
  return (
    <header className="py-6 px-4 md:px-6 bg-primary text-primary-foreground">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link href={'/'}>
          <h1 className="text-3xl font-bold mb-4 md:mb-0 text-primary-foreground">
            IngressoAgora
          </h1>
        </Link>
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
  )
}

export default Header
