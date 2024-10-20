'use client'

import TableComponent from '@/components/dashboard/Table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { invoiceColumns, orders } from '@/constants'
import { Orders } from '@/lib/types'
import { cn } from '@/lib/utils'
import { CirclePlus } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const InvoicesPage = () => {
  const { data: session } = useSession()
  const userId = session?.user.id

  const invoiceId = 34783

  const renderRow = (item: Orders) => (
    <TableRow>
      <TableCell className='p-0'>
        <Link href={`/${userId}/invoices/${item.id}`} className='block p-4'>
          <div className='flex'>
            <div className='flex-1'>
              <div className='font-medium'>{item.company} </div>
              <div className='hidden text-sm text-muted-foreground md:inline'>
                {item.name}
              </div>
            </div>
            <div className='flex-1 hidden xl:inline-block'>
              <div className=' text-sm'>{item.email}</div>
              <div className='hidden text-sm text-muted-foreground md:inline'>
                {item.phone}
              </div>
            </div>
          </div>
        </Link>
      </TableCell>
      <TableCell className='hidden sm:table-cell p-0'>
        <Link href={`/${userId}/invoices/${invoiceId}`} className='block p-4'>
          {item.product}
        </Link>
      </TableCell>
      <TableCell className='hidden sm:table-cell p-0'>
        <Link href={`/${userId}/invoices/${invoiceId}`} className='block p-4'>
          <Badge
            className={cn('text-sm capitalize', {
              'bg-yellow-500': item.status === 'in-progress',
              'bg-violet-500': item.status === 'fulfilled',
              'bg-red-500': item.status === 'canceled',
              'bg-blue-600': item.status === 'pending',
            })}
            variant={item.status === 'fulfilled' ? 'secondary' : 'outline'}
          >
            {item.status}
          </Badge>
        </Link>
      </TableCell>
      <TableCell className='hidden md:table-cell p-0'>
        <Link href={`/${userId}/invoices/${invoiceId}`} className='block p-4'>
          {item.date}
        </Link>
      </TableCell>
      <TableCell className='text-right p-0'>
        <Link href={`/${userId}/invoices/${invoiceId}`} className='block p-4'>
          <span className='font-bold'>N</span>
          {item.amount.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Link>
      </TableCell>
    </TableRow>
  )

  return (
    <div className='relative'>
      <TableComponent
        title='Invoices'
        description='Recent Invoices'
        columns={invoiceColumns}
        renderRow={renderRow}
        data={orders}
      />
      <div className='absolute top-7 right-5 md:right-12'>
        <Button className='inline-flex gap-2 text-xl' variant={'ghost'} asChild>
          <Link href={`/${userId}/invoices/new`}>
            <CirclePlus className='h-7 w-7' />
            <span className='hidden md:block'>Create Invoice</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default InvoicesPage
