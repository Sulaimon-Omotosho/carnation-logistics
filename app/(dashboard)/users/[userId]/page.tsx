import Performance from '@/components/dashboard/Performance'
import TableComponent from '@/components/dashboard/Table'
import { Badge } from '@/components/ui/badge'
import { Table, TableCell, TableRow } from '@/components/ui/table'
import { invoiceColumns, orders } from '@/constants'
import { Orders } from '@/lib/types'
import { cn } from '@/lib/utils'
import { BookX, FileCheck2, FilePlus2, Loader, Mail, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const invoiceId = '76934'

const UserPage = () => {
  const renderRow = (item: Orders) => (
    <TableRow>
      <TableCell className='p-0'>
        <Link href={`/invoices/${invoiceId}`} className='block p-4'>
          <div className='flex'>
            <div className='flex-1'>
              <div className='font-medium'>{item.company} </div>
              <div className='hidden text-sm text-muted-foreground md:inline'>
                {item.name}
              </div>
            </div>
          </div>
        </Link>
      </TableCell>
      <TableCell className='hidden sm:table-cell p-0'>
        <Link href={`/invoices/${invoiceId}`} className='block p-4'>
          {item.product}
        </Link>
      </TableCell>
      <TableCell className='hidden sm:table-cell p-0'>
        <Link href={`/invoices/${invoiceId}`} className='block p-4'>
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
        <Link href={`/invoices/${invoiceId}`} className='block p-4'>
          {item.date}
        </Link>
      </TableCell>
      <TableCell className='text-right p-0'>
        <Link href={`/invoices/${invoiceId}`} className='block p-4'>
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
    <main className='min-h-[calc(100vh-56px)] max-h-[calc(100vh-56px)] overflow-scroll remove-scrollbar p-2 lg:p-4 flex flex-col lg:flex-row lg:gap-4'>
      {/* LEFT  */}
      <div className='w-full xl:w-2/3'>
        {/* TOP  */}
        <div className='flex flex-col lg:flex-row gap-4'>
          {/* USER INFO CARD  */}
          <div className='py-6 px-4 rounded-md flex-1 flex gap-4 bg-slate-400 dark:bg-slate-700'>
            <div className='w-1/3'>
              <Image
                src='https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200'
                alt='teacher'
                width={144}
                height={144}
                className='w-36 h-36 rounded-full object-cover'
              />
            </div>
            <div className='w-2/3 flex flex-col justify-between gap-4'>
              <div className='flex items-center gap-4'>
                <h1 className='text-xl font-semibold'>John Doe</h1>
                {/* <FormModal
                  table='teacher'
                  type='update'
                  data={{
                    id: 1,
                    username: 'john67890',
                    firstName: 'John',
                    lastName: 'Doe',
                    password: 'testing123',
                    email: 'john@doe.com',
                    photo:
                      'https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200',
                    phone: '1234567890',
                    bloodType: 'A',
                    birthday: 12 / 25 / 1990,
                    sex: 'male',
                    address: '123 Main St, Anytown, USA',
                  }}
                /> */}
              </div>
              <p className='text-sm text-gray-700 dark:text-gray-400'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias
                quas voluptatum quidem?
              </p>
              <div className='flex flex-col items-center justify-between gap-2 flex-wrap text-xs font-medium'>
                <div className='w-full flex items-center gap-2'>
                  <Mail className='w-4 h-4' />
                  <span>user@carnationregistrars.com</span>
                </div>
                <div className='w-full flex items-center gap-2'>
                  <Phone className='w-4 h-4' />
                  <span>+234 567 890 1234</span>
                </div>
              </div>
            </div>
          </div>
          {/* SMALL CARDS  */}
          <div className='flex-1 flex gap-4 justify-between flex-wrap'>
            {/* CARD  */}
            <div className='w-full p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%] items-center bg-slate-400 dark:bg-slate-700'>
              <FilePlus2 className='h-10 w-10' />
              <div className=''>
                <h1 className='text-xl font-semibold'>123</h1>
                <span className=' text-sm text-gray-700 dark:text-gray-400'>
                  Receipts
                </span>
              </div>
            </div>
            {/* CARD  */}
            <div className='w-full p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%] items-center bg-slate-400 dark:bg-slate-700'>
              <Loader className='h-10 w-10' />
              <div className=''>
                <h1 className='text-xl font-semibold'>50</h1>
                <span className=' text-sm text-gray-700 dark:text-gray-400'>
                  In Progress
                </span>
              </div>
            </div>
            {/* CARD  */}
            <div className='w-full p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%] items-center bg-slate-400 dark:bg-slate-700'>
              <FileCheck2 className='h-10 w-10' />
              <div className=''>
                <h1 className='text-xl font-semibold'>65</h1>
                <span className=' text-sm text-gray-700 dark:text-gray-400'>
                  Fulfilled
                </span>
              </div>
            </div>
            {/* CARD  */}
            <div className='w-full p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%] items-center bg-slate-400 dark:bg-slate-700'>
              <BookX className='h-10 w-10' />
              <div className=''>
                <h1 className='text-xl font-semibold'>8</h1>
                <span className=' text-sm text-gray-700 dark:text-gray-400'>
                  Cancelled
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM  */}
        <div className='mt-4 rounded-md md:px-4 py-4'>
          {/* <BigCalendar /> */}
          <TableComponent
            title="John Doe's Receipts"
            description='Recent Invoices from John Doe'
            columns={invoiceColumns}
            renderRow={renderRow}
            data={orders}
          />
        </div>
      </div>
      {/* RIGHT  */}
      <div className='w-full xl:w-1/3 flex flex-col gap-4'>
        <Performance />
        {/* <Announcement /> */}
      </div>
    </main>
  )
}

export default UserPage
