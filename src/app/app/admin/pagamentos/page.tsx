import { Metadata } from 'next'
import AdminPayments from './_components/AdminPayments'

export const metadata: Metadata = {
  title: 'Pagamentos',
  description: 'Gerencie os pagamentos dos produtores',
}

export default function AdminPaymentsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Pagamentos</h1>
      <AdminPayments />
    </div>
  )
}
