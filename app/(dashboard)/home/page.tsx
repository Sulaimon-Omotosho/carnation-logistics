import OrderCalendar from '@/components/dashboard/OrderCalender'
import OrdersHome from '@/components/dashboard/OrdersHome'
import React from 'react'

const HomePage = () => {
  return (
    <div
      className='remove-scrollbar overflow-scroll flex lg:p-4 gap-4 flex-col
   lg:flex-row'
    >
      {/* LEFT SIDE  */}
      <div className='w-full lg:w-2/3 flex flex-col gap-8'>
        <OrdersHome />
      </div>
      {/* RIGHT SIDE  */}
      <div className='w-full lg:w-1/3 flex flex-col gap-8'>
        <OrderCalendar />
      </div>
    </div>
  )
}

export default HomePage
