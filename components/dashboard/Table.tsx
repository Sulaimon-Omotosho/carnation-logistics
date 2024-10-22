'use client'

import { useState } from 'react'
import TablePagination from '../Pagination'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../ui/table'
import { Columns, Orders } from '@/lib/types'

type TableComponentProps<T> = {
  columns: Columns[]
  title: string
  description: string
  renderRow: (item: T) => React.ReactNode
  data: any[]
  itemsPerPage?: number
}

const TableComponent = <T,>({
  title,
  description,
  columns,
  renderRow,
  data,
  itemsPerPage = 10,
}: TableComponentProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(data.length / itemsPerPage)

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className='min-h-[calc(100vh-56px)] max-h-[calc(100vh-56px)]'>
      <Card className='min-h-[calc(100vh-92px)] max-h-[calc(100vh-92px)] overflow-hidden'>
        <CardHeader className='px-7'>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className='max-h-[calc(100vh-92px)] overflow-scroll remove-scrollbar pb-24'>
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
              {paginatedData.length > 0 ? (
                paginatedData.map((item) => renderRow(item))
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
        </CardContent>
      </Card>
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default TableComponent
