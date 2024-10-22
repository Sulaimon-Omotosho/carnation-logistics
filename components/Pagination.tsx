import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Button } from './ui/button'

const TablePagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}) => {
  const getPaginationRange = () => {
    const totalVisiblePages = 3

    if (totalPages <= totalVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const startPage = Math.max(currentPage - 1, 1)
    const endPage = Math.min(currentPage + 1, totalPages)

    if (startPage > 1 && endPage < totalPages) {
      return [startPage, startPage + 1, startPage + 2]
    } else if (startPage === 1) {
      return [1, 2, 3]
    } else {
      return [totalPages - 2, totalPages - 1, totalPages]
    }
  }

  const paginationRange = getPaginationRange()

  return (
    <Pagination className='h-9'>
      <PaginationContent>
        <PaginationItem>
          <Button
            variant={'ghost'}
            // asChild
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <PaginationPrevious className='cursor-pointer' />
          </Button>
        </PaginationItem>

        {paginationRange[0] > 1 && (
          <>
            <PaginationItem>
              <PaginationLink onClick={() => onPageChange(1)}>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}

        {paginationRange.map((page) => (
          <PaginationItem key={page}>
            <Button
              variant={'ghost'}
              className={page === currentPage ? 'font-bold bg-blue-500' : ''}
              asChild
              onClick={() => onPageChange(page)}
            >
              <PaginationLink>{page}</PaginationLink>
            </Button>
          </PaginationItem>
        ))}

        {paginationRange[paginationRange.length - 1] < totalPages && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => onPageChange(totalPages)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <Button
            variant={'ghost'}
            // asChild
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <PaginationNext className='cursor-pointer' />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default TablePagination
