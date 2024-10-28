'use client'

import OrderCalendar from '@/components/dashboard/OrderCalender'
import TableComponent from '@/components/dashboard/Table'
import { Badge } from '@/components/ui/badge'
import { TableCell, TableRow } from '@/components/ui/table'
import { invoiceColumns } from '@/constants'
import { getAllInvoices } from '@/lib/actions/data'
import { Orders } from '@/lib/types'
import { cn } from '@/lib/utils'
import React, { useEffect, useRef, useState } from 'react'

const HomePage = () => {
  const [invoices, setInvoices] = useState<Orders[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFetching, setIsFetching] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const fetchedInvoices = await getAllInvoices(0, 20)
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
    <TableRow>
      <TableCell>
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
      </TableCell>
      <TableCell className='hidden sm:table-cell'>
        {item.product ? (
          <p>{item.product}</p>
        ) : (
          <p className='flex gap-2'>
            <span>{item.from} </span>
            To
            <span>{item.to} </span>
          </p>
        )}
      </TableCell>
      <TableCell className='hidden sm:table-cell'>
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
      </TableCell>
      <TableCell className='hidden md:table-cell'>
        {new Date(item.date).toLocaleDateString('en-Us')}
      </TableCell>
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
          title='Home'
          description='Recent invoices'
          columns={invoiceColumns}
          renderRow={renderRow}
          data={invoices}
          scrollContainerRef={scrollContainerRef}
          isFetching={isFetching}
          loading={loading}
          error={error}
        />
      </div>
      {/* RIGHT SIDE  */}
      <div className='w-full lg:w-1/3 flex flex-col gap-8'>
        <OrderCalendar invoices={invoices} />
      </div>
    </div>
  )
}

export default HomePage
