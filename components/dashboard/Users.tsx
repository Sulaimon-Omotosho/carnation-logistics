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
import { users } from '@/constants'
import Image from 'next/image'

const Users = () => {
  const usersConstant = users

  return (
    <Card>
      <CardHeader className='px-7'>
        <CardTitle>Users</CardTitle>
        <CardDescription>List of Users</CardDescription>
      </CardHeader>
      <CardContent className='max-h-[650px] overflow-auto remove-scrollbar'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead className='hidden sm:table-cell'>
                Phone Number
              </TableHead>
              <TableHead className='hidden sm:table-cell'>Role</TableHead>
              <TableHead className='hidden sm:table-cell'>Position</TableHead>
              <TableHead className='text-right'>User Id</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersConstant.map((users, index) => (
              <TableRow key={index}>
                <TableCell className='flex gap-2'>
                  <Image
                    src={users.image}
                    height={100}
                    width={100}
                    alt='profile image'
                    className='h-12 w-12 rounded-full border-2 border-gray-400 object-cover'
                  />
                  <div className=''>
                    <div className='font-medium'>{users.name} </div>
                    <div className='hidden text-sm text-muted-foreground md:inline'>
                      {users.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell className='hidden sm:table-cell'>
                  {users.phone}
                </TableCell>
                <TableCell className='hidden sm:table-cell'>
                  <Badge
                    className={cn('text-sm capitalize', {
                      'bg-yellow-500': users.role === 'user',
                      'bg-violet-500': users.role === 'admin',
                      'bg-blue-600': users.role === 'supervisor',
                    })}
                    // variant={
                    //   users.role === 'fulfilled' ? 'secondary' : 'outline'
                    // }
                  >
                    {users.role}
                  </Badge>
                </TableCell>
                <TableCell className='hidden md:table-cell'>
                  {users.position}
                </TableCell>
                <TableCell className='text-right'>
                  {/* ${orders.amount.toFixed(2)} */}
                  {users.userId}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default Users
