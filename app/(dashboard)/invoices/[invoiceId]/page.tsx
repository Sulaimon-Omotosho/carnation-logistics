import ChangeStatusMenu from '@/components/dashboard/ChangeStatusMenu'
import { Badge } from '@/components/ui/badge'
import { SingleOrder } from '@/lib/types'
import { cn } from '@/lib/utils'
import React from 'react'

const InvoicePage = async ({ params }: { params: { invoiceId: string } }) => {
  const invoiceId = parseInt(params.invoiceId)

  const invoice: SingleOrder = {
    name: 'Liam Johnson',
    company: 'Peak Milk',
    email: 'liam.johnson@peakmilk.com',
    phone: '09023456789',
    product: 'Lagos - Abuja',
    status: 'fulfilled',
    date: '2023-06-23',
    description: 'Delivery of goods from Lagos to Abuja',
    amount: 1500000.0,
  }

  return (
    <main className='min-h-[calc(100vh-56px)] max-h-[calc(100vh-56px)] px-2 md:px-10 lg:px-24 pt-20'>
      <div className='flex justify-between mb-8'>
        <h1 className='flex items-center gap-4 text-3xl font-bold'>
          Invoice #{invoiceId}
          <Badge
            className={cn(
              'rounded-full capitalize',
              invoice.status === 'inProgress' && 'bg-blue-500',
              invoice.status === 'fulfilled' && 'bg-green-600',
              invoice.status === 'pending' && 'bg-zinc-700',
              invoice.status === 'cancelled' && 'bg-red-600'
            )}
          >
            {invoice.status}
          </Badge>
        </h1>
        <div className='flex gap-4'>
          <ChangeStatusMenu invoiceId={invoiceId} />
          {/* <MoreOptionsMenu invoiceId={invoiceId} /> */}
        </div>
      </div>
      <p className='text-3xl mb-3'>
        <span>N</span>
        {invoice.amount.toLocaleString('en-US', {
          minimumFractionDigits: 2,
        })}{' '}
      </p>
      <p className='text-lg mb-8'>{invoice.description} </p>
      <h2 className='font-bold text-lg mb-4'>Billing Details</h2>
      <ul className='grid gap-2'>
        <li className='flex gap-4'>
          <strong className='block w-28 flex-shrink-0 font-medium text-sm'>
            Invoice ID
          </strong>
          <span>{invoiceId} </span>
        </li>
        <li className='flex gap-4'>
          <strong className='block w-28 flex-shrink-0 font-medium text-sm'>
            Invoice Date
          </strong>
          <span>{new Date(invoice.date).toLocaleDateString()}</span>
        </li>
        <li className='flex gap-4'>
          <strong className='block w-28 flex-shrink-0 font-medium text-sm'>
            Billing Name
          </strong>
          <span>{invoice.company} </span>
        </li>
        <li className='flex gap-4'>
          <strong className='block w-28 flex-shrink-0 font-medium text-sm'>
            Billing Email
          </strong>
          <span>{invoice.email} </span>
        </li>
      </ul>
    </main>
    // <div className=''>{invoiceId} </div>
  )
}

export default InvoicePage
