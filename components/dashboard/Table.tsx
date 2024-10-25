'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../ui/table'
import { Columns } from '@/lib/types'
import { Loader } from 'lucide-react'

type TableComponentProps<T> = {
  columns: Columns[]
  title: string
  description: string
  renderRow: (item: T) => React.ReactNode
  data: any[]
  scrollContainerRef?: React.RefObject<HTMLDivElement>
  isFetching?: any
  loading?: any
  error?: any
}

const TableComponent = <T,>({
  title,
  description,
  columns,
  renderRow,
  data,
  scrollContainerRef,
  isFetching,
  loading,
  error,
}: TableComponentProps<T>) => {
  return (
    <div className='min-h-[calc(100vh-56px)] max-h-[calc(100vh-56px)]'>
      <Card className='min-h-[calc(100vh-92px)] max-h-[calc(100vh-92px)] overflow-hidden'>
        <CardHeader className='px-7'>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent
          ref={scrollContainerRef}
          className='max-h-[calc(100vh-92px)] overflow-scroll remove-scrollbar pb-24'
        >
          {loading ? (
            <div className='text-2xl flex gap-1 items-center justify-center h-[calc(100vh-192px)]'>
              <p className=' flex gap-1 items-center justify-center h-full'>
                Loading {title}
                <Loader className='animate-spin' />
              </p>
            </div>
          ) : error ? (
            <div className='text-center flex justify-center items-center text-2xl'>
              {error}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((col) => (
                    <TableHead key={col.accessor} className={col.className}>
                      {col.header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.length > 0 ? (
                  data.map((item) => renderRow(item))
                ) : (
                  <TableRow>
                    <td
                      colSpan={columns.length}
                      className='text-center p-4 text-2xl'
                    >
                      No data available.
                    </td>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {isFetching && (
        <div className='flex items-center justify-center p-1'>
          <Loader className='animate-spin' />
        </div>
      )}
    </div>
  )
}

export default TableComponent
