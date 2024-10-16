import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../ui/table'
import { Columns } from '@/lib/types'

const TableComponent = ({
  title,
  description,
  columns,
  renderRow,
  data,
}: {
  columns: Columns[]
  title: string
  description: string
  renderRow: (item: any) => React.ReactNode
  data: any[]
}) => {
  return (
    <Card className='min-h-[calc(100vh-56px)] max-h-[calc(100vh-56px)] overflow-hidden'>
      <CardHeader className='px-7'>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className='max-h-[calc(100vh-56px)] overflow-scroll remove-scrollbar pb-24'>
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
          <TableBody>{data.map((item) => renderRow(item))}</TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default TableComponent