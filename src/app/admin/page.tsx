import { Metadata } from 'next'
import DashboardComponent from './_components/DashBoard'

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin dashboard for event management',
}

export default function AdminDashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <DashboardComponent />
    </div>
  )
}
