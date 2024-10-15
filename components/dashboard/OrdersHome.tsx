import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { Badge } from '../ui/badge'
import { cn } from '@/lib/utils'
import { orders } from '@/constants'

const OrdersHome = () => {
  const ordersConstant = orders

  return (
    <Card>
      <CardHeader className='px-7'>
        <CardTitle>Invoices</CardTitle>
        <CardDescription>Recent Orders</CardDescription>
      </CardHeader>
      <CardContent className='max-h-[650px] overflow-auto remove-scrollbar'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead className='hidden sm:table-cell'>Product</TableHead>
              <TableHead className='hidden sm:table-cell'>Status</TableHead>
              <TableHead className='hidden sm:table-cell'>Date</TableHead>
              <TableHead className='text-right'>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ordersConstant.map((orders, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className='flex'>
                    <div className='flex-1'>
                      <div className='font-medium'>{orders.company} </div>
                      <div className='hidden text-sm text-muted-foreground md:inline'>
                        {orders.name}
                      </div>
                    </div>
                    {/* <div className='flex-1 hidden'>
                      <div className=' text-sm'>{orders.email}</div>
                      <div className='hidden text-sm text-muted-foreground md:inline'>
                        {orders.phone}
                      </div>
                    </div> */}
                  </div>
                </TableCell>
                <TableCell className='hidden sm:table-cell'>
                  {orders.product}
                </TableCell>
                <TableCell className='hidden sm:table-cell'>
                  <Badge
                    className={cn('text-sm capitalize', {
                      'bg-yellow-500': orders.status === 'in-progress',
                      'bg-violet-500': orders.status === 'fulfilled',
                      'bg-red-500': orders.status === 'canceled',
                      'bg-blue-600': orders.status === 'pending',
                    })}
                    variant={
                      orders.status === 'fulfilled' ? 'secondary' : 'outline'
                    }
                  >
                    {orders.status}
                  </Badge>
                </TableCell>
                <TableCell className='hidden md:table-cell'>
                  {orders.date}
                </TableCell>
                <TableCell className='text-right'>
                  <span className='font-bold'>N</span>
                  {orders.amount.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default OrdersHome
