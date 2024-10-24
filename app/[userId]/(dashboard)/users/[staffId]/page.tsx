'use client'

import Performance from '@/components/dashboard/Performance'
import TableComponent from '@/components/dashboard/Table'
import FormModal from '@/components/form/FormModal'
import { Badge } from '@/components/ui/badge'
import { TableCell, TableRow } from '@/components/ui/table'
import { invoiceColumns } from '@/constants'
import { getUser, usersInvoices } from '@/lib/actions/data'
import { Orders, Users } from '@/lib/types'
import { cn } from '@/lib/utils'
import {
  BookX,
  CircleUserRound,
  FileCheck2,
  FilePlus2,
  Loader,
  Mail,
  Phone,
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const UserPage = ({ params }: { params: { staffId: string } }) => {
  const { data: session } = useSession()
  const userId = session?.user.id
  const staffId = params.staffId

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [user, setUser] = useState<Users>()
  const [invoices, setInvoices] = useState<Orders[]>()

  const [totalInvoices, setTotalInvoices] = useState(0)
  const [inProgressCount, setInProgressCount] = useState(0)
  const [fulfilledCount, setFulfilledCount] = useState(0)
  const [cancelledCount, setCancelledCount] = useState(0)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData: Users = await getUser(staffId)
        const fetchedUserInvoices: Orders[] = await usersInvoices(staffId)

        setUser(userData)
        setInvoices(fetchedUserInvoices)

        setTotalInvoices(fetchedUserInvoices.length)
        setInProgressCount(
          fetchedUserInvoices.filter((inv) => inv.status === 'IN_PROGRESS')
            .length
        )
        setFulfilledCount(
          fetchedUserInvoices.filter((inv) => inv.status === 'FULFILLED').length
        )
        setCancelledCount(
          fetchedUserInvoices.filter((inv) => inv.status === 'CANCELLED').length
        )
      } catch (error) {
        console.error('Error fetching user:', error)
        setError('Failed to load user')
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [staffId])

  const renderRow = (item: Orders) => (
    <TableRow>
      <TableCell className='p-0'>
        <Link href={`/${userId}/invoices/${item.id}`} className='block p-4'>
          <div className='flex'>
            <div className='flex-1'>
              <div className='font-medium flex justify-between items-center md:block'>
                {item.company}
                <div
                  className={cn('rounded-full w-3 h-3 md:hidden', {
                    'bg-yellow-500': item.status === 'IN_PROGRESS',
                    'bg-violet-500': item.status === 'FULFILLED',
                    'bg-red-500': item.status === 'CANCELLED',
                    'bg-blue-600': item.status === 'PENDING',
                  })}
                ></div>
              </div>
              <div className='hidden text-sm text-muted-foreground md:inline'>
                {item.name}
              </div>
            </div>
          </div>
        </Link>
      </TableCell>
      <TableCell className='hidden sm:table-cell p-0'>
        <Link href={`/${userId}/invoices/${item.id}`} className='block p-4'>
          {item.product}
        </Link>
      </TableCell>
      <TableCell className='hidden sm:table-cell p-0'>
        <Link href={`/${userId}/invoices/${item.id}`} className='block p-4'>
          <Badge
            className={cn('text-sm capitalize', {
              'bg-yellow-500': item.status === 'IN_PROGRESS',
              'bg-green-600': item.status === 'FULFILLED',
              'bg-red-500': item.status === 'CANCELLED',
              'bg-blue-600': item.status === 'PENDING',
            })}
            variant={item.status === 'fulfilled' ? 'secondary' : 'outline'}
          >
            {item.status}
          </Badge>
        </Link>
      </TableCell>
      <TableCell className='hidden md:table-cell p-0'>
        <Link href={`/${userId}/invoices/${item.id}`} className='block p-4'>
          {new Date(item.date).toLocaleDateString('en-US')}
        </Link>
      </TableCell>
      <TableCell className='text-right p-0'>
        <Link href={`/${userId}/invoices/${item.id}`} className='block p-4'>
          <span className='font-bold'>N</span>
          {item.amount.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Link>
      </TableCell>
    </TableRow>
  )

  if (loading) {
    return (
      <div className='text-center text-2xl'>
        Loading User <span className=' animate-ping'>...</span>
      </div>
    )
  }

  if (error) {
    return <div className='text-center text-2xl'>{error}</div>
  }

  return (
    <main className='min-h-[calc(100vh-56px)] max-h-[calc(100vh-56px)] overflow-scroll remove-scrollbar p-2 lg:p-4 flex flex-col lg:flex-row lg:gap-4'>
      {/* LEFT  */}
      <div className='w-full xl:w-2/3'>
        {/* TOP  */}
        <div className='flex flex-col lg:flex-row gap-4'>
          {/* USER INFO CARD  */}
          <div className='py-6 px-4 rounded-md flex-1 flex gap-4 bg-slate-400 dark:bg-slate-700'>
            <div className='w-1/3 flex flex-col gap-2 items-center justify-center'>
              {user?.image && typeof user.image === 'string' ? (
                <Image
                  src={user?.image}
                  alt='teacher'
                  width={144}
                  height={144}
                  className='w-36 h-36 rounded-full object-cover'
                />
              ) : (
                <CircleUserRound className='w-20 h-20' />
              )}
              <Badge
                className={cn('text-sm capitalize', {
                  'bg-yellow-500': user?.role.toLocaleUpperCase() === 'USER',
                  'bg-violet-500': user?.role.toLocaleUpperCase() === 'ADMIN',
                  'bg-blue-600':
                    user?.role.toLocaleUpperCase() === 'SUPERVISOR',
                })}
                // variant={
                //   users.role === 'fulfilled' ? 'secondary' : 'outline'
                // }
              >
                {user?.role}
              </Badge>
            </div>
            <div className='w-2/3 flex flex-col justify-between gap-4'>
              <div className='flex items-center gap-4'>
                <h1 className='text-xl font-semibold'>{user?.name}</h1>
                <FormModal
                  data={{
                    id: user?.id,
                    name: user?.name,
                    password: 'Type New Password',
                    email: user?.email,
                    photo: user?.image,
                    phone: user?.phone,
                    address: user?.address,
                    position: user?.position,
                    role: user?.role,
                    notes: user?.notes,
                  }}
                />
              </div>
              <p className='text-sm text-gray-700 dark:text-gray-400'>
                {user?.notes}
              </p>
              <div className='flex flex-col items-center justify-between gap-2 flex-wrap text-xs font-medium'>
                <div className='w-full flex items-center gap-2'>
                  <Mail className='w-4 h-4' />
                  <span>{user?.email}</span>
                </div>
                <div className='w-full flex items-center gap-2'>
                  <Phone className='w-4 h-4' />
                  <span>{user?.phone}</span>
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
                <h1 className='text-xl font-semibold'>{totalInvoices}</h1>
                <span className=' text-sm text-gray-700 dark:text-gray-400'>
                  Receipts
                </span>
              </div>
            </div>
            {/* CARD  */}
            <div className='w-full p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%] items-center bg-slate-400 dark:bg-slate-700'>
              <Loader className='h-10 w-10' />
              <div className=''>
                <h1 className='text-xl font-semibold'>{inProgressCount}</h1>
                <span className=' text-sm text-gray-700 dark:text-gray-400'>
                  In Progress
                </span>
              </div>
            </div>
            {/* CARD  */}
            <div className='w-full p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%] items-center bg-slate-400 dark:bg-slate-700'>
              <FileCheck2 className='h-10 w-10' />
              <div className=''>
                <h1 className='text-xl font-semibold'>{fulfilledCount}</h1>
                <span className=' text-sm text-gray-700 dark:text-gray-400'>
                  Fulfilled
                </span>
              </div>
            </div>
            {/* CARD  */}
            <div className='w-full p-4 rounded-md flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%] items-center bg-slate-400 dark:bg-slate-700'>
              <BookX className='h-10 w-10' />
              <div className=''>
                <h1 className='text-xl font-semibold'>{cancelledCount}</h1>
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
            title={`${user?.name}'s Receipts`}
            description={`Recent Invoices from ${user?.name}`}
            columns={invoiceColumns}
            renderRow={renderRow}
            data={invoices!}
          />
        </div>
      </div>
      {/* RIGHT  */}
      <div className='w-full xl:w-1/3 flex flex-col gap-4'>
        <Performance
          inProgress={inProgressCount}
          fulfilled={fulfilledCount}
          cancelled={cancelledCount}
          total={totalInvoices}
        />
        {/* <Announcement /> */}
      </div>
    </main>
  )
}

export default UserPage
