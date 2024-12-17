import { PropsWithChildren } from 'react'
import { HeaderSide } from './_components/Aside'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeaderSide />
      <main>{children}</main>
    </div>
  )
}
