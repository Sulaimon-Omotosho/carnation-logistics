'use client'

import TableComponent from '@/components/dashboard/Table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { invoiceColumns } from '@/constants'
import { getAllInvoices } from '@/lib/actions/data'
import { Orders } from '@/lib/types'
import { cn } from '@/lib/utils'
import { CirclePlus, Loader } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

const InvoicesPage = () => {
  const { data: session } = useSession()
  const userId = session?.user.id

  const [invoices, setInvoices] = useState<Orders[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFetching, setIsFetching] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const fetchedInvoices = await getAllInvoices(0, 10)
        setInvoices(fetchedInvoices)
      } catch (error) {
        console.error('Error fetching invoices:', error)
        setError('Failed to load invoices')
      } finally {
        setLoading(false)
      }
    }
    fetchInvoices()
  }, [])

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current

    const handleScroll = () => {
      if (!scrollContainer || isFetching || !hasMore) return

      const scrollTop = scrollContainer.scrollTop
      const scrollHeight = scrollContainer.scrollHeight
      const clientHeight = scrollContainer.clientHeight

      if (scrollHeight - scrollTop <= clientHeight + 300) {
        fetchMoreInvoices()
      }
    }

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll)
      }
    }
  }, [invoices, isFetching, hasMore])

  const fetchMoreInvoices = async () => {
    setIsFetching(true)
    try {
      const offset = invoices.length
      const fetchedInvoices = await getAllInvoices(offset, 10)

      if (fetchedInvoices.length === 0) {
        setHasMore(false)
      } else {
        setInvoices((prevInvoices) => [...prevInvoices, ...fetchedInvoices])
      }
    } catch (error) {
      console.error('Error fetching more invoices:', error)
    } finally {
      setIsFetching(false)
    }
  }

  const renderRow = (item: Orders) => (
    <TableRow key={item.id}>
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
          {new Date(item.date).toLocaleDateString()}
        </Link>
      </TableCell>
      <TableCell className='text-right p-0'>
        <Link href={`/${userId}/invoices/${item.id}`} className='block p-4'>
          <span className='font-bold'>N</span>
          {parseFloat(item.amount as any).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Link>
      </TableCell>
    </TableRow>
  )

  if (loading) {
    return (
      <div className='text-center text-2xl flex gap-1 items-center justify-center'>
        Loading Invoices
        <Loader className='animate-spin' />
      </div>
    )
  }

  if (error) {
    return <div className='text-center text-2xl'>{error}</div>
  }

  return (
    <div className='relative'>
      <TableComponent
        title='Invoices'
        description='Recent Invoices'
        columns={invoiceColumns}
        renderRow={renderRow}
        data={invoices}
        scrollContainerRef={scrollContainerRef}
        isFetching={isFetching}
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
