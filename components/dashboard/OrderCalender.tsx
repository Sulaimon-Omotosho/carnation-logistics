'use client'

import { events } from '@/constants'
import { Ellipsis } from 'lucide-react'
import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

type ValuePiece = Date | null

type Value = ValuePiece | [ValuePiece, ValuePiece]

const OrderCalendar = () => {
  const [value, onChange] = useState<Value>(new Date())

  return (
    <div className=' p-4 rounded-md flex lg:flex-col  max-h-screen min-h-screen'>
      <Calendar onChange={onChange} value={value} />
      <div className='lg:flex items-center justify-between hidden'>
        <h1 className='text-xl font-semibold my-4'>Bookings</h1>
        <Ellipsis />
      </div>
      <div className='flex flex-col max-h-screen lg:max-h-[50%] overflow-scroll remove-scrollbar'>
        <div className='flex lg:hidden items-center justify-between'>
          <h1 className='text-xl font-semibold my-4'>Bookings</h1>
          <Ellipsis />
        </div>
        {events.map((event) => (
          <div
            className='p-5 rounded-md border2 border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple'
            key={event.id}
          >
            <div className='flex items-center justify-between'>
              <h1 className='font-semibold text-gray-600'>{event.title}</h1>
              <span className='text-xs text-gray-300'>{event.date}</span>
            </div>
            <p className='mt-2 text-gray-400 text-sm'>{event.class}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrderCalendar
