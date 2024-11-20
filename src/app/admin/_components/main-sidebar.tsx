'use client'

import {
  FileTextIcon,
  HomeIcon,
  MixerVerticalIcon,
  PersonIcon,
} from '@radix-ui/react-icons'
import { Settings2Icon } from 'lucide-react'
import { usePathname } from 'next/navigation'

import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMain,
  SidebarNav,
  SidebarNavHeader,
  SidebarNavHeaderTitle,
  SidebarNavLink,
  SidebarNavMain,
} from '@/components/dashboard/sidebar'
import { Logo } from '@/components/logo'
import { UserDropdown } from './user-dropDown'

export function MainSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <Sidebar className="w-64">
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarMain className="flex flex-grow flex-col">
        <SidebarNav>
          <SidebarNavMain>
            <SidebarNavLink href="/app" active={isActive('/app')}>
              <HomeIcon className="mr-3 h-4 w-4" />
              Home
            </SidebarNavLink>
            <SidebarNavLink
              href="/app/pacientes"
              active={isActive('/app/pacientes')}
            >
              <PersonIcon className="mr-3 h-4 w-4" />
              Pacientes
            </SidebarNavLink>
            <SidebarNavLink href="/app/laudos" active={isActive('/app/laudos')}>
              <FileTextIcon className="mr-3 h-4 w-4" />
              Laudos
            </SidebarNavLink>
            <SidebarNavLink href="/app/admin" active={isActive('/app/admin')}>
              <Settings2Icon className="mr-3 h-4 w-4" />
              Administração
            </SidebarNavLink>
            <SidebarNavLink
              href="/app/settings"
              active={isActive('/app/settings')}
            >
              <MixerVerticalIcon className="mr-3 h-4 w-4" />
              Configurações
            </SidebarNavLink>
          </SidebarNavMain>
        </SidebarNav>

        <SidebarNav className="mt-auto">
          <SidebarNavHeader>
            <SidebarNavHeaderTitle>Links Extras</SidebarNavHeaderTitle>
          </SidebarNavHeader>
          <SidebarNavMain>
            <SidebarNavLink href="/">Precisa de ajuda?</SidebarNavLink>
            <SidebarNavLink href="/">Site</SidebarNavLink>
          </SidebarNavMain>
        </SidebarNav>
      </SidebarMain>
      <SidebarFooter>
        <UserDropdown />
      </SidebarFooter>
    </Sidebar>
  )
}
