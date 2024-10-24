'use client'

import { Ellipsis } from 'lucide-react'
import Image from 'next/image'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts'

const Performance = ({ inProgress, fulfilled, cancelled, total }: any) => {
  const data = [
    { name: 'In Progress', value: inProgress, fill: '#FAE27C' },
    { name: 'Fulfilled', value: fulfilled, fill: '#32CD32' },
    { name: 'Cancelled', value: cancelled, fill: '#DC143C' },
  ]

  return (
    <div className='bg-white dark:bg-slate-700 p-4 rounded-md h-80 relative'>
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-semibold'>Invoice Performance</h1>
        <Ellipsis />
      </div>
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart width={400} height={400}>
          <Pie
            dataKey='value'
            startAngle={180}
            endAngle={0}
            data={data}
            cx='50%'
            cy='50%'
            innerRadius={80}
            fill='#8884d8'
            // label
          />
        </PieChart>
      </ResponsiveContainer>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
        <p className='text-xs text-gray-300'>of</p>
        <h1 className='text-3xl font-bold'>{total}</h1>
      </div>
      <h2 className='font-medium absolute bottom-16 left-0 right-0 m-auto text-center'>
        January - November 2024
      </h2>
    </div>
  )
}

export default Performance
