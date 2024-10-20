import OrderCalendar from '@/components/dashboard/OrderCalender'
import TableComponent from '@/components/dashboard/Table'
import { Badge } from '@/components/ui/badge'
import { TableCell, TableRow } from '@/components/ui/table'
import { invoiceColumns, orders } from '@/constants'
import { Orders } from '@/lib/types'
import { cn } from '@/lib/utils'
import React from 'react'

const HomePage = () => {
  const renderRow = (item: Orders) => (
    <TableRow>
      <TableCell>
        <div className='flex'>
          <div className='flex-1'>
            <div className='font-medium'>{item.company} </div>
            <div className='hidden text-sm text-muted-foreground md:inline'>
              {item.name}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell className='hidden sm:table-cell'>{item.product}</TableCell>
      <TableCell className='hidden sm:table-cell'>
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
      </TableCell>
      <TableCell className='hidden md:table-cell'>{item.date}</TableCell>
      <TableCell className='text-right'>
        <span className='font-bold'>N</span>
        {item.amount.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </TableCell>
    </TableRow>
  )

  return (
    <div
      className='remove-scrollbar overflow-scroll flex lg:px-4 gap-4 flex-col
   lg:flex-row'
    >
      {/* LEFT SIDE  */}
      <div className='w-full lg:w-2/3 flex flex-col gap-8'>
        <TableComponent
          title='Invoices'
          description='Recent invoices'
          columns={invoiceColumns}
          renderRow={renderRow}
          data={orders}
        />
      </div>
      {/* RIGHT SIDE  */}
      <div className='w-full lg:w-1/3 flex flex-col gap-8'>
        <OrderCalendar />
      </div>
    </div>
  )
}

export default HomePage
