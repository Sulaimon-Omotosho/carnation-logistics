'use client'

import { events } from '@/constants'
import { Orders } from '@/lib/types'
import { Ellipsis } from 'lucide-react'
import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

const OrderCalendar = ({ invoices }: { invoices: any[] }) => {
  const [value, onChange] = useState<Value>(new Date())

  const upcomingInvoices = invoices.filter((invoice) => {
    const deliveryDate = new Date(invoice.date)
    return deliveryDate >= new Date()
  })

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const isInvoiceDay = upcomingInvoices.some(
        (invoice) =>
          new Date(invoice.date).toDateString() === date.toDateString()
      )
      if (isInvoiceDay) {
        return <div className='bg-blue-400 w-2 h-2 rounded-full'></div>
      }
    }
    return null
  }

  return (
    <div className=' p-4 rounded-md flex-col max-h-[calc(100vh-56px)] min-h-[calc(100vh-56px)]'>
      <Calendar onChange={onChange} value={value} tileContent={tileContent} />
      <div className='lg:flex items-center justify-between hidden'>
        <h1 className='text-xl font-semibold my-4'>Bookings</h1>
        <Ellipsis />
      </div>
      <div className='flex flex-col max-h-screen lg:max-h-[50%] overflow-scroll remove-scrollbar'>
        <div className='flex lg:hidden items-center justify-between'>
          <h1 className='text-xl font-semibold my-4'>Bookings</h1>
          <Ellipsis />
        </div>
        {upcomingInvoices.map((event) => (
          <div
            className='p-5 rounded-md border2 border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple'
            key={event.id}
          >
            <div className='flex items-center justify-between'>
              <h1 className='font-semibold text-gray-600'>{event.product}</h1>
              <span className='text-xs text-gray-500'>
                {new Date(event.date).toLocaleDateString('en-US')}
              </span>
            </div>
            <p className='mt-2 text-gray-400 text-sm'>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrderCalendar
