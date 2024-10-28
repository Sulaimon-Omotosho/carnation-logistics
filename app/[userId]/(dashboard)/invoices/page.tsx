'use client'

import TableComponent from '@/components/dashboard/Table'
import Search from '@/components/Search'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { invoiceColumns } from '@/constants'
import { getAllInvoices } from '@/lib/actions/data'
import { Orders } from '@/lib/types'
import { cn } from '@/lib/utils'
import { CirclePlus } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

const InvoicesPage = ({ searchParams }: { searchParams: string }) => {
  const { data: session } = useSession()
  const userId = session?.user.id

  const search: any = searchParams.search || ''

  const [invoices, setInvoices] = useState<Orders[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFetching, setIsFetching] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const fetchedInvoices = await getAllInvoices(0, 20, search)
        setInvoices(fetchedInvoices!)
        setHasMore(fetchedInvoices!.length === 10)
      } catch (error) {
        console.error('Error fetching invoices:', error)
        setError('Failed to load invoices')
      } finally {
        setLoading(false)
      }
    }
    fetchInvoices()
  }, [search])

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
      const fetchedInvoices = await getAllInvoices(offset, 10, search)

      if (fetchedInvoices!.length === 0) {
        setHasMore(false)
      } else {
        setInvoices((prevInvoices) => [...prevInvoices, ...fetchedInvoices!])
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
        {item.product ? (
          <Link href={`/${userId}/invoices/${item.id}`} className='block p-4'>
            {item.product}
          </Link>
        ) : (
          <Link href={`/${userId}/invoices/${item.id}`} className='block p-4'>
            <p className='flex gap-1'>
              <span>{item.from} </span>
              To
              <span>{item.to} </span>
            </p>
          </Link>
        )}
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

  return (
    <div className='relative'>
      <div className='absolute w-[90%] md:w-[50%] top-[67px] md:top-8 right-[5%] md:right-[30%]'>
        <Search />
      </div>
      <TableComponent
        title='Invoices'
        description='Recent Invoices'
        columns={invoiceColumns}
        renderRow={renderRow}
        data={invoices}
        scrollContainerRef={scrollContainerRef}
        isFetching={isFetching}
        loading={loading}
        error={error}
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
