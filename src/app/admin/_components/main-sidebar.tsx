'use client'

import {
  FileTextIcon,
  HomeIcon,
  MixerVerticalIcon,
  PersonIcon,
} from '@radix-ui/react-icons'
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
    <Sidebar className="flex flex-col w-64 min-h-screen">
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarMain className="flex flex-col flex-grow">
        <SidebarNav className="flex-grow">
          <SidebarNavMain>
            <SidebarNavLink href="/admin" active={isActive('/admin')}>
              <HomeIcon className="mr-3 h-4 w-4" />
              Meus Eventos
            </SidebarNavLink>
            <SidebarNavLink
              href="/admin/ingressos"
              active={isActive('/admin/ingressos')}
            >
              <PersonIcon className="mr-3 h-4 w-4" />
              Ingressos
            </SidebarNavLink>
            <SidebarNavLink
              href="/admin/relatorios"
              active={isActive('/admin/relatorios')}
            >
              <FileTextIcon className="mr-3 h-4 w-4" />
              Relatórios
            </SidebarNavLink>
            <SidebarNavLink
              href="/admin/settings"
              active={isActive('/admin/settings')}
            >
              <MixerVerticalIcon className="mr-3 h-4 w-4" />
              Configurações
            </SidebarNavLink>
          </SidebarNavMain>
        </SidebarNav>

        <SidebarNav>
          <SidebarNavHeader>
            <SidebarNavHeaderTitle>Links Extras</SidebarNavHeaderTitle>
          </SidebarNavHeader>
          <SidebarNavMain>
            <SidebarNavLink href="/">Precisa de ajuda?</SidebarNavLink>
            <SidebarNavLink href="/">Site</SidebarNavLink>
          </SidebarNavMain>
        </SidebarNav>
      </SidebarMain>
      <SidebarFooter className="mt-auto">
        <UserDropdown />
      </SidebarFooter>
    </Sidebar>
  )
}
